var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	
	TuxStateCalledSumByTimeAt28: {
		name: '调用量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count', 'host' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['132.34.11.28','132.34.11.29']}},
		sort: {'hours' : 1}
	},
	
	TuxStateCalledSumByTimeAt28a: {
		name: '异常量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count', 'host' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['132.34.11.28','132.34.11.29']}},
		sort: {'hours' : 1}
	},

	TuxStateCalledSumByTimeAt29: {
		name: '服务进程数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count',  'host' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['132.34.11.28','132.34.11.29']}},
		sort: {'hours' : 1}
	}
}