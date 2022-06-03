const mongoose= require('mongoose');
const clubSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
   
    logo:{
        type:String,
        default:''
    },
    owner:{
        type:String,
        required:false
    },
   
    category:{
        type:String,
        required:true,
    },
    followers:{
        type:mongoose.Schema.Types.Array,
        ref:'User',
        required:false
    },
    events:{
        type:mongoose.Schema.Types.Array,
        ref:'Event',
        required:false
    },





})



clubSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

clubSchema.set('toJSON', {
    virtuals: true,
});



const Club = mongoose.model("Club", clubSchema);

module.exports = Club;