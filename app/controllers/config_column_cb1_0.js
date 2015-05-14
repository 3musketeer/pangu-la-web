var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	
	TuxStateCalledSumByTimeByHostAt197198: {
		name: 'ECS非缴费流程调用量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count', 'host' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['10.161.2.107_tuxapp1','10.161.2.107_tuxapp2']}},
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt4445: {
		name: 'ECS缴费流程调用量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count', 'host' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['10.161.2.107_tuxapp1','10.161.2.107_tuxapp2',
			'10.161.2.108_tuxapp1', '10.161.2.108_tuxapp2',
			'10.161.2.109_tuxapp3', '10.161.2.109_tuxapp4',
			'10.161.2.110_tuxapp3', '10.161.2.110_tuxapp4',
			'10.161.2.231_tuxapp1', '10.161.2.231_tuxapp2',
			'10.161.2.232_tuxapp3', '10.161.2.232_tuxapp4']}},
		sort: {'hours' : 1}
	},
	
	TuxStateFailedSumByTimeByHostAt28a: {
		name: '流程异常量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count', 'host' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['134.32.28.139','134.32.28.141']}},
		sort: {'hours' : 1}
	},

	TuxStateCalledSumByTimeByHostAt29: {
		name: '服务进程数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count',  'host' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['134.32.27.130','134.32.28.141']}},
		sort: {'hours' : 1}
	}
}