var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.collectTimeList = [1,2,3,4,5,6,7,8,9,10,12,15,20,21,25,30,35,40,60,90,120,150,180,210,240]

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
	ShowSvcCalledSum:[ {mode:'TuxState', type:'CalledSumByRealTime',subtype:'AtDay',value:'2014-02-18'}],
	ShowFailedSum:[ {mode:'TuxState', type:'CalledFailedByRealTime',subtype:'AtDay',value:'2014-02-18'}],
	ShowQueueSum:[ {mode:'TuxState', type:'CalledQueueByRealTime',subtype:'AtDay',value:'2014-02-18'}],
	ShowTimeOutSum:[ {mode:'TuxState', type:'CalledTimeOutSumByRealTime',subtype:'AtDay',value:'2014-02-18'}]
}