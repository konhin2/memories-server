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
                imgOwner: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHBhUSEBAQFRAXExUPFRUYDRsWEBAQFxYXFhYdEx8YKCghGCImHBUfITEhJTUrLi4uIDEzODMxNzAvLzEBCgoKDg0NFQ8PFSsZFR03Ky0tNzcrLTctNzctKysrKysrNzcrKy0rKysrKysrKysrNysrNysrKystKys3KysrK//AABEIAK0AsQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADcQAAIBAgMEBwcDBAMAAAAAAAABAgMRBAVRITFBkhIyYXGhsdEUIkJScpHBE+HwU4GCojM0Yv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwD62ACoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxnNU4Xk0kuLewjq+cxi7Qi5dr2R9QJMEBLN6rezoL/C/mI5vVXGD/w9BCp8ETRzpN+/C3bF38GSVGtGvC8JJrs4d+gGwAAAAAAAAAAAAAAAAAAAAANGLxUcJS6Uu5LjJ/zibZyVODbdkldvRIrOLxLxddyfcl8seCAYrEyxVS833L4Y93qaQCoAAAZ0asqFTpQbT8+/UwAFjy/HLGQ0mt67NY9h1lUpVHRqKUXaS2r9yzYausTQU1ufDR8URW0AAAAAAAAAAAAAAAAAARee1+jRUF8XvP6Vu8fIhTtzifTzB9iUfC78ziKgAAAAAAAASmRVujWcHukukvqW/wAPIizdg6n6WLhLSS+z2fkC0ANWYIoAAAAAAAAAAAAAAACs5j/36n1M5zszaHQzGXbaX3RxlQAAAAAAAAPV1l3rzPDZh4fqYmMdZJeIFqe8B7WCKAAAAAAAAAAAAAAAAiM+o7IzX0PzX5REFqr0lXouMtzVu7RlYrUnQquMt62P1RcTWAAAAAAAABIZJR/UxfS4RX+z2L8nAl0nZK7exLi2WXAYb2TDKPxdaT1l+24GOgAEUAAAAAAAAAAAAAAAAOPMcCsZC6sprc+DWj/mw7ABU6kHSm4yTUlvTMS0YnDRxULTV9Huku5kVXyecepJSWj2S9GVIjAb54OpDfTny38jyOEqS3U58oGk9Su7LfuS4t9h30coqVH71orvvL7IlcJgoYTqq8vmfW/toCOfK8v9n9+fX4L5F6+RIgEUAAAAAAAAAAAAAAAABrr144eneckl4vuXEiMTnEp7Ka6K1e2b/CAmKtRUo3lJRXa7HFWzenDqqUu5WX3ZBTk5yu229W7s8LEqTqZ1N9WEV33bNEs0qy+O3dFI4wB0+31f6s/uPb6v9Wf3OYAdkczqx+O/fFM3085mutGD+6ZGAFTtLOIT6ylHxXgd1GrGvG8JKS7GVQ9i+jK6bT1TsxCraCCw2bzp7J++td016/3JjDYmOJheDvqt0l3oitoAAAAAAAAAAHFmGYLCe6knU04R+r0PMzx3skLR/wCR7v8AytX+CAbu+3f2t9oGVWq61TpSbctfTQwAKgAAAAAAAAAAAAAGUJunNSi2pLc1vMQBPZfmSxL6M7Kpw+Wfdo+wkCok7lWP9oXQm/fS2P516oipEAAAAANdeqqFFye5K/fojYRGfVurBfW/JARdWo61Vylvbu/2MACoAAAAAAAAAAAAAAAAAAAexk4TTTs07p6M8AFowmIWKw6kuO9aSW9G4hcirdGtKHBrpL6lv8CaIoAABXc2bnmEtj2WjufBFiFwKlZ6PlYs9HysttxctSKlZ6PlYs9HysttxcUipWej5WLPR8rLbcXFIqVno+Viz0fKy23FxSKlZ6PlYs9HysttxcUipWej5WLPR8rLbcXFIqVno+Viz0fKy23FxSKlZ6PlYs9HysttxcUipWej5WLPR8rLbcXFIrWXydPHQdn1ktz3PZ+Syi4IoAAP/9k="
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