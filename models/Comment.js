// 1. IMPORTACIONES
const mogoose = require('mongoose')
// 2. SCHEMA
const commentSchema = mogoose.Schema({
    comment: {
        type: String,
        required: true
    },
    username: String,
    img: String,
    postId: String,
},
    {
        timestamps: true
    }
)
// 3. Modelo
const Comment = mogoose.model('comments', commentSchema)

// 4. Exportar el modelo
module.exports = Comment