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
	  name: '实时流程异常量明细',
	  scopes: ['day'],
	  delayTime:2000,
	  displayLength:50,
		titles: [ '排名', '流程名', '次数' ],
		colNames: [ '#', 'TRANSCODE', '_count' ],
		filterColNames: ['TRANSCODE','STARTTIME','timestamp'],
		sort: {'MAX':-1}
	},
	
	TuxStateSvcDeadDetail : {
	  name: '实时服务僵死明细',
	  scopes: ['day'],
	  delayTime:2000,
	  displayLength:50,
		titles: ['排名','服务名', '主机', '统计时间'],
		colNames: ['#', 'SVRNAME', 'host', 'STARTTIME'],
		filterColNames: ['SVRNAME','STARTTIME','timestamp'],
		sort: {'MAX':-1}
	},
	
	TuxStateTimeOutTopSvcTimeOut : {
	  name: '实时服务超时明细',
	  scopes: ['day'],
	  delayTime:2000,
	  displayLength:50,
		titles: ['排名','服务名', '耗时(s)', '主机', '统计时间'],
		colNames: ['#', 'SVRNAME', 'MAX', 'host', 'STARTTIME'],
		filterColNames: ['SVRNAME', 'host', 'STARTTIME','timestamp'],
		sort: {'MAX':-1}
	},
	
	TuxStateCalledSumBySvc : {
	  name: '实时服务调用量明细',
	  scopes: ['day'],
	  delayTime:2000,
	  displayLength:50,
		titles: [ '排名', '服务名', '次数' ],
		colNames: [ '#', 'SVRNAME', '_count' ],
		filterColNames: ['SVRNAME','STARTTIME','timestamp'],
		sort: {'MAX':-1}
	},
	
	TuxStateCalledSumBySvc1 : {
	  name: '实时服务异常量明细',
	  scopes: ['day'],
	  delayTime:2000,
	  displayLength:50,
		titles: [ '排名', '服务名', '次数' ],
		colNames: [ '#', 'SVRNAME', '_count' ],
		filterColNames: ['SVRNAME','STARTTIME','timestamp'],
		sort: {'MAX':-1}
	}
}

exports.detailList = {  
	realtimeLcuTimeoutDetailList:[ {mode:'TuxState', type:'TimeOutTop',subtype:''}],
	realTimeLcuCalledSumChart:[ {mode:'TuxState', type:'CalledSum',subtype:'ByLcu'}],
	realTimeLcuFailSumChart:[ {mode:'TuxState', type:'CalledSum',subtype:'ByLcu1'}],
	realTimeSvcDeadDetailList:[ {mode:'TuxState', type:'SvcDead',subtype:'Detail'}],
	realTimeSvcTimeOutDetailList:[ {mode:'TuxState', type:'TimeOutTop',subtype:'SvcTimeOut'}],
	realTimeSvcCalledSumChart:[ {mode:'TuxState', type:'CalledSum',subtype:'BySvc'}],
	realTimeSvcFailedSumChart:[ {mode:'TuxState', type:'CalledSum',subtype:'BySvc1'}]
}
