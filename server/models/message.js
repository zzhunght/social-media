const mongoose = require('mongoose')
const {Schema} = mongoose

const MessageSchema = new Schema({
    user_1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    user_2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    Message: [
        {
            sender:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            msg: {
                type:String,
                require: true
            },
            createdAt:{
                type: Date,
                default:Date.now
            }
        }
    ]
})

module.exports = mongoose.model('message', MessageSchema)