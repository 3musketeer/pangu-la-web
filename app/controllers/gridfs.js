var mongoose = require('mongoose'),db = mongoose.connection.db;
var GridStore = mongoose.mongo.GridStore;
var Grid      = mongoose.mongo.Grid;
var ObjectID = mongoose.mongo.BSONPure.ObjectID;


exports.putFile = function(req, fileName){
    var db = mongoose.connection.db;
    var file =  req.files && req.files.uploadfile;
    if(!file) return;
    var opts = {content_type: req.files.type};
    var  options = parse(opts);
    options.metadata.filename = fileName;   
    var gridStore = new GridStore(db, fileName, "w",options);
    gridStore.open(function(err, fileData){
        if(err)  {console.log(err); return;}
        fileData.writeFile(file.path, function(err, result){
            if(err)   {console.log("fileData.writeFile:"+err); return;}		    
		    gridStore.close(function(err,result){
                if(err){console.log("gridStore.close:"+err); return;}
            });
        });
    });
}


function parse(options){
    var opts = {};
    if (options.length> 0)
        opts = options[0];
    if (!opts.metadata)
        opts.metadata = {}
    return opts;
}


exports.getFile = function(fileName,callback){
    var db = mongoose.connection.db;
    var store = new GridStore(db, fileName, "r",{root: "fs"});  
    store.open(function(err, store){
        if(err){ console.log("store.open:"+err); return;}
        store.read(function (err, data) {
            if (err) {
                console.log("gridStore.read"+err);
                return;
            }
            callback(data); 
        });
    }); 
}