﻿var mongoose = require('mongoose')   ,logger = require('../../log').logger   ,barCfg = require('../../plugin_config/lcucalledsum/config_column').barConfig   ,barList = require('../../plugin_config/lcucalledsum/config_column').barList   ,topConfig = require('../../plugin_config/lcucalledsum/config_column').topConfig   ,topList = require('../../plugin_config/lcucalledsum/config_column').topList   ,extend = require('extend')   ,query = require('../../query')   ,transcode_list = require('../../config_coreTranscodeList').coreTranscodeList;var formatNum = function(num) {	if (num > 1000000) return (num/1000000).toFixed(1)+'M';	if (num > 1000) return (num/1000).toFixed(1)+'k';	return num}var accumulate = function(data) {	for(var key in data) {		scope = data[key].scopes[0]		list = data[key][scope]		if (list.error) continue;		count = 0;		for(var i in list) {			count += list[i]._count		}		data[key]._count = formatNum(count)		data[key].count = count	}}exports.plugin = function(server) {              server.get('/lcuCalledSum.html', function(req, res) {                 var chartList = req.query.chartList;        var value = req.query.value||'';        var chart_list = barList[chartList];         var ajaxGetTag = req.query.ajaxGetTag||'false';        var transCode =req.query.TRANSCODE||'';        var headTitle ='';                        var tempConfig ={};	        extend(true,tempConfig,barCfg);        var list = [];        extend(true,list,chart_list);                 list.forEach(function(item){             if(!item.value)                item.value = value;                             var filter ={};              if(tempConfig[item.mode+item.type+item.subtype].filter)                filter = tempConfig[item.mode+item.type+item.subtype].filter;             tempConfig[item.mode+item.type+item.subtype].filterColNames.forEach(function(col){                    var obj = {};                 if(req.query[col]||'' != '')                    filter[col] = req.query[col];               });                          tempConfig[item.mode+item.type+item.subtype].filter = filter;               tempConfig[item.mode+item.type+item.subtype].caculateDate = value;               headTitle = tempConfig[item.mode+item.type+item.subtype].name;             logger.debug("tempConfig.filter=%s",JSON.stringify(tempConfig[item.mode+item.type+item.subtype].filter));             logger.debug("item.value=%s",item.value);        });                         query.multiQuery(list, tempConfig, function(err, docs) {             if(ajaxGetTag != 'true'){                                var top_list = topList[chartList];                var topListTemp = [];                extend(true,topListTemp,top_list);                 topListTemp.forEach(function(item2){                        item2.value = value;                });                logger.debug("topListTemp=%s",JSON.stringify(topListTemp));                var tempTopConfig ={};	                extend(true,tempTopConfig,topConfig);                query.multiQuery(topListTemp, tempTopConfig, 11, function(err, docs1) {    				        extend(true,docs1,docs);    				        accumulate(docs1)    				        logger.debug("docs1=%s",JSON.stringify(docs1));                    res.renderPjax('plugin/lcucalledsum/lcuCalledSum',{                        all: docs1,                        caculateDate:value,                        transcode_list:transcode_list,                        chartList:chartList,                        headTitle:headTitle                    })                })            }else{                res.send(docs);            }        })        })        }