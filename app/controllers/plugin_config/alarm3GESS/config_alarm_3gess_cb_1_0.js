var config = {
    Alarm3GESSBase: {
        name: "3GESS 分析",
        scopes: ['day'],
        displayLength: 10,
        titles: ['时间', '流程信息', '时间差( ms )'],
        colNames: ['TIME', 'content', 'Time Diff'],
        textFields :  ['TIME', 'content', 'Time Diff'],
        filterColNames: [{'host':1, 'servicename':1, 'operatename':1, 'rspcode':1, '_id':0}],
        sort: {'timestamp': 1}
    },

    Alarm3GESSGroup: {
        scopes: ['day'],
        displayLength: 10,
        textFields :  ['TIME', 'content', 'Time Diff'],
        filterColNames: [{'host':1, 'servicename':1, 'operatename':1, 'rspcode':1, '_id':0}],
        filterOperate: {'operatename': {$exists: true}},
        filterService: {'servicename': {$exists: true}},
        sort: {'timestamp': 1},
        tabColNames_CODE: ['servicename', 'operatename', 'rspcode', '出现次数', '占比(%)'],
        tabColNames_DESC: ['rspdesc', '出现次数', '占比(%)'],
        hosts: ['all','10.161.2.141_builder'],
        codeAnddesc: []
    },

    AlarmWS3GHTTPBase: {
        name: "3G_HTTP 分析",
        scopes: ['day'],
        displayLength: 10,
        titles: ['时间', '流程信息', '时间差( ms )'],
        colNames: ['TIME', 'content', 'Time Diff'],
        textFields :  ['TIME', 'content', 'Time Diff'],
        filterColNames: [{'host':1, 'servicename':1, 'operatename':1, 'rspcode':1, '_id':0}],
        sort: {'timestamp': 1}
    },

    AlarmWS3GHTTPGroup: {
        scopes: ['day'],
        displayLength: 10,
        textFields :  ['TIME', 'content', 'Time Diff'],
        filterColNames: [{'host':1, 'servicename':1, 'operatename':1, 'rspcode':1, '_id':0}],
        filterOperate: {'operatename': {$exists: true}},
        filterService: {'servicename': {$exists: true}},
        sort: {'timestamp': 1},
        tabColNames_CODE: ['servicename', 'operatename', 'rspcode', '出现次数', '占比(%)'],
        tabColNames_DESC: ['rspdesc', '出现次数', '占比(%)'],
        hosts: ['all','10.161.2.141_builder'],
        codeAnddesc: []
    },

    AlarmWSCUSTBase: {
        name: "CUST 分析",
        scopes: ['day'],
        displayLength: 10,
        titles: ['时间', '流程信息', '时间差( ms )'],
        colNames: ['TIME', 'content', 'Time Diff'],
        textFields :  ['TIME', 'content', 'Time Diff'],
        filterColNames: [{'host':1, 'servicename':1, 'operatename':1, 'rspcode':1, '_id':0}],
        sort: {'timestamp': 1}
    },

    AlarmWSCUSTGroup: {
        scopes: ['day'],
        displayLength: 10,
        textFields :  ['TIME', 'content', 'Time Diff'],
        filterColNames: [{'host':1, 'servicename':1, 'operatename':1, 'rspcode':1, '_id':0}],
        filterOperate: {'operatename': {$exists: true}},
        filterService: {'servicename': {$exists: true}},
        sort: {'timestamp': 1},
        tabColNames_CODE: ['servicename', 'operatename', 'rspcode', '出现次数', '占比(%)'],
        tabColNames_DESC: ['rspdesc', '出现次数', '占比(%)'],
        hosts: ['all','10.161.2.141_builder'],
        codeAnddesc: []
    },

    AlarmWSCBSSBase: {
        name: "CBSS 分析",
        scopes: ['day'],
        displayLength: 10,
        titles: ['时间', '流程信息', '时间差( ms )'],
        colNames: ['TIME', 'content', 'Time Diff'],
        textFields :  ['TIME', 'content', 'Time Diff'],
        filterColNames: [{'host':1, 'servicename':1, 'operatename':1, 'rspcode':1, '_id':0}],
        sort: {'timestamp': 1}
    },

    AlarmWSCBSSGroup: {
        scopes: ['day'],
        displayLength: 10,
        textFields :  ['TIME', 'content', 'Time Diff'],
        filterColNames: [{'host':1, 'servicename':1, 'operatename':1, 'rspcode':1, '_id':0}],
        filterOperate: {'operatename': {$exists: true}},
        filterService: {'servicename': {$exists: true}},
        sort: {'timestamp': 1},
        tabColNames_CODE: ['servicename', 'operatename', 'rspcode', '出现次数', '占比(%)'],
        tabColNames_DESC: ['rspdesc', '出现次数', '占比(%)'],
        hosts: ['all','10.161.2.141_builder'],
        codeAnddesc: []
    }
}

var list = {
    alarm3GESSBaseList:[ {mode:'Alarm', type:'3GESS',subtype:'Base'}],
    alarm3GESSGroupList:[ {mode:'Alarm', type:'3GESS',subtype:'Group'}],
    alarmWS3GHTTPBaseList:[ {mode:'AlarmWS', type:'3GHTTP',subtype:'Base'}],
    alarmWS3GHTTPGroupList:[ {mode:'AlarmWS', type:'3GHTTP',subtype:'Group'}],
    alarmWSCUSTBaseList:[ {mode:'AlarmWS', type:'CUST',subtype:'Base'}],
    alarmWSCUSTGroupList:[ {mode:'AlarmWS', type:'CUST',subtype:'Group'}],
    alarmWSCBSSBaseList:[ {mode:'AlarmWS', type:'CBSS',subtype:'Base'}],
    alarmWSCBSSGroupList:[ {mode:'AlarmWS', type:'CBSS',subtype:'Group'}]
}

exports.config = config;
exports.list = list;