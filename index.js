var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
const userRoutes = require("./src/routes/userRoutes")
const dbConnection = require("./src/dbConnection.js");
const config = require("config");
const mongoose = require("mongoose");
const msg = require("./config/messages.json");
const formidable = require('formidable');
const ServiceModel = require("./src/models/serviceSchema").ServiceModel;
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

app.post('/order',(req,res)=>{
    var form = formidable.IncomingForm();
    
    form.parse(req,(err,fields,files) => {
        console.log(fields);
        console.log(files)
        file.path = __dirname + '/uploads/'+ files.name;

    });
    
    form.on('fileBegin',(name,file)=>{
        console.log(file);
        file.path = __dirname + '/uploads/'+ file.name;
    })
});

app.get("/service/detail",(req, res, next) => {
    console.log('In services/detail');
    try {
        var service;
          if(req.body.serviceCode)
          {
            let code = req.param('serviceCode');
            service  = await ServiceModel.find().select({ "serviceCode" : code });

          }
          if(req.body.serviceDescription)
          {
            let description = req.param('serviceDescription');
            service  = await ServiceModel.findOne({ "serviceDescription" : description });
          }

         /*  ServiceModel.delete({}); */
        res.status(200).send({ success: true, message: service })

    }
    catch (e) {
        console.log("Point 1 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
});

app.post("/services",(req, res, next) => {
    console.log('In services');
    try {
        
          await ServiceModel.create(req.body);
         
        res.status(200).send({ success: true, message: 'added in database' })

    }
    catch (e) {
        console.log("Point 1 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}); 

app.get('/contact-us', (req, res) => {
    res.render('contact-us')
})
app.get('/about-us', (req, res) => {
    res.render('about-us')
})
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/gst', (req, res) => {
    res.render('gst-registration')
})

app.listen(process.env.PORT || 4000,function(){
    console.log('server started on port 4000 ');
});

