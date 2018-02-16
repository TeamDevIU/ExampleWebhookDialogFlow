var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', index);
// app.use('/users', users);


app.post('/', function (req, res) {
    console.log("REQUEST FROM DIALOGFLOW : ");
    console.log(req.body);

    let intent_name = req.body.result.metadata.intentName;

    let text;
    switch (intent_name) {
        case "CreateRoom": {
            text = "webhook case: createroom";
            break;
        }
        case "DeleteRoom": {
            text = "webhook case: deleteroom";
            break;
        }
        case "SendMessage": {
            let input_message = req.body.result.parameters.any
            if(input_message.replace(/\s+/g, '') === ""){
                text = "Не указано id";
                break
            }
            text = "webhook case: sendmessage"+ " Message: " + input_message;
            break;
        }
        case "ConnectedToRoom": {
            let input_message = req.body.result.parameters.any;
            if(input_message.replace(/\s+/g, '') === ""){
                text = "Не указано id";
                break
            }
            text = "webhook case: connectedtoroom" + " Message: " + input_message;
            break;
        }
        case "Unsubscription": {
            let input_message = req.body.result.parameters.any;
            if(input_message.replace(/\s+/g, '') === ""){
                text = "Не указано id";
                break
            }
            text = "webhook case: unsubscription" + " Message: " + input_message;
            break;
        }
        case "SetPrivilege": {
            let input_message = req.body.result.parameters.any;
            if(input_message.replace(/\s+/g, '') === ""){
                text = "Не указано id";
                break
            }
            text = "webhook case: setprivilege" + " Message: " + input_message;
            break;
        }
    }

    let response = {
      speech: text,
      displayText: text,
      source: text
    };

    res.send(response);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
