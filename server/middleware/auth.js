const jwt = require('jsonwebtoken')

const verifyToken = async (req,res,next) =>{
    try {
        const header = await req.headers['authorization']
        const accessToken = header && header.split(' ')[1]

        if(!accessToken) return res.status(401).json({
            success:false,
            message:'Token Not Found'
        })

        const decode = jwt.verify(accessToken,process.env.SECRET_TOKEN_SIGN)
        req.userId = decode.userId
        next()
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'Invalid token'
        })
    }

}


module.exports = verifyToken