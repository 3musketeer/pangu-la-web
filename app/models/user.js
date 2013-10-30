/*
 * 用户资料
 *
 * */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
		user_id: {type : ObjectId},
    user_name : {type : String},
    password : {type : String},
    phone: {type : Number},
    email : {type : String},
    create_time : {type : Date, default : Date.now},
    update_time : {type: Date, default : Date.now}
});

mongoose.model('User',userSchema);
exports.User = mongoose.model('User');