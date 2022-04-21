const mongoose = require('mongoose')
const {Schema} = mongoose

const MessageSchema = new Schema({
    conversation_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'conversation', ConversationSchema
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true

    },
    text:{
        type:String,
        require: true
    }
})

module.exports = mongoose.model('message', MessageSchema)