const express = require('express')
const router = express.Router()

const {check} = require('express-validator')

const userController = require('./../controllers/usersController')



/**
 * USERS.JS
 * Creación de usuarios. 1 ruta.
 */

router.post(
    "/create", 
    [
        check('username', 'EL nombre es obligatorio').not().isEmpty(),
        check('email', "Agrega un email válido").isEmail(),
        check('password', 'El password debe tener un mínimo de 6 caracteres').isLength({min: 6})
    ],
    userController.createUser)

module.exports = router