var mongoose = require('mongoose')
    , logger = require('../../log').logger
    , qConfig = require('../../plugin_config/queue/config_queue_cb_1_0').config
    , qList = require('../../plugin_config/queue/config_queue_cb_1_0').list
    , hosts = require('../../plugin_config/queue/config_queue_cb_1_0').hosts
    , extend = require('extend')
    , query = require('../../query')
    , QueueAnalyze = require('../../../models/queueanalyze')
    , QueueDetail = require('../../../models/queuedetail');

exports.plugin = function(server) {

    //初始化页面操作
    server.get('/queueAnalyze.html', function(req, res) {

        var date = req.query.value,
            chartList = req.query['chartList'],
            chartBList = req.query['chartBList'],
            chart_list = qList[chartList][0],
            mConfig = qConfig[chart_list.mode+chart_list.type+chart_list.subtype];

        /*var tab = qConfig.anaListTab[0];
        var table = query.getTab('QueueAnalyze', tab, date, 2);
        table.find({host: hosts[0]}, function(err, rows) {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];

                if (row.suggestion || row.suggestion == 0) break;

                var g1 = row.lt_5,
                    g2 = row['m5-10'],
                    g3 = row['m10-20'],
                    g4 = row.ge20,
                    max = row.max_queued,
                    overflow = row.overflow,
                    serve = row.serve,
                    sum = row.sum;

                var sug = 0,
                    rat1 = (g1/sum).toFixed(2),
                    rat2 = (g2/sum).toFixed(2),
                    rat3 = (g3/sum).toFixed(2),
                    rat4 = (g4/sum).toFixed(2),
                    rat5 = overflow/sum;

                if (rat1 == 1 && overflow == 0) {
                    sug = sum <= 10 ? 1 : max;
                } else {
                    var gap = 0.05;
                    var rat = 0;
                    if (max < 10 || rat1 > 0.9) {
                        rat = ((1 - rat1)/gap) * 0.1;
                        sug = Math.ceil((rat1 >= 0.8 ? 5 : max) * (1+rat));
                    } else {
                        rat = ((1 - rat1 - rat2)/gap) * 0.05;
                        sug = Math.ceil(((parseFloat(rat1) + parseFloat(rat2)) >= 0.8 ? 10 : max) * (1+rat));
                    }
                }

                sug = sum <= 10 ? 1 : sug;
                sug = (sum > 10 && sum <= 20 && max < 5) ? max : sug;
                sug = sug > 20 ? 20 : sug;
                sug = sug == serve ? 0 : sug;

                row.suggestion = sug;
                row.save();
            }
        });*/

        res.renderPjax('plugin/queue/queueAnalyze', {
            tabColNames: mConfig['titles'],
            hosts: hosts,
            value: date,
            chartList: chartList,
            chartBList: chartBList,
            title: mConfig['name']
        });
    });

    server.get('/queueAnalyzeDay', function(req, res) {

        var date = req.query.value;
        var tab = qConfig.anaListTab[0];
        var table = query.getTab('QueueAnalyze', tab, date, 2);
        table.find({}, function(err, rows) {
            console.log(rows);
            res.send({success: 1, data: rows});
        });
    });

    //获取分页数据
    server.get('/queueAnalyzeDayPage', function(req, res) {
        var iDisplayStart = req.query.iDisplayStart | 0
            , iDisplayLength = req.query.iDisplayLength | 10
            , sEcho = req.query.sEcho
            , sSearch = req.query.sSearch
            , chartList = req.query['chartList']
            , chartBList = req.query['chartBList']
            , chart_list = qList[chartList][0]
            , mConfig = qConfig[chart_list.mode+chart_list.type+chart_list.subtype]
            , date = req.query['value']
            , host = req.query['host'];

        var conf = {};
        conf.limit = iDisplayLength;
        conf.skip = iDisplayStart;
        //logger.debug('===',mConfig,'===')
        conf.sort = mConfig['sort'][0];

        //var tab = qConfig.anaListTab[0];
        logger.debug('===',query.getTabName(chart_list, date, 2, 4),'===')
        var table = null;
        if("queueAnalyzeListDAY" == chartList) {
            table = query.getTab('QueueAnalyze', chart_list, date, 2);
        }else{
            table = query.getTab('QueueAnalyze', chart_list, date, 2, 4);
        }
        logger.debug(table)
        var sum = 0;

        logger.debug(date,host)

        table.count({host: host}, function(err, count) {
            sum = count;
            var _q = {host: host, name:{$ne: 'GWTDOMAIN'}};
            if (!!sSearch && sSearch != '') {
                var reg = new RegExp('.*' + sSearch + '.*', 'i');
                _q['$or'] = [{
                    server: reg
                }, {
                    queue: reg
                }];
            }
            table.find(_q, {
                _id: 0
            }, conf, function(err, rows) {
                res.send({
                    sEcho: sEcho,
                    iTotalRecords: iDisplayLength,
                    iTotalDisplayRecords: sum,
                    aaData: rows
                })
            });
        });

    });

    //获取图表数据
    server.get('/getAnalyzeDayDetail', function(req, res) {
        var server = req.query.server
            , queue = req.query.queue
            , chartList = req.query['chartList']
            , chartBList = req.query['chartBList']
            , chart_blist = qList[chartBList][0]
            , dConfig = qConfig[chart_blist.mode+chart_blist.type+chart_blist.subtype]
            , date = req.query['value']
            , host = req.query['host'];

        //var tab = qConfig.anaBaseTab[0];

        var table = query.getTab('QueueDetail', chart_blist, date, 0);

        table.find({
            host: host,
            name: server,
            queue: queue
        }, {
            _id: 0,
            ave: 0
        }, {

        }, function(err, rows) {
            res.send(rows);
        });
    });

}