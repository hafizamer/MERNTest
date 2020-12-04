const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
       type: String,
       required: true, 
    },
    age:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: false,
    },
})

const UserModel =mongoose.model('users',UserSchema)

module.exports= UserModel