var config = {
    Alarm3GESSBase: {
        name: '流程超时节点分析',
        scopes: ['day'],
        displayLength: 10,
        titles: ['时间', '流程信息', '时间差( ms )'],
        colNames: ['TIME', 'content', 'Time Diff'],
        textFields :  ['TIME', 'content', 'Time Diff'],
        filterColNames: [{'host':1, 'servicename':1, 'operatename':1, 'rspcode':1, '_id':0}],
        sort: {'timestamp': 1}
    }
}

var list = {
    alarm3GESSBaseList:[ {mode:'Alarm', type:'3GESS',subtype:'Base'}]
}

exports.config = config;