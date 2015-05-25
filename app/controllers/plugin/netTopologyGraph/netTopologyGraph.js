var mongoose = require('mongoose')
    , db = mongoose.connection.db
    , logger = require('../../log').logger
    , extend = require('extend')
    , query = require('../../query')
    , async = require('async')
    , EventProxy = require('eventproxy').EventProxy
    , _node = require('../../plugin_config/netTopologyGraph/config_nettopology_cb_1_0').nodes;


exports.plugin = function(server) {

    server.get('/NetTopologyGraph.html', function(req, res){
        var date = req.query['value'] || "2015-05-19";
        res.renderPjax('plugin/netTopologyGraph/netTopologyGraph',{
            value: date
        })
    });

    server.get('/getStatDataByHost', function(req, res){
        var date = req.query['value'],
            host = req.query['host'];

        var yy = ("000" + date.split('-')[0]).substr(-2),
            mm = ("000" + date.split('-')[1]).substr(-2),
            dd = ("000" + date.split('-')[2]).substr(-2);
        //console.log('=====',yy,mm,dd,'=====')

        var tabCallCnt = db.collection('TuxStateCalledSumByTimeByHostDAY' + yy + mm + dd),
            tabFailCnt = db.collection('TuxStateFailedSumByTimeByHostDAY' + yy + mm + dd);
        var render = function(FailDocs,CallDocs){
            //logger.debug(FailDocs, CallDocs)
            var failCnt = 0,
                callCnt = 0;
            for(var i=0; i<CallDocs.length; i++){
                if(CallDocs[i]['_count']){
                    callCnt += CallDocs[i]['_count'];
                }else{
                    callCnt += CallDocs[i]['count'];
                }
            }
            for(var i=0; i<FailDocs.length; i++){
                if(FailDocs[i]['_count']){
                    failCnt += FailDocs[i]['_count'];
                }else{
                    failCnt += FailDocs[i]['_count'];
                }
            }
            res.send({'CallCnt': callCnt, 'FailCnt': failCnt});
        };

        var proxy = new EventProxy();
        proxy.assign('FailDocs', 'CallDocs', render);
        tabCallCnt.find({host: host}, {_id:0, _count: 1, count: 1}, function(err, docs){
            docs.toArray(function(err, rows){
                proxy.trigger('CallDocs', rows);
            })
        });
        tabFailCnt.find({host: host}, {_id:0, _count: 1, count: 1}, function(err, docs1){
            docs1.toArray(function(err, rows){
                proxy.trigger('FailDocs', rows);
            })
        });

    });
}