const testRouter = require('./test-rt')
const express = require('express')

// Index Router
const router = express.Router()

router.use('/test', testRouter)

module.exports = router
