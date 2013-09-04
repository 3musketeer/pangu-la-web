
/**
 * Module dependencies.
 * TuxState 
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var QueryResultSchema = new Schema({
	TRANSCODE: {type:String},
	SVRNAME: {type:String},
	host: {type:String},
	STARTTIME: {type: String},
	hours: {type: Number},
	day: {type:Number},
	_count: {type:Number},
	MAX: {type:Number}
});

var methods = {
	
	list : function(option, cb) {
		this.find(option.filter||{}, option.colNames.join(' '))
			.sort(option.sort||{})
			.limit(option.prePage||option.limit||0)
			.skip(option.prePage?option.page*option.prePage:option.skip||0)
			.exec(cb)
	}

}

var clone = function(target, source) {
	for(var key in source) 
		target[key] = source[key]
}

clone(QueryResultSchema.statics, methods)

mongoose.model('QueryResult', QueryResultSchema);


