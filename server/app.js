const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

//api route 
const UserRoute = require('./routes/user')


//

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


app.use('/api/auth',UserRoute)
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`App listening on port ${PORT}`))