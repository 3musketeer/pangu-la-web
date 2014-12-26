var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	
	TuxStateCalledSumByTimeAt197198: {
		name: 'ECS非缴费流程调用量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count', 'host' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['134.32.28.197','134.32.28.198']}},
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeAt4445: {
		name: 'ECS缴费流程调用量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count', 'host' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['134.32.28.44','134.32.28.45']}},
		sort: {'hours' : 1}
	},
	
	TuxStateFailedSumByTimeAt28a: {
		name: '流程异常量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count', 'host' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['134.32.28.139','134.32.28.141']}},
		sort: {'hours' : 1}
	},

	TuxStateCalledSumByTimeAt29: {
		name: '服务进程数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count',  'host' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['134.32.28.139','134.32.28.141']}},
		sort: {'hours' : 1}
	}
}