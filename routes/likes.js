const express = require('express')
const router =  express.Router()

const likeController = require('./../controllers/likeController')


// 2. RUTEO

// OBTENCIÓN DE TODOS LOS PROYECTOS
router.get('/', likeController.getLikes)

// CREAR UN PROYECTO NUEVO
router.post('/create', likeController.createLikes)

// BORRAR UN PROYECTO
router.post('/delete', likeController.deleteLikes)
 
module.exports = router