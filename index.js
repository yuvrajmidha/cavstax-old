var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
const userRoutes = require("./src/routes/userRoutes")
const dbConnection = require("./src/dbConnection.js");
const config = require("config");
const mongoose = require("mongoose");
const msg = require("./config/messages.json");

// BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented:false}));

//  STATIC BODY PATH
app.use('/assets' ,express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use("/api/user/", userRoutes);
// app.get('/', (req, res) => {
//     res.render('index')
// })
app.get('/contact-us', (req, res) => {
    res.render('contact-us')
})
app.get('/about-us', (req, res) => {
    res.render('about-us')
})
app.get('/', (req, res) => {
    res.render('gst-registration')
})

app.listen(process.env.PORT || 3000,function(){
    console.log('server started on port 3000 ');
});

