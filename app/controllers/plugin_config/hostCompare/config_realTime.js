//graph开头为曲线图配置，detail开头为明细配置，meter开头为仪表盘配置
var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.graphConfig = {
	TuxStateCalledSumByRealTimeAtDay: {
		name: '调用量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'timestamp', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:true},host:'132.34.11.29'},
		filterColNames: ['timestamp','TRANSCODE'],
		color: "#f0471a",
		delayTime:5000,
		collectTimeList: [30,60,90,120,150,180,210,240,270,300,330,360,390,420,450,480,510,540,570,600],
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
		collectTimeList: [30,60,90,120,150,180,210,240,270,300,330,360,390,420,450,480,510,540,570,600],
		sort: {'timestamp' : 1}
	}
}

exports.graphList = {
    
	realTimeLcuSumCompareChart:[
	                               [ {mode:'TuxState', type:'CalledSumByRealTime',subtype:'AtDay',value:'2014-02-18',hostName: '主机28'},{mode:'TuxState', type:'CalledSumByRealTime',subtype:'At28',value:'2014-02-18',hostName: '主机28'}],
	                               [ {mode:'TuxState', type:'CalledSumByRealTime',subtype:'AtDay',value:'2014-02-18',hostName: '主机29'},{mode:'TuxState', type:'CalledSumByRealTime',subtype:'At28',value:'2014-02-18',hostName: '主机29'}],
	                               [ {mode:'TuxState', type:'CalledSumByRealTime',subtype:'AtDay',value:'2014-02-18',hostName: '主机29'},{mode:'TuxState', type:'CalledSumByRealTime',subtype:'At28',value:'2014-02-18',hostName: '主机29'}]
	                           ]
}
