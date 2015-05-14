﻿var mongoose = require('mongoose')  , debug = require('debug')('pangu:sum')  , util = require("util")  , query = require('./query')  , config = require('./config_sum').config  , cfgTop = require('./config_top').cfgTop  , cfgDetail = require('./config_top').cfgDetail  , barCfg = require('./config_column_cb1_0').config  , meterCfg = require('./config_meter').config  , extend = require('extend')  , redis = require("redis")  , env = process.env.NODE_ENV || 'development'  , redisCfg = require('../../config/config')[env].redis  , logger = require('./log').logger  , config_index = require('./config_index').config  , list_index = require('./config_index').list  , EventProxy = require('eventproxy').EventProxy  , cfgSumList = require('./config_sum').list  , configSum = require('./config_sum').config  , moduleName = require('./config_top').moduleName;var formatNum = function(num) {    if (num > 1000000000) return (num/1000000000).toFixed(2)+'b';	if (num > 1000000) return (num/1000000).toFixed(2)+'M';	if (num > 1000) return (num/1000).toFixed(2)+'k';	return num}var accumulate = function(data) {	for(var key in data) { 		scope = data[key].scopes[0]		list = data[key][scope]		if (list.error) continue;		count = 0;		for(var i in list) {			count += list[i]._count		}		data[key]._count = formatNum(count)		data[key].count = count	}}exports.getStatData = function(req, res) {    var client = redis.createClient(redisCfg.port,redisCfg.host);    try    {               var value = req.query.value||'';       // value ='2013-06-18';        var now = new Date().getTime();          var dateMonth = '';        if(value == ''){            var dateCa = new Date(now);            var date = dateCa.getDate() < 10 ? "0" + dateCa.getDate() : dateCa.getDate();            var month = (dateCa.getMonth()+1) < 10 ? "0" + (dateCa.getMonth()+1) : (dateCa.getMonth()+1);            var year = dateCa.getFullYear();                 value = year+"-"+month+"-"+Date;            dateMonth = year+"-"+month;        }else{            var dateCa = new Date(value);            var date = dateCa.getDate() < 10 ? "0" + dateCa.getDate() : dateCa.getDate();            var month = (dateCa.getMonth()+1) < 10 ? "0" + (dateCa.getMonth()+1) : (dateCa.getMonth()+1);            var year = dateCa.getFullYear();                 dateMonth = year+"-"+month;        }        logger.debug("value---------=%s",value);         logger.debug("dateMonth---------=%s",dateMonth);         var statObject = {};        var tempConfig ={};	        extend(true,tempConfig,configSum);                var list = [];          var chart_list = cfgSumList['lcuCalledSumChart'];                     extend(true,list,chart_list);          var configKey = "";        list.forEach(function(item){             if(!item.value)                item.value = value;                             var filter ={};              if(tempConfig[item.mode+item.type+item.subtype].filter)                filter = tempConfig[item.mode+item.type+item.subtype].filter;                tempConfig[item.mode+item.type+item.subtype].filterColNames.forEach(function(col){                        var obj = {};                     if(req.query[col]||'' != '')                        filter[col] = req.query[col];                  });                          tempConfig[item.mode+item.type+item.subtype].filter = filter;               logger.debug("tempConfig.filter=%s",JSON.stringify(tempConfig[item.mode+item.type+item.subtype].filter));             logger.debug("item.value=%s",item.value);        });                 var render = function(){            query.multiQuery(list,tempConfig , function(err, docs) {        	    accumulate(docs);        	    logger.debug("docs=%s",JSON.stringify(docs));                statObject.DayCalledSum = docs['TuxStateCalledSumByTimeByHour'].count;                statObject.DayFailedSum = docs['TuxStateFailedSumByTimeByHour'].count;                statObject.DaySuccessRate = (statObject.DayCalledSum-statObject.DayFailedSum)/statObject.DayCalledSum *100;                statObject.DayCalledSum = docs['TuxStateCalledSumByTimeByHour']._count;                statObject.DayFailedSum = docs['TuxStateFailedSumByTimeByHour']._count;                if(statObject.DayCalledSum == 0)                     statObject.DaySuccessRate = '0%';                else                    statObject.DaySuccessRate = statObject.DaySuccessRate.toFixed(2)+ '%';                                                var statMonthObject ={};                statMonthObject.MonCalledSum = docs['TuxStateCalledSumByTimeAtDay'].count;                statMonthObject.MonFailedSum = docs['TuxStateFailedSumByTimeAtDay'].count;                statMonthObject.MonSuccessRate = (statMonthObject.MonCalledSum-statMonthObject.MonFailedSum)/statMonthObject.MonCalledSum *100;                statMonthObject.MonCalledSum = docs['TuxStateCalledSumByTimeAtDay']._count;                statMonthObject.MonFailedSum = docs['TuxStateFailedSumByTimeAtDay']._count;                if(statMonthObject.MonCalledSum == 0)                      statMonthObject.MonSuccessRate = '0%';                else                    statMonthObject.MonSuccessRate =statMonthObject.MonSuccessRate.toFixed(2)+ '%';                                logger.debug("statObject=%s",JSON.stringify(statObject));                logger.debug("statMonthObject=%s",JSON.stringify(statMonthObject));                                            client.set("stat-"+value,JSON.stringify(statObject));                client.set("stat-"+dateMonth,JSON.stringify(statMonthObject));                client.expire("stat-"+value,300);                client.expire("stat-"+dateMonth,300);                var temp = {};                extend(true,temp,statObject);                extend(true,temp,statMonthObject);                var response = JSON.stringify(temp);                  client.end();                      res.send(response);    		         	        });   	    }            client.get("stat-"+value, function (err, obj) {            logger.debug("obj=%s",obj);            if(obj){                 var temp = {};                 extend(true,temp,JSON.parse(obj));                 client.get("stat-"+dateMonth, function (err, ret) {                     if(ret){                         extend(true,temp,JSON.parse(ret));                         var response = JSON.stringify(temp);                               logger.debug("statObject-0=%s",JSON.stringify(temp));                         client.quit();                         res.send(response);                       }else{                        render();                     }                  });  		                     }else{                 render();            }         });    }catch(error)    {        logger.error(" error client.quit()");           client.quit();    }finally{        logger.debug("finally client.quit()");       }}//用户订阅类型exports.getUserSubscribeType = function(req, res,next) {    var table = mongoose.model('UserSubscription','UserSubscription');      table.find({'state': '0','user_name':req.session.user.user_name}, function(err, resultRow){        if(err)  return next(err);			        if(resultRow){            var response = JSON.stringify(resultRow);                    res.send(response);          }    });}//收件箱exports.getInbox = function(req, res,next) {        var user_name  = '';    try{        user_name = req.session.user.user_name;    }catch(error)    {         ContentType = "text/plain";         res.StatusCode =500;         res.write("会话超时，请重新登录！");         res.end();         return;    }    var table = mongoose.model('UserSubscriptionRel','UserSubscriptionRel');      table.find({'user_name':user_name}, function(err, resultRow){        if(err)  return next(err);	        if(resultRow){            var response = JSON.stringify(resultRow);                    res.send(response);          }    }).sort({'Unread' : -1}).limit(10);}//邮件信息exports.getMailDetail = function(req, res,next) {        var user_name  = '';    try{        user_name = req.session.user.user_name;    }catch(error)    {         ContentType = "text/plain";         res.StatusCode =500;         res.write("会话超时，请重新登录！");         res.end();         return;    }    var dt = new Date(req.query.value);    var YY = ("00"+dt.getFullYear()%100).substr(-2),	    MM = ("00"+(dt.getMonth() + 1)).substr(-2),	    DD = ("00"+dt.getDate()).substr(-2),	    HH = ("00"+dt.getHours()).substr(-2);	          var collection = 'warning'+YY+MM+DD;	logger.debug('collection=%s',collection);    	var table = mongoose.model('warningInfo',collection);      table.findOne({'_id': req.query.warningId}, function(err, warningInfo){        if(err)  return next(err);	        if(warningInfo){            var table1 = mongoose.model('UserSubscriptionRel','UserSubscriptionRel');              table1.update({'user_name':user_name,'SubscriptionId':req.query.warningId},{$set:{Unread:'1'}},function(err){        		    if(err) return next(err);		                });            warningInfo.type = '';           var response = JSON.stringify(warningInfo);                   res.send(response);          }    });}exports.index = function(req, res) {        var value = req.query.value||'';    var now = new Date().getTime();          if(value == ''){        var dateCa = new Date(now);        var date = dateCa.getDate() < 10 ? "0" + dateCa.getDate() : dateCa.getDate();        var month = (dateCa.getMonth()+1) < 10 ? "0" + (dateCa.getMonth()+1) : (dateCa.getMonth()+1);        var year = dateCa.getFullYear();             value = year+"-"+month+"-"+date;    }    logger.debug("value---------=%s",value);              //曲线图	  var list = [ {mode:'TuxState', type:'CalledSumByTimeByHour', subtype: '',value:value},				         {mode:'TuxState', type:'FailedSumByTimeByHour', subtype: '',value:value}]				//排名		 	  var list1 = [ {mode:'TuxState', type:'CalledSumByLcu', subtype: '',value:value},				        {mode:'TuxState', type:'FailedSumByLcu', subtype: '',value:value}]				        	  //柱状图  	  var list2 = [{mode:'TuxState', type:'CalledSumByTimeByHost', subtype: 'At197198',value:value},				        {mode:'TuxState', type:'CalledSumByTimeByHost', subtype: 'At4445',value:value},				        {mode:'TuxState', type:'CalledSumByTimeByHost', subtype: 'At29',value:value},]				        	  //计量表	  var list3 = [{mode:'TuxState', type:'CalledSumByTimeByHour', subtype: 'AtHours0',value:value},				        {mode:'TuxState', type:'CalledSumByTimeByHour', subtype: 'AtHours1',value:value},				        {mode:'TuxState', type:'CalledSumByTimeByHour', subtype: 'AtHours2',value:value},]    var list4 = [{mode:'TuxState', type:'TimeOutTop',value:value}]				        				            var queryUrl = "/topDetail.html?mode=TuxState"+"&type=TimeOutTop"+"&scope=day"+"&value="+value;    var visitCntUrl = "/visitCntDetail.html?mode=TuxState"+"&type=TimeOutTop"+"&scope=day"+"&value="+value;    	  query.multiQuery(list, config, function(err, docs) {   	      query.multiQuery(list1, cfgTop, 10, function(err, docs1) {	          extend(true,docs1,docs);              query.redisMQuery(list4, cfgTop, 10,function(err, docs4){                  extend(true,docs4,docs1);                  query.multiQuery(list2, barCfg, function(err, docs2) {                      extend(true,docs2,docs4);                      query.multiQuery(list3, meterCfg, function(err, docs3) {                         // console.log(JSON.stringify(docs3));                          extend(true,docs3,docs2);                          accumulate(docs3)                            res.renderPjax('main/index', {all: docs3,caculateDate:value, queryUrl:queryUrl,visitCntUrl:visitCntUrl,TimeOutTopTitles: cfgDetail['TuxStateTimeOutTop'].titles,visitCntUrlTitles: cfgDetail['TuxStateVisitCount'].titles })                      })                  })              })	      })    			  })    	  }exports.visitCntDetail = function(req, res) {        var value = req.query.value;    if(value == ''){        var dateCa = new Date(now);        var date = dateCa.getDate() < 10 ? "0" + dateCa.getDate() : dateCa.getDate();        var month = (dateCa.getMonth()+1) < 10 ? "0" + (dateCa.getMonth()+1) : (dateCa.getMonth()+1);        var year = dateCa.getFullYear();             value = year+"-"+month+"-"+date;    }    logger.debug("value++++++++++++++++++++++-=%s",value);        var iDisplayStart = req.query.iDisplayStart||0;	  var iDisplayLength = req.query.iDisplayLength||10;    var client = redis.createClient(redisCfg.port,redisCfg.host);    try    {        client.get("system-visit-count-"+value, function (err, result){            var output = {};            var temp = [];            var tempOut = new Array();            var count = 0;            var obj = JSON.parse(result);              if(obj){                for(var item in obj){                    if(item != 'allCnt'){                               cfgDetail['TuxStateVisitCount'].colNames.forEach(function(col){                                if(col == '#') {                                 temp.push(1+count);                            }else if(col == 'URL') {                                temp.push(item.substr(7));                            }else if(col == 'name') {                                if(moduleName[item.substr(7)])                                      temp.push(moduleName[item.substr(7)]);                                 else                                    temp.push('模块内部跳转');                                   }else if(col == 'count') {                                  temp.push(obj[item]);                                   }                                });                             tempOut.push(temp);                        temp = [];                          count++;                    }                }                                    }            output.aaData = [];            tempOut.sort(function(a,b){                    return (a[a.length-1] < b[b.length-1]) ? 1 : -1            });            var end = parseInt(iDisplayStart) + parseInt(iDisplayLength);            output.aaData = tempOut.slice(iDisplayStart,end);            client.quit();	            output.sEcho = parseInt(req.query.sEcho);            output.iTotalRecords = count;            output.iTotalDisplayRecords = count;                        var response = JSON.stringify(output);                    res.send(response);        });            }catch(error)    {         client.quit();    }}