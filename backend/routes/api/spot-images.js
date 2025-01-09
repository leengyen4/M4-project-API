const express = require('express')
const { SpotImage } = require('../../db/models')
const { Spot } = require('../../db/models')
const router = express.Router()
const { requireAuth } = require('../../utils/auth')
const { restoreUser } = require('../../utils/auth')


router.delete('/:imageId', restoreUser, requireAuth, async (req, res) => {
    const user = req.user.id

    const spotImage = await SpotImage.findByPk(req.params.imageId)

    if (!spotImage) return res.status(404).json({ message: "Spot Image couldn't be found" })

    const checkSpotOwner = await Spot.findByPk(spotImage.spotId)


    if (checkSpotOwner.ownerId !== user) return res.status(403).json({ message: 'Forbidden' })

    await SpotImage.destroy({
        where: {
            id: req.params.imageId
        }
    })

    return res.json({ message: "Successfully deleted" })

})


module.exports = router
