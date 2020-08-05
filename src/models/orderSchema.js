const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    "firstName":{
        type: String,
        required:true,
    },
    "lastName":{
        type: String,
        required:true,
    },
    "emailId":{
        type: String,
        required:true,
    },
    "contactNo":{
        type: Number,
        required:true,
    },
    "address":{
        type: String,
        required:true,
    },
    "pincode": {
        type: Number,
        required:true,
    },
    "isDelivered":{
        type:Boolean,
        default:false
    }
}, { "timestamps": true });

const OrderModel = mongoose.model("OrderDetails", orderSchema);

module.exports.OrderModel = OrderModel;