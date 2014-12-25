var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	
	TuxStateCalledSumByTimeAt28: {
		name: '139调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.139'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeAt29: {
		name: '141调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.141'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	
	TuxStateFailedSumByTimeAt28: {
		name: '139异常总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.139'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},

	TuxStateFailedSumByTimeAt29: {
		name: '141异常总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.141'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	
	TuxStateCalledSumByTimeBySvc1: {
		name: 'qcscrm1l1',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {TRANSCODE:{$exists:false},SVRNAME:'qcscrm1l1server'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeBySvc2: {
		name: 'tcscrm1l1',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {TRANSCODE:{$exists:false},SVRNAME:'tcscrm1l1server'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeBySvc3: {
		name: 'qamcbs1l1',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {TRANSCODE:{$exists:false},SVRNAME:'qamcbs1l1server'},
		color: "#FFB5C5",
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
	                               ,{mode:'TuxState', type:'CalledSumByTime', subtype: 'BySvc3',hostName: '服务调用数'}
	                            ]
	                            ]
	                 
            
	
}