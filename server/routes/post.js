const express = require('express')
const verifyToken = require('../middleware/auth')
const Notification = require('../models/notification')
const { multi_upload } = require('../middleware/upload')
const route = express.Router()
const Post = require('../models/post')

// get thông báo

route.get('/notification',verifyToken, async (req, res) => {
    try {
        const notification = await Notification.find({user:req.userId})
        if(notification) return res.status(200).json({
            success: true,
            notification
        })
        return res.status(200).json({success: true, notification:[]})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
})



//get post 
route.get('/', async (req,res)=>{
    let skip = 0;
    if(req.query.page == 1){
        skip = 0;
    }
    else if(Number(req.query.page) > 1){
        skip = (Number(req.query.page) - 1) * 20
    }
    try {
        const posts = await Post.find({status: 'public'}).sort({createdAt: -1}).skip(skip).limit(20).populate([
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
        if (posts.length === 0) return res.status(200).json({
            success:false,
            posts,
            message:'Đã hết nội dung'
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

route.get('/mypost',verifyToken, async (req,res)=>{
    try {
        const userId = req.userId

        const posts = await Post.find({user: userId}).populate([
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
route.get('/:id', async (req, res) => {
    
    try {
        const id = req.params.id
        const post = await Post.findOne({_id: id, status:'public'}).populate([
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
        if(!post) return res.status(404).json({
            success: false,
            message:'No post found',
            post: []
        })

        return res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Somethings went wrongs'
        })
    }
})

// đăng post
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

//like post
route.patch('/like',verifyToken, async (req,res)=>{
    console.log(req.body)
    try {
        const post = await Post.findOneAndUpdate({_id:req.body.id},{
            $push:{
                like:req.body.user
            }
            },{new:true}).populate([
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

        //thông báo đến người chủ post
        const notice = await Notification.findOneAndUpdate({post:req.body.id},{
            notice:req.body.name + ' vừa thích bài viết của bạn',
            ready:false,
            updatedAt: Date.now()
        })
        if(!notice) {
            const newNotice = new Notification({
                user: req.body.owner,
                post: req.body.id,
                notice:req.body.name + ' vừa thích bài viết của bạn',
                ready:false,
                updatedAt: Date.now()
            })
            await newNotice.save()
        }
        if(post) return res.status(200).json({
            success: true,
            post,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message:'somethings went wrongs'
        })
    }
})

//xoá like
route.patch('/remove-like',verifyToken, async (req,res)=>{
    console.log(req.body)
    try {
        const post = await Post.findOneAndUpdate({_id:req.body.id},{
            $pull:{
                like:req.body.user
            }
            },{new:true}).populate([
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
        if(post) return res.status(200).json({
            success: true,
            post,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'somethings went wrongs'
        })
    }
})


//bình luận
route.patch('/cmt',verifyToken, async (req,res)=>{
    const id = req.body.id;
    try {
        const post = await Post.findOneAndUpdate({_id:id},{
            $push:{
                comment:{
                    user: req.body.user,
                    text: req.body.text
                }
            }
            },{new:true}).populate([
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
        const notice = await Notification.findOneAndUpdate({post:req.body.id},{
            notice:req.body.name + ' vừa bình luận về bài viết của bạn',
            ready:false,
            updatedAt: Date.now()
        })
        if(!notice) {
            const newNotice = new Notification({
                user: req.body.owner,
                post: req.body.id,
                notice:req.body.name + ' vừa bình luận về bài viết của bạn',
                ready:false,
                updatedAt: Date.now()
            })
            await newNotice.save()
        }
        if(post) return res.status(200).json({
            success: true,
            post,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'somethings went wrongs'
        })
    }
})
module.exports = route