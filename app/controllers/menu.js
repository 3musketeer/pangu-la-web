var fs = require('fs')
   ,EventProxy = require('eventproxy').EventProxy;


exports.loadMenu = function(dir,cb){
       	
    var proxy = new EventProxy();
	  proxy.assign('menus', cb);
    fs.readdir(dir, function(err, files) {

        var menusTemp = [];
        if(err) {
            throw new Error(err);
        }

        files.forEach(function(filename) {
            if(filename.substring(filename.length-3) == '.js'){
                var filepath = [ dir, filename ].join('/');
                var tmp = require(filepath);
                for (m in tmp){
                    menusTemp.push(tmp[m]);
                }
            }
        });  
             
        proxy.trigger('menus', menusTemp);
    }); 
}