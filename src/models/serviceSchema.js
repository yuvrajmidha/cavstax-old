const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    "_id":{
        type:Number,
        required:true,    
    },
    "serviceCode":{
        type:Number,
        default: "",  
    },
    "serviceDescription":{
        type:String,
        required:true,
    },
    "rate":{
        type:String,
        required:true,
    },
    "effictiveFrom":{
        type:String,
        required:true,
    },
    "checkAlso":{
        type:String,
        default:""
    }
}, { "timestamps": true });

const ServiceModel = mongoose.model("servicesDetails", serviceSchema);

module.exports.ServiceModel = ServiceModel;