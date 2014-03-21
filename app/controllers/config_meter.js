var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	
	TuxStateCalledSumByTimeAtHours0: {
		name: '工单积压',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : ['_count'], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},hours: 10},
		max: 500000,
		interval: 50000,
		interval: 50000,
		endValue1: 150000,
		endValue2: 300000,
		endValue3: 500000,
		sort: {'hours' : 1}
	},
	
	TuxStateCalledSumByTimeAtHours1: {
		name: '服务队列积压',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : ['_count'], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},hours: 16},
		max: 500000,
		interval: 50000,
		endValue1: 150000,
		endValue2: 300000,
		endValue3: 500000,
		sort: {'hours' : 1}
	},
	
	TuxStateCalledSumByTimeAtHours2: {
		name: '工单失败率',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : ['_count'], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},hours: 12},
		max: 500000,
		interval: 50000,
		endValue1: 150000,
		endValue2: 300000,
		endValue3: 500000,
		sort: {'hours' : 1}
	}
}