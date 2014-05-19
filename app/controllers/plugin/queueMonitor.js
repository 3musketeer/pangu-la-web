var mongoose = require('mongoose');
var QueueMonitor = require('../../models/queuemonitor').QueueMonitor;

exports.plugin =  function(server) {
    server.get('/queueMonitor.html', function(req, res) {
        res.renderPjax('plugin/queueMonitor/queueMonitor', {

        })
    });

    server.get('/getRealQueueData', function(req, res) {
        var curTime = new Date().getTime();
        var startTime = curTime - 60000;

        var result = [];
        console.log('start=>' + startTime + '; end=>' + curTime);

        QueueMonitor.find({time: {$gt: startTime, $lt: curTime}}, function(err, rows) {

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