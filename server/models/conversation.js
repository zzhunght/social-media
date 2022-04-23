const mongoose = require('mongoose')
const {Schema} = mongoose

const ConversationSchema = new Schema({
  members:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'user'
      }
  ],
  createdAt:{
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type: Date,
    default: Date.now
  }
},
{ timestamps: true})

module.exports = mongoose.model('conversation', ConversationSchema)