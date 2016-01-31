/// <reference path="typings/node/node.d.ts"/>
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

// https://www.npmjs.com/package/multer
var multer = require('multer');
app.use(multer({ dest: './uploads/'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

app.use('/', routes);

// handle 404s
app.use(function(req, res, next) {
  res.status(404);

  // respond with a html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url, result: '' });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//#region global exception handler

/**
 * Handles all uncaught exceptions 
 */
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
//#endregion


module.exports = app;
