var express = require('express');
var path = require('path');
var http = require('http');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('express-error-handler')
var employees = require('./routes/employee');
var app = express();

console.log('Hello World ');

app.set('port', 4050);
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(morgan('dev')); // log every request to the console
//'body parser is deprecated'' error will be solved 
//app.use(bodyParser()); 
app.use(methodOverride());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.use('/employee', employees);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server is listening on port ' + app.get('port'));
});