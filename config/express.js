﻿var express = require('express')
  , flash = require('connect-flash')
  , mongoStore = require('connect-mongo')(express)
  , pjax = require('express-pjax')
  , partials = require('express-partials')
  , plugin = require('plugin')
  , auth = require('../app/controllers/auth')
  , log = require('../app/controllers/log')
  , solr = require('solr');
module.exports = function (app, config) {

    app.set('showStackError', true)

    // should be placed before express.static
    app.use(express.compress({
      filter: function (req, res) {
        return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
      },
      level: 9
    }))

    app.use(express.favicon('public/favicon.ico'))
    app.use(express.static(config.root + '/public'))

    // don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
      app.use(express.logger('dev'))
    }

    // set views path, template engine and default layout
	  app.engine('html', require('ejs').__express)
    app.set('views', config.root + '/app/views')
    app.set('view engine', 'html')
    
    app.use(partials());
    app.use(pjax());


    // cookieParser should be above session
    app.use(express.cookieParser())


    // bodyParser should be above methodOverride
    app.use(express.bodyParser())
    app.use(express.methodOverride())
    
    //log4js
    log.use(app);

	app.use(function(req, res, next){
		res.on('header', function() {
			if (!req.session) return;
			if (req.session.cookie.expires==null) return;
			req.session.cookie.expires = new Date(Date.now() + 1000*60*60*24*14)
		})
		next()
	});

    // express/mongo session storage
    app.use(express.session({
      secret: "logAnalyse-pangu",
	  cookie: { maxAge: 7200000 },  //120 minute
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }))
    
    
    
	// connect flash for flash messages - should be declared after sessions
    app.use(flash())

    // adds CSRF support
    if (process.env.NODE_ENV !== 'test') {
        app.use(express.csrf())
    }

    app.use(function(req, res, next){
      //if(req.url != "/faye")
          res.locals.csrf_token = req.csrfToken();
      next()
    })
    
    
    //menu Plug-in technology    
    var menus = [];
    require('../app/controllers/menu').loadMenu(config.root+'/app/controllers/menu',function(m){menus = m;});
    
      
    //Public Response Information 
    app.use(function(req, res, next){       
        if (req.session.user){ 
            res.locals.menus = menus;
            res.locals.current_user = req.session.user;
            req.session.cookie.expires = new Date(Date.now() + 1000*60*60*24*14);
        }else{       
           if(req.url != "/login.html" && req.url.indexOf("/auth.html/")< 0 && req.url != "/logout" && req.url != "/register" && req.url != "/registerAction"){
                if (req.url == "/getInbox.html"){
                   ContentType = "text/plain";
                   res.StatusCode =500;
                   res.write("会话超时，请重新登录！");
                   res.end();
                   return;
                }
                return res.redirect('/login.html')
           }
        }
        return next();   
    });

                
    //Plug-in technology    
    plugin(app).require(config.root+'/app/controllers/plugin').load();

    // routes should be at the last
    app.use(app.router)
    
    

    // assume "not found" in the error msgs
    // is a 404. this is somewhat silly, but
    // valid, you can do whatever you like, set
    // properties, use instanceof etc.
    app.use(function(err, req, res, next){
      // treat as 404
      if (err.message
        && (~err.message.indexOf('not found')
        || (~err.message.indexOf('Cast to ObjectId failed')))) {
        return next()
      }

      // log it
      // send emails if you want
      console.error(err.stack)

      // error page
      res.status(500).render('500', { error: err.message })
    })

    // assume 404 since no middleware responded
    app.use(function(req, res, next){
      res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not found'
      })
    })

    // development env config
    app.configure('development', function () {
      app.locals.pretty = true
    })
}
