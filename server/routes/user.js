const express = require('express')
const User = require('../models/user')
const Friend = require('../models/friend')
const route = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')
const { single_upload } = require('../middleware/upload')

// api/auth

//load user
route.get('/',verifyToken,async(req,res)=>{
    const userId = req.userId
    try {
        const user = await User.findById(userId).select('-password')
        
        if(!user) return res.status(401).json({
            success:false,
            message:'Unauthorization'
        })
        res.status(200).json({
            success:true,
            message:'Load User successfully',
            user:user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Somethings went wrongs'
        })
    }
})



//get profile information


//api/auth/register
//register method
//public
route.post('/register', async (req,res) =>{
   try {
        const {firstName,lastName,email,password,avatar} = req.body

        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({
                success:false,
                message:'Missing some infomation'
            })
        }

        const user = await User.findOne({email:email})
        if(user){
            return res.status(400).json({
                success:false,
                message:'user already used'
            })
        }

        const hashpassword = await argon2.hash(password)
        const newUser = new User({
            avatar:avatar,
            firstName,
            lastName,
            email,
            password:hashpassword
        })
        await newUser.save()
        //tạo ra 1 ds bạn
        const friend = new Friend({
            user:newUser._id
        })
        await friend.save()
        
        const accessToken = jwt.sign({
            userId:newUser._id
        },process.env.SECRET_TOKEN_SIGN,{
            expiresIn:'30d'
        })

        res.status(200).json({
            message:'Register successfully',
            success:true,
            accessToken
        })
   } catch (error) {
       console.log(error.message)
       return res.status(500).json({
           success:false,
           message:'Somethings went wrongs'
       })
   }
} )


//api/auth/login 
//login method 
//public api

route.post('/login',async (req,res) => {
    console.log(req.body)
    const {email,password} = req.body
     
    try {
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'Missing email or password'
            })
        }

        const user = await User.findOne({email:email})

        if(!user) return res.status(401).json({
            success:false,
            message:'Incorrect email or password'
        })
        const verifyPassword = await argon2.verify(user.password,password)

        if(verifyPassword){
            
            const accessToken = jwt.sign({
                userId:user._id
            },process.env.SECRET_TOKEN_SIGN,{
                expiresIn:'30d'
            })

            return res.status(200).json({
                message: 'Login successfully',
                success:true,
                accessToken
            })
        }
        else{
            res.status(401).json({
                success:false,
                message:'Incorrect email or password'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'Somethings went wrongs'
        })
    }
})
route.patch('/updatebg',verifyToken, async (req,res)=>{
    console.log(req.body)
    try {
        const user = await User.findOneAndUpdate({_id:req.userId},{
            background:req.body.background
        },{new:true}).select('-password -email')
        console.log(user)
        if(!user) return res.status(404).json({
            success:false,
            message: 'Cập nhật không thành công'
        })
        return res.status(200).json({
            success:true,
            user:user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }
})
route.patch('/updatepassword',verifyToken, async (req,res)=>{
    console.log(req.body)
    try {
        const user = await User.findOne({_id:req.userId})

        if(!user) return res.status(404).json({
            success:false,
            message: 'Cập nhật không thành công'
        })
        const verifyPassword = await argon2.verify(user.password,req.body.password)
        if(!verifyPassword) return res.status(401).json({
            success:false,
            message:'Mật khẩu không đúng'
        })

        //hash mật khẩu mới
        const newpassword = await argon2.hash(req.body.newPassword)

        //update user
        const updateUser = await User.findOneAndUpdate({_id:req.userId},{
            password:newpassword
        },{new:true}).select('-password -email')

        //tạo accessToken mới
        const accessToken = jwt.sign({
            userId:updateUser._id
        },process.env.SECRET_TOKEN_SIGN,{
            expiresIn:'30d'
        })

        return res.status(200).json({
            success:true,
            message:'Cập nhật mật khẩu thành công',
            accessToken
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }
})

route.patch('/updateavatar',verifyToken, async (req,res)=>{
    try {
        const user = await User.findOneAndUpdate({_id:req.userId},{
            avatar:req.body.avatar
        },{new:true})
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }
})
route.patch('/updatename',verifyToken, async (req,res)=>{
    try {
        const user = await User.findOneAndUpdate({_id:req.userId},{
            firstName:req.body.firstName,
            lastName:req.body.lastName
        },{new:true})
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }
})
route.patch('/updatebio',verifyToken, async (req,res)=>{
    try {
        const user = await User.findOneAndUpdate({_id:req.userId},{
            bio:req.body.bio
        },{new:true})
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }
})
module.exports = route