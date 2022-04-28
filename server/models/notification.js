const mongoose = require('mongoose')

const {Schema} = mongoose

const NotificationSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        require: true
    },
    notice:{
        type: String,
        require: true
    },
    read:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type : Date,
        default: Date.now
    },
    updatedAt:{
        type : Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notification',NotificationSchema)