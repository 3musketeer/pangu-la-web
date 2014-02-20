module.exports = [
    {title:'业务',menuId:'current',class:'icon-signal',list:[    {title:'工单积压',url:''},
                                                {title:'错单',url:'/historyTopDetail.html?chartList=historyTopDetailList'},
                                                {title:'流程超时(历史)',url:'/lcuTimeOutDetail.html?chartList=historyTopDetailList'},
                                                {title:'流程超时(实时)',url:'/realtimeLcuTimeOutDetail.html?chartList=realtimeLcuTimeoutDetailList'},
                                                {title:'流程调用总量(历史)',url:'/lcuCalledSum.html?chartList=lcuCalledSumList'},                 
                                                {title:'流程调用总量(实时)',url:'/realtimeGraph.html?chartList=realTimeLcuSumChart'},                            
                                                {title:'流程调用异常(历史)',url:''},   
                                                {title:'流程调用异常(实时)',url:''},
                                                {title:'流程调用成功率',url:''}                                      
                                                                                                                        
                                            ]
    },
   
    {title:'中间件TUXEDO',class:'icon-tasks',list:[ {title:'问题定位',url:'/flowInfoAnalysis.html?flowId=/lcuErrorAnalysis.html'},
                                                    {title:'主机对比(历史)',url:'/historyComPareGraph.html?chartList=historyLcuSumCompareChart'}, 
                                                    {title:'主机对比(实时)',url:'/realtimeHostCompareGraph.html?chartList=realTimeLcuSumCompareChart'},
                                                    {title:'服务队列(历史)',url:''}, 
                                                    {title:'服务队列(实时)',url:''},
                                                    {title:'服务僵死',url:''},                                            
                                                    {title:'内存占用',url:''},  
                                                    {title:'服务超时(历史)',url:''},     
                                                    {title:'服务超时(实时)',url:''},      
                                                    {title:'服务调用总量(历史)',url:''},    
                                                    {title:'服务调用总量(实时)',url:''},  
                                                    {title:'服务调用异常(历史)',url:''},  
                                                    {title:'服务调用异常(实时)',url:''},  
                                                    {title:'服务调用成功率',url:''}    
                                                    
                                                  ]
    },
        		
	{title:'中间件WEBLOGIC',class:'icon-tasks',list:[    {title:'异常明细(历史)',url:'#'},
                                                       {title:'异常明细(实时)',url:'#'}

                                                      ]
  },	
  
  {title:'数据库',class:'icon-tasks',list:[ {title:'耗时语句',url:''},
                                            {title:'锁表语句',url:''},
                                            {title:'超限超时语句',url:''}                                           
                                          ]
  },
  
  {title:'外围',class:'icon-tasks',list:[ {title:'接口异常信息(历史)',url:''},
                                          {title:'接口异常信息(实时)',url:''}
                                                    
                                          ]
  },
  
  {title:'告警',class:'ico-warning-sign',list:[],url:""}
   
]