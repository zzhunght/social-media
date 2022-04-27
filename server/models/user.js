const mongoose = require('mongoose')

const {Schema} = mongoose

const UserSchema = new Schema({
    avatar:{
        type: String,
        default: 'https://res.cloudinary.com/dqiomqzug/image/upload/v1650339177/my_uploads/avatar_q05ouv.jpg'
    },
    firstName:{
        type:String,
        require: true
    },
    lastName:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    },
    bio:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    background:{
        type: String,
        default:'https://res.cloudinary.com/dqiomqzug/image/upload/v1650444210/my_uploads/anh-bia-dep-chat-anime_tyzo85.jpg'
    }
})

module.exports = mongoose.model('user',UserSchema)