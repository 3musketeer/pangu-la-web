var mongoose = require('mongoose')
    , logger = require('../log').logger
    , qConfig = require('../plugin_config/queue/config_queue').queue
    , extend = require('extend')
    , query = require('../query')
    , QueueMonitor = require('../../models/queuemonitor');

exports.plugin =  function(server) {
    server.get('/queueMonitor.html', function(req, res) {
        var hosts = qConfig.hosts;
        res.renderPjax('plugin/queueMonitor/queueMonitor', {
            hosts: hosts
        })
    });

    server.get('/getQueueDataReal', function(req, res) {
        var curTime = new Date().getTime();
        var startTime = curTime - 900000;

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

    server.get('/getHostQueueRealMR', function(req, res){
        logger.debug('time==>%s',req.query['value']);
        var date = req.query['value'],
            curTime = new Date().getTime(),
            startTime = curTime - 900000,
            host = req.query['host'];

        var o = {};
        max_queuef = [];
        o.map = function(){
            if("GWTDOMAIN" != this.name) {
                emit(this.timestamp, {time: this.timestamp, data: [{0: this.name + '`' + this.queue, 1: this.queued}]});
            }
        };

        o.query = {
            timestamp: { $gte: startTime, $lte: curTime },
            host: host
        };

        o.reduce = function(key, values){
            var tmpres = [];
            for(var i=0; i<values.length; i++){
                tmpres.push( values[i].data[0] );
            }
            return {time: key, data: tmpres};
        };

        var chartConfig = qConfig.realQueue[1];
        var tabName = chartConfig.mode + chartConfig.type + chartConfig.subtype + date.replace(/-/g, '');
        console.log('tabName=>' + tabName);

        table = mongoose.model('QueueDetail', tabName);

        table.mapReduce(o, function(err, rows){
            var results = [];
            if(err){
                logger.debug('mapreduce err' + err);
                res.send({ success: 0, data: [], queueFields: [], queueLabels: [] });
                return;
            }
            rows.forEach(function(row){
                var obj = row.value;
                results.push(obj);
            });
            for(var i=0; i<results.length; i++){
                for(var j=0; j<results[i].data.length; j++){
                    if( -1 == max_queuef.indexOf(results[i].data[j]['0'])){
                        max_queuef.push(results[i].data[j]['0']);
                    }
                }
            }
            for(var i=0; i<results.length; i++){
                var tmpd = [];
                for(var j=0; j<results[i].data.length; j++){
                    tmpd.push(results[i].data[j]['0']);
                    if( -1 == max_queuef.indexOf(results[i].data[j]['0'])){
                        max_queuef.push(results[i].data[j]['0']);
                    }
                }
                for(var k=0; k<max_queuef.length; k++){
                    if( -1 == tmpd.indexOf( max_queuef[k] ) ){
                        results[i].data.push({ 0: max_queuef[k], 1: null });
                    }
                }
            }
            res.send({ success: 1, data: results, queueFields: max_queuef, queueLabels: max_queuef});
        });
    });
}