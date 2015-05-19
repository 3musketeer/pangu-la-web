var mongoose = require('mongoose')
    , logger = require('../../log').logger
    , lpPoint = require('../../plugin_config/lcuPoint/config_lcupoint_cb_1_0').lcupoint
    , lpConfig = require('../../plugin_config/lcuPoint/config_lcupoint_cb_1_0').config
    , lpList = require('../../plugin_config/lcuPoint/config_lcupoint_cb_1_0').list
    , extend = require('extend')
    , query = require('../../query');


exports.plugin = function(server) {
    server.get('/lcuPointData', function (req, res) {
        var date = req.query.value,
            host = req.query.host,
            transcode = req.query.TRANSCODE,
            tab = lpPoint.baseLcuPoint[0],
            table = query.getTab("LcuPoint", tab, date, 0);
        table.find({host: host, TRANSCODE: transcode}, {PID: 1, TIME: 1, content: 1, timestamp: 1, _id:0}, function(err, docs){
            res.send({tabColNames: lpPoint.tabColNames, textFields: lpPoint.textFields, data: docs});
        });
    });

    server.get('/lcuPointServe', function (req, res) {
        var date = req.query.value,
            host = req.query.host,
            transcode = req.query.TRANSCODE,
            tab = lpPoint.baseLcuPoint[0];
        //date = "2014-12-25";
        //transcode = "QAM_OWEFEE_QUERY";
        //host = "10.161.2.141_builder";
        var tabname = query.getTabName(tab, date, 0),
            command = {
                "distinct" : tabname,
                "key": "PID",
                "query": {
                    host: host,
                    TRANSCODE : transcode
                }
            };
        mongoose.connection.db.executeDbCommand(command, function(err, docs){
            res.send(docs.documents[0].values);
        })
    });

    server.get('/lcuPointDataByPID', function (req, res) {
        var date = req.query.value,
            host = req.query.host,
            transcode = req.query.TRANSCODE,
            pid = req.query.PID;
        date = "2014-12-25";
        transcode = "QAM_OWEFEE_QUERY";
        host = "10.161.2.141_builder";
        pid = 23790082;
        var tab = lpPoint.baseLcuPoint[0],
            table = query.getTab("LcuPoint", tab, date, 0);
        var title = {
            TRANSCODE: transcode,
            host: host
        }
        table.find({host: host, TRANSCODE: transcode, PID: pid}, {TIME: 1, content: 1, timestamp: 1, _id: 0}, function(err, docs){
            res.send({title: title, tabColNames: lpPoint.tabColNames, textFields: lpPoint.textFields, data: docs});
        });
    });

    //获取分页数据
    server.get('/lcuPointDataByPIDPage', function(req, res) {
        var iDisplayStart = req.query.iDisplayStart | 0
            , iDisplayLength = req.query.iDisplayLength | 10
            , sEcho = req.query.sEcho
            , sSearch = req.query.sSearch
            , chartList = req.query.chartList;

        var chart_list = lpList[chartList][0],
            tmpConfig = lpConfig[chart_list.mode + chart_list.type + chart_list.subtype];

        var conf = {};
        conf.limit = iDisplayLength;
        conf.skip = iDisplayStart;
        conf.sort = tmpConfig.sort;

        var date = req.query.value;
        var host = req.query.host,
            transcode = req.query.TRANSCODE,
            pid = req.query.PID;

        //var date = "2014-12-25",
            //transcode = "QAM_OWEFEE_QUERY",
            //host = "10.161.2.141_builder";
        var table = query.getTab("LcuPoint", chart_list, date, 0);
        console.log("====",pid,"====")

        var sum = 0;

        logger.error(date,host)

        table.count({host: host, TRANSCODE: transcode, PID: pid}, function(err, count) {
            sum = count;
            var _q = {host: host, TRANSCODE: transcode, PID: pid};
            if (!!sSearch && sSearch != '') {
                var reg = new RegExp('.*' + sSearch + '.*', 'i');
                _q['$or'] = [{
                    content: reg
                },{
                    TIME: reg
                }];
            }
            table.find(_q, tmpConfig.filterColNames[0], conf, function(err, rows) {
                var tmpT = 0,
                    docs = [];
                for(var i=0; i<rows.length; i++){
                    if(0 == tmpT){
                        tmpT = rows[i].timestamp;
                        //docs.push({TIME: rows[i].TIME, content: rows[i].content, timediff: 0})
                    }else{
                        docs.push({TIME: rows[i].TIME, content: rows[i].content, timediff: rows[i].timestamp - tmpT})
                        tmpT = rows[i].timestamp;
                    }
                }
                res.send({
                    sEcho: sEcho,
                    iTotalRecords: iDisplayLength,
                    iTotalDisplayRecords: sum,
                    aaData: docs
                })
            });
        });

    });
}