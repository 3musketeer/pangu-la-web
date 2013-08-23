
/**
 * Module dependencies.
 * TuxState 
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 * TuxStateTimeOutTop Schema
 */

var TuxStateTimeOutTopSchema = new Schema({
	TRANSCODE: {type:String, default:''},
	MAX: {type:Number, default: 0},
	SVRNAME: { type: String, default: ''},
	host: {type: String, default: ''},
	STARTTIME: {type: String, default: ''}
})

var TuxStateCalledSumSchema = new Schema({
	TRANSCODE: {type:String},
    SVRNAME: {type:String},
	_count: {type:Number},
	host: {type: String}
})

var TuxStateFailedSumSchema = new Schema({
	TRANSCODE: {type:String},
    SVRNAME: {type:String},
	_count: {type:Number},
	host: {type: String}
})

var TuxStateAllTimeSchema = new Schema({
	TRANSCODE: {type:String},
    SVRNAME: {type:String},
	_count: {type:Number},
	host: {type: String}
})

var methods = {
	top : function() {

	},

	list: function(option, cb) {
		this.find(option.filter||{}, option.fields||'')
			.sort(option.sort||{})
			.limit(option.prePage||option.limit||100)
			.skip(option.prePage?option.page*option.prePage:option.skip||0)
			.exec(cb);
	}
}

var clone = function(target, source) {
	for(var key in source) 
		target[key] = source[key]
}

clone(TuxStateTimeOutTopSchema.statics, methods);
clone(TuxStateCalledSumSchema.statics, methods);
clone(TuxStateFailedSumSchema.statics, methods);
clone(TuxStateAllTimeSchema.statics, methods);

mongoose.model('TuxStateTimeOutTop', TuxStateTimeOutTopSchema)
mongoose.model('TuxStateCalledSum', TuxStateCalledSumSchema)
mongoose.model('TuxStateFailedSum', TuxStateFailedSumSchema)
mongoose.model('TuxStateAllTime', TuxStateAllTimeSchema)
