const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./userSchema");
const Schema = mongoose.Schema;




const orderSchema = new Schema ({
    "_id":{
        type:String,      // new id to be given each time a new order is placed.
    },
    "user_id":{ 
        type:String,      
        required:true,                                     
    },
    "details": {
        "fields": Schema.Types.Mixed,
        "files": Schema.Types.Mixed
    }
    /* "detail": Schema.Types.Mixed */
},{ timestamps:true});

const OrderModel = mongoose.model("OrderDetails", orderSchema);

module.exports.OrderModel = OrderModel;