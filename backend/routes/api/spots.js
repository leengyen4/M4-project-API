const express = require('express')
const { Spot } = require('../../db/models')
const { SpotImage } = require('../../db/models')
const { Review, User, ReviewImage, Booking } = require('../../db/models')
const router = express.Router()
const { requireAuth } = require('../../utils/auth')
const { restoreUser } = require('../../utils/auth')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');
const Sequelize = require('sequelize')
const { Op } = require('sequelize')

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    // check('lat')
    //     // .exists({ checkFalsy: true })
    //     .withMessage('Latitude is required')
    //     .isNumeric({ min: -90, max: 90 })
    //     .withMessage('Latitude must be within -90 and 90'),
    // check('lng')
    //     // .exists({ checkFalsy: true })
    //     .withMessage('Longtitude is required')
    //     .isNumeric({ min: -180, max: 180 })
    //     .withMessage('Longitude must be within -180 and 180'),
    check('name')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters')
        .exists({ checkFalsy: true })
        .withMessage('Name is required'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price is required')
        .isNumeric({ min: 1 })
        .withMessage('Price per day must be a positive number'),
    handleValidationErrors
]

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

const validateQuery = [
    check('page')
        .optional()
        .isNumeric()
        .isInt({ min: 1 })
        .bail()
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .optional()
        .isNumeric()
        .isInt({ min: 1, max: 20 })
        .bail()
        .withMessage('Size must be between 1 and 20'),
    check('maxLat')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage('Maximum latitude is invalid'),
    check('minLat')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage('Minimum latitude is invalid'),
    check('maxLng')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage('Maximum longitude is invalid'),
    check('minLng')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage('Minimum longitude is invalid'),
    check('minPrice')
        .optional()
        .isNumeric({ min: 0 })
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .optional()
        .isNumeric({ min: 0 })
        .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
]

router.get('/:spotId/reviews', async (req, res) => {

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" })

    const spotReviews = await Review.findAll({
        where: {
            spotId: parseInt(req.params.spotId),
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                as: 'ReviewImages',
                attributes: ['id', 'url']
            }
        ]
    })

    return res.json({ Reviews: spotReviews })
})

// Get all bookings by spot id
router.get('/:spotId/bookings', restoreUser, requireAuth, async (req, res) => {
    const user = req.user.id

    const spotBookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['ownerId']
            }
        ]
    })

    if (!spotBookings || spotBookings.length === 0) return res.status(404).json({ message: "Spot couldn't be found" })

    const userOwnsSpot = spotBookings.some(booking => booking.Spot.ownerId === parseInt(user))

    console.log(userOwnsSpot)

    const formattedRes = spotBookings.map(booking => {
        if (userOwnsSpot) {
            return {
                User: booking.User,
                id: booking.id,
                spotId: booking.spotId,
                userId: booking.userId,
                startDate: booking.startDate,
                endDate: booking.endDate,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt
            }
        } else {
            return {
                spotId: booking.spotId,
                startDate: booking.startDate,
                endDate: booking.endDate
            }
        }
    })

    return res.json({ Bookings: formattedRes })
})


// Get all spots owned by current user
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const user = req.user.id;

    const spots = await Spot.findAll({
        where: {
            ownerId: user
        },
        attributes: {
            include: [
                [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating']
            ]
        },
        include: [
            {
                model: SpotImage,
                as: 'SpotImages',
                attributes: ['id', 'url'], // Include id attribute
                where: { preview: true },
                required: false
            },
            {
                model: Review,
                attributes: []
            }
        ],
        group: [
            'Spot.id',
            'SpotImages.id' // Include SpotImages.id in the GROUP BY clause
        ]
    });

    const format = spots.map(spot => ({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgStarRating: spot.dataValues.avgRating ? parseFloat(spot.dataValues.avgRating).toFixed(1) : null,
        previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null
    }));

    res.json({ Spots: format });
});

// Get spot by id
router.get('/:spotId', async (req, res) => {

    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                as: 'SpotImages',
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            },
        ]
    })

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" })

    const reviewCount = await Review.count({ where: { spotId: req.params.spotId } })
    const starsSum = await Review.sum('stars', { where: { spotId: req.params.spotId } })
    const avgStars = reviewCount > 0 ? (starsSum / reviewCount).toFixed(1) : null;

    const formattedRes = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews: reviewCount,
        avgStarRating: avgStars,
        SpotImages: spot.SpotImages,
        Owner: spot.Owner
    }

    return res.json(formattedRes)
})

// Get all spots
router.get('/', validateQuery, async (req, res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    page = parseInt(page) || 1
    size = parseInt(size) || 20

    const whereObject = {
        ...(minLat && { lat: { [Op.gte]: minLat } }),
        ...(maxLat && { lat: { [Op.lte]: maxLat } }),
        ...(minLng && { lng: { [Op.gte]: minLng } }),
        ...(maxLng && { lng: { [Op.lte]: maxLng } }),
        ...(minPrice && { price: { [Op.gte]: minPrice } }),
        ...(maxPrice && { price: { [Op.lte]: maxPrice } })

    }

    const getAllSpots = await Spot.findAll({
        where: whereObject,
        include: [
            {
                model: SpotImage,
                where: { preview: true },
                attributes: ['url'],
                required: false
            },
            {
                model: Review,
                attributes: [],
                required: false
            }
        ],
        attributes: {
            include: [
                'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'createdAt', 'updatedAt',
                [Sequelize.literal(`(
                        SELECT AVG(stars)
                        FROM airbnb_backend."Reviews"
                        WHERE "Reviews"."spotId" = "Spot"."id"
                    )`), 'avgRating']
            ]
        },
        group: ['Spot.id'],
        limit: size,
        offset: (page - 1) * size,

    })


    const format = getAllSpots.map(spot => ({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgStarRating: spot.dataValues.avgRating ? parseFloat(spot.dataValues.avgRating).toFixed(1) : null,
        previewImage: spot.SpotImages[0] ? spot.SpotImages[0].url : null
    }))

    res.json({ Spots: format })
})

// Reviews by spotId
router.post('/:spotId/reviews', restoreUser, requireAuth, validateReview, async (req, res) => {
    const user = req.user.id
    const { review, stars } = req.body

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" })

    const checkReview = await Review.findOne({
        where: {
            userId: user,
            spotId: req.params.spotId
        }
    })
    console.log(checkReview)
    if (checkReview) return res.status(500).json({ message: 'User already has a review for this spot' })

    const newReview = await Review.create({
        spotId: parseInt(req.params.spotId),
        userId: user,
        review,
        stars
    })

    return res.status(201).json(newReview)

})

// Create image for a spot based on spotId
router.post('/:spotId/images', restoreUser, requireAuth, async (req, res) => {
    const user = req.user.id

    const { url, preview } = req.body

    const checkSpotBelongsToUser = await Spot.findByPk(req.params.spotId)

    if (!checkSpotBelongsToUser) return res.status(404).json({ message: "Spot couldn't be found" })

    if (user !== checkSpotBelongsToUser.ownerId) return res.status(403).json({ message: "Forbidden" })


    const newImage = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview,
    })

    return res.json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    })
})


// Create a spot
router.post('/', restoreUser, requireAuth, validateSpot, async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const user = req.user.id;

    const newSpot = await Spot.create({
        ownerId: parseInt(user),
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.status(201).json(newSpot)
})

// Update exisiting spot based on spotId
router.put('/:spotId', restoreUser, requireAuth, validateSpot, async (req, res) => {
    const user = req.user.id

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const editSpot = await Spot.findByPk(req.params.spotId)

    if (!editSpot) return res.status(404).json({ message: "Spot couldn't be found" })

    if (user !== editSpot.ownerId) return res.status(403).json({ message: "Forbidden" })

    const updatedSpot = await editSpot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.json(updatedSpot)

})

router.delete('/:spotId', restoreUser, requireAuth, async (req, res) => {

    const user = req.user.id

    const deleteSpot = await Spot.findByPk(req.params.spotId);

    if (!deleteSpot) return res.status(404).json({ message: "Spot couldn't be found" })

    if (user !== deleteSpot.ownerId) return res.status(403).json({ message: "Forbidden" })

    await Spot.destroy({
        where: {
            id: req.params.spotId
        }
    })

    return res.json({ message: "Deleted successfully" })

})

module.exports = router;
