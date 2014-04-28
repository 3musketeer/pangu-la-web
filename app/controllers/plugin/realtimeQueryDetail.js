var mongoose = require('mongoose')
  , debug = require('debug')('pangu:top')
  , util = require("util")
  , query = require('../query')
  , config = require('../plugin_config/config_realTimeDetail').detailConfig
  , chart_list = require('../plugin_config/config_realTimeDetail').detailList
  , EventProxy = require('eventproxy').EventProxy
  , extend = require('extend')
  , logger = require('../log').logger;

exports.plugin = function(server) {

   server.get('/realtimeQueryDetail.html', function(req, res) { 
        var chartList = req.query.chartList;
        var value = req.query.value||'';           
        var list = chart_list[chartList]; 
        
        //if(value == ''){
            var now = new Date().getTime();
            var dateCa = new Date(now);
            var date = dateCa.getDate() < 10 ? "0" + dateCa.getDate() : dateCa.getDate();
            var month = (dateCa.getMonth()+1) < 10 ? "0" + (dateCa.getMonth()+1) : (dateCa.getMonth()+1);
            var year = dateCa.getFullYear();     
            value = year+"-"+month+"-"+date; 
       // }
        logger.debug("value=%s",value);
        var headTile = config[list[0].mode+list[0].type+list[0].subtype].name;
        var displayLength = config[list[0].mode+list[0].type+list[0].subtype].displayLength;
        var scope = config[list[0].mode+list[0].type+list[0].subtype].scopes[0];        
        var queryUrl = "/realtimeQueryDetailData?mode="+list[0].mode+"&type="+list[0].type+"&scope="+scope+"&subtype="+list[0].subtype+"&value="+value+"&iDisplayLength="+displayLength;
    		logger.debug("queryUrl------------=%s",queryUrl);
    		res.renderPjax('plugin/realtimeQueryDetail',{    
    		    titles: config[list[0].mode+list[0].type+list[0].subtype].titles, 
            queryUrl:queryUrl,
            headTile:headTile,
            displayLength:displayLength
    		})     	              
   });
   
   
   server.get('/realtimeQueryDetailData', function(req, res,next) {
    	var mode = req.query.mode
    	  , type = req.query.type
    	  , scope = req.query.scope
    	  , value = req.query.value
    	  , subtype = req.query.subtype || ''
    	  , iDisplayStart = req.query.iDisplayStart
    	  , iDisplayLength = req.query.iDisplayLength
        , sSearch = req.query.sSearch
    
      if(!iDisplayStart) iDisplayStart = 0;
      iDisplayLength = config[mode+type+subtype].displayLength;
      
      var now = new Date().getTime();
      
    	var table = query.getTable(mode, type, scope, value)
    
    	type += subtype;
    
      logger.debug("value------------=%s",value);
      logger.debug("mode------------=%s",mode);
      logger.debug("type------------=%s",type);
      logger.debug("subtype------------=%s",subtype);
    	if (!config[mode+type])
    		return next(new Error('not found'));
    	
    	var tempConfig ={};	
      extend(true,tempConfig,config[mode+type]);
     
      
        var filter ={}; 
        if(tempConfig.filter)
                filter= tempConfig.filter;
                
        tempConfig.filterColNames.forEach(function(col){
             if (col == "timestamp"){ 
                filter[col] = {$gte: now-tempConfig.delayTime,$lte: now+1000}; 
             }
        });    
        if (sSearch && sSearch != ""){ 
            filter.$or = [];   
            tempConfig.filterColNames.forEach(function(col){
                 if (col != "timestamp"){ 
                    
                    var obj = {};
                    obj[col] = new RegExp(sSearch);
                    filter.$or.push(obj);
                 }
            });     
            
        }
        tempConfig.filter = filter;
        logger.debug("tempConfig.filter=%s",JSON.stringify(tempConfig.filter));
        tempConfig.limit = iDisplayLength;
        tempConfig.skip = iDisplayStart;
        
        var render = function(count,docs){
            var output = {};
            var temp = [];
            output.sEcho = parseInt(req.query.sEcho);
            output.iTotalRecords = count;
            output.iTotalDisplayRecords = count;
            output.aaData = [];
                    
            docs.forEach(function(item,idx){
                tempConfig.colNames.forEach(function(col){    
                    if(col == '#') { 
                        temp.push(parseInt(iDisplayStart)+1+idx);
                    }else{          
                       temp.push(item[col]);
                    }          
                });
                output.aaData.push(temp);
                temp = [];
            }); 
            var response = JSON.stringify(output);        
            res.send(response);
    	}
        
      var proxy = new EventProxy();
    	proxy.assign('count', 'docs', render);
    	
      table.getCount(tempConfig,function(cnt){ 
          proxy.trigger('count', cnt);
      });
        
    	table.list(tempConfig, function(err, docs){	        
    	    proxy.trigger('docs', docs);			
    	})
    });
  
}