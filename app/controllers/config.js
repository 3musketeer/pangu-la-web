

exports.config = {
	TuxStateTimeOutTop : {
		titles: ['排名', '流程名', '耗时(s)', '归属服务', '主机', '统计时间'],
		colNames: ['#', 'TRANSCODE', 'MAX', 'SVRNAME', 'host', 'STARTTIME'],
		filter: {}, 
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
