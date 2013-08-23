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
		name: '流程调用总量排名',
		scopes: ['day', 'month', 'year'],
		scopeNames: {'day':'日', 'month':'月', 'year':'年'},
		colNames : [ 'TRANSCODE', '_count' ], 
		filter : {TRANSCODE: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	}
}

exports.config = {
	TuxStateTimeOutTop : {
		titles: ['排名', '流程名', '耗时(s)', '归属服务', '主机', '统计时间'],
		colNames: ['#', 'TRANSCODE', 'MAX', 'SVRNAME', 'host', 'STARTTIME'],
		fields: 'TRANSCODE MAX SVRNAME host STARTTIME',
		sort: {'MAX':-1}
	},

	TuxStateCalledSumByLcu : {
		titles: [ '排名', '流程名', '次数' ],
		colNames: [ '#', 'TRANSCODE', '_count' ],
		filter : {TRANSCODE: {$exists: true}, host: 'all'},
		sort: {'_count' : -1}
	}
}
