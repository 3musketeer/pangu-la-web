module.exports = [
    {title:'业务',menuId:'current',class:'icon-signal',list:[    {title:'工单积压',url:'/orderOverstock.html?chartList=lineChart'},
                                                //{title:'错单',url:'/historyTopDetail.html?chartList=historyTopDetailList'},
                                                {title:'流程超时(历史)',url:'/historyQueryDetail.html?chartList=historyTopDetailList'},
                                                {title:'流程超时(实时)',url:'/realtimeQueryDetail.html?chartList=realtimeLcuTimeoutDetailList'},
                                                {title:'流程调用总量(历史)',url:'/lcuCalledSum.html?chartList=lcuCalledSumList'}, 
                                                {title:'超时流程分析',url:'/historyQueryDetail.html?chartList=lcuTimeTopAnalyseRate'},                
                                               // {title:'流程调用总量(实时)',url:'/realtimeLcuCalledSum.html?chartList=realTimeLcuCalledSumChart'},                            
                                                {title:'流程调用异常',url:'/lcuCalledSum.html?chartList=lcuFailedSumList'}
                                               // {title:'流程调用异常(实时)',url:'/realtimeLcuCalledSum.html?chartList=realTimeLcuFailSumChart'},
                                                                                
                                                                                                                        
                                            ]
    },
   
    {title:'中间件TUXEDO',menuId:'tuxedo', class:'icon-tasks',list:[ //{title:'问题定位',url:'/flowInfoAnalysis.html?flowId=/lcuErrorAnalysis.html'},
                                                    {title:'主机对比',url:'/historyComPareGraph.html?chartList=historyLcuSumCompareChart'}, 
                                                    //{title:'主机对比(实时)',url:'/realtimeHostCompareGraph.html?chartList=realTimeLcuSumCompareChart'},
                                                    {title:'服务队列(历史)',url:'/queueMonitorHis.html'},
                                                    {title:'服务队列(实时)',url:'/queueMonitor.html'},
                                                    {title:'服务僵死',url:'/realtimeQueryDetail.html?chartList=realTimeSvcDeadDetailList'},                                            
                                                    {title:'内存占用',url:'/memoryMonitor.html?chartList=realMemory'},
                                                    {title:'服务超时(历史)',url:'/historyQueryDetail.html?chartList=historySvcTimeOutDetailList'},     
                                                    {title:'服务超时(实时)',url:'/realtimeQueryDetail.html?chartList=realTimeSvcTimeOutDetailList'},      
                                                    {title:'服务调用总量',url:'/lcuCalledSum.html?chartList=svcCalledSumList'},    
                                                    //{title:'服务调用总量(实时)',url:'/realtimeLcuCalledSum.html?chartList=realTimeSvcCalledSumChart'},  
                                                    {title:'服务调用异常',url:'/lcuCalledSum.html?chartList=svcFailedSumList'},  
                                                    //{title:'服务调用异常(实时)',url:'/realtimeLcuCalledSum.html?chartList=realTimeSvcFailedSumChart'},  
                                                    //{title:'服务调用成功率',url:'/sumList.html?chartList=svcCalledSumChart'}    
                                                    
                                                  ]
    },
        		
	/*{title:'中间件WEBLOGIC',menuId:'weblogic', class:'icon-tasks',list:[    {title:'异常明细(历史)',url:'#'},
                                                       {title:'异常明细(实时)',url:'#'}

                                                      ]
  },	
  
  {title:'数据库',menuId:'database', class:'icon-tasks',list:[ {title:'耗时语句',url:''},
                                            {title:'锁表语句',url:''},
                                            {title:'超限超时语句',url:''}                                           
                                          ]
  },
  
  {title:'外围',menuId:'interface',class:'icon-tasks',list:[ {title:'接口异常信息(历史)',url:''},
                                          {title:'接口异常信息(实时)',url:''}
                                                    
                                          ]
  },*/
  
  {title:'告警',class:'ico-warning-sign',list:[],url:"/getAllMail.html"}
   
]