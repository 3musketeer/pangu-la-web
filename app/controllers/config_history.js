var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	
	TuxStateCalledSumByTimeAt28: {
		name: '主机28',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'132.34.11.28'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},

	TuxStateCalledSumByTimeAt29: {
		name: '主机29',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'132.34.11.29'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	
	TuxStateCalledSumByTimeAtHours: {
		name: '调用总数(日)',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		color: "#f0471a",
		filterColNames: ['TRANSCODE'],
		sort: {'hours' : 1}
	},
	
	TuxStateCalledSumByTimeAtDay: {
		name: '调用总数',
		scopes: ['month'],
		scopeNames: scopeNames,
		colNames : [ 'day', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		color: "#46bb00",
		filterColNames: ['TRANSCODE'],
		sort: {'day' : 1}
	},
	
	TuxStateTimeOutTopHis : {
	  name: '历史流程超时明细',
	  scopes: ['day'],
	  displayLength:10,
		titles: ['排名','流程名', '耗时(s)', '归属服务', '主机', '统计时间'],
		colNames: ['#', 'TRANSCODE', 'MAX', 'SVRNAME', 'host', 'STARTTIME'],
		filterColNames: ['TRANSCODE', 'SVRNAME', 'host', 'STARTTIME'],
		sort: {'MAX':-1}
	}
	
}

exports.list = {
    
  historyLcuSumChart:[ [{mode:'TuxState', type:'CalledSumByTime', subtype: 'AtHours'}]
	                    ,[{mode:'TuxState', type:'CalledSumByTime', subtype: 'AtDay'}]
	                   ],
    
	historyLcuSumCompareChart:[ [{mode:'TuxState', type:'CalledSumByTime', subtype: 'At28'},{mode:'TuxState', type:'CalledSumByTime', subtype: 'At29'}]
	                           ,[{mode:'TuxState', type:'CalledSumByTime', subtype: 'At28'},{mode:'TuxState', type:'CalledSumByTime', subtype: 'At29'}]
	                          ],
	                  
  historyTopDetailList:[ {mode:'TuxState', type:'TimeOutTop',subtype:'His'}]
            
	
}