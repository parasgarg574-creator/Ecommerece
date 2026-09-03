const moongose = require('mongoose');
const staffSchema = moongose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"staff"
    },
    status:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
})
module.exports = moongose.model("staff",staffSchema);