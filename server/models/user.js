const mongoose = require('mongoose')

const {Schema} = mongoose

const UserSchema = new Schema({
    avatar:{
        type: String,
        default: 'https://res.cloudinary.com/dqiomqzug/image/upload/v1650339177/my_uploads/avatar_q05ouv.jpg'
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user',UserSchema)