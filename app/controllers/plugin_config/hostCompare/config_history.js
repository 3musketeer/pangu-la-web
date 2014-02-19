var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	
	TuxStateCalledSumByTimeAt28: {
		name: '调用量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'132.34.11.28'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},

	TuxStateCalledSumByTimeAt29: {
		name: '失败量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'132.34.11.29'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	
	TuxStateCalledSumByTimeAt291: {
		name: '失败量',
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
    

	historyLcuSumCompareChart:[ [{mode:'TuxState', type:'CalledSumByTime', subtype: 'At28',hostName: '主机28'},{mode:'TuxState', type:'CalledSumByTime', subtype: 'At29',hostName: '主机28'},{mode:'TuxState', type:'CalledSumByTime', subtype: 'At291',hostName: '主机28'}]
	                           ,[{mode:'TuxState', type:'CalledSumByTime', subtype: 'At28',hostName: '主机29'},{mode:'TuxState', type:'CalledSumByTime', subtype: 'At29',hostName: '主机29'}]
	                           ,[{mode:'TuxState', type:'CalledSumByTime', subtype: 'At28',hostName: '主机29'},{mode:'TuxState', type:'CalledSumByTime', subtype: 'At29',hostName: '主机29'}]
	                          ]
	                 
            
	
}