
var express = require('express')
  , fs = require('fs')
  , cluster = require('cluster')
  , numCPUs = require('os').cpus().length
  , logger = require('./app/controllers/log').logger;


var app = express();

var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , mongoose = require('mongoose')

// Bootstrap db connection
mongoose.connect(config.db)

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js') &&!~file.indexOf('.swp')) require(models_path + '/' + file ) 
})


var app = express()

// express settings
require('./config/express')(app, config)

// Bootstrap routes
require('./config/routes')(app)



// Start the app by listening on <port>
if (cluster.isMaster) {
    logger.debug("master start...");
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    } 
    cluster.on('listening',function(worker,address){
        logger.debug('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
    });
    cluster.on('exit', function(worker, code, signal) {
        logger.debug('worker ' + worker.process.pid + ' died');
        cluster.fork();
    });
    
}else if (cluster.isWorker) {
    logger.debug('[worker] ' + "start worker ..." + cluster.worker.id);
    var port = process.env.PORT || 3000
    app.listen(port);
    
    process.on('uncaughtException', function (err) {
        logger.error("uncaughtException:"+err);
        try {
            var killTimer = setTimeout(function () {
                process.exit(1);
            }, 30000);
            killTimer.unref();
            if (cluster.worker) {
                cluster.worker.disconnect();
            }
        } catch (e) {
            logger.error('error when exit:' +e.stack);
        }
    });
    logger.debug('pangu log analyse server started on port '+port)
}

// expose app
exports = module.exports = app

