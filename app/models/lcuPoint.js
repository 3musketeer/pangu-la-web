var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var queueSchema = new Schema({
    _id: {type : ObjectId},
    PID: {type: Number},
    host: {type: String},
    TIME: {type: String},
    TRANSCODE: {type: String},
    content: {type: String},
    timestamp: {type: Number}
});

mongoose.model('LcuPoint', queueSchema);