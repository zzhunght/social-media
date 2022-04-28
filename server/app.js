const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

//api route 
const UserRoute = require('./routes/user')
const PostRoute = require('./routes/post')
const MesRoute = require('./routes/mes')
const ProfileRoute = require('./routes/profile')
const ConversationRoute = require('./routes/conversation')
const SearchRoute = require('./routes/search')


//
app.use(express.static('uploads'))
app.use(cors())
app.use(express.json())
const connecDb = async ()=>{
    try {
        mongoose.connect(`mongodb+srv://zzhunght:${process.env.PASSWORD}@cluster0.jpbt8.mongodb.net/fb-clone?retryWrites=true&w=majority`,()=>console.log('connect Db successfully'))
        
    } catch (error) {
        console.log('connect Db fail',error)
    }
}

connecDb() 

app.get('/', (req, res)=>{
    res.send('Hello world')
})
app.use('/api/auth',UserRoute)
app.use('/api/post',PostRoute)
app.use('/api/mes',MesRoute)
app.use('/api/profile',ProfileRoute)
app.use('/api/conversation',ConversationRoute)
app.use('/api/search',SearchRoute)
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`App listening on port ${PORT}`))