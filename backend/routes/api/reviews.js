const express = require('express')
const { Spot } = require('../../db/models')
const { SpotImage, ReviewImage } = require('../../db/models')
const { Review, User } = require('../../db/models')
const router = express.Router()
const { requireAuth } = require('../../utils/auth')
const { restoreUser } = require('../../utils/auth')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');
const Sequelize = require('sequelize')

// Review validation
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

// Get all reviews of current user
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const user = req.user.id

    const allUserReviews = await Review.findAll({
        where: {
            userId: user
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: [
                    'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price',
                    [Sequelize.literal(`(
                        SELECT url
                        FROM airbnb_backend."SpotImages"
                        WHERE "SpotImages"."spotId" = "Spot"."id" AND
                        "SpotImages"."preview" = TRUE
                        LIMIT 1
                    )`), 'previewImage']
                ],
            },
            {
                model: ReviewImage,
                as: 'ReviewImages',
                attributes: ['id', 'url']
            }
        ]
    })
    return res.json({ Reviews: allUserReviews })
})

router.post('/:reviewId/images', restoreUser, requireAuth, async (req, res) => {
    const { url } = req.body
    const user = req.user.id

    const imageCountByReviewId = await ReviewImage.count({ where: { reviewId: req.params.reviewId } })

    const review = await Review.findByPk(req.params.reviewId)

    if (!review) return res.status(404).json({ message: "Review couldn't be found" })
    if (review.userId !== user) return res.status(403).json({ message: 'Forbidden' })
    if (imageCountByReviewId >= 10) return res.status(403).json({ message: 'Maximum number of images for this resource was reached' })

    const newReviewImage = await ReviewImage.create({
        reviewId: parseInt(req.params.reviewId),
        url,
    })

    return res.json({
        id: newReviewImage.id,
        url: newReviewImage.url
    })

})


// Edit review
router.put('/:reviewId', restoreUser, requireAuth, validateReview, async (req, res) => {
    const user = req.user.id
    const { review, stars } = req.body

    const userReview = await Review.findByPk(req.params.reviewId)

    if (!userReview) return res.status(404).json({ message: "Review couldn't be found" })
    if (userReview.userId !== user) return res.status(403).json({ message: 'Forbidden' })

    const updatedReview = await userReview.update({
        review,
        stars
    })

    return res.json(updatedReview)
})



router.delete('/:reviewId', restoreUser, requireAuth, async (req, res) => {

    const user = req.user.id
    const userReview = await Review.findByPk(req.params.reviewId)

    if (!userReview) return res.status(404).json({ message: "Review couldn't be found" })
    if (userReview.userId !== user) return res.status(403).json({ message: 'Forbidden' })

    await Review.destroy({
        where: {
            id: parseInt(req.params.reviewId)
        }
    })


    return res.json({ message: "Successfully deleted" })
})


module.exports = router;
