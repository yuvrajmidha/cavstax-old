const _ = require("lodash");
const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const UserModel = require("../models/userSchema").UserModel;
const sessionModel = require("../models/userSchema").sessionModel;
const msg = require("../../config/messages.json");
const joiValidations = require("../validations/userJoiValidations.js");

function validationHandler(result) {
    if (result) {
        for (var i = 0; i < result.details.length; i++)
            result.details[i] = result.details[i].message;

        return result.details;
    }

    else return 0;
}

/////////////////////////////
//         REGISTER        //
// {                       //   
//      "username":        //
//      "name":            //
//      "email":           //
//      "password":        //
//      "gender":          //
//      "mobileNo":        //
// }                       //
/////////////////////////////

async function register(req, res, next) {
    console.log("In register");
    try {
        console.log("1");
        let user = _.pick(req.body, ["firstName", "middleName", "lastName", "email", "password", "mobileNo", "gender"]);
        console.log(user);
        let email = req.body.email;
        let mobileNo = req.body.mobileNo;
        const errors = validationHandler(joiValidations.validateRegSchema(user));
        
        console.log("2");
        if (errors) return res.status(400).send({ success: false, msg: errors });
        console.log("3");
        const alreadyReg = await UserModel.findOne({ "email": email });
        if (alreadyReg) return res.status(400).send({ success: false, msg: msg.user.register.alreadyReg });
        console.log("4");
        let User = new UserModel(user);
        User.token = User.genActToken();
        User.password = await bcrypt.hash(User.password, 10);    //this can also be done in userSchema.js using PRE middleware on the UserSchema schema.
        console.log("5");
        await User.save();
        console.log("6");
        //--------------------------------//
        //send email with activation token//
        //--------------------------------//

        //res.status(200).send({ success: true, msg: msg.user.register.success });
        res.status(200).send({ success: true, msg: _.pick(User, ["firstName", "middleName", "lastName", "email", "mobileNo", "gender", "isActivated", "token"]) });
    }
    catch (e) {
        console.log("Point 1 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}

async function activate(req, res, next, token) {
    console.log("In activate");
    try {
        let user = new UserModel({});
        const payload = user.checkActToken(token);

        let regUser = await UserModel.findOneAndUpdate({ "email": payload.email, isActivated: false, token: token }, { "$set": { "isActivated": true }, "$unset": { "token": 1 } });
        if (!regUser) return res.status(400).send({ success: false, msg: msg.user.activate.linkExp });

        res.status(200).send({ success: true, msg: _.pick(user, ["_id", "email"]) });
    }
    catch (e) {
        console.log("Point 2 error", e);
        if (e.name === "JsonWebTokenError" || e.name === "TokenExpiredError") {
            e = msg.user.activate.linkExp;
            return res.status(400).send({ success: false, msg: e });
        }

        res.status(500).send({ success: false, msg: ex });
    }
}

async function login(req, res, next) {
    console.log("In login");
    try {
        let user = _.pick(req.body, ["email", "password"]);
        let recEmail = req.body.email;
        let recPassword = req.body.password;

        const errors = validationHandler(joiValidations.validateLoginSchema(user));
        if (errors) return res.status(400).send({ success: false, msg: errors });
        // 
        // if (!req.header('source')) return res.status(400).send({ success: false, msg: msg.user.login.sourceHeaderNotSent });
        // if (req.header('source') != 'mobile' && req.header('source') != 'web') return res.status(400).send({ success: false, msg: msg.user.login.invalidSourceHeader });
        
        let userExist = await UserModel.findOne({ "email": recEmail, "isActivated": true });
        if (!userExist) return res.status(400).send({ success: false, msg: msg.user.login.invalidEmail });

        let isPasswordCorrect = await bcrypt.compare(recPassword, userExist.password);
        if (!isPasswordCorrect) return res.status(400).send({ success: false, msg: msg.user.login.invalidPassword });

        let session = new sessionModel({});
        session.userId = userExist._id;
        session.token = session.genSesToken();
        // session.source = req.header('source');
        await session.save();

        // res.header("x-auth-token", session.token).status(200).send({ success: true, msg: "Login Successful" });
        res.header("x-auth-token", session.token).status(200).send({ success: true, msg: session.token });
    }
    catch (e) {
        console.log("Point 3 error");
        res.status(500).send({ success: false, msg: e });
        console.log(e);
    }
}

async function resendActivation(req, res, next) {
    console.log("In resendActivation");
    try {
        let recEmail = req.body.email;

        const errors = validationHandler(joiValidations.validateEmailSchema({ "email": recEmail }));
        if (errors) return res.status(400).send({ success: false, msg: errors });

        let userExist = await UserModel.findOne({ "email": recEmail });
        if (!userExist) return res.status(400).send({ success: false, msg: msg.user.resendActivation.invalidEmail });

        if (userExist.isActivated == true) return res.status(400).send({ success: false, msg: msg.user.resendActivation.alreadyActivated });

        // let preEmailSentOn = userExist.updatedAt;
        // if (Date.now() - 1000 * 60 * 60 * 24  < preEmailSentOn) return res.status(400).send({ success: false, msg: msg.user.resendActivation.timeNotExpired });

        let newToken = userExist.genActToken();
        userExist.token = newToken;
        await userExist.save();

        //--------------------------------//
        //send email with activation token//
        //--------------------------------//

        //res.status(200).send({ success: true, msg: msg.user.resendActivation.success });
        // userExist.preEmailSentOn = preEmailSentOn;
        res.status(200).send({ success: true, msg: _.pick(userExist, ["username", "email", "isActivated", "token", "preEmailSentOn", "updatedAt"]) });
    }
    catch (e) {
        console.log("Point 4 error");
        res.status(500).send({ success: false, msg: e });
        console.log(e);
    }
}

async function forgotPassword(req, res, next) {
    console.log("In forgotPassword");
    try {
        let email = req.body.email;
        
        const errors = validationHandler(joiValidations.validateEmailSchema({ "email": email }));
        if (errors) return res.status(400).send({ success: false, msg: errors });

        let userExist = await UserModel.findOne({ email: email });
        if (!userExist) return res.status(400).send({ success: false, msg: msg.user.forgotPassword.invalidEmail }); //redirect to registration page

        let token = userExist.genForgotPasswordToken();

        //needs more features and review//
        //--------------------------------//
        //send email with activation token//
        //--------------------------------//

        userExist.forgotPassContent = {
            token: token,
            issuedAt: Date.now()
        };

        // userExist.forgotPassContent.token = token;
        // userExist.forgotPassContent.issuedAt = Date.now();
        await userExist.save();

        //header sent should be stored in local storage of user to use route /resetPassword
        res.header({ "x-id": userExist._id, "x-iss": (userExist.forgotPassContent.issuedAt - 0) }).status(200).send({ success: true, msg: userExist });
        // res.status(200).send({ success: true, msg: msg.user.forgotPassword.success });
    }
    catch (e) {
        console.log("Point 5 error");
        res.status(500).send({ success: false, msg: e });
        console.log(e);
    }
}

//this function is the next step for forgotPassword
//this is just a temperarory function and needs to be implemented
async function resetPassword(req, res, next) {
    console.log("In resetPassword");
    try {
        const token = req.query.token;
        const userId = req.query.userId;
        const issuedAt = req.query.iss / 2;

        const errors = validationHandler(joiValidations.validateResetPasswordSchema({ token: token, userId: userId, issuedAt: issuedAt }));
        if (errors) return res.status(400).send({ success: false, msg: errors });

        let userExist = await UserModel.findOne({ _id: userId, "forgotPassContent": { "$exists": true } });
        if (!userExist) return res.status(400).send({ success: false, msg: msg.user.resetPassword.resetNotRequested });

        if (issuedAt < Date.now() - 60 * 60 * 1000 || userExist.forgotPassContent.token != token || userExist.forgotPassContent.issuedAt != issuedAt) {
            return res.status(400).send({ success: false, msg: msg.user.resetPassword.invalidToken });
        }

        let newPass = userExist.genNewPassword();
        let newHashedPass = await bcrypt.hash(newPass, 10);
        //userExist.password = await bcrypt.hash(newPass, 10);
        //await userExist.save();
        await UserModel.findOneAndUpdate({ _id: userId }, { "$set": { "password": newHashedPass } });
        // userExist = await UserModel.findOneAndUpdate({ _id: userId }, { "$set": { "password": newHashedPass }, "$unset": { "forgotPassContent": 1 } });

        userExist.set("newPass", newPass);
        res.status(200).send({ success: true, msg: userExist, np: newPass });
        //res.status(200).send({ success: true, msg: msg.user.resetPassword.success });
    }
    catch (e) {
        console.log("Point 5 error");
        res.status(500).send({ success: false, msg: e });
        console.log(e);
    }
}

async function getProfile(req, res, next) {
    console.log('In User Profile');
    try {
        const user = await UserModel.findOne({ _id: req.userId })
        if (!user) return res.status(400).send({ success: false, msg: msg.user.profile.notExist });
        res.status(200).send({
            "firstName": user.firstName,
            "middleName": user.middleName,
            "lastName": user.lastName,
            "mobileNo": user.mobileNo,
            "gender": user.gender
        });
    }
    catch (e) {
        console.log("Point 1 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}







module.exports.register = register;
module.exports.activate = activate;
module.exports.login = login;
module.exports.resendActivation = resendActivation;
module.exports.forgotPassword = forgotPassword;
module.exports.resetPassword = resetPassword;
module.exports.getProfile = getProfile;