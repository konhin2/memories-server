const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    // REVISION DE VALIDACIONES
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            msg: errors.array()
        })
    }
    const { username, email, password } = req.body
    try {
        const foundUser = await User.findOne({username})
        const foundUserEmail = await User.findOne({email})
        if (foundUser) {
            return res.json({
                msg: 'username already exist, please try another'
            })
        } else if(foundUserEmail){
            return res.json({
                msg: 'email already exist, please try another'
            })
        } else {
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt)

            const response = await User.create({ 
                username, 
                email, 
                password: hashedPassword,
            })
            // USUARIO CREADO, VAMOS A CREAR EL JWT

            // CREAR UN JWT
            const payload = {
                user: {
                    id: response._id,
                }
            }
            // FIRMAR EL JWT
            jwt.sign(
                payload, // LOS DATOS QUE SE ENVIAN AL FRONEND CLIENTE
                process.env.SECRET, // ESTA ES LA LLAVE PARA DESCIFRAR LA FIRMA ELECTRONICA
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err
                    res.json({
                        token,
                    })
                }
            )
        }
    } catch (err) {
        console.log(err, "error server")
        return res.status(400).json({
            msg:err
        })
    }
}