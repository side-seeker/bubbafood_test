const controllers = require('../controllers')
const express = require('express')

// Test Router
const router = express.Router()

router.get('/hello', controllers.hello)
router.get('/users', controllers.getUsers)
router.post('/create/:email/:password/:dob', controllers.postUser)
router.get('/login/:email/:password', controllers.loginUser)

module.exports = router