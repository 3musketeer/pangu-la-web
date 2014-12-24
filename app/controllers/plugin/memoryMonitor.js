var mongoose = require('mongoose')
    , logger = require('../log').logger
    , mConfig = require('../plugin_config/memory/config_memory').memory
    , extend = require('extend')
    , query = require('../query');

exports.plugin =  function(server) {
    server.get('/memoryMonitor.html', function(req, res) {

        //console.log('req.query.chartList=>', req.query.chartList);

        res.renderPjax('plugin/memoryMonitor/memoryMonitor', {
            chartList: req.query.chartList,
            tabColNames: mConfig.tabColNames
        })
    });

    server.get('/queryMemory', function(req, res) {
//        var table = mongoose.model('memorymonitor', 'MemoryMonitor');
        var chartList = req.query.chartList;
        var value = req.query.value;
        var host = req.query.host || '134.32.10.61';
        //console.log('mConfig[chartList]=>', mConfig[chartList]);
        var chartConfig = mConfig[chartList][1];
        var tabName = chartConfig.mode + chartConfig.type + chartConfig.subtype + value.replace(/-/g, "");
        logger.debug("tabName==>%s", tabName);
        var table = mongoose.model('memorymonitor', tabName);

        var curTime = new Date().getTime() - 81844559;
        var startTime = curTime - 300000;

        //console.log('chartList=>', req.query.chartList);

//        console.log('startTime=>' + startTime + ', curTime=>' + curTime);

        table.find({host: host, timestamp: {$gte: startTime, $lte: curTime}}, function(err, rows) {
//            console.log(rows.length);

            res.send({success: 1, data: rows, cols: mConfig.tabCols});
        });
    });

    //获取分页数据
    server.get('/memoryMonitorDayPage', function(req, res){
        var iDisplayStart = req.query.iDisplayStart | 0,
            iDisplayLength = req.query.iDisplayLength | 10,
            sEcho = req.query.sEcho,
            sSearch = req.query.sSearch;

        var curTime = new Date().getTime() - 81844559;
        var startTime = curTime - 300000;

        var conf = {};
        conf.limit = iDisplayLength;
        conf.skip = iDisplayStart;

        var date = req.query.value;
        var host = req.query.host,
            chartList = req.query.chartList;

        var chartConfig = mConfig[chartList][1];
        var tableName = chartConfig.mode + chartConfig.type + chartConfig.subtype + date.replace(/-/g, "");
        var table = mongoose.model('memorymonitor', tableName);
        logger.debug('table==> ' + tableName);

        var sum = 0;
        var opt = {
            host: host,
            timestamp: {
                    $gte: startTime,
                    $lte: curTime
            }
        };

        table.count(opt, function(err, count) {
            if(err){
                res.send({ failure: 1, position: 'table.count' });
                return;
            }
            sum = count;
            var _q = opt;
            if (!!sSearch && sSearch != '') {
                var reg = new RegExp('.*' + sSearch + '.*', 'i');
                _q['$or'] = [{
                    pid: reg
                }, {
                    name: reg
                }];
            }
            table.find(_q, {
                _id: 0
            }, conf, function(err, rows) {
                if(err){
                    res.send({ failure: 1, position: 'table.find' });
                    return;
                }
                res.send({
                    sEcho: sEcho,
                    iTotalRecords: iDisplayLength,
                    iTotalDisplayRecords: sum,
                    aaData: rows
                })
            });
        });
    });
}