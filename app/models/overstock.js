var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var overstockSchema = new Schema({
    os_id: {type : ObjectId},
    time: {type: Number},
    orderTypeName: {type : String},
    orderTypeCode: {type : String},
    count: {type: Number}
});

mongoose.model('Overstock', overstockSchema);
exports.Overstock = mongoose.model('Overstock');
