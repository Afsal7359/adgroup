const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    heading:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        required:true,
        trim:true
    }
})
const Service = mongoose.model("service",ServiceSchema);
module.exports = Service;