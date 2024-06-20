const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
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
const Works = mongoose.model("Works",WorkSchema);
module.exports = Works;