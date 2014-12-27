var mongoose = require('mongoose')
    , logger = require('../../log').logger
    , qConfig = require('../../plugin_config/queue/config_queue').queue
    , mConfig = require('../../plugin_config/memory/config_memory').memory
    , extend = require('extend')
    , query = require('../../query')
    , QueueAnalyze = require('../../../models/queueanalyze')
    , QueueDetail = require('../../../models/queuedetail');

exports.plugin = function(server) {


    server.get('/queueReportAnalyze.html', function(req, res){
        var date = req.query.value;
        var hosts = qConfig.hosts;
        res.renderPjax('plugin/queueReport/queueReportAnalyze', {
            tabColNames: ['服务`队列', '队列配置', '队列深度(<5)', '队列深度(5-10)', '队列深度(10-20)',
                '队列深度(>20)', '总记录数', '最大使用', '建议配置','占用内存(MB/个)', '内存变化(MB)'],
            hosts: hosts,
            value: date
        });
    });

    // 获取报告数据
    server.get('/getReportQueueData', function(req, res){

        var host = req.query['host'],
            date = req.query['value'];

        var tab = qConfig.anaListTab[0],
            table = query.getTab('QueueAnalyze', tab, date, 2);

        var tabMem = mConfig.baseMemory[0],
            tableMem = query.getTab('memorymonitor', tabMem, date, 0),
            sumMem = 0;

        table.find({host: host}, {_id: 0, suggestion: 0}, function(err, rows){
            var results = [];
            for(var i=0; i< rows.length; i++) {
                var name = rows[i]['name'],
                    queue = rows[i]['queue'],
                    g1 = rows[i]['lt_5'],
                    g2 = rows[i]['m5-10'],
                    g3 = rows[i]['m10-20'],
                    g4 = rows[i]['ge20'],
                    overflow = rows[i]['overflow'],
                    sum = rows[i]['sum'],
                    serve = rows[i]['serve'],
                    max = rows[i]['max_queued'],
                    ratuse = 0;
                if(name == 'GWTDOMAIN' || name == 'TMS_ORA'){
                    continue;
                }
                if(serve > max){ //浪费==>情况一 : 配置队列数>实际队列数
                    rate1 = 1;
                }
                var queue_name = rows[i].name + '`' + rows[i].queue,
                    sug = 0,
                    mem_size = 8864,
                    change_mem = 0,
                    ch = 1,
                    rat1 = (g1/sum).toFixed(2),
                    rat2 = (g2/sum).toFixed(2);
                if (rat1 == 1 && overflow == 0) {
                    sug = sum <= 10 ? 1 : max;
                } else {
                    var gap = 0.05;
                    var rat = 0;
                    if (max < 10 || rat1 > 0.9) {
                        rat = ((1 - rat1)/gap) * 0.1;
                        sug = Math.ceil((rat1 >= 0.8 ? 5 : max) * (1+rat));
                    } else {
                        rat = ((1 - rat1 - rat2)/gap) * 0.05;
                        sug = Math.ceil(((parseFloat(rat1) + parseFloat(rat2)) >= 0.8 ? 10 : max) * (1+rat));
                    }
                }

                sug = sum <= 10 ? 1 : sug;
                sug = (sum > 10 && sum <= 20 && max < 5) ? max : sug;
                sug = sug > 20 ? 20 : sug;
                sug = sug == serve ? 0 : sug;
                /*tableMem.find({name: name, host: host}, function(err, rows){
                 var count_mem = 0,
                 sum_mem = 0;
                 for(var i=0; i<rows.length; i++){
                 if( name != 'GWTDOMAIN'){
                 count_mem += 1;
                 sum_mem += rows[i]['size'];
                 }
                 }
                 mem_size = (sum_mem / count_mem) * 4 / 1024 * ch; // 单位：MB,兆
                 });*/
                change_mem = ( serve - sug ) * mem_size * 4 / 1024 * -1;
                sumMem += change_mem;
                results.push({
                    queue_name: queue_name,
                    serve: serve,
                    lt_5: g1,
                    'm5-10': g2,
                    'm10-20': g3,
                    'ge20': g4,
                    sum: sum,
                    max_queued: max,
                    suggestion: sug,
                    mem_size: (mem_size * 4 /1024).toFixed(1),
                    change_mem: change_mem.toFixed(1)
                });
            }
            if(sumMem > 1024 || sumMem < 1024){
                sumMem = (sumMem / 1024).toFixed(1);
                sumMem = sumMem + ' GB';
            }else {
                sumMem = sumMem + ' MB';
            }
            results.push({
                queue_name: '内存总变化',
                serve: '',
                lt_5: '',
                'm5-10': '',
                'm10-20': '',
                'ge20': '',
                sum: '',
                max_queued: '',
                suggestion: '',
                mem_size: '',
                change_mem: sumMem
            })
            res.send(results);
        });
    });

}