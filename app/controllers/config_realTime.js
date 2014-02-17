var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	TuxStateCalledSumByRealTimeAtDay: {
		name: '调用量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'STARTTIME', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:true}},
		filterColNames: ['STARTTIME'],
		color: "#f0471a",
		sort: {'STARTTIME' : 1}
	},
	TuxStateCalledSumByTimeAtHours: {
		name: '调用总数',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count' ], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		filterColNames: [],
		color: "1",
		sort: {'hours' : 1}
	}
}

exports.list = {
    
	realTimeLcuSumChart:[ {mode:'TuxState', type:'CalledSumByRealTime',subtype:'AtDay'}]

}