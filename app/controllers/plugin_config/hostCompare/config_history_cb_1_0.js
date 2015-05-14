var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	
	TuxStateCalledSumByTimeByHostAt112: {
		name: '10.161.2.112调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['10.161.2.112_tuxapp5','10.161.2.112_tuxapp6']}},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt113: {
		name: '10.161.2.113调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['10.161.2.113_tuxapp7','10.161.2.113_tuxapp8']}},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt233: {
		name: '10.161.2.233调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['10.161.2.233_tuxapp5','10.161.2.233_tuxapp6']}},
		color: "#C6E2FF",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt234: {
		name: '10.161.2.234调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['10.161.2.234_tuxapp7','10.161.2.234_tuxapp8']}},
		color: "#BDB76B",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	
	
	TuxStateCalledSumByTimeByHostAt107: {
		name: '10.161.2.107',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['10.161.2.107_tuxapp1','10.161.2.107_tuxapp2']}},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt108: {
		name: '10.161.2.108',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['10.161.2.108_tuxapp1','10.161.2.108_tuxapp2']}},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt109: {
		name: '10.161.2.109',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['10.161.2.109_tuxapp3','10.161.2.109_tuxapp4']}},
		color: "#8B2323",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt110: {
		name: '10.161.2.110',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['10.161.2.110_tuxapp3','10.161.2.110_tuxapp4']}},
		color: "#BDB76B",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt231: {
		name: '10.161.2.231',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ],
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['10.161.2.231_tuxapp1','10.161.2.231_tuxapp2']}},
		color: "#BDB76B",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt232: {
		name: '10.161.2.232',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ],
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host: {$in: ['10.161.2.232_tuxapp3','10.161.2.232_tuxapp4']}},
		color: "#BDB76B",
		filterColNames: [],
		sort: {'hours' : 1}
	},



	TuxStateCalledSumByTimeByHostAt118: {
		name: '134.32.28.118',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.118'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt124: {
		name: '134.32.28.124',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.124'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt145: {
		name: '134.32.28.145',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.145'},
		color: "#8B2323",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt188: {
		name: '134.32.28.188',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.188'},
		color: "#BDB76B",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	
	
	
	TuxStateCalledSumByTimeByHostAt36: {
		name: '134.32.28.36',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.36'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt37: {
		name: '134.32.28.37',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.37'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt38: {
		name: '134.32.28.38',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.38'},
		color: "#8B2323",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt39: {
		name: '134.32.28.39',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.39'},
		color: "#BDB76B",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	
	
	
	TuxStateCalledSumByTimeByHostAt40: {
		name: '134.32.28.40',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.40'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt41: {
		name: '134.32.28.41',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.41'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	
	
	TuxStateCalledSumByTimeByHostAt139: {
		name: '134.32.28.139',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.139'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	TuxStateCalledSumByTimeByHostAt141: {
		name: '134.32.28.141',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.141'},
		color: "#4bb0ce",
		filterColNames: [],
		sort: {'hours' : 1}
	},
	
	
	TuxStateFailedSumByTimeByHostAt28: {
		name: '139异常总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false},host:'134.32.28.139'},
		color: "#ef705b",
		filterColNames: [],
		sort: {'hours' : 1}
	},

	TuxStateFailedSumByTimeByHostAt29: {
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
    

	historyLcuSumCompareChart:[ 
	                          /* ,[   {mode:'TuxState', type:'FailedSumByTimeByHost', subtype: 'At28',hostName: '异常数'}
	                                ,{mode:'TuxState', type:'FailedSumByTimeByHost', subtype: 'At29',hostName: '异常数'}
	                            ]
	                           ,[   {mode:'TuxState', type:'CalledSumByTimeBySvr', subtype: '1',hostName: '服务调用数'}
	                               ,{mode:'TuxState', type:'CalledSumByTimeBySvr', subtype: '2',hostName: '服务调用数'}
	                               ,{mode:'TuxState', type:'CalledSumByTimeBySvr', subtype: '3',hostName: '服务调用数'}
	                            ]*/
	                            [    {mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At107',hostName: 'ECS主机调用数(日)'}
	                                ,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At108',hostName: 'ECS主机调用数(日)'}
	                                ,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At109',hostName: 'ECS主机调用数(日)'}
	                                ,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At110',hostName: 'ECS主机调用数(日)'}
									,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At231',hostName: 'ECS主机调用数(日)'}
									,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At232',hostName: 'ECS主机调用数(日)'}
	                            ]
	                            ,
	                            [    {mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At139',hostName: '客服主机调用数(日)'}
	                                ,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At141',hostName: '客服主机调用数(日)'}
	                            ]
	                            ,
	                            [    {mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At112',hostName: '全业务主机调用数(日)'}
	                                ,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At113',hostName: '全业务主机调用数(日)'}
	                                ,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At233',hostName: '全业务主机调用数(日)'}
	                                ,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At234',hostName: '全业务主机调用数(日)'}
	                            ]
	                            ,
	                            [    {mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At118',hostName: '缴费接口主机调用数(日)'}
	                                ,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At124',hostName: '缴费接口主机调用数(日)'}
	                                ,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At145',hostName: '缴费接口主机调用数(日)'}
	                                ,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At188',hostName: '缴费接口主机调用数(日)'}
	                            ]
	                            ,
	                            [    {mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At36',hostName: 'BSS主机调用数(日)'}
	                                ,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At37',hostName: 'BSS主机调用数(日)'}
	                                ,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At38',hostName: 'BSS主机调用数(日)'}
	                                ,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At39',hostName: 'BSS主机调用数(日)'}
	                            ]
	                            ,
	                            [    {mode:'TuxState', type:'CalledSumByTimeByHost', subtype: 'At40',hostName: 'BPM主机调用数(日)'}
	                                ,{mode:'TuxState',type:'CalledSumByTimeByHost', subtype: 'At41',hostName: 'BPM主机调用数(日)'}
	                            ]
	                           
	                            
	                            ]
	                 
            
	
}