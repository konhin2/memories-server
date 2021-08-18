const Like = require('./../models/Likes')


exports.getLikes = async (req, res) => {
    
    try {
        const likes = await Like.find({})

        res.json(likes)

    } catch (error) {
        
    }
}

exports.createLikes = async (req, res) => {

    const { like, username, postId  } = req.body 

    try {
        const response = await Like.create({
            like,
            username,
            postId
        })
        res.json(response)

    } catch(e) {

    }

}

exports.deleteLikes = async (req, res) => {
    const { likeId } = req.body
    try{
        const response = await Like.findOneAndRemove({_id:likeId})
        res.json(response)
    }
    catch(error){
    }
}