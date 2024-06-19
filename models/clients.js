const mongoose = require('mongoose');

const ClientsSchema = new mongoose.Schema({
    heading:{
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
const Clients = mongoose.model("Clients",ClientsSchema);
module.exports = Clients;