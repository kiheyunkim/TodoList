const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    todoList:{
        type:String,
        required:true,
        unique:true
    }
});

module.exports = mongoose.model('UserData',userSchema);