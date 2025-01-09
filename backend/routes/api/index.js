// backend/routes/api/index.js
const router = require('express').Router();
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models/index.js');
const { requireAuth } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js')
const reviewImages = require('./review-images.js')
const spotImages = require('./spot-images.js')

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spot-images', spotImages)

router.use('/spots', spotsRouter)

router.use('/review-images', reviewImages)

router.use('/reviews', reviewsRouter)

router.use('/bookings', bookingsRouter)

module.exports = router;
