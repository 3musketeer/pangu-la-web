var mongoose = require('mongoose')
    , logger = require('../log').logger
    , qConfig = require('../plugin_config/queue/config_queue').queue
    , extend = require('extend')
    , query = require('../query')
    , QueueMonitor = require('../../models/queuemonitor');

exports.plugin =  function(server) {
    server.get('/queueMonitor.html', function(req, res) {
        res.renderPjax('plugin/queueMonitor/queueMonitor', {

        })
    });

    server.get('/getQueueDataReal', function(req, res) {
        var curTime = new Date().getTime();
        var startTime = curTime - 300000;

        var result = [];

        var chartConfig = qConfig.realQueue[0];
        var tabName = chartConfig.mode + chartConfig.type + chartConfig.subtype;
        console.log('tabName=>' + tabName);

        var queueFields = qConfig.queueFields;
        var queueLabels = qConfig.queueLabels;

        var table = mongoose.model('QueueMonitorHis', tabName);

        table.find({time: {$gte: startTime, $lte: curTime}}
            , function(err, rows) {
//                console.log('rows=>' + rows);

                /*for (var i = 0; i < rows.length; i++) {
                 var rd = new Object();
                 var row = rows[i];
                 var qs = row['data'];
                 var time = new Date(row['time']);

                 rd['Time'] = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();

                 for (var j = 0; j < qs.length; j++) {
                 var queue = qs[j];
                 var name = queue['name'];
                 var count = queue['count'];
                 rd[name] = count;
                 }
                 result.push(rd);
                 }*/
                res.send({success: 1, data: rows, queueFields: queueFields, queueLabels: queueLabels});
            });

    });

    server.get('/getRealQueueData', function(req, res) {
        var curTime = new Date().getTime();
        var startTime = curTime - 60000;

        var result = [];
        console.log('start=>' + startTime + '; end=>' + curTime);

        var chartConfig = qConfig.realQueue[0];
        console.log('chartConfig=>' + chartConfig);
        var tabName = chartConfig.mode + chartConfig.type + chartConfig.subtype;
        console.log('tabName=>' + tabName);

        var table = mongoose.model('QueueMonitor', tabName);

        table.find({time: {$gt: startTime, $lt: curTime}}, function(err, rows) {

            for (var i = 0; i < rows.length; i++) {
                var rd = new Object();
                var row = rows[i];
                var qs = row['data'];
                var time = new Date(row['time']);

                rd['Time'] = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();

                for (var j = 0; j < qs.length; j++) {
                    var queue = qs[j];
                    var name = queue['name'];
                    var count = queue['count'];
                    rd[name] = count;
                }
                result.push(rd);
            }
            res.send({success: 1, data: result});
        });

    });
}