var mongoose = require('mongoose')
  , debug = require('debug')('pangu:top')
  , util = require("util")
  , query = require('../../query')
  , EventProxy = require('eventproxy').EventProxy
  , extend = require('extend')
  , util = require('../../../libs/utils');;


var warningType = {'error':'异常','timeOut':'超时'};

exports.plugin = function(server) {

   server.get('/getAllMail.html', function(req, res) { 
 
        var headTile = "异常警告列表"; 
        var queryUrl = "/getAllMailData";
    		res.renderPjax('plugin/getmaillist/getMailList',{    
    		    titles: ['排名', '异常标题', '异常类型', '是否已读', '异常日期'],
            queryUrl:queryUrl,
            headTile:headTile
    		})     	              
   });
   
   
   server.get('/getAllMailData', function(req, res,next) {
    	var iDisplayStart = req.query.iDisplayStart
    	  , iDisplayLength = req.query.iDisplayLength
        , sSearch = req.query.sSearch
    
      if(!iDisplayStart) iDisplayStart = 0;
      if(!iDisplayLength) iDisplayLength = 10;
      var filter = {'user_name':req.session.user.user_name};
         
      if (sSearch && sSearch != ""){
            filter.$or = [];
             ['SubscriptionTitle', 'Unread', 'relType'].forEach(function(col){    
                    var obj = {};
                    obj[col] = new RegExp(sSearch);
                    filter.$or.push(obj); 
            }); 
      }     
        

      var render = function(count,docs){
            var output = {};
            var temp = [];
            output.sEcho = parseInt(req.query.sEcho);
            output.iTotalRecords = count;
            output.iTotalDisplayRecords = count;
            output.aaData = [];
                    
            docs.forEach(function(item,idx){
                ['#','SubscriptionTitle', 'relType', 'Unread', 'SubscriptDate'].forEach(function(col){    
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
    	
    	       
    	var table = mongoose.model('UserSubscriptionRel','UserSubscriptionRel');  
    	table.count(filter,function (err, cnt) {  
            if(err){
                return next(err);		
            }
            proxy.trigger('count', cnt);
      });
    	
      table.find(filter, ['#','SubscriptionTitle', 'relType', 'Unread', 'SubscriptDate'].join(' '))
        .sort({'Unread' : 1}).limit(iDisplayLength||0).skip(iDisplayStart||0)
        .exec(function(err, resultRow){
            if(err) return next(err);		
            if(resultRow){
                 resultRow.forEach(function(row){ 
                    if(row.Unread == '0')
                        row.Unread = '未读';
                    else
                        row.Unread = '已读';
                    
                    row.SubscriptDate = util.format_date(row.SubscriptDate);
                    row.relType = warningType[row.relType];
                 });
                 proxy.trigger('docs', resultRow);		
            }
      });
   });
   
}