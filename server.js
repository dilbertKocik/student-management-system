// setup
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var app            = express();
var port           = process.env.PORT || 3000;

// config
app.use(express.static(__dirname + '/public')); // set the location for static files
app.use(morgan('dev')); // log requests to the console
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

// routes
require('./app/routes.js')(app);

app.listen(3000, function() {    
    console.log('Listening on port 3000');
});
