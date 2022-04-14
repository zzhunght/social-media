const express = require('express')
const multi_upload = require('../middleware/upload')
const route = express.Route()
const Post = require('../models/post')

//get post 
route.get('/', async (req,res)=>{

})



route.post('/',multi_upload, async (req,res)=>{
    const image = req.files?.map(file => {
        return { path : file.filename}
    })
    
    const newPost = new Post({
        user : req.body.user,
        content : req.body.content,
        image: [...image],
        status : req.status
    })
    await newPost.save()
    
})


module.exports = route