const mongoose= require('mongoose');
const userSchema = new mongoose.Schema({

    Firstname:{
        type:String,
        required:true,
    },
    Lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
 

    isAdmin:{
        type:Boolean,
        default:false,
    },
  
    avatar:{
        type:String,
        default:''
    },
 
  
})



userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;