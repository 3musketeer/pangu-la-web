var mongoose = require('mongoose')
    , logger = require('../log').logger
    , qConfig = require('../plugin_config/queue/config_queue').queue
    , extend = require('extend')
    , query = require('../query')
    , QueueMonitorHis = require('../../models/queuemonitorhis');

exports.plugin =  function(server) {
    server.get('/queueMonitorHis.html', function(req, res) {
        var hosts = qConfig.hosts;
        var date = req.query['value'];
        res.renderPjax('plugin/queueMonitorHis/queueMonitorHis', {
            hosts: hosts,
            value: date
        })
    });

    //test
    server.get('/getTimeoutTest', function(req, res) {
        var table = mongoose.model('TuxStateTimeOutTopDAY', 'TuxStateTimeOutTopDAY140519');
        var testFields = ['max', 'average', 'min'];
        var testLabel = ['最大值', '平均值', '最小值'];

        table.find({}, function(err, rows) {
            var data = [];

            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var time = row.timestamp;
                var max = parseInt(row.MAX);
                var average = parseInt(row.AVERAGE);
                var min = parseInt(row.MIN);
                data.push({time: time, data: [['max', max], ['average', average], ['min', min]]});
            }
            res.send({success: 1, data: data, queueFields: testFields, queueLabels: testLabel});
        }).sort({timestamp: 1});

    });

    // 直接查询统计结果
    server.get('/getQueueDataHis', function(req, res) {
        var date = req.query['value'];

        var chartConfig = qConfig.hisQueue[0];
        var tabName = chartConfig.mode + chartConfig.type + chartConfig.subtype;
        console.log('tabName=>' + tabName);

        var queueFields = qConfig.queueFields;
        var queueLabels = qConfig.queueLabels;

        var table = mongoose.model('QueueMonitorHis', tabName);

        table.find({time: {$gte: new Date(date + ' 00:00:00').getTime(), $lte: new Date(date + ' 23:59:59').getTime()}}
            , function(err, rows) {
            console.log('rows=>' + rows.length);

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

    // MapReduce 统计
    server.get('/getQueueGroupDataHis', function(req, res) {
        console.log('time=>' + req.query['value']);
        var date = req.query['value'];

        var result = [];
        var detail = [];
        var o = {};
        o.map = function() {
            var date = new Date(this.time);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

//            emit(hours, this.data);
            emit(new Date(year + '-' + month + '-' + day + ' ' + hours + ':' + minutes).getTime(), this.data);
        };
        o.reduce = function(k, vs) {
            var x = 0;
            var val = {
                Queue1: 0,
                Queue2: 0,
                Queue3: 0,
                Queue4: 0,
                Queue5: 0,
                Queue6: 0,
                Queue7: 0
            };

            vs.forEach(function(v) {
                for (var i = 0; i < v.length; i++) {
                    val[v[i].name] += v[i].count;
                }
            });
            return val;
        };
        if (!!date) {
            o.query = {
                time: {$gte: new Date(date + ' 00:00:00').getTime(), $lte: new Date(date + ' 23:59:59').getTime()}
            };
        }
        o.finalize = function(k, v) {
            var m = [];
            for (var r in v) {
                m.push([r, v[r]]);
            }
            return {label: k, data: m};
        };

        var chartConfig = qConfig.hisQueue[0];
        var tabName = chartConfig.mode + chartConfig.type + chartConfig.subtype;
        console.log('tabName=>' + tabName);

        var table = mongoose.model('QueueMonitorHis', tabName);

        table.mapReduce(o, function(err, rows) {
//            console.log(rows.length);
            console.log('rows=>' + rows);
            console.log(rows[0]);
            console.log(rows[0].value.data[0]);
            res.send({success: 1, data: rows});
        });
    });

    // MapReduce 创建HostQueueHis
    server.get('/getHostQueueHisMR', function(req, res) {
        //console.log('time=>' + req.query['value']);
        logger.debug('time==>%s',req.query['value']);
        var date = req.query['value'],
            host = req.query['host'];

        var o = {};
        max = 0;
        max_queuef = [];
        queueLabels = [];
        serveFields = [];
        o.map = function(){
            if("GWTDOMAIN" != this.name) {
                emit(this.timestamp, {time: this.timestamp, data: [{0: this.name + '`' + this.queue, 1: this.queued}]});
            }
        };
        o.query = {
            host: host
        }

        o.reduce = function(key, values){
            var tmpres = [];
            for(var i=0; i<values.length; i++){
                tmpres.push( values[i].data[0] );
            }
            return {time: key, data: tmpres};
        };

        var chartConfig = qConfig.hisQueue[1];
        var tabName = chartConfig.mode + chartConfig.type + chartConfig.subtype + date.replace(/-/g, '');
        console.log('tabName=>' + tabName);

        table = mongoose.model('QueueDetail', tabName);

        table.mapReduce(o, function(err, rows){
            var results = [];
            if(err){
                logger.debug('==>' + err);
            }
            if( rows === undefined ){
                res.send({ failure: 0, data: [], queueFields: [], queueLabels: [] });
                return;
            }
            rows.forEach(function(row){
                results.push(row.value);
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
            res.send({ success: 1, data: results, queueFields: max_queuef, queueLabels: max_queuef });
        });
    });

    server.get('/getHostQueueHisServe', function(req, res) {
        var name_queue = req.query['name'];
        var date = req.query['value'];
        var host = req.query['host'];
        var tmpnq = name_queue.split('`');
        var name = tmpnq[0],
            queue = tmpnq[1];
        logger.debug("{host:'"+host+"',name:'"+name+"',queue:'"+queue+"'}")
        var chartConfig = qConfig.hisQueue[1];
        var tabName = chartConfig.mode + chartConfig.type + chartConfig.subtype + date.replace(/-/g, '');
        var table = mongoose.model('QueueDetail', tabName);
        table.find({name: name, host: host, queue: queue}, function(err, rows) {
            if(err){
                res.send({ failure: 1, serve: null});
                return;
            }
            if(rows.length == 0){
                res.send({ success: 1, serve: null });
                return;
            }else if(rows[0].name != 'GWTDOMAIN'){
                res.send({ success: 1, serve: rows[0].serve });
                return;
            }else{
                res.send({ success: 1, serve: rows[1].serve });
                return;
            }

        });

    });
}