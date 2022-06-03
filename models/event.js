const mongoose= require('mongoose');
const eventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    by : {
        type: String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    },
   
    image:{
        type:String,
        default:''
    },
    dates: {
        registrationStart: {
          type: Date,
          required: false,
        },
        start: {
          type: Date,
          required: false,
        },
        end: {
          type: Date,
          required: false,
        },

    },
   
    club:{
        type:mongoose.Schema.Types.String,
        ref:'Club',
        required:false
    },
    attendees:{
        type:mongoose.Schema.Types.Array,
        ref:'User',
        required:false
    },

    participants:{ 
        type: mongoose.Schema.Types.Array,
        ref: "User",
        required:false
    },
 
 
    
  
})





const Event = mongoose.model("Event", eventSchema);

module.exports = Event;