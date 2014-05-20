var mongoose = require('mongoose')
    , logger = require('../log').logger
    , qConfig = require('../plugin_config/queue/config_queue').queue
    , extend = require('extend')
    , query = require('../query')
    , QueueMonitorHis = require('../../models/queuemonitorhis');

exports.plugin =  function(server) {
    server.get('/queueMonitorHis.html', function(req, res) {
        res.renderPjax('plugin/queueMonitorHis/queueMonitorHis', {

        })
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
}