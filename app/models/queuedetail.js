var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var queueSchema = new Schema({
    qd_id: {type : ObjectId},
    name: {type: String},
    queue: {type: String},
    serve: {type: Number},
    queued: {type: Number},
    ave: {type: Number},
    time: {type: String},
    host: {type: String}
});

mongoose.model('QueueDetail', queueSchema);