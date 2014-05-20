var mongoose = require('mongoose')
    , logger = require('../log').logger
    , mConfig = require('../plugin_config/memory/config_memory').memory
    , extend = require('extend')
    , query = require('../query');

exports.plugin =  function(server) {
    server.get('/memoryMonitor.html', function(req, res) {

        console.log('req.query.chartList=>', req.query.chartList);

        res.renderPjax('plugin/memoryMonitor/memoryMonitor', {
            chartList: req.query.chartList,
            tabColNames: mConfig.tabColNames
        })
    });

    server.get('/queryMemory', function(req, res) {
//        var table = mongoose.model('memorymonitor', 'MemoryMonitor');
        var chartList = req.query.chartList;
        console.log('mConfig[chartList]=>', mConfig[chartList]);
        var chartConfig = mConfig[chartList][0];
        var tabName = chartConfig.mode + chartConfig.type + chartConfig.subtype;
        var table = mongoose.model('memorymonitor', tabName);

        var curTime = new Date().getTime();
        var startTime = curTime - 300000;

        console.log('chartList=>', req.query.chartList);

//        console.log('startTime=>' + startTime + ', curTime=>' + curTime);

        table.find({time: {$gte: startTime, $lte: curTime}}, function(err, rows) {
//            console.log(rows.length);

            res.send({success: 1, data: rows, cols: mConfig.tabCols});
        });
    });
}