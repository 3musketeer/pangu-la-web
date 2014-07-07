var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	
	TuxStateCalledSumByTimeAt28: {
		name: '28调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'192.168.11.79'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeAt29: {
		name: '29调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'192.168.11.79'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	
	TuxStateFailedSumByTimeAt28: {
		name: '28异常总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'192.168.11.79'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},

	TuxStateFailedSumByTimeAt29: {
		name: '29异常总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'192.168.11.79'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	
	TuxStateQueueSumByTimeAt28: {
		name: '队列总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: true}, TRANSCODE:{$exists:false},host: {$nin: ['192.168.11.79','192.168.11.79']}},
		color: "#143a25",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateQueueSumByTimeAt29: {
		name: '队列总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: true}, TRANSCODE:{$exists:false},host: {$nin: ['192.168.11.79','192.168.11.79']}},
		color: "#143a25",
		filterColNames: [],
		sort: {'hours' : 1}
	}
	
}

exports.list = {
    

	historyLcuSumCompareChart:[ [{mode:'TuxState', type:'CalledSumByTime', subtype: 'At28',hostName: '调用数'},{mode:'TuxState', type:'CalledSumByTime', subtype: 'At29',hostName: '调用数'}]
	                           ,[{mode:'TuxState', type:'FailedSumByTime', subtype: 'At28',hostName: '异常数'},{mode:'TuxState', type:'FailedSumByTime', subtype: 'At29',hostName: '异常数'}]
	                           ,[{mode:'TuxState', type:'QueueSumByTime', subtype: 'At28',hostName: '队列'},{mode:'TuxState', type:'QueueSumByTime', subtype: 'At29',hostName: '队列'}]
	                          ]
	                 
            
	
}