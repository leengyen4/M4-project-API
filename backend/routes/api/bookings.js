const express = require('express')
const { Spot, Booking } = require('../../db/models')
const { SpotImage, ReviewImage } = require('../../db/models')
const { Review, User } = require('../../db/models')
const router = express.Router()
const { requireAuth } = require('../../utils/auth')
const { restoreUser } = require('../../utils/auth')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');
const Sequelize = require('sequelize')

router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const user = req.user.id;

    const usersBookings = await Booking.findAll({
        where: {
            userId: user
        },
        include: [
            {
                model: Spot,
                attributes: [
                    'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price',
                    [Sequelize.literal(`(
                        SELECT url
                        FROM airbnb_schema."SpotImages"
                        WHERE "SpotImages"."spotId" = "Spot"."id" AND
                        "SpotImages"."preview" = TRUE
                        LIMIT 1
                    )`), 'previewImage']
                ],
            },
        ],
    })

    const response = usersBookings.map(booking => ({
        id: booking.id,
        spotId: booking.spotId,
        Spot: booking.Spot,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
    }))


    return res.json({ Bookings: response })
})

module.exports = router;
