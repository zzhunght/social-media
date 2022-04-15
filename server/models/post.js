const mongoose = require('mongoose')
const {Schema } = mongoose

const PostSchema = new Schema({
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    content: {
        type: String,
        require: true

    },
    image:[
        {  
            path:{
                type:String,
            }
        }
    ],
    status: {
        type:String,
        enum :['public','pivated']
    },
    createdAt:{
        type : new Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('post',PostSchema)