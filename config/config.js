var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')

module.exports = {
  development: {
  	
  	session_secret: 'tuxlog',
    auth_cookie_name: 'USER_INFO_COOKIE',
    admins: {tangsz: true},
    
	  db: 'mongodb://localhost/tuxlog1',
	  root: rootPath,
	  
	  client_opts: {
        url: 'http://localhost:8082',
        sockjs_opts: {
            devel: true,
            debug: true,
            websocket:true
        }
    },
    
    redis: {
        host:'127.0.0.1',
        port:'6379'
    }
		
  }
}
