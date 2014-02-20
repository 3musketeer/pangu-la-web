exports.detailConfig = {
    
	TuxStateTimeOutTop : {
	  name: '实时流程超时明细',
	  scopes: ['day'],
	  delayTime:2000,
	  displayLength:50,
		titles: ['排名','流程名', '耗时(s)', '归属服务', '主机', '统计时间'],
		colNames: ['#', 'TRANSCODE', 'MAX', 'SVRNAME', 'host', 'STARTTIME'],
		filterColNames: ['TRANSCODE', 'SVRNAME', 'host', 'STARTTIME','timestamp'],
		sort: {'MAX':-1}
	},
	
	TuxStateCalledSumByLcu : {
	  name: '实时流程调用量明细',
	  scopes: ['day'],
	  delayTime:2000,
	  displayLength:50,
		titles: [ '排名', '流程名', '次数' ],
		colNames: [ '#', 'TRANSCODE', '_count' ],
		filterColNames: ['TRANSCODE','STARTTIME','timestamp'],
		sort: {'MAX':-1}
	},
	
	TuxStateCalledSumByLcu1 : {
	  name: '实时异常量明细',
	  scopes: ['day'],
	  delayTime:2000,
	  displayLength:50,
		titles: [ '排名', '流程名', '次数' ],
		colNames: [ '#', 'TRANSCODE', '_count' ],
		filterColNames: ['TRANSCODE','STARTTIME','timestamp'],
		sort: {'MAX':-1}
	}
}

exports.detailList = {  
	realtimeLcuTimeoutDetailList:[ {mode:'TuxState', type:'TimeOutTop',subtype:''}],
	realTimeLcuCalledSumChart:[ {mode:'TuxState', type:'CalledSum',subtype:'ByLcu'}],
	realTimeLcuFailSumChart:[ {mode:'TuxState', type:'CalledSum',subtype:'ByLcu1'}]
}
