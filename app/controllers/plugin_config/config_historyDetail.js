var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	
	TuxStateTimeOutTopHis : {
	  name: '流程超时明细(日)',
	  scopes: ['day'],
	  displayLength:10,
		titles: ['排名','流程名', '耗时(s)', '归属服务', '主机', '统计时间'],
		colNames: ['#', 'TRANSCODE', 'MAX', 'SVRNAME', 'host', 'STARTTIME'],
		filterColNames: ['TRANSCODE', 'SVRNAME', 'host', 'STARTTIME'],
		sort: {'MAX':-1}
	},
	
	TuxStateTimeOutTopSvcTimeOut : {
	  name: '服务超时明细(日)',
	  scopes: ['day'],
	  displayLength:10,
		titles: ['排名','流程名', '耗时(s)', '归属服务', '主机', '统计时间'],
		colNames: ['#', 'TRANSCODE', 'MAX', 'SVRNAME', 'host', 'STARTTIME'],
		filterColNames: ['TRANSCODE', 'SVRNAME', 'host', 'STARTTIME'],
		sort: {'MAX':-1}
	}
	
}

exports.list = {
    
  historyTopDetailList:[ {mode:'TuxState', type:'TimeOutTop',subtype:'His'}],
  historySvcTimeOutDetailList:[ {mode:'TuxState', type:'TimeOutTop',subtype:'SvcTimeOut'}]

}