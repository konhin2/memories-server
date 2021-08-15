// 1. IMPORTACIONES
const express = require('express')
const router =  express.Router()

const postController = require('./../controllers/postController')


// 2. RUTEO

// OBTENCIÓN DE TODOS LOS PROYECTOS
router.get('/', postController.getPost)

// CREAR UN PROYECTO NUEVO
router.post('/create', postController.createPost)

// EDITAR UN PROYECTO
router.post('/update', postController.updatePost)

router.post('/delete', postController.deletePost)
 
module.exports = router