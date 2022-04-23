const express = require('express')
const verifyToken = require('../middleware/auth')
const route = express.Router()
const Conversations = require('../models/conversation')

route.get('/',verifyToken, async (req, res) => {
    const id = req.userId
    try {
        const conversations = await Conversations.find({
            members :{$in:[id]}
        }).populate('members')
        return res.status(200).json({
            success: true,
            conversations: conversations
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

//lấy id conversation với 1 ng cụ thể
route.get('/:id/1',verifyToken, async (req, res) => {
   
    const id = req.userId
    const id2 = req.params.id
    try {
        const conversation = await Conversations.findOne({
            members :{$all :[id,id2]}
        })
        if(!conversation){
            console.log("new")
            const newConversation = new Conversations({
                members:[id,id2]
            })
            await newConversation.save()
            return res.status(200).json({
                success: true,
                conversation: newConversation
            })
        }
        return res.status(200).json({
            success: true,
            conversation: conversation
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = route