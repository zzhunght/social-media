const mongoose = require('mongoose')
const {Schema} = mongoose

const ConversationSchema = new Schema({
    members:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
        }
    ]
})

module.exports = mongoose.model('conversation', ConversationSchema)