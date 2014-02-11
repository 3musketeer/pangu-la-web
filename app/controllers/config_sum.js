var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	TuxStateCalledSumByTimeAtHours: {
		name: '调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		sort: {'hours' : 1}
	},

	TuxStateCalledSumByTimeAtDay: {
		name: '调用总数',
		scopes: ['month'],
		scopeNames: scopeNames,
		colNames : [ 'day', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		sort: {'day' : 1}
	},

	TuxStateFailedSumByTimeAtHours: {
		name: '异常总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		sort: {'hours' : 1}
	},
		
	TuxStateFailedSumByTimeAtDay: {
		name: '异常总数',
		scopes: ['month'],
		scopeNames: scopeNames,
		colNames : [ 'day', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		sort: {'day' : 1}
	}

}


