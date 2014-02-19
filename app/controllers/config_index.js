exports.config = {	
	TuxStateCalledSumByRealTimeAtHours: {
	  scopes: ['day'],
		colNames : ['DayCalledSum','DayFailedSum','DaySuccessRate','MonCalledSum','MonFailedSum','MonSuccessRate'], 
		filterColNames: [],
		filter: {DayCalledSum: {$exists: true}, DayFailedSum:{$exists:true},DaySuccessRate:{$exists:true},MonCalledSum: {$exists: true}, MonFailedSum:{$exists:true},MonSuccessRate:{$exists:true}},
		sort: {'timestamp' : -1}	
	}
}

exports.list = [
    {mode:'TuxState', type:'CalledSumByRealTime', subtype: 'AtHours',value:'2014-02-18'}
]