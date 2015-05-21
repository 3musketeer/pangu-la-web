var mongoose = require('mongoose')
    , logger = require('../../log').logger
    , extend = require('extend')
    , query = require('../../query');


exports.plugin = function(server) {

    server.get('/tenfzsj', function (req, res) {
        var date = req.query.value,
            host = req.query.host,
            transcode = req.query.TRANSCODE,
            startt = req.query.startt,
            endt = req.query.endt;
        mongoose.connection.db.collection('TuxStateBase20150520').count(function(err, cnt){
            res.send(cnt);
        });
    });

}