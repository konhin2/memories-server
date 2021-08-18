const express = require('express')
const router =  express.Router()

const commentController = require('./../controllers/commentController')


// 2. RUTEO

// OBTENCIÓN DE TODOS LOS COMENTARIOS
router.get('/', commentController.getComments)

// CREAR UN COMENTARIOS NUEVO
router.post('/create', commentController.createComments)

// EDITAR UN COMENTARIO
router.post('/update', commentController.updateComments)

router.post('/delete', commentController.deleteComments)
 
module.exports = router