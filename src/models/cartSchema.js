const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const cartDetailsSchema = new Schema({
    itemCount: {
        type: Number,
    },
    itemDetail:{ 
        type: Schema.Types.ObjectId,
        ref: "serviceSchema"
    }
}, { "timestamps": true });

const cartSchema = new Schema({
    orderPlaced:{
        type:Boolean,
        default:false
    },
    cart: [cartDetailsSchema]

}, { "timestamps": true });


const CartModel = mongoose.model("cartDetails", cartSchema);

module.exports.CartModel = CartModel;