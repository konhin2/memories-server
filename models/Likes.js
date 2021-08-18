// 1. IMPORTACIONES
const mogoose = require('mongoose')
// 2. SCHEMA
const likeSchema = mogoose.Schema({
    like: Boolean,
    username: String,
    postId: String,
},
    {
        timestamps: true
    }
)
// 3. Modelo
const Like = mogoose.model('likes', likeSchema)

// 4. Exportar el modelo
module.exports = Like