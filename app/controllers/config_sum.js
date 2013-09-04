exports.config = {
	TuxStateCalledSumByTimeAtHours: {
		name: '调用总数(天)',
		scopes: ['day'],
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		sort: {'hours' : 1}
	},

	TuxStateCalledSumByTimeAtDay: {
		scopes: ['month'],
		colNames : [ 'day', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		sort: {'day' : 1}
	},

	TuxStateFailedSumByTimeAtHours: {
		name: '异常总数(天)',
		scopes: ['day'],
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		sort: {'hours' : 1}
	}
		
}


