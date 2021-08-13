const express = require('express')
const router = express.Router()


const authController = require('./../controllers/authController')
const auth = require('./../middlewares/auth')

// INICIAR SESIÓN
router.post('/login', authController.loginUser)

// VERIFICAR SESIÓN
router.get('/', auth,authController.verifyingToken)

module.exports = router