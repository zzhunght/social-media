const express = require('express')
const route = express.Router()
const Message = require('../models/message')
const Conversations = require('../models/conversation')
const verifyToken = require('../middleware/auth')
route.get('/:id',verifyToken,async(req, res)=>{
    let skip = 0;
    if(req.query.page == 1){
        skip = 0;
    }
    else if(Number(req.query.page) > 1){
        skip = (Number(req.query.page) - 1) * 20
    }
    try {
        const mes = await Message.find({conversation_id: req.params.id}).sort({createdAt:-1}).skip(skip).limit(100)
        return res.status(200).json({
            success: true,
            mes:mes.reverse()
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Internal server Errors'
        })
    }
})
// lưu đoạn chat giữa 2 người vào db
route.post('/',verifyToken,async(req, res)=>{
    console.log(req.body)
    try {
        const {conversation_id,text} = req.body
        const mes = new Message({
            sender:req.userId,
            conversation_id,
            text
        })
        await mes.save()
        await Conversations.findOneAndUpdate({_id:conversation_id},{
            updateAt:Date.now
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Internal server Errors'
        })
    }
})


module.exports = route