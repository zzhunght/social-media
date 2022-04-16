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
        enum :['public','pivate'],
        default:'public'
    },
    like:[
        {
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'user',
            }
        }
    ],
    comment:[
        {
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            text:{
                type:String,
            }
        }
    ],
    createdAt:{
        type :Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('post',PostSchema)