var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.graphConfig = {
	TuxStateCalledSumByRealTimeAtDay: {
		name: '调用量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'timestamp', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:true}},
		filterColNames: ['timestamp','host'],
		color: "#f0471a",
		delayTime:5000,
		sort: {'timestamp' : 1}
	}
}

exports.graphList = {   
	ShowSvcCalledSum:[ {mode:'TuxState', type:'CalledSumByRealTime',subtype:'AtDay',value:'2014-02-18'}]
}