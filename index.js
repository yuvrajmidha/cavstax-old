var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented:false}));


//  STATIC BODY PATH
app.use('/assets' ,express.static(path.join(__dirname, 'static')));

app.set('view engine', 'ejs')
app.set('views', 'views')


app.get('/', (req, res) => {
    res.render('index')
})

app.listen(process.env.PORT || 3000,function(){
    console.log('server started on port 3000 ');
});

