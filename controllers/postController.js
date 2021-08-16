const Post = require('./../models/Post')


exports.getPost = async (req, res) => {
    
    try {
        const posts = await Post.find({})

        res.json(posts)

    } catch (error) {
        
    }
}

exports.createPost = async (req, res) => {

    const { title, content, imageURL, username, imgOwner } = req.body 

    try {
        const response = await Post.create({
            title,
            content,
            imageURL,
            username,
            imgOwner
        })
        res.json(response)

    } catch(e) {

    }

}

exports.updatePost = async (req, res) => {
    const { postId, title, content, imageURL, username, imgOwner } = req.body

    try {
        const response = await Post.findByIdAndUpdate(postId, {
            title,
            content,
            imageURL,
            username,
            imgOwner
        }, {new: true})
            
        // HASTA QUE NO EXISTA UN RES.JSON, SE VA A QUEDAR CARGANDO LA PANTALLA
        res.json(response)

    } catch (error) {
        
    }
}

exports.deletePost = async (req, res) => {
    const { postId } = req.body
    try{
        const response = await Post.findOneAndRemove({_id:postId})
        res.json(response)
    }
    catch(error){

    }
}