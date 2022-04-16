const mongoose = require('mongoose')
const {Schema} = mongoose

const ConversationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    list:[
        {id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'user'
        }}
    ]
})

module.exports = mongoose.model('conversation', ConversationSchema)