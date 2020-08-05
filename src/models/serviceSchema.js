const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    "serviceName": {
        type: String,
        required: true,
    },
    "serviceId": {
        type: String,
        required:true,
    },
    "servicePrice": {
        type: String
    }
}, { "timestamps": true });

const ServiceModel = mongoose.model("servicesDetails", serviceSchema);

module.exports.ServiceModel = ServiceModel;