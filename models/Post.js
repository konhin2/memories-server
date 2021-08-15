// 1. IMPORTACIONES
const mogoose = require('mongoose')
// 2. SCHEMA
const postSchema = mogoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageURL: String,
    username: String,
    imgOwner: String,
},
    {
        timestamps: true
    }
)
// 3. Modelo
const Post = mogoose.model('posts', postSchema)

// 4. Exportar el modelo
module.exports = Post