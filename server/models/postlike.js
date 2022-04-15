const mongoose = require('mongoose')
const {Schema } = mongoose

const PostSchema = new Schema({
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        require: true

    },
    comment: {
        type:String,
    },
    createdAt:{
        type : new Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('post',PostSchema)