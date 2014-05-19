var mongoose = require('mongoose');

exports.plugin =  function(server) {
    server.get('/memoryMonitor.html', function(req, res) {
        res.renderPjax('plugin/memoryMonitor/memoryMonitor', {

        })
    });

    server.get('/queryMemory', function(req, res) {
        var table = mongoose.model('memorymonitor', 'MemoryMonitor');

        var curTime = new Date().getTime();
        var startTime = curTime - 90000;

//        console.log('startTime=>' + startTime + ', curTime=>' + curTime);

        table.find({time: {$gte: startTime, $lte: curTime}}, function(err, rows) {
//            console.log(rows.length);

            res.send({success: 1, data: rows});
        });
    });
}