var mongoose = require('mongoose')
    , logger = require('../../log').logger
    , extend = require('extend')
    , query = require('../../query')
    , aConfig = require('../../plugin_config/alarm3GESS/config_alarm_3gess_cb_1_0').config
    , aList = require('../../plugin_config/alarm3GESS/config_alarm_3gess_cb_1_0').list
    , mutil = require('../../util');


exports.plugin = function(server) {

    server.get('/Alarm3G_ESS.html', function(req, res){
        var date = req.query['value'] || "2015-05-19",
            charList = req.query['chartList'],
            char_list = aList[charList][0],
            rConfig = aConfig[char_list.mode+char_list.type+char_list.subtype];
        var hosts = rConfig.hosts;
        res.renderPjax('plugin/trade4G/trade4G', {
            hosts: hosts,
            value: date,
            type: type,
            charList: charList
        });
    });

    server.get('/getAlarm3GESSService', function(req, res){
        var date = req.query['value'],
            host = req.query['host'],
            charList = req.query['chartList'],
            char_list = aList[charList][0],
            rConfig = aConfig[char_list.mode+char_list.type+char_list.subtype];
        // 查询基础表用 getTabName，统计表用getTableName
        var tabname = query.getTableName(char_list.mode, char_list.type, char_list.subtype, date),
            command = {
                "distinct" : tabname,
                "key": "servicename",
                "query": {
                    host: host
                }
            };
        mongoose.connection.db.executeDbCommand(command, function(err, docs){
            if(err) {
                logger.error(err)
            }
            res.send(docs.documents[0].value);
        })
    });

    server.get('/getAlarm3GESSOperate', function(req, res){
        var date = req.query['value'],
            host = req.query['host'],
            charList = req.query['chartList'],
            _service = req.query['_service'],
            char_list = aList[charList][0],
            rConfig = aConfig[char_list.mode+char_list.type+char_list.subtype];
        // 查询基础表用 getTabName，统计表用getTableName
        var tabname = query.getTabName(char_list, date, -1),
            command = {
                "distinct" : tabname,
                "key": "operatename",
                "query": {
                    host: host,
                    service: _service
                }
            };
        mongoose.connection.db.executeDbCommand(command, function(err, docs){
            if(err) {
                logger.error(err)
            }
            res.send(docs.documents[0].value);
        })
    });

    server.get('/getAlarm3GESSData', function(req, res){
        var host = req.query['host'],
            date = req.query['value'],
            _operate = req.query['_operate'],
            _service = req.query['_service'],
            charList = req.query['chartList'],
            char_list = aList[charList][0],
            gConfig = aConfig[char_list.mode+char_list.type+char_list.subtype],
            charBList = req.query['charBList'],
            char_blist = aList[charBList][0],
            bConfig = aConfig[char_blist.mode+char_blist.type+char_blist.subtype];
        var cadesc = tConfig.codeAddDesc[0];

        var obj = {},
            filter = {},
            filterOperate = gConfig.filterOperate,
            filterService = gConfig.filterService;

        if( 'all' == _operate) {
            filter = {
                'servicename': _service
            }
        }else{
            filter = {
                'operatename': _operate
            };
        }
        if( 'all' != host ){
            filter.host = host;
        }

        var tableBaseName = query.getTabName(char_blist, date, -1),
            tableGroupName = query.getTableName(char_list.mode, char_list.type, char_list.subtype, date);
        var table = db.collection(tableBaseName),
            tableGroup = db.collection(tableGroupName);

        async.parallel({
            base: function(callback){
                tableGroup.find(filter, { _id: 0, host: 0, operatename: 0, type: 0, servicename: 0 }, function(err, rest){
                    rest.toArray(function(err, rows){
                        var tmpDocs = {}, total = 0;
                        for(var i=0; i<rows.length; i++){
                            for(var idx in rows[i]){
                                total += rows[i][idx];
                                if(tmpDocs[idx] === undefined){
                                    tmpDocs[idx] = rows[i][idx];
                                }else{
                                    tmpDocs[idx] += rows[i][idx];
                                }
                            }
                        }
                        var docs = [];
                        for(var idx in tmpDocs){
                            docs.push({rspcode: idx, count: tmpDocs[idx]});
                        }
                        docs = mutil.sortObj(docs, 'count');
                        var tabColName = gConfig.tabColNames_CODE;
                        callback(null, {results:docs, total: total, tabColName: tabColName});
                    });
                });
            },
            total: function(callback){
                table.count(filter, function(err, cntTotal){
                    callback(null, cntTotal);
                });
            },
            success: function(callback){
                tableGroup.count(filter, {'0000': 1, _id: 0}, function(err, cntSuccess){
                    callback(null, cntSuccess);
                });
            }
        },function(err, results){
            var rest = results.base,
                total = results.total,
                success = results.success,
                failure = total - success;
            rest.count = total;
            rest.success = success;
            rest.failure = failure;
            res.send(rest);
        });
    });

}