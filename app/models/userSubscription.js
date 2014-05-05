/*
 * 用户订阅
 *
 * */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSubscription = new Schema({
    user_name : {type : String},
    SubscripType : {type : String},
    state : {type : String},
    start_date : {type : Date, default : Date.now},
    end_date :{type : Date, default : Date.now}
});

mongoose.model('UserSubscription',userSubscription);