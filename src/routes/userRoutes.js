const express = require("express");
const auth = require("../middleware/auth");
const app = express();

const userController = require("../controllers/userController");

app.post("/register", (req, res, next) => {
    userController.register(req, res, next);
});

app.get("/activate/:token", (req, res, next) => {
    userController.activate(req, res, next, req.params.token);
});

app.post("/login", (req, res, next) => {
    userController.login(req, res, next);
});

app.put("/resendActivation", (req, res, next) => {
    userController.resendActivation(req, res, next);
});

app.get("/forgotPassword", (req, res, next) => {
    userController.forgotPassword(req, res, next);
});

//restricting this route to check if localStorage has "userId" and "iss"
app.put("/resetPassword", (req, res, next) => {
    userController.resetPassword(req, res, next);
});




app.get("/profile",auth,(req, res, next) => {
    userController.getProfile(req,res,next);
}); 




module.exports = app;