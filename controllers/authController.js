const User = require('./../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")


exports.verifyingToken = async (req, res) => {

    const userId = req.user.id

    try {
        const userFound = await User.findById(userId).select('-password')

        res.json({
            userFound
        })


    } catch(e) {

    }

}


exports.loginUser = async (req, res) => {

        const { email, password } = req.body


    try{
        const foundUser = await User.findOne({email})

        if(!foundUser){
            return res.status(400).json({
                msg: "El usuario no existe"
            })
        }

        // REVISAR EL PASSWORD

        const passCorrecto = await bcryptjs.compare(password, foundUser.password)

        if (!passCorrecto) {
            return res.status(400).json({
                msg: "Password es incorrecto"
            })
        }

        // GENERAR FIRMA DEL TOKEN

        const payload = {

            user: {
                id: foundUser.id
            }

        }

        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 1000 * 60 * 60 * 24
            },
            (error, token) => {
                if(error) throw error

                res.json({
                    token
                })

            }

        )

    } catch(e) {

    }
}