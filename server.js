
var express = require('express');


var app = express();

var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]

var app = express()

// express settings
require('./config/express')(app, config)

// Bootstrap routes
require('./config/routes')(app)

// Start the app by listening on <port>
var port = process.env.PORT || 3000
app.listen(port)
console.log('pangu log analyse server started on port '+port)

// expose app
exports = module.exports = app

