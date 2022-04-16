const express = require('express')
const verifyToken = require('../middleware/auth')
const { multi_upload } = require('../middleware/upload')
const route = express.Router()
const Post = require('../models/post')

//get post 
route.get('/', async (req,res)=>{
    try {
        const posts = await Post.find()

        return res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }
})

route.get('/mypost',verifyToken, async (req,res)=>{
    try {
        const userId = req.userId

        const posts = await Post.find({user: userId})

        if(!posts) return res.status(404).json({
            success: false,
            message:'No post found',
            posts: []
        })

        return res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }
})
route.get('/post/:id', async (req, res) => {
    try {
        const id = req.params.id

        const posts = await Post.find({user: id, status:'public'})
        if(!posts) return res.status(404).json({
            success: false,
            message:'No post found',
            posts: []
        })

        return res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }
})


route.post('/',verifyToken, async (req,res)=>{
    try {
        
        
        const newPost = new Post({
            user : req.body.user,
            content : req.body.content,
            image: req.body.image,
            status : req.body.status,
            
        })
        await newPost.save()
        console.log(newPost)
        res.status(200).json({
            success: true,
            newPost
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'somethings went wrongs'
        })
    }
})


module.exports = route