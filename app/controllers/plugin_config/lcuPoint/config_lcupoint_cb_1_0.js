var config = {
    TuxLcuPointBase: {
        name: '流程超时节点分析',
        scopes: ['day'],
        displayLength: 10,
        titles: ['时间', '异常信息'],
        colNames: ['TIME', 'content'],
        textFields :  ['TIME', 'content'],
        filterColNames: [{'TIME':1, 'content':1, 'timestamp':1, '_id':0}],
        sort: {'timestamp':-1}
    }
}

var list = {
    lcuPointDayList:[ {mode:'TuxLcu', type:'Point',subtype:'Base'}]
}

exports.lcupoint = {
    textFields :  config.TuxLcuPointBase.textFields,
    textLabels : config.TuxLcuPointBase.titles,
    tabColNames : config.TuxLcuPointBase.titles,
    baseLcuPoint : list.lcuPointDayList
}

exports.list = list;

exports.config = config;