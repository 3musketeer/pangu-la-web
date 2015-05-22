var mongoose = require('mongoose')
    , db = mongoose.connection.db
    , logger = require('../../log').logger
    , extend = require('extend')
    , query = require('../../query')
    , aConfig = require('../../plugin_config/alarm3GESS/config_alarm_3gess_cb_1_0').config
    , aList = require('../../plugin_config/alarm3GESS/config_alarm_3gess_cb_1_0').list
    , mutil = require('../../util')
    , async = require('async');


exports.plugin = function(server) {

    server.get('/Alarm3G_ESS.html', function(req, res){
        var date = req.query['value'] || "2015-05-19",
            charList = req.query['charList'],
            char_list = aList[charList][0],
            rConfig = aConfig[char_list.mode+char_list.type+char_list.subtype],
            charBList = req.query['charBList'];
        var hosts = rConfig.hosts;
        res.renderPjax('plugin/alarm3GESS/alarm3GESS', {
            hosts: hosts,
            value: date,
            charList: charList,
            charBList: charBList
        });
    });

    server.get('/getAlarm3GESSHost', function(req, res){
        var date = req.query['value'],
            charList = req.query['charList'],
            char_list = aList[charList][0],
            rConfig = aConfig[char_list.mode+char_list.type+char_list.subtype];
        // 查询基础表用 getTabName，统计表用getTableName
        var tabname = query.getTableName(char_list.mode, char_list.type+char_list.subtype, rConfig.scopes[0], date);
        db.collection(tabname).distinct('host', function(err, docs){
            if(err){
                logger.error(err)
            }
            res.send(docs)
        })
    });

    server.get('/getAlarm3GESSService', function(req, res){
        var date = req.query['value'],
            host = req.query['host'],
            charList = req.query['charList'],
            char_list = aList[charList][0],
            rConfig = aConfig[char_list.mode+char_list.type+char_list.subtype];
        // 查询基础表用 getTabName，统计表用getTableName
        var tabname = query.getTableName(char_list.mode, char_list.type+char_list.subtype, rConfig.scopes[0], date),
            conf = {};
        if('all' != host){
            conf.host = host;
        }else{
            delete conf.host;
        }
        db.collection(tabname).distinct('servicename', conf, function(err, docs){
            if(err){
                logger.error(err)
            }
            res.send(docs)
        })
    });

    server.get('/getAlarm3GESSOperate', function(req, res){
        var date = req.query['value'],
            host = req.query['host'],
            charBList = req.query['charBList'],
            _service = req.query['_service'],
            char_list = aList[charBList][0],
            rConfig = aConfig[char_list.mode+char_list.type+char_list.subtype];
        // 查询基础表用 getTabName，统计表用getTableName
        var tabname = query.getTabName(char_list, date, -1),
            conf = {};
        if('all' != host){
            conf.host = host;
        }else{
            delete conf.host;
        }
        conf.servicename = _service;
        db.collection(tabname).distinct('operatename', conf, function(err, docs){
            if(err){
                logger.error(err)
            }
            res.send(docs)
        });
    });

    server.get('/getAlarm3GESSData', function(req, res){
        var host = req.query['host'],
            date = req.query['value'],
            _operate = req.query['_operate'],
            _service = req.query['_service'],
            charList = req.query['charList'],
            char_list = aList[charList][0],
            gConfig = aConfig[char_list.mode+char_list.type+char_list.subtype],
            charBList = req.query['charBList'],
            char_blist = aList[charBList][0],
            bConfig = aConfig[char_blist.mode+char_blist.type+char_blist.subtype];
        //var cadesc = tConfig.codeAddDesc[0];

        var filter = {};

        if('all' == _operate && 'all' != _service){
            filter.servicename = _service;
            delete  filter.operatename;
        }
        if('all' != _operate && 'all' != _service){
            filter.servicename = _service;
            filter.operatename = _operate;
        }
        if('all' == _service){
            delete  filter.servicename;
            delete  filter.operatename;
        }
        if( 'all' != host ){
            filter.host = host;
        }else{
            delete filter.host;
        }

        var tableBaseName = query.getTabName(char_blist, date, -1),
            tableGroupName = query.getTableName(char_list.mode, char_list.type+char_list.subtype, gConfig.scopes[0], date);
        var table = db.collection(tableBaseName),
            tableGroup = db.collection(tableGroupName);

        async.parallel({
            base: function(callback){
                tableGroup.find(filter, { _id: 0, host: 0, type: 0 }, function(err, rest){
                    rest.toArray(function(err, rows){
                        logger.debug('===',filter,rows.length,'===')
                        var total = 0, docs = [], cntSuccess = 0;
                        for(var i=0; i<rows.length; i++){
                            cntSuccess += rows[i]['0000'];
                            for(var idx in rows[i]){
                                if(idx != 'servicename' && idx != 'operatename') {
                                    total += rows[i][idx];
                                    docs.push({
                                        'servicename': rows[i]['servicename'],
                                        'operatename': rows[i]['operatename'],
                                        'rspcode': idx,
                                        'count': rows[i][idx]
                                    })
                                }
                            }

                        }
                        docs = mutil.sortObj(docs, 'count');
                        var tabColName = gConfig.tabColNames_CODE;
                        callback(null, {results:docs, total: total, tabColName: tabColName, success: cntSuccess});
                    });
                });
            },
            total: function(callback){
                table.count(filter, function(err, cntTotal){
                    callback(null, cntTotal);
                });
            }
        },function(err, results){
            var rest = results.base,
                total = results.total,
                success = results.base.success,
                failure = total - success;
            rest.count = total;
            rest.failure = failure;
            res.send(rest);
        });
    });

}