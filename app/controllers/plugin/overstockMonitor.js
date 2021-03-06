/**
 * Created with JetBrains WebStorm.
 * User: Jacky
 * Date: 14-4-14
 * Time: 下午5:06
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
    , logger = require('../log').logger
    , osConfig = require('../plugin_config/overstock/config_overstock')
    , extend = require('extend')
    , query = require('../query')
    ;
//var Overstock = require('../../models/overstock').Overstock;

/*var mongoose = require('mongoose')
    , debug = require('debug')('pangu:top')
    , util = require("util")
    , query = require('../query')
    , extend = require('extend');*/

exports.plugin = function(server) {

    server.get('/orderOverstock.html', function(req, res) {

        console.log('date select=>' + req.query['value']);

        var os = req.query.chartList;
        var value = req.query.value || '';
        var ajaxGetTag = req.query.ajaxGetTag || 'false';
        var transCode = req.query.TRANSCODE || '';
        var headTitle = '';

        var tabColNames = osConfig.overstock.tabColNames;

        res.renderPjax('plugin/orderOverstock/orderOverstock', {
//            layout:true,
            chartList: os,
            headTitle: '工单积压',
            tabColNames: tabColNames
        })

    });

    server.get('/getOverstockData', function(req, res) {

        console.log('isInit=>' + req.query['isInit']);
        //var os = mongoose.model('Overstock','overstocks');

        var chartList = req.query['chartList'];
        console.log('chartList=>' + chartList);

        var chartConfig = osConfig.overstock.lineChart[0];
        console.log('chartConfig=>' + (chartConfig.mode + chartConfig.type + chartConfig.subtype));
        var tabName = chartConfig.mode + chartConfig.type + chartConfig.subtype;

        var table = mongoose.model('orderoverstock', tabName);
        console.log('table=>' + table);

        var curTime = new Date().getTime();
        //取当前一个小时数据

//        console.log('curTime=>' + curTime);
        var startTime = curTime - 900000;
//        console.log('startTime=>' + startTime);
        var time = new Date(startTime);
//        console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());

        var result = [];
        var detail = [];
        table.find({time: {$gte: startTime, $lte:curTime}}, function(err, rows) {
//            console.log('rows111=>' + rows);

            var tt;
            var num = 0;
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                tt = (!tt) ? row.time : tt;

                if (tt == row.time) {
                    num += row.count;

                    detail.push(row);
                } else {
                    //result.push(num);
                    var date = new Date(tt);
                    result.push([tt, num]);
                    tt = row.time;
                    num = row.count;

                    detail = [];
                    detail.push(row);
                }
                if (i == rows.length - 1) {
                    //result.push(num);
                    var date = new Date(tt);
                    result.push([tt, num]);
                }
            }
//            console.log('result=>' + result);
            res.send({success: 1, data: result, detail: detail, cols: osConfig.overstock.tabCols});
        });
    });

    /*server.get('/getOverstockDetail', function(req, res) {
        var time = req.query['time'];
        console.log('time=>' + time);

        Overstock.find({time: time}, function(err, rows) {
            console.log('rows=>' + rows);
        });
    });*/

    /*server.get('/getOverstockGroup', function(req, res) {
        console.log('time=>' + req.query['value']);

        var result = [];
        var detail = [];
        var o = {};
        o.map = function() {
            var hours = new Date(this.time).getHours();
            emit(hours, this.count);
        };
        o.reduce = function(k, vs) {
            var x = 0;
            vs.forEach(function(v) {
                x += v;
            });
            return x;
        };
        o.finalize = function(k, v) {
            return {time: k, count: v};
        };
        Overstock.mapReduce(o, function(err, rows) {
//            console.log(rows.length);
            var tt;
            var num = 0;
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i].value;
                if (i <= 1) {
//                    console.log(!tt);
                }
//                console.log('tt%r=> %t', i, tt);
                tt = (!tt && tt != 0) ? row.time : tt;
//                console.log(tt);

                if (tt == row.time) {
                    num += row.count;

                    detail.push(row);
                } else {
                    //result.push(num);
                    var date = new Date(tt);
//                    console.log('add tt=>' + tt + '; count=>' + num)
                    result.push([tt+1, num]);
                    tt = row.time;
                    num = row.count;

                    detail = [];
                    detail.push(row);
                }
                if (i == (rows.length - 1)) {
                    //result.push(num);
                    var date = new Date(tt);
                    result.push([tt+1, num]);
                }
            }
//            console.log(result.length);
            res.send({success: 1, data: result});
        });
    });*/

}