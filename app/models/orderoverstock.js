var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var orderoverstockSchema = new Schema({
    os_id: {type : ObjectId},
    time: {type: Number},
    orderTypeName: {type : String},
    orderTypeCode: {type : String},
    count: {type: Number}
});

mongoose.model('orderoverstock', orderoverstockSchema);
//exports.orderoverstock = mongoose.model('orderoverstock');