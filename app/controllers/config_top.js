exports.cfgTop = {
	TuxStateTimeOutTop: {
		name: '流程超时排名',
		scopes: ['day', 'month', 'year'],
		scopeNames: {'day':'日', 'month':'月', 'year':'年'},
		colNames : [ 'TRANSCODE', 'MAX' ], 
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
	}
	
}

exports.cfgDetail = {
	TuxStateTimeOutTop : {
		titles: ['排名','流程名', '耗时(s)', '归属服务', '主机', '统计时间'],
		colNames: ['#', 'TRANSCODE', 'MAX', 'SVRNAME', 'host', 'STARTTIME'],
		filterColNames: ['TRANSCODE', 'SVRNAME', 'host', 'STARTTIME'],
		sort: {'MAX':-1}
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
	}
	
}
