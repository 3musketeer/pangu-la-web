var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	
	TuxStateCalledSumByTimeAt28: {
		name: '197调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.197'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeAt29: {
		name: '198调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.198'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	
	TuxStateFailedSumByTimeAt28: {
		name: '197异常总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.197'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},

	TuxStateFailedSumByTimeAt29: {
		name: '198异常总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.198'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	
	TuxStateCalledSumByTimeBySvc1: {
		name: '服务qcscrm1l1server调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {TRANSCODE:{$exists:false},SVRNAME:'qcscrm1l1server'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeBySvc2: {
		name: '服务qcscrm1l2server调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {TRANSCODE:{$exists:false},SVRNAME:'qcscrm1l2server'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	}
	
}

exports.list = {
    

	historyLcuSumCompareChart:[ [   {mode:'TuxState', type:'CalledSumByTime', subtype: 'At28',hostName: '调用数'}
	                                ,{mode:'TuxState',type:'CalledSumByTime', subtype: 'At29',hostName: '调用数'}
	                            ]
	                           ,[   {mode:'TuxState', type:'FailedSumByTime', subtype: 'At28',hostName: '异常数'}
	                                ,{mode:'TuxState', type:'FailedSumByTime', subtype: 'At29',hostName: '异常数'}]
	                           ,[   {mode:'TuxState', type:'CalledSumByTime', subtype: 'BySvc1',hostName: '服务调用数'}
	                               ,{mode:'TuxState', type:'CalledSumByTime', subtype: 'BySvc2',hostName: '服务调用数'}
	                            ]
	                            ]
	                 
            
	
}