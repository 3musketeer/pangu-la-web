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
		titles: ['排名','服务名', '耗时(s)', '主机', '统计时间'],
		colNames: ['#', 'SVRNAME', 'MAX',  'host', 'STARTTIME'],
		filterColNames: ['SVRNAME', 'host', 'STARTTIME'],
		sort: {'MAX':-1}
	},
	
	TuxStateTimeOutStatHis : {
	  name: '超时比例大于10%流程分析',
	  scopes: ['day'],
	  displayLength:10,
	  queryType:'mapreduce',
		titles: ['流程名', '调用总数', '平均时间>10s调用数', '平均时间>5s调用数','平均时间>2s调用数', '>2s占比', '总记录数','最大耗时>10s记录数','最大耗时>5s记录数','最大耗时>2s记录数','>2s占比','主机'],
		colNames: ['TRANSCODE', 'calledsum','avg_gt_10s','avg_gt_5s','avg_gt_2s','avg_gt_2s_rate','count','max_gt_10s','max_gt_5s','max_gt_2s','max_gt_2s_rate','host']
	},
	
	TuxStateTimeOutStatHisRate : {
	  name: '超时流程分析',
	  scopes: ['day'],
	  displayLength:10,
		titles: ['流程名', '调用总数', '平均时间>60s调用数','平均时间>30s调用数', '平均时间>5s调用数','平均时间>2s调用数', '>2s占比', '总记录数','最大耗时>60s记录数','最大耗时>30s记录数','最大耗时>5s记录数','最大耗时>2s记录数','>2s占比','主机'],
		colNames: ['TRANSCODE', 'avgcount','avg_gt_60s','avg_gt_30s','avg_gt_5s','avg_gt_2s','avg_gt_2s_rate','maxcount','max_gt_60s','max_gt_30s','max_gt_5s','max_gt_2s','max_gt_2s_rate','host'],
		filterColNames: ['TRANSCODE','host'],
		sort: {'avg_gt_2s':-1}
	}
	
}

exports.list = {
    
  historyTopDetailList:[ {mode:'TuxState', type:'TimeOutTop',subtype:'His'}],
  historySvcTimeOutDetailList:[ {mode:'TuxState', type:'TimeOutTop',subtype:'SvcTimeOut'}],
  lcuTimeTopAnalyse:[ {mode:'TuxState', type:'TimeOutStat',subtype:'His'}],
  lcuTimeTopAnalyseRate:[ {mode:'TuxState', type:'TimeOutStat',subtype:'HisRate'}],

}