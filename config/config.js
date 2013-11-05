var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')

module.exports = {
  development: {
  	
  	session_secret: 'tuxlog',
    auth_cookie_name: 'USER_INFO_COOKIE',
    admins: {tangsz: true},
    
	  db: 'mongodb://localhost/tuxlog',
	  root: rootPath
		
  }
}
