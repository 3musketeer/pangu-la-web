var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	TuxStateCalledSumByTimeAtHours: {
		name: '流程调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		filterColNames: [],
		sort: {'hours' : 1}
	},

	TuxStateCalledSumByTimeAtDay: {
		name: '调用总数',
		scopes: ['month'],
		scopeNames: scopeNames,
		colNames : [ 'day', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		filterColNames: [],
		sort: {'day' : 1}
	},

	TuxStateFailedSumByTimeAtHours: {
		name: '流程异常总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		filterColNames: [],
		sort: {'hours' : 1}
	},
		
	TuxStateFailedSumByTimeAtDay: {
		name: '流程异常总数',
		scopes: ['month'],
		scopeNames: scopeNames,
		colNames : [ 'day', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		filterColNames: [],
		sort: {'day' : 1}
	},
	
	
	
	
	
	TuxStateCalledSumByTimeAtHours1: {
		name: '服务调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		filterColNames: [],
		sort: {'hours' : 1}
	},

	TuxStateCalledSumByTimeAtDay1: {
		name: '服务调用总数',
		scopes: ['month'],
		scopeNames: scopeNames,
		colNames : [ 'day', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		filterColNames: [],
		sort: {'day' : 1}
	},

	TuxStateFailedSumByTimeAtHours1: {
		name: '服务异常总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		filterColNames: [],
		sort: {'hours' : 1}
	},
		
	TuxStateFailedSumByTimeAtDay1: {
		name: '服务异常总数',
		scopes: ['month'],
		scopeNames: scopeNames,
		colNames : [ 'day', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		filterColNames: [],
		sort: {'day' : 1}
	}

}


exports.list = {
    
	lcuCalledSumChart:[{mode:'TuxState', type:'CalledSumByTime', subtype: 'AtHours'},
                    				 {mode:'TuxState', type:'CalledSumByTime', subtype: 'AtDay'},
                    				 {mode:'TuxState', type:'FailedSumByTime', subtype: 'AtHours'},
                    				 {mode:'TuxState', type:'FailedSumByTime', subtype: 'AtDay'}	],
  
  svcCalledSumChart:[{mode:'TuxState', type:'CalledSumByTime', subtype: 'AtHours1'},
            				 {mode:'TuxState', type:'CalledSumByTime', subtype: 'AtDay1'},
            				 {mode:'TuxState', type:'FailedSumByTime', subtype: 'AtHours1'},
            				 {mode:'TuxState', type:'FailedSumByTime', subtype: 'AtDay1'}	]

}

