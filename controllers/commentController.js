const Comment = require('./../models/Comment')


exports.getComments = async (req, res) => {
    
    try {
        const comments = await Comment.find({})

        res.json(comments)

    } catch (error) {
        
    }
}

exports.createComments = async (req, res) => {

    const { comment, username, img, postId  } = req.body 

    try {
        const response = await Comment.create({
            comment,
            username,
            img,
            postId
        })
        res.json(response)

    } catch(e) {

    }

}

exports.updateComments = async (req, res) => {
    const { commentId, comment, img, username, postId } = req.body

    try {
        const response = await Comment.findByIdAndUpdate(commentId, {
            comment,
            img,
            username, 
            postId
        }, {new: true})
            
        // HASTA QUE NO EXISTA UN RES.JSON, SE VA A QUEDAR CARGANDO LA PANTALLA
        res.json(response)

    } catch (error) {
        
    }
}

exports.deleteComments = async (req, res) => {
    const { commentId } = req.body
    try{
        const response = await Comment.findOneAndRemove({_id:commentId})
        res.json(response)
    }
    catch(error){

    }
}