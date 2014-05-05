var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	
	TuxStateCalledSumByTimeAt28: {
		name: '调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'132.34.11.28'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},

	TuxStateFailedSumByTimeAt29: {
		name: '异常总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'132.34.11.29'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	
	TuxStateQueueSumByTimeAt291: {
		name: '队列总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: true}, TRANSCODE:{$exists:false},host: {$nin: ['132.34.11.28','132.34.11.29']}},
		color: "#143a25",
		filterColNames: [],
		sort: {'hours' : 1}
	}
	
}

exports.list = {
    

	historyLcuSumCompareChart:[ [{mode:'TuxState', type:'CalledSum', subtype: 'ByTimeAt28',hostName: '主机28'},{mode:'TuxState', type:'CalledSum', subtype: 'ByTimeAt29',hostName: '主机28'},{mode:'TuxState', type:'CalledSum', subtype: 'ByTimeAt291',hostName: '主机28'}]
	                           ,[{mode:'TuxState', type:'FailedSum', subtype: 'ByTimeAt28',hostName: '主机29'},{mode:'TuxState', type:'FailedSum', subtype: 'ByTimeAt29',hostName: '主机29'}]
	                           ,[{mode:'TuxState', type:'QueueSum', subtype: 'ByTimeAt28',hostName: '主机29'},{mode:'TuxState', type:'QueueSum', subtype: 'ByTimeAt29',hostName: '主机29'}]
	                          ]
	                 
            
	
}