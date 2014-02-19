var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	TuxStateCalledSumByRealTimeAtDay: {
		name: '调用量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'timestamp', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:true},host:'132.34.11.29'},
		filterColNames: ['timestamp'],
		color: "#f0471a",
		delayTime:5000,
		sort: {'timestamp' : 1}
	},
	TuxStateCalledSumByRealTimeAt28: {
		name: '调用量1',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'timestamp', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:true},host:'132.34.11.28'},
		filterColNames: ['timestamp'],
		color: "#46bb00",
		delayTime:5000,
		sort: {'timestamp' : 1}
	}
}

exports.list = {
    
	realTimeLcuSumChart:[ {mode:'TuxState', type:'CalledSumByRealTime',subtype:'AtDay'}],
	realTimeLcuSumChart1:[ {mode:'TuxState', type:'CalledSumByRealTime',subtype:'AtDay'},{mode:'TuxState', type:'CalledSumByRealTime',subtype:'At28'}]

}