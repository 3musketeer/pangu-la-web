var mongoose = require('mongoose')
    , debug = require('debug')('pangu:top')
    , util = require("util")
    , query = require('../query')
    , config = require('../plugin_config/config_ecslcucall_cb_1_0').config
    , chart_list = require('../plugin_config/config_ecslcucall_cb_1_0').list
    , hostsList = require('../plugin_config/config_ecslcucall_cb_1_0').ecsHosts
    , ecsInterval = require('../plugin_config/config_ecslcucall_cb_1_0').ecsInterval
    , EventProxy = require('eventproxy').EventProxy
    , extend = require('extend')
    , async = require('async');

exports.plugin = function(server) {
    server.get('/ecsCallByTime.html', function(req, res) {
        var date = req.query.value,
            chartList = chart_list.ecsLcuCallList[0],
            tab = config[chartList.mode+chartList.type+chartList.subtype];
        res.renderPjax('plugin/ecsLcuCallByTime', {
            tabColNames: tab.colNames,
            hosts: hostsList,
            value: date,
            interval: ecsInterval[1],
            headTile: tab.name,
            _start: new Date(tab.startTime[0]).getTime(),
            _end: new Date(tab.endTime[0]).getTime()
        });
    });

    server.get('/getTranscodeByHost', function (req, res) {
        var date = req.query.value,
            host = req.query.host;

        var command = {
                "distinct" : 'TuxStateBase20150521',
                "key": "TRANSCODE",
                "query": {
                    host: host
                }
            };
        mongoose.connection.db.executeDbCommand(command, function(err, docs){
            console.log(err)
            res.send(docs.documents[0].value);
        })
    });

    server.get('/getECSCallByTimeData', function(req, res) {
        var host = req.query.host,
            date = req.query.value,
            //transcode = req.query.TRANSCODE,
            start = req.query._start,
            _cnt = req.query._cnt || 18,
            interval = req.query.interval,
            chartList = chart_list.ecsLcuCallList[0],
            tab = config[chartList.mode+chartList.type+chartList.subtype];

        var yyyy = date.split('-')[0],
            mm = ("000" + date.split('-')[1]).substr(-2),
            dd = ("000" + date.split('-')[2]).substr(-2),
            tabname = mongoose.model('QueryResult', tab.mode+tab.type+tab.subtype+yyyy+mm+dd);

        var conf = [];
        for(var i=0; i<_cnt; i++){
            conf.push({
                host: host,
                timestamp: {
                    '$gt': parseInt(start) + i*interval*60*1000,
                    '$lt': parseInt(start) + (i+1)*interval*60*1000 - 1
                }
            })
        }


        /*var render = function(docs){
            res.send({count: docs})
        }
        var proxy = new EventProxy();
        proxy.assign('count', render);
        tabname.count({
            host: host,
            TRANSCODE: transcode,
            timestamp: {
                '$gt': startstamp,
                '$lt': endstamp
            }
        }, function (err, cnt) {
            proxy.trigger('count', cnt);
        });*/
        async.parallel({
            0: function(cb){tabname.count(conf[0], cb)},
            1: function(cb){tabname.count(conf[1], cb)},
            2: function(cb){tabname.count(conf[2], cb)},
            3: function(cb){tabname.count(conf[3], cb)},
            4: function(cb){tabname.count(conf[4], cb)},
            5: function(cb){tabname.count(conf[5], cb)},
            6: function(cb){tabname.count(conf[6], cb)},
            7: function(cb){tabname.count(conf[7], cb)},
            8: function(cb){tabname.count(conf[8], cb)},
            9: function(cb){tabname.count(conf[9], cb)},
            10: function(cb){tabname.count(conf[10], cb)},
            11: function(cb){tabname.count(conf[11], cb)},
            12: function(cb){tabname.count(conf[12], cb)},
            13: function(cb){tabname.count(conf[13], cb)},
            14: function(cb){tabname.count(conf[14], cb)},
            15: function(cb){tabname.count(conf[15], cb)},
            16: function(cb){tabname.count(conf[16], cb)},
            17: function(cb){tabname.count(conf[17], cb)}
        }, function(err, results){
            var docs = [
                { 'TIME':'09:30', 'count': results['0'] },
                { 'TIME':'09:40', 'count': results['1'] },
                { 'TIME':'09:50', 'count': results['2'] },
                { 'TIME':'10:00', 'count': results['3'] },
                { 'TIME':'10:10', 'count': results['4'] },
                { 'TIME':'10:20', 'count': results['5'] },
                { 'TIME':'10:30', 'count': results['6'] },
                { 'TIME':'10:40', 'count': results['7'] },
                { 'TIME':'10:50', 'count': results['8'] },
                { 'TIME':'11:00', 'count': results['9'] },
                { 'TIME':'11:10', 'count': results['10'] },
                { 'TIME':'11:20', 'count': results['11'] },
                { 'TIME':'11:30', 'count': results['12'] },
                { 'TIME':'11:40', 'count': results['13'] },
                { 'TIME':'11:50', 'count': results['14'] },
                { 'TIME':'12:00', 'count': results['15'] },
                { 'TIME':'12:10', 'count': results['16'] },
                { 'TIME':'12:20', 'count': results['17'] },
            ];
            res.send(docs);
        })
    });
}