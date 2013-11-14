var mongoose = require('mongoose')  , debug = require('debug')('pangu:top')  , util = require("util")  , config = require('./config_top').cfgDetail  , cfgTop = require('./config_top').cfgTop  , query = require('./query')  , EventProxy = require('eventproxy').EventProxy  , extend = require('extend');exports.initDetail = function (req, res, next) {    var mode = req.query.mode       ,type = req.query.type       ,scope = req.query.scope       ,value = req.query.value       ,subtype = req.query.subtype || ''           var headTile = cfgTop[mode+type+subtype].name;    if (scope=="hours") headTile= headTile+"时";    else if (scope=="day") headTile= headTile+"日";    else if (scope=="month") headTile= headTile+"月";    else if (scope=="year") headTile= headTile+"年";           var queryUrl = "/top/detail.html?mode="+mode+"&type="+type+"&scope="+scope+"&subtype="+subtype    res.render('top/detail',{        titles: config[mode+type+subtype].titles,         queryUrl:queryUrl,        headTile:headTile,        current_user:req.session.user    });}exports.list = function(req, res) {	var list = [ {mode:'TuxState', type:'TimeOutTop'}, 				 {mode:'TuxState', type:'CalledSum', subtype: 'ByLcu'},   				 {mode:'TuxState', type:'FailedSum', subtype: 'ByLcu'},				 {mode:'TuxState', type:'AllTime', subtype: 'ByLcu'},				 {mode:'TuxState', type:'AllTime', subtype: 'BySvr'},				 {mode:'TuxState', type:'CalledSum', subtype: 'BySvr'},   				 {mode:'TuxState', type:'FailedSum', subtype: 'BySvr'}	]	//仅查询top 10 	query.multiQuery(list, cfgTop, 10, function(err, docs) {		debug("doc:%s", util.inspect(docs))		res.render('top/list', {all: docs,current_user:req.session.user})	})}exports.detail = function(req, res, next) {	var mode = req.query.mode	  , type = req.query.type	  , scope = req.query.scope	  , value = req.query.value	  , subtype = req.query.subtype || ''	  , iDisplayStart = req.query.iDisplayStart	  , iDisplayLength = req.query.iDisplayLength      , sSearch = req.query.sSearch    if(!iDisplayStart) iDisplayStart = 0;    if(!iDisplayLength) iDisplayLength = 10;  	var table = query.getTable(mode, type, scope, value)	type += subtype;	if (!config[mode+type])		return next(new Error('not found'));		var tempConfig ={};	    extend(true,tempConfig,config[mode+type]);     if (sSearch && sSearch != ""){        var filter ={};         if(tempConfig.filter)                er= tempConfig.filter;        filter.$or = [];        tempConfig.filterColNames.forEach(function(col){                var obj = {};            obj[col] = new RegExp(sSearch);            filter.$or.push(obj);           });             tempConfig.filter = filter;    }         tempConfig.limit = iDisplayLength;    tempConfig.skip = iDisplayStart;           var render = function(count,docs){        var output = {};        var temp = [];        output.sEcho = parseInt(req.query.sEcho);        output.iTotalRecords = count;        output.iTotalDisplayRecords = count;        output.aaData = [];                        docs.forEach(function(item,idx){            tempConfig.colNames.forEach(function(col){                    if(col == '#') {                     temp.push(parseInt(iDisplayStart)+1+idx);                }else{                             temp.push(item[col]);                }                      });            output.aaData.push(temp);            temp = [];        });         var response = JSON.stringify(output);                res.send(response);	}        var proxy = new EventProxy();	proxy.assign('count', 'docs', render);	    table.getCount(tempConfig,function(cnt){         proxy.trigger('count', cnt);    });    	table.list(tempConfig, function(err, docs){	        	    proxy.trigger('docs', docs);				})}