var scopeNames = {'day':'全省-日', 'month':'全省-月', 'year':'年'}


//柱状图配置
exports.barConfig = {
	
	TuxStateCalledSumByTimeByLcuDay: {
		name: '流程调用总量',
		displayType:'bar',
		mode:'TuxState',
		type:'CalledSumByTime',
		subtype:'Atday',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count'], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:{$exists:false}},
		filterColNames: ['TRANSCODE'],
		statType:'LCU',
		sort: {'hours' : 1}
	},
	
	TuxStateCalledSumByTimeByLcuMonth: {
		name: '流程调用总量',
		displayType:'bar',
		mode:'TuxState',
		type:'CalledSumByTime',
		subtype:'Atday',
		scopes: ['month'],
		scopeNames: scopeNames,
		colNames : [ 'day', '_count'], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:{$exists:false}},
		filterColNames: ['TRANSCODE'],
		statType:'LCU',
		sort: {'day' : 1}
	},

	TuxStateFailedSumByTimeByLcuDay: {
		name: '流程调用异常总量',
		displayType:'bar',
		mode:'TuxState',
		type:'FailedSum',
		subtype:'Atday',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count'], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:{$exists:false}},
		filterColNames: ['TRANSCODE'],
		statType:'LCU',
		sort: {'hours' : 1}
	},
	TuxStateFailedSumByTimeByLcuMonth: {
		name: '流程调用异常总量',
		displayType:'bar',
		mode:'TuxState',
		type:'FailedSum',
		subtype:'Atday',
		scopes: ['month'],
		scopeNames: scopeNames,
		colNames : [ 'day', '_count'], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:{$exists:false}},
		filterColNames: ['TRANSCODE'],
		statType:'LCU',
		sort: {'hours' : 1}
	},
	
	TuxStateCalledSumByTimeBySvcDay: {
		name: '服务调用总量',
		displayType:'bar',
		mode:'TuxState',
		type:'CalledSumByTime',
		subtype:'Atday',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count'], 
	    filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:{$exists:false}},
		filterColNames: ['SVRNAME'],
		statType:'SVR',
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeBySvcMonth: {
		name: '服务调用总量',
		displayType:'bar',
		mode:'TuxState',
		type:'CalledSumByTime',
		subtype:'Atday',
		scopes: ['month'],
		scopeNames: scopeNames,
		colNames : [ 'day', '_count'], 
	    filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:{$exists:false}},
		filterColNames: ['SVRNAME'],
		statType:'SVR',
		sort: {'hours' : 1}
	},
	
	TuxStateFailedSumByTimeBySvcDay: {
		name: '服务异常量',
		displayType:'bar',
		mode:'TuxState',
		type:'CalledSumByTime',
		subtype:'Atday',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count'], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:{$exists:false}},
		filterColNames: ['SVRNAME'],
		statType:'SVR',
		sort: {'hours' : 1}
	},
	TuxStateFailedSumByTimeBySvcMonth: {
		name: '服务异常量',
		displayType:'bar',
		mode:'TuxState',
		type:'CalledSumByTime',
		subtype:'Atday',
		scopes: ['month'],
		scopeNames: scopeNames,
		colNames : [ 'day', '_count'], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:{$exists:false}},
		filterColNames: ['SVRNAME'],
		statType:'SVR',
		sort: {'hours' : 1}
	}
	
}

exports.barList = {
    
  lcuCalledSumList:[ {mode:'TuxState', type:'CalledSumByTime',subtype:'ByLcuDay'},{mode:'TuxState',type:'CalledSumByTime',subtype:'ByLcuMonth'}],
  lcuFailedSumList:[ {mode:'TuxState', type:'FailedSumByTime',subtype:'ByLcuDay'},{mode:'TuxState', type:'FailedSumByTime',subtype:'ByLcuMonth'}],
  svcCalledSumList:[ {mode:'TuxState', type:'CalledSumByTime',subtype:'BySvcDay'},{mode:'TuxState', type:'CalledSumByTime',subtype:'BySvcMonth'}],
  svcFailedSumList:[ {mode:'TuxState', type:'FailedSumByTime',subtype:'BySvcDay'},{mode:'TuxState', type:'FailedSumByTime',subtype:'BySvcMonth'}]

}


//排名配置

exports.topConfig = {
	
	TuxStateCalledSumByLcuDay: {
		name: '流程调用量排名',
		displayType:'top',
		mode:'TuxState',
		type:'CalledSum',
		subtype:'ByLcu',
		scopes: ['day'],
		scopeNames: "全省-日",
		colNames : [ 'TRANSCODE', '_count' ], 
		filter : {TRANSCODE: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},
	TuxStateCalledSumByLcuMonth: {
		name: '流程调用量排名',
		displayType:'top',
		mode:'TuxState',
		type:'CalledSum',
		subtype:'ByLcu',
		scopes: ['month'],
		scopeNames: "全省-月",
		colNames : [ 'TRANSCODE', '_count' ], 
		filter : {TRANSCODE: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},
	TuxStateFailedSumByLcuDay: {
		name: '流程异常量排名',
		displayType:'top',
		mode:'TuxState',
		type:'FailedSum',
		subtype:'ByLcu',
		scopes: ['day'],
		scopeNames: "全省-日",
		colNames: ['TRANSCODE', '_count'],
		filter: {TRANSCODE: {$exists: true}, host: 'all'},
        sort: {'_count' : -1}
	},
	TuxStateFailedSumByLcuMonth: {
		name: '流程异常量排名',
		displayType:'top',
		mode:'TuxState',
		type:'FailedSum',
		subtype:'ByLcu',
		scopes: ['month'],
		scopeNames: "全省-月",
		colNames: ['TRANSCODE', '_count'],
		filter: {TRANSCODE: {$exists: true}, host: 'all'},
        sort: {'_count' : -1}
	},
	
	TuxStateCalledSumBySvrDay: {
		name: '服务调用量排名',
		displayType:'top',
		mode:'TuxState',
		type:'CalledSum',
		subtype:'BySvr',
		scopes: ['day'],
		scopeNames: "全省-日",
		colNames : [ 'SVRNAME', '_count' ], 
		filter : {SVRNAME: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},
	TuxStateCalledSumBySvrMonth: {
		name: '服务调用量排名',
		displayType:'top',
		mode:'TuxState',
		type:'CalledSum',
		subtype:'BySvr',
		scopes: ['month'],
		scopeNames: "全省-月",
		colNames : [ 'SVRNAME', '_count' ], 
		filter : {SVRNAME: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},
	
	TuxStateFailedSumBySvrDay: {
		name: '服务异常量排名',
		displayType:'top',
		mode:'TuxState',
		type:'FailedSum',
		subtype:'BySvr',
		scopes: ['day'],
		scopeNames: "全省-日",
		colNames : [ 'SVRNAME', '_count' ], 
		filter : {SVRNAME: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},
	TuxStateFailedSumBySvrMonth: {
		name: '服务异常量排名',
		displayType:'top',
		mode:'TuxState',
		type:'FailedSum',
		subtype:'BySvr',
		scopes: ['month'],
		scopeNames: "全省-月",
		colNames : [ 'SVRNAME', '_count' ], 
		filter : {SVRNAME: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	}
	
}

exports.topList =  {
    lcuCalledSumList:[ {mode:'TuxState', type:'CalledSum',subtype:'ByLcuDay'},{mode:'TuxState', type:'CalledSum',subtype:'ByLcuMonth'}],
    lcuFailedSumList:[ {mode:'TuxState', type:'FailedSum',subtype:'ByLcuDay'},{mode:'TuxState', type:'FailedSum',subtype:'ByLcuMonth'}],
    svcCalledSumList:[ {mode:'TuxState', type:'CalledSum',subtype:'BySvrDay'},{mode:'TuxState', type:'CalledSum',subtype:'BySvrMonth'}],
    svcFailedSumList:[ {mode:'TuxState', type:'FailedSum',subtype:'BySvrDay'},{mode:'TuxState', type:'FailedSum',subtype:'BySvrMonth'}]
}
