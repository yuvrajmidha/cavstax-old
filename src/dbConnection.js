const mongoose = require("mongoose");
const msg = require("../config/messages.json");

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);

mongoose.connect("mongodb://localhost:27017/cavstax", (error) => {
    if (error) console.log(msg.db.error, error);
    else console.log(msg.db.success);
});