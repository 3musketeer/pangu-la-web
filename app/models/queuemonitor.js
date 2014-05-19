var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var queueSchema = new Schema({
    os_id: {type : ObjectId},
    time: {type: Number},
    data: [{
        name: {type: String},
        count: {type: Number}
    }]
});

mongoose.model('QueueMonitor', queueSchema);
//exports.QueueMonitor = mongoose.model('QueueMonitor');
