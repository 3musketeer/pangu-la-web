var mongoose = require('mongoose');
var QueueMonitorHis = require('../../models/queuemonitorhis').QueueMonitorHis;

exports.plugin =  function(server) {
    server.get('/queueMonitorHis.html', function(req, res) {
        res.renderPjax('plugin/queueMonitorHis/queueMonitorHis', {

        })
    });

    server.get('/getRealQueueDataHis', function(req, res) {
        var curTime = new Date().getTime();
        var startTime = curTime - 60000;

        var result = [];
        console.log('start=>' + startTime + '; end=>' + curTime);

        QueueMonitorHis.find({time: {$gt: startTime, $lt: curTime}}, function(err, rows) {
//            console.log('rows=>' + rows);

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

    server.get('/getQueueGroupDataHis', function(req, res) {
        console.log('time=>' + req.query['value']);
        var date = req.query['value'];

//        var data = [{
//            label: 'Queue1',
//            data: []
//        }, {
//            label: 'Queue2',
//            data: []
//        }, {
//            label: 'Queue3',
//            data: []
//        }, {
//            label: 'Queue4',
//            data: []
//        }, {
//            label: 'Queue5',
//            data: []
//        }, {
//            label: 'Queue6',
//            data: []
//        }, {
//            label: 'Queue7',
//            data: []
//        }];

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
        QueueMonitorHis.mapReduce(o, function(err, rows) {
//            console.log(rows.length);
            console.log('rows=>' + rows);
            res.send({success: 1, data: rows});
        });
    });
}