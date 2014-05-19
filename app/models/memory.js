var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var memorySchema = new Schema({
    time : {type : Number},
    user : {type : String},
    processId : {type : String},
    cpu: {type: Number},
    memory: {type: Number}
});

mongoose.model('memorymonitor',memorySchema);