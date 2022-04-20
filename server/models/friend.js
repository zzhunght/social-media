const mongoose = require('mongoose')
const {Schema} = mongoose

const FriendSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    accepts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'user'
        }

    ],
    pendings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
       
    ]
})

module.exports = mongoose.model('friend', FriendSchema)