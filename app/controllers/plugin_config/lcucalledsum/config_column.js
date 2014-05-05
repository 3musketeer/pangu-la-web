var scopeNames = {'day':'日', 'month':'月', 'year':'年'}


//柱状图配置
exports.barConfig = {
	
	TuxStateCalledSumByTimeAtday: {
		name: '流程调用总量',
		displayType:'bar',
		mode:'TuxState',
		type:'CalledSumByTime',
		subtype:'Atday',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count'], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		filterColNames: ['TRANSCODE'],
		statType:'LCU',
		sort: {'hours' : 1}
	},
	TuxStateFailedSumAtday: {
		name: '流程调用异常总量',
		displayType:'bar',
		mode:'TuxState',
		type:'FailedSum',
		subtype:'Atday',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count'], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		filterColNames: ['TRANSCODE'],
		statType:'LCU',
		sort: {'hours' : 1}
	},
	
	TuxStateCalledSumBySvc: {
		name: '服务调用总量',
		displayType:'bar',
		mode:'TuxState',
		type:'CalledSumByTime',
		subtype:'Atday',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count'], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		filterColNames: ['SVRNAME'],
		statType:'SVR',
		sort: {'hours' : 1}
	},
	
	TuxStateFailedSumBySvc: {
		name: '服务异常量',
		displayType:'bar',
		mode:'TuxState',
		type:'CalledSumByTime',
		subtype:'Atday',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count'], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		filterColNames: ['SVRNAME'],
		statType:'SVR',
		sort: {'hours' : 1}
	}
	
}

exports.barList = {
    
  lcuCalledSumList:[ {mode:'TuxState', type:'CalledSumByTime',subtype:'Atday'}],
  lcuFailedSumList:[ {mode:'TuxState', type:'FailedSum',subtype:'Atday'}],
  svcCalledSumList:[ {mode:'TuxState', type:'CalledSum',subtype:'BySvc'}],
  svcFailedSumList:[ {mode:'TuxState', type:'FailedSum',subtype:'BySvc'}]

}


//排名配置

exports.topConfig = {
	
	TuxStateCalledSumByLcu: {
		name: '流程调用量排名',
		displayType:'top',
		mode:'TuxState',
		type:'CalledSum',
		subtype:'ByLcu',
		scopes: ['day'],
		scopeNames: {'day':'日'},
		colNames : [ 'TRANSCODE', '_count' ], 
		filter : {TRANSCODE: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},
	TuxStateFailedSumByLcu: {
		name: '流程异常量排名',
		displayType:'top',
		mode:'TuxState',
		type:'FailedSum',
		subtype:'ByLcu',
		scopes: ['day'],
		scopeNames: {'day':'日'},
		colNames: ['TRANSCODE', '_count'],
		filter: {TRANSCODE: {$exists: true}, host: 'all'},
    sort: {'_count' : -1}
	},
	
	TuxStateCalledSumBySvr: {
		name: '服务调用量排名',
		displayType:'top',
		mode:'TuxState',
		type:'FailedSum',
		subtype:'ByLcu',
		scopes: ['day'],
		scopeNames: {'day':'日'},
		colNames : [ 'SVRNAME', '_count' ], 
		filter : {SVRNAME: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},
	
	TuxStateFailedSumBySvr: {
		name: '服务异常量排名',
		scopes: ['day', 'month', 'year'],
		scopeNames: {'day':'日', 'month':'月', 'year':'年'},
		colNames: ['SVRNAME', '_count'],
		filter: {SVRNAME: {$exists: true}, host: 'all'},
    sort: {'_count' : -1}
	}
}

exports.topList =  {
    lcuCalledSumList:[ {mode:'TuxState', type:'CalledSum',subtype:'ByLcu'}],
    lcuFailedSumList:[ {mode:'TuxState', type:'FailedSum',subtype:'ByLcu'}],
    svcCalledSumList:[ {mode:'TuxState', type:'CalledSum',subtype:'BySvr'}],
    svcFailedSumList:[ {mode:'TuxState', type:'FailedSum',subtype:'BySvr'}]
}
