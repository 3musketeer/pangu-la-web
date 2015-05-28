var scopeNames = {'day':'全省-日', 'month':'全省-月', 'year':'年'}


//柱状图配置
exports.barConfig = {
	
	TuxStateCalledSumByTimeByLcuByHostDay: {
		name: '流程调用量',
		displayType:'bar',
		mode:'TuxState',
		type:'CalledSumByLcuByHost',
		subtype:'',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'TRANSCODE', '_count'],
		filter: {},
		filterColNames: ['TRANSCODE'],
		statType:'LCU',
		sort: {'hours' : 1}
	},
	
	TuxStateCalledSumByTimeByLcuByHostMonth: {
		name: '流程调用量',
		displayType:'bar',
		mode:'TuxState',
		type:'CalledSumByLcuByHost',
		subtype:'',
		scopes: ['month'],
		scopeNames: scopeNames,
		colNames : [ 'TRANSCODE', '_count'],
		filter: {},
		filterColNames: ['TRANSCODE'],
		statType:'LCU',
		sort: {'day' : 1}
	},
	
	TuxStateCalledSumByTimeBySvrByHostDay: {
		name: '服务调用量',
		displayType:'bar',
		mode:'TuxState',
		type:'CalledSumBySvrByHost',
		subtype:'',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'SVRNAME', '_count'],
	    filter: {},
		filterColNames: ['SVRNAME'],
		statType:'SVR',
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeBySvrByHostMonth: {
		name: '服务调用量',
		displayType:'bar',
		mode:'TuxState',
		type:'CalledSumBySvrByHost',
		subtype:'',
		scopes: ['month'],
		scopeNames: scopeNames,
		colNames : [ 'SVRNAME', '_count'],
	    filter: {},
		filterColNames: ['SVRNAME'],
		statType:'SVR',
		sort: {'hours' : 1}
	}
	
}

exports.barList = {
    
  lcuCalledList:[ {mode:'TuxState', type:'CalledSumByLcuByHost',subtype:'Day'},{mode:'TuxState',type:'CalledSumByLcuByHost',subtype:'Month'}],
  //lcuFailedList:[ {mode:'TuxState', type:'FailedSumByTimeByLcu',subtype:'Day'},{mode:'TuxState', type:'FailedSumByTime',subtype:'ByLcuMonth'}],
  svcCalledList:[ {mode:'TuxState', type:'CalledSumBySvrByHost',subtype:'Day'},{mode:'TuxState', type:'CalledSumByLcuByHost',subtype:'Month'}]
  //svcFailedList:[ {mode:'TuxState', type:'FailedSumByTimeBySvr',subtype:'Day'},{mode:'TuxState', type:'FailedSumByTime',subtype:'BySvrMonth'}]

}


//排名配置

exports.topConfig = {
	
	TuxStateCalledSumByLcuByHostDay: {
		name: '流程调用量排名',
		displayType:'top',
		mode:'TuxState',
		type:'CalledSumByLcuByHost',
		subtype:'',
		scopes: ['day'],
		scopeNames: "全省-日",
		colNames : [ 'TRANSCODE', '_count' ], 
		filter : {TRANSCODE: {$exists: true}},
		sort: {'_count' : -1}
	},
	TuxStateCalledSumByLcuByHostMonth: {
		name: '流程调用量排名',
		displayType:'top',
		mode:'TuxState',
		type:'CalledSumByLcuByHost',
		subtype:'',
		scopes: ['month'],
		scopeNames: "全省-月",
		colNames : [ 'TRANSCODE', '_count' ], 
		filter : {TRANSCODE: {$exists: true}},
		sort: {'_count' : -1}
	},
	
	TuxStateCalledSumBySvrByHostDay: {
		name: '服务调用量排名',
		displayType:'top',
		mode:'TuxState',
		type:'CalledSumBySvrByHost',
		subtype:'',
		scopes: ['day'],
		scopeNames: "全省-日",
		colNames : [ 'SVRNAME', '_count' ], 
		filter : {SVRNAME: {$exists: true}},
		sort: {'_count' : -1}
	},
	TuxStateCalledSumBySvrByHostMonth: {
		name: '服务调用量排名',
		displayType:'top',
		mode:'TuxState',
		type:'CalledSumBySvrByHost',
		subtype:'',
		scopes: ['month'],
		scopeNames: "全省-月",
		colNames : [ 'SVRNAME', '_count' ], 
		filter : {SVRNAME: {$exists: true}},
		sort: {'_count' : -1}
	}
	
}

exports.topList =  {
    lcuCalledList:[ {mode:'TuxState', type:'CalledSumByLcuByHost',subtype:'Day'},{mode:'TuxState', type:'CalledSumByLcuByHost',subtype:'Month'}],
    //lcuFailedList:[ {mode:'TuxState', type:'FailedSumByLcu',subtype:'Day'},{mode:'TuxState', type:'FailedSumByLcu',subtype:'Month'}],
    svcCalledList:[ {mode:'TuxState', type:'CalledSumBySvrByHost',subtype:'Day'},{mode:'TuxState', type:'CalledSumBySvrByHost',subtype:'Month'}]
    //svcFailedList:[ {mode:'TuxState', type:'FailedSumBySvr',subtype:'Day'},{mode:'TuxState', type:'FailedSumBySvr',subtype:'Month'}]
}
