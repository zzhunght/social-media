const User = require('../models/user')
const Post = require('../models/post')
const Friend = require('../models/friend')
const express = require('express')
const route = express.Router()
const verifyToken = require('../middleware/auth')


//get my profile
route.get('/my-profile',verifyToken, async (req,res)=>{
    try {
        const user = await User.findById(req.userId).select('-password -email')
        const posts = await Post.find({user:req.userId}).populate([
            {
                path:'comment',
                populate:{
                    path:'user',
                    select:'firstName lastName avatar '
                }
            },
            {
                path:'user',
                select:'firstName lastName avatar '
            }
        ])
        const friend = await Friend.findOne({user:req.userId})

        res.status(200).send({
            success:true,
            user,
            posts,
            friend,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }


})
//get profile
route.get('/user/:id', async (req,res)=>{
    const id = req.params.id
    try {
        const user = await User.findById(id).select('-password -email')
        const posts = await Post.find({user:id}).populate([
            {
                path:'comment',
                populate:{
                    path:'user',
                    select:'firstName lastName avatar '
                }
            },
            {
                path:'user',
                select:'firstName lastName avatar '
            }
        ])
        const friend = await Friend.findOne({user:id})

        res.status(200).send({
            success:true,
            user,
            posts,
            friend,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }


})
//gửi lời mời kết bạn
route.get('/add-friend/:id',verifyToken, async (req,res)=>{
    const userId = req.userId
    const id = req.params.id
    try {
        const friend = await Friend.findOneAndUpdate({user:userId},{
            $push:{
                pendings:id
            }
        },{new:true})

        // cập nhật lại cho ng thứ 2

        await Friend.findOneAndUpdate({user:id},{
            $push:{
                requests:userId
            }
        })
        res.status(200).send({
            success:true,
            friend,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }
})
// xoá gửi lời mời kết bạn
route.get('/cancel-add-friend/:id',verifyToken, async (req,res)=>{
    const userId = req.userId
    const id = req.params.id
    try {
        const friend = await Friend.findOneAndUpdate({user:userId},{
            $pull:{
                pendings:id
            }
        },{new:true})

        // cập nhật lại cho ng thứ 2

        await Friend.findOneAndUpdate({user:id},{
            $pull:{
                requests:userId
            }
        })
        res.status(200).send({
            success:true,
            friend,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }
})
// chấp nhận kết bạn
route.get('/accept-friend/:id',verifyToken, async (req,res)=>{
    const userId = req.userId
    const id = req.params.id
    try {
        const friend = await Friend.findOneAndUpdate({user:userId},{
            $pull:{
                requests:id
            },
            $push: {
                accepts:id
            }
        },{new:true})

        // cập nhật lại cho ng thứ 2
        await Friend.findOneAndUpdate({user:id},{
            $pull:{
                pendings:userId
            },
            $push: {
                accepts:userId
            }
        })
        res.status(200).send({
            success:true,
            friend,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }
})

// không chấp nhận kết bạn
route.get('/reject-friend/:id',verifyToken, async (req,res)=>{
    const userId = req.userId
    const id = req.params.id
    try {
        const friend = await Friend.findOneAndUpdate({user:userId},{
            $pull:{
                requests:id
            },
        },{new:true})

        // cập nhật lại cho ng thứ 2
        await Friend.findOneAndUpdate({user:id},{
            $pull:{
                pendings:userId
            },
        })
        res.status(200).send({
            success:true,
            friend,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }
})
module.exports = route