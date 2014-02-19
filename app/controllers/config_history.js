var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	
	TuxStateCalledSumByTimeAt28: {
		name: '主机28',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'132.34.11.28'},
		color: "#f0471a",
		filterColNames: [],
		sort: {'hours' : 1}
	},

	TuxStateCalledSumByTimeAt29: {
		name: '主机29',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'132.34.11.29'},
		color: "#46bb00",
		filterColNames: [],
		sort: {'hours' : 1}
	}
	
}

exports.list = {
    
	historyLcuSumChart:[ [{mode:'TuxState', type:'CalledSumByTime', subtype: 'At28'},{mode:'TuxState', type:'CalledSumByTime', subtype: 'At29'}]
	                    ,[{mode:'TuxState', type:'CalledSumByTime', subtype: 'At28'},{mode:'TuxState', type:'CalledSumByTime', subtype: 'At29'}]]
	
}