var userAuth = require('./user_auth');
var gridfs = require('./gridfs');
var mongoose = require('mongoose'),db = mongoose.connection.db
  , env = process.env.NODE_ENV || 'development'
  , redis = require("redis")
  , redisCfg = require('../../config/config')[env].redis
  , logger = require('./log').logger;

exports.requiresLogin = function (req, res, next) {

    if (!req.session || req.session.hasAuth !== true) {
      //req.session.returnTo = req.originalUrl
      return res.redirect('/login.html')
    }
    next()
}

exports.login = function(req, res) {
  userAuth.login(req, res); 
}

exports.auth = function(req, res, next) {    
	userAuth.authUser(req, res, next);	
}

exports.session = function(req, res) {
	//if (req.session.returnTo) {
		//res.redirect(req.session.returnTo)
		//delete req.session.returnTo
		//return
     // }
	
	res.redirect('/')
}

exports.registerUser = function (req, res) {
     res.render('user/register',{
                layout: false,
				errors: req.flash('error') 
			})
}


exports.auditUser = function (req, res) {
	userAuth.auditUser(req, res);
}

exports.audit = function (req, res) {
	userAuth.audit(req, res);
}


exports.getHeadPicture = function(req, res) {
    if (req.session){
        gridfs.getFile(req.session.user.user_name,function(data){
            res.send(data);
        });
    }
}


exports.getVisitCount = function(req, res) {
    if (req.session){
        client = redis.createClient(redisCfg.port,redisCfg.host);
        var now = new Date().getTime();
        var dateCa = new Date(now);        
        var date = dateCa.getDate() < 10 ? "0" + dateCa.getDate() : dateCa.getDate();
        var month = (dateCa.getMonth()+1) < 10 ? "0" + (dateCa.getMonth()+1) : (dateCa.getMonth()+1);
        var year = dateCa.getFullYear();     
        var value = year+"-"+month+"-"+date;
        var statUrl = req.query.statUrl;
        if(statUrl == '/') statUrl = '/index.html';
        try{
            var visitCountObj = {};
            client.get("system-visit-count-"+value, function (err, obj) {
                if(obj){
                    logger.debug("obj-0=%s",JSON.stringify(obj));
                    var tempObj = JSON.parse(obj);
                    if(tempObj['dayCnt-'+statUrl])
                        tempObj['dayCnt-'+statUrl] = parseInt(tempObj['dayCnt-'+statUrl])+1;
                    else
                        tempObj['dayCnt-'+statUrl] = 1;
                    tempObj.allCnt = parseInt(tempObj.allCnt)+1;
                    visitCountObj = tempObj;  
                    client.set("system-visit-count-"+value,JSON.stringify(tempObj));
                    client.end();
                }else{
                    var tempObj ={};
                    tempObj['dayCnt-'+statUrl] = 1;
                    tempObj.allCnt = 1;
                    visitCountObj = tempObj;   
                    logger.debug("visitCountObj=%s",JSON.stringify(visitCountObj));
                    client.set("system-visit-count-"+value,JSON.stringify(tempObj));
                    client.end();
                }
                res.send(JSON.stringify(visitCountObj)); 
            });
        }catch(error)
        {
            client.quit();
        }
    }
}

exports.receiveData = function(req, res) {
     
     var param1="2014-04-24 10:29:17.459 STATE [gboss.crm.trade.ITF_CRM_GetInfoCU] 18677932 SVRNAME=qcscrm1l1server;PATH=/bss/outerf/JISU;TRANSCODE=ITF_CRM_GetInfoCU;STARTTIME=2013-04-24 10:24:15;CYCLESIZE=300;CALLED=28;FAILED=0;MAX=12789;MIN=2501;AVERAGE=3853";
     var param2="192.168.0.123";
     var data = req.body.data;
     var host = req.body.localhost;
     var type = req.body.type;
     
     console.log("data="+data);
     console.log("host="+host);
     console.log("type="+type);
     if(data != undefined){
         if (data instanceof Array) {
            console.log("+++++++++++++++++++++++++++");
              data.forEach(function(item){
                 console.log("item="+item);
                 db.eval(type+"Loader('"+item+"','"+host+"')", function (err, results) {
                   if(err) console.log(err);
                 })
              })
         }else{
            db.eval(type+"Loader('"+data+"','"+host+"')", function (err, results) {
               if(err) console.log(err);
        
             })
         }
    }
    res.send("ok");
}


exports.logout = function(req, res) {
	delete req.session.user;
	req.session.hasAuth = false;
	res.redirect('/login.html');
}


exports.resetPassword = function (req, res) {
    res.render('user/resetPassword',{
        layout: false,
		errors: req.flash('error'),
		Prompts: req.flash('Prompt') 
	})
}

exports.modifyPassword = function (req, res) {
    res.render('user/modifyPassword',{
        layout: false,
		errors: req.flash('error'),
		Prompts: req.flash('Prompt') 
	})
}