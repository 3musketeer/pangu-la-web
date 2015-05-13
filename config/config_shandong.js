var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')

module.exports = {
  development: {
  	
  	session_secret: 'tuxlog',
    auth_cookie_name: 'USER_INFO_COOKIE',
    admins: {admin: true},
    
	  db: 'mongodb://10.161.0.85:27019/tuxlog',
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
        host:'10.161.0.85',
        port:'6379'
    }
		
  }
}
