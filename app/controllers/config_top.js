exports.cfgTop = {
	TuxStateTimeOutTop: {
		name: '流程超时排名',
		scopes: ['day', 'month', 'year'],
		scopeNames: {'day':'日', 'month':'月', 'year':'年'},
		colNames : [ 'TRANSCODE', 'MAX' ], 
		filter : {TRANSCODE: {$not : /^ITF/} }, 
		fixed: 2,
		sort: {'MAX' : -1}
	},

	TuxStateCalledSumByLcu: {
		name: '流程调用量排名',
		scopes: ['day', 'month', 'year'],
		scopeNames: {'day':'日', 'month':'月', 'year':'年'},
		colNames : [ 'TRANSCODE', '_count' ], 
		filter : {TRANSCODE: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},

	TuxStateFailedSumByLcu: {
		name: '流程异常量排名',
		scopes: ['day', 'month', 'year'],
		scopeNames: {'day':'日', 'month':'月', 'year':'年'},
		colNames: ['TRANSCODE', '_count'],
		filter: {TRANSCODE: {$exists: true}, host: 'all'},
        sort: {'_count' : -1}
	},

	TuxStateAllTimeByLcu : {
		name: '流程总时长排名',
		scopes: ['day', 'month', 'year'],
		scopeNames: {'day':'日', 'month':'月', 'year':'年'},
		colNames: ['TRANSCODE', '_count'],
		filter: {TRANSCODE: {$exists: true}, host: 'all'},
        sort: {'_count' : -1}
	},

	TuxStateAllTimeBySvr : {
		name: '服务总时长排名',
		scopes: ['day', 'month', 'year'],
		scopeNames: {'day':'日', 'month':'月', 'year':'年'},
		colNames: ['SVRNAME', '_count'],
		filter: {SVRNAME: {$exists: true}, host: 'all'},
        sort: {'_count' : -1}
	},

	TuxStateCalledSumBySvr: {
		name: '服务调用量排名',
		scopes: ['day', 'month', 'year'],
		scopeNames: {'day':'日', 'month':'月', 'year':'年'},
		colNames : [ 'SVRNAME', '_count' ], 
		filter : {SVRNAME: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},

	TuxStateFailedSumBySvr: {
		name: '服务异常量排名',
		scopes: ['day', 'month', 'year'],
		scopeNames: {'day':'日', 'month':'月', 'year':'年'},
		colNames: ['SVRNAME', '_count'],
		filter: {SVRNAME: {$exists: true}, host: 'all'},
        sort: {'_count' : -1}
	},
	
	TuxAnalysisByLcu: {
		name: '流程优化分析',
		scopes: ['day', 'month', 'year'],
		scopeNames: {'day':'日', 'month':'月', 'year':'年'},
		colNames : [ 'TRANSCODE','MAX','CALLED' ], 
		fixed: 2,
		sort: {'CALLED':-1,'MAX' : -1},
		collection: 'TuxStateTimeOutTop'
	}
}

exports.cfgDetail = {
	TuxStateTimeOutTop : {
		titles: ['排名','流程名', '耗时(s)', '归属服务', '主机', '统计时间'],
		colNames: ['#', 'TRANSCODE', 'MAX', 'SVRNAME', 'host', 'STARTTIME'],
		filterColNames: ['TRANSCODE', 'SVRNAME', 'host', 'STARTTIME'],
		filter : {TRANSCODE: {$not : /^ITF/} },
		sort: {'MAX':-1,'host':1}
	},

	TuxStateCalledSumByLcu : {
		titles: [ '排名', '流程名', '次数' ],
		colNames: [ '#', 'TRANSCODE', '_count' ],
		filterColNames: ['TRANSCODE'],
		filter : {TRANSCODE: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},
	
	TuxStateFailedSumByLcu: {
		titles: [ '排名', '流程名', '次数' ],
		colNames: [ '#', 'TRANSCODE', '_count' ],
		filterColNames: ['TRANSCODE'],
		filter : {TRANSCODE: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},
	
	TuxStateAllTimeByLcu: {
		titles: [ '排名', '流程名', '总时长' ],
		colNames: [ '#', 'TRANSCODE', '_count' ],
		filterColNames: ['TRANSCODE'],
		filter : {TRANSCODE: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},
	
	TuxStateCalledSumBySvr: {
		titles: [ '排名', '服务名', '次数' ],
		colNames: [ '#', 'SVRNAME', '_count' ],
		filterColNames: ['SVRNAME'],
		filter : {SVRNAME: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},
	
	TuxStateAllTimeBySvr: {
		titles: [ '排名', '服务名', '总时长' ],
		colNames: [ '#', 'SVRNAME', '_count' ],
		filterColNames: ['SVRNAME'],
		filter : {SVRNAME: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},
	
	TuxStateFailedSumBySvr: {
		titles: [ '排名', '服务名', '次数' ],
		colNames: [ '#', 'SVRNAME', '_count' ],
		filterColNames: ['SVRNAME'],
		filter : {SVRNAME: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	},
	
	TuxAnalysisByLcu : {
		titles: ['排名','流程名', '调用次数','耗时(s)', '归属服务', '主机', '统计时间'],
		colNames: ['#', 'TRANSCODE','CALLED', 'MAX', 'SVRNAME', 'host', 'STARTTIME'],
		filterColNames: ['TRANSCODE', 'CALLED', 'host', 'STARTTIME'],
		sort: {'CALLED':-1,'MAX' : -1},
		collection: 'TuxStateTimeOutTop'
	},
	
	TuxStateFailedListByLcu: {
		titles: ['编号','流程名', '归属服务', '主机'],
		colNames: ['#','TRANSCODE','SVRNAME', 'host' ],
		filterColNames: ['TRANSCODE', 'SVRNAME'],
		sort: {'TRANSCODE' : -1}
	},
	
	TuxStateFailedErrorDetailByLcu: {    
        titles: ['编号','流程名', '错误明细'],
		colNames: ['#','TRANSCODE','ERRORDETAIL'],
		filterColNames: ['TRANSCODE', 'ERRORDETAIL'],
		sort: {'TRANSCODE' : -1}
	},
	
	TuxStateVisitCount : {
		titles: ['模块名','模块地址' , '访问量','操作'],
		colNames: ['name','URL','count','count']
	},
}


exports.moduleName = {
    '/index.html':'首页',
    //'/orderOverstock.html?chartList=lineChart':'工单积压',
    '/historyQueryDetail.html?chartList=historyTopDetailList':'流程超时(历史)',
    '/realtimeQueryDetail.html?chartList=realtimeLcuTimeoutDetailList':'流程超时(实时)',
    '/lcuCalledSum.html?chartList=lcuCalledSumList':'流程调用量(历史)',
    '/historyQueryDetail.html?chartList=lcuTimeTopAnalyseRate':'超时流程分析',
    '/lcuCalledSum.html?chartList=lcuFailedSumList':'流程调用异常',
    '/sumList.html?chartList=lcuCalledSumChart':'流程调用成功率',
    '/historyComPareGraph.html?chartList=historyLcuSumCompareChart':'主机对比',
    '/queueMonitorHis.html':'服务队列(历史)',
    '/queueMonitor.html':'服务队列(实时)',
    //'/realtimeQueryDetail.html?chartList=realTimeSvcDeadDetailList':'服务僵死',
    '/memoryMonitor.html?chartList=realMemory':'内存占用',
    '/historyQueryDetail.html?chartList=historySvcTimeOutDetailList':'服务超时(历史)',
    '/realtimeQueryDetail.html?chartList=realTimeSvcTimeOutDetailList':'服务超时(实时)',
    '/lcuCalledSum.html?chartList=svcCalledSumList':'服务调用总量',
    '/lcuCalledSum.html?chartList=svcFailedSumList':'服务调用异常',
    '/getAllMail.html':'邮件警告'
    
}