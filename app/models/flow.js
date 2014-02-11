/*
 * 事件流
 *
 * */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var flowSchema = new Schema({
    flowId : {type : String},
    flowInfo : {type : Object},
    flowDesc : {type : String}
});

mongoose.model('FlowInfo',flowSchema);