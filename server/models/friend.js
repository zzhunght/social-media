const mongoose = require('mongoose')
const {Schema} = mongoose

const FriendSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    acceept : [
        {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'user'
            }
        }
    ],
    pendings: [
        {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'user'
            }
        }
    ]
})