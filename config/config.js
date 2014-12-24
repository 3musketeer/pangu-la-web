var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')

module.exports = {
  development: {
  	
  	session_secret: 'tuxlog',
    auth_cookie_name: 'USER_INFO_COOKIE',
    admins: {tangsz: true},
    
	  db: 'mongodb://134.32.84.233/tuxlog',
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
        host:'134.32.84.233',
        port:'6379'
    }
		
  }
}
