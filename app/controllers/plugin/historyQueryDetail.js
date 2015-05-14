var mongoose = require('mongoose')
  , debug = require('debug')('pangu:top')
  , util = require("util")
  , query = require('../query')
  , config = require('../plugin_config/config_historyDetail').config
  , chart_list = require('../plugin_config/config_historyDetail').list
  , EventProxy = require('eventproxy').EventProxy
  , extend = require('extend')
  , env = process.env.NODE_ENV || 'development'
  , redisCfg = require('../../../config/config')[env].redis
  , redis = require('redis')
  , client = redis.createClient(redisCfg.port, redisCfg.host);

exports.plugin = function(server) {

   server.get('/historyQueryDetail.html', function(req, res) { 
        var chartList = req.query.chartList;
        var value = req.query.value;           
        var list = chart_list[chartList];  
        
        var headTile = config[list[0].mode+list[0].type+list[0].subtype].name;
        var scope = config[list[0].mode+list[0].type+list[0].subtype].scopes[0];        
        var queryUrl = "/historyQueryDetailData?mode="+list[0].mode+"&type="+list[0].type+"&scope="+scope+"&subtype="+list[0].subtype+"&value="+value;
    		res.renderPjax('plugin/historyQueryDetail',{    
    		    titles: config[list[0].mode+list[0].type+list[0].subtype].titles, 
            queryUrl:queryUrl,
            headTile:headTile,
            chartList:chartList
    		})     	              
   });
   
   
   server.get('/historyQueryDetailData', function(req, res,next) {
    	var mode = req.query.mode
    	  , type = req.query.type
    	  , scope = req.query.scope
    	  , value = req.query.value
    	  , subtype = req.query.subtype || ''
    	  , iDisplayStart = req.query.iDisplayStart
    	  , iDisplayLength = req.query.iDisplayLength
        , sSearch = req.query.sSearch
    
      if(!iDisplayStart) iDisplayStart = 0;
      if(!iDisplayLength) iDisplayLength = 10;
      
      var now = new Date().getTime();
      //value = '2013-06-18';
    
    	if (!config[mode+type+subtype])
    		  return next(new Error('not found'));
      
      if (config[mode+type+subtype].queryType && config[mode+type+subtype].queryType =='mapreduce'){
          var dt = new Date(value);
          var YY = ("00"+dt.getFullYear()%100).substr(-2)
        	  , MM = ("00"+(dt.getMonth() + 1)).substr(-2)
        	  , DD = ("00"+dt.getDate()).substr(-2)
        	  , HH = ("00"+dt.getHours()).substr(-2);
        	if (scope=="hours") value= YY+MM+DD+HH; 
        	if(scope=="day") value = YY+MM+DD;
        	if(scope=="month") value = YY+MM;
        	if (scope=="year") value = YY;
        
        	var collection1 = mode + type + scope.toUpperCase() + value;
        	
        	var map = function() {      	    
        	    var key = this.host+"->"+this.TRANSCODE;
              var value = {
                  TRANSCODE:'',
                  calledsum:0,
                  avg_gt_10s:0,
                  avg_gt_5s:0,
                  avg_gt_2s:0,
                  avg_gt_2s_rate:0,
                  count:0,
                  max_gt_10s:0,
                  max_gt_5s:0,
                  max_gt_2s:0,
                  max_gt_2s_rate:0,
                  host:''
              };
              if(this.SVRNAME == 'avgcount')
                  value.calledsum = this._count||0;
              else if(this.SVRNAME == 'avg_gt_10s')
                  value.avg_gt_10s = this._count||0;
              else if(this.SVRNAME == 'avg_gt_5s')
                  value.avg_gt_5s = this._count||0;
              else if(this.SVRNAME == 'avg_gt_2s')
                  value.avg_gt_2s = this._count||0;
              else if(this.SVRNAME == 'maxcount')
                  value.count = this._count||0;
              else if(this.SVRNAME == 'max_gt_10s')
                  value.max_gt_10s = this._count||0;
              else if(this.SVRNAME == 'max_gt_5s')
                  value.max_gt_5s = this._count||0;
              else if(this.SVRNAME == 'max_gt_2s')
                  value.max_gt_2s = this._count||0;
                  
              value.TRANSCODE =this.TRANSCODE;
              value.host =this.host;
                         
              emit( key, value); 
        	};  
        	
          var reduce = function(k,values) {
              var reducedObject = {
                  TRANSCODE:'',
                  calledsum:0,
                  avg_gt_10s:0,
                  avg_gt_5s:0,
                  avg_gt_2s:0,
                  avg_gt_2s_rate:'0%',
                  count:0,
                  max_gt_10s:0,
                  max_gt_5s:0,
                  max_gt_2s:0,
                  max_gt_2s_rate:'0%',
                  host:''
              };
        
              values.forEach( function(value) {
                  if(value.calledsum != 0)
                      reducedObject.calledsum = value.calledsum;
                  if(value.avg_gt_10s != 0)
                      reducedObject.avg_gt_10s = value.avg_gt_10s;
                  if(value.avg_gt_5s != 0)
                      reducedObject.avg_gt_5s = value.avg_gt_5s;
                  if(value.avg_gt_2s != 0)
                      reducedObject.avg_gt_2s = value.avg_gt_2s;
                  if(value.count != 0)
                      reducedObject.count = value.count;
                  if(value.max_gt_10s != 0)
                      reducedObject.max_gt_10s = value.max_gt_10s;
                  if(value.max_gt_5s != 0)
                      reducedObject.max_gt_5s = value.max_gt_5s;
                  if(value.max_gt_2s != 0)
                      reducedObject.max_gt_2s = value.max_gt_2s;
                      
                  reducedObject.TRANSCODE =value.TRANSCODE;
                  reducedObject.host =value.host; 
              });
              
              if(reducedObject.calledsum != 0)
                  reducedObject.avg_gt_2s_rate = (reducedObject.avg_gt_2s/reducedObject.calledsum *100).toFixed(2)+'%';  
              if(reducedObject.count != 0)
                  reducedObject.max_gt_2s_rate = (reducedObject.max_gt_2s/reducedObject.count *100).toFixed(2)+'%'; 
               
              if(reducedObject.avg_gt_2s/reducedObject.calledsum >= 0.1 || reducedObject.max_gt_2s/reducedObject.count >= 0.1)                   
                return reducedObject; 
          };  
          
          var queryStr = {};
          
          if (sSearch && sSearch != ""){
     
                var isIp = false;
                var patrn=/^[0-9]{1}[0-9]{0,2}[.]{1}[0-9]{1}[0-9]{0,2}[.]{1}[0-9]{1}[0-9]{0,2}[.]{1}[0-9]{1}[0-9]{0,2}$/;
                if (!patrn.exec(sSearch)) 
                   isIp = false;
                else{ 
                    var str_arr = Array();   
                    str_arr = sSearch.split(".")   
                    for( i = 0; i < str_arr.length; i++ ){     
                        if( str_arr[i] > 255 ) {
                            isIp = false; 
                            break; 
                        }else{
                            isIp = true;
                        }      
                    }                           
                }
                if(isIp == false)
                    queryStr['TRANSCODE'] = sSearch;
                else
                    queryStr['host'] = sSearch;

          }

          var command = {   
              mapreduce: collection1, 
              map: map.toString(), 
              reduce: reduce.toString(), 
              sort: {'_count':-1},
              query:queryStr, 
              out:{inline:1}
          }; 


          mongoose.connection.db.executeDbCommand(command, function(err, results) {   
            if(err)
                res.send(""); 
             
            var resultCnt = 0;    
            var output = {};
            var temp = [];
            output.sEcho = parseInt(req.query.sEcho);
            output.aaData = [];
            if(results.documents[0].results){      
                results.documents[0].results.forEach(function(item,idx){
                    if(item.value != null){ 
                        resultCnt ++ ;
                        config[mode+type+subtype].colNames.forEach(function(col){ 
                            if(col == '#') { 
                                temp.push(parseInt(iDisplayStart)+1+idx);
                            }else if(col == 'TRANSCODE' ) {          
                               temp.push(item._id.split("->")[1]);
                            }else if(col == 'host') {          
                               temp.push(item._id.split("->")[0]);
                            }else if(col == 'calledsum') {          
                               temp.push(item.value.calledsum);
                            }else if(col == 'avg_gt_10s') {          
                               temp.push(item.value.avg_gt_10s);
                            }else if(col == 'avg_gt_5s') {          
                               temp.push(item.value.avg_gt_5s);
                            }else if(col == 'avg_gt_2s') {          
                               temp.push(item.value.avg_gt_2s);
                            }else if(col == 'avg_gt_2s_rate') {          
                               temp.push(item.value.avg_gt_2s_rate);
                            }else if(col == 'count') {          
                               temp.push(item.value.count);
                            }else if(col == 'max_gt_10s') {          
                               temp.push(item.value.max_gt_10s);
                            }else if(col == 'max_gt_5s') {          
                               temp.push(item.value.max_gt_5s);
                            }else if(col == 'max_gt_2s') {          
                               temp.push(item.value.max_gt_2s);
                            }else if(col == 'max_gt_2s_rate') {          
                               temp.push(item.value.max_gt_2s_rate);
                            }     
                     
                        });
                        output.aaData.push(temp);
                        temp = [];
                    }
                  });
              }
              output.iTotalRecords = resultCnt;
              output.iTotalDisplayRecords = resultCnt;
  	          var response = JSON.stringify(output);        
              res.send(response);

          });  
                     
      }else if(mode == 'TuxState'
                            && type == 'TimeOutTop' && scope == 'day'){
        	var tabname = query.getTableName(mode, type, scope, value);
                	
        	var tempConfig ={};	
        	type +=subtype;
          extend(true,tempConfig,config[mode+type]);
         
    
            var filter ={}; 
            if(tempConfig.filter)
                    filter= tempConfig.filter;
             
           /*if (sSearch && sSearch != ""){
                filter.$or = [];
                tempConfig.filterColNames.forEach(function(col){
                    
                        var obj = {};
                        obj[col] = new RegExp(sSearch);
                        filter.$or.push(obj);
                }); 
            }     */
            tempConfig.filter = filter;

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
                    var item1 = JSON.parse(JSON.stringify(item)); 
                    tempConfig.colNames.forEach(function(col){    
                        if(col == '#') { 
                            temp.push(parseInt(iDisplayStart)+1+idx);
                        }else if(col == 'avg_gt_2s_rate') {   
                           item1[col] =  '0%';
                           if(item1['avgcount'] != 0 && item1['avg_gt_2s'] != 0)
                               item1[col] = (item1['avg_gt_2s']/item1['avgcount']*100).toFixed(2)+'%'; 
                            temp.push(item1[col]);
                           
                        }else if(col == 'max_gt_2s_rate') {  
                           item1[col] =  '0%';
                           if(item1['maxcount'] != 0 && item1['max_gt_2s'] != 0)
                               item1[col] = (item1['max_gt_2s']/item1['maxcount']*100).toFixed(2)+'%';
                            temp.push(item1[col]); 
                        }else{    
                           temp.push(item1[col]);
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
            var iDisplayEnd = iDisplayStart + iDisplayLength - 1;
              var sortMax = false;
              for(var key in tempConfig.sort){
                  if(tempConfig.sort[key] == -1 ){
                      sortMax = true;
                  }
              }
              if( sortMax ){
                  client.zrevrange([tabname, iDisplayStart, iDisplayEnd], function(err, docs){
                      var redisRet = [];
                      for (var rsi = 0; rsi < docs.length; rsi++) {
                          redisRet.push(JSON.parse(docs[rsi]));
                      }
                      proxy.trigger('docs', redisRet);
                  })
              }else{
                  client.zrange([tabname, iDisplayStart, iDisplayEnd], function(err, docs){
                      var redisRet = [];
                      for (var rsi = 0; rsi < docs.length; rsi++) {
                          redisRet.push(JSON.parse(docs[rsi]));
                      }
                      proxy.trigger('docs', redisRet);
                  })
              }

              client.zcard([tabname], function(err, cnt){
                  proxy.trigger('count', cnt);
              })

      } else {

          var table = query.getTable(mode, type, scope, value)

          var tempConfig ={};
          type +=subtype;
          extend(true,tempConfig,config[mode+type]);


          var filter ={};
          if(tempConfig.filter)
              filter= tempConfig.filter;

          if (sSearch && sSearch != ""){
              filter.$or = [];
              tempConfig.filterColNames.forEach(function(col){

                  var obj = {};
                  obj[col] = new RegExp(sSearch);
                  filter.$or.push(obj);
              });
          }
          tempConfig.filter = filter;

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
                  var item1 = JSON.parse(JSON.stringify(item));
                  tempConfig.colNames.forEach(function(col){
                      if(col == '#') {
                          temp.push(parseInt(iDisplayStart)+1+idx);
                      }else if(col == 'avg_gt_2s_rate') {
                          item1[col] =  '0%';
                          if(item1['avgcount'] != 0 && item1['avg_gt_2s'] != 0)
                              item1[col] = (item1['avg_gt_2s']/item1['avgcount']*100).toFixed(2)+'%';
                          temp.push(item1[col]);

                      }else if(col == 'max_gt_2s_rate') {
                          item1[col] =  '0%';
                          if(item1['maxcount'] != 0 && item1['max_gt_2s'] != 0)
                              item1[col] = (item1['max_gt_2s']/item1['maxcount']*100).toFixed(2)+'%';
                          temp.push(item1[col]);
                      }else{
                          temp.push(item1[col]);
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
      }
     
    });
  
}