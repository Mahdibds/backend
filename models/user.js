const mongoose= require('mongoose');
const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
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
 
    //phone:{
        type:String,
        required:true,
    //},
    isAdmin:{
        type:Boolean,
        default:false,
    },
  
    avatar:{
        type:String,
        default:''
    },
 
    dateofbirth:{
        type:Date,
        default:Date.now,
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