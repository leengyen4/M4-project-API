const express = require('express')
const { ReviewImage } = require('../../db/models')
const { Review } = require('../../db/models')
const router = express.Router()
const { requireAuth } = require('../../utils/auth')
const { restoreUser } = require('../../utils/auth')


router.delete('/:imageId', restoreUser, requireAuth, async (req, res) => {
    const user = req.user.id

    const reviewImage = await ReviewImage.findByPk(req.params.imageId)

    if (!reviewImage) return res.status(404).json({ message: "Review Image couldn't be found" })

    const checkReviewOwner = await Review.findByPk(reviewImage.reviewId)


    if (checkReviewOwner.userId !== user) return res.status(403).json({ message: 'Forbidden' })

    await ReviewImage.destroy({
        where: {
            id: req.params.imageId
        }
    })

    return res.json({ message: "Successfully deleted" })

})


module.exports = router
