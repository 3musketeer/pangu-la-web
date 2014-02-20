var scopeNames = {'day':'日', 'month':'月', 'year':'年'}

exports.config = {
	
	TuxStateCalledSumByTimeAtday: {
		name: '流程调用量',
		scopes: ['day'],
		scopeNames: scopeNames,
		colNames : [ 'hours', '_count'], 
		filter: {SVRNAME: {$exists: false}, TRANSCODE:{$exists:false}},
		filterColNames: ['TRANSCODE'],
		sort: {'hours' : 1}
	}
}

exports.list = {
    
  lcuCalledSumList:[ {mode:'TuxState', type:'CalledSumByTime',subtype:'Atday'}]

}