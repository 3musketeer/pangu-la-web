module.exports = [
    {title:'业务',menuId:'current',class:'icon-signal',list:[    //{title:'工单积压',url:'/orderOverstock.html?chartList=lineChart'},
                                                //{title:'错单',url:'/historyTopDetail.html?chartList=historyTopDetailList'},
                                                {title:'流程超时(日)',url:'/historyQueryDetail.html?chartList=historyTopDetailList'},
                                                {title:'流程超时(实时)',url:'/realtimeQueryDetail.html?chartList=realtimeLcuTimeoutDetailList'},
                                                {title:'流程调用总量',url:'/lcuCalledSum.html?chartList=lcuCalledSumList'},      
                                               // {title:'流程调用总量(实时)',url:'/realtimeLcuCalledSum.html?chartList=realTimeLcuCalledSumChart'},                            
                                                {title:'流程调用异常',url:'/lcuCalledSum.html?chartList=lcuFailedSumList'}
                                               // {title:'流程调用异常(实时)',url:'/realtimeLcuCalledSum.html?chartList=realTimeLcuFailSumChart'},
                                                                                
                                                                                                                        
                                            ]
    },
   
    {title:'中间件',menuId:'tuxedo', class:'icon-tasks',list:[ //{title:'问题定位',url:'/flowInfoAnalysis.html?flowId=/lcuErrorAnalysis.html'},
                                                    //{title:'主机对比(实时)',url:'/realtimeHostCompareGraph.html?chartList=realTimeLcuSumCompareChart'},
                                                    {title:'服务队列(历史)',url:'/queueMonitorHis.html'},
                                                    //{title:'服务队列(实时)',url:'/queueMonitor.html'},
                                                    //{title:'服务僵死',url:'/realtimeQueryDetail.html?chartList=realTimeSvcDeadDetailList'},                                            
                                                    //{title:'内存占用',url:'/memoryMonitor.html?chartList=realMemory'},
                                                    {title:'服务超时明细(日)',url:'/historyQueryDetail.html?chartList=historySvcTimeOutDetailList'},     
                                                    {title:'服务超时明细(实时)',url:'/realtimeQueryDetail.html?chartList=realTimeSvcTimeOutDetailList'},      
                                                    {title:'服务调用总量',url:'/lcuCalledSum.html?chartList=svcCalledSumList'},    
                                                    //{title:'服务调用总量(实时)',url:'/realtimeLcuCalledSum.html?chartList=realTimeSvcCalledSumChart'},  
                                                    {title:'服务调用异常',url:'/lcuCalledSum.html?chartList=svcFailedSumList'},  
                                                    //{title:'服务调用异常(实时)',url:'/realtimeLcuCalledSum.html?chartList=realTimeSvcFailedSumChart'},  
                                                    //{title:'服务调用成功率',url:'/sumList.html?chartList=svcCalledSumChart'}    
                                                    
                                                  ]
    },
    
    
    {title:'分析',menuId:'analysis', class:'icon-tasks',list:[
        {title:'队列分析(日)',url:'/queueAnalyze.html?chartList=queueAnalyzeListDAY&chartBList=queueAnalyzeBaseList'},
        {title:'队列分析(月)',url:'/queueAnalyze.html?chartList=queueAnalyzeListMONTH&chartBList=queueAnalyzeBaseList'},
        {title:'超时流程分析(日)',url:'/historyQueryDetail.html?chartList=lcuTimeTopAnalyseRate'},
        {title:'超时流程分析(月)',url:'/historyQueryDetail.html?chartList=lcuTimeTopAnalyseRateMonth'},
        {title:'服务部署建议(日)',url:'/queueReportAnalyze.html?chartList=queueReportDayList&chartQList=queueAnalyzeListDAY'},
        {title:'服务部署建议(月)',url:'/queueReportAnalyze.html?chartList=queueReportMonthList&chartQList=queueAnalyzeListMONTH'},
        {title:'主机对比',url:'/historyComPareGraph.html?chartList=historyLcuSumCompareChart'}
        /*{title:'服务部署建议（4天）', url:'/queueReportBy4Days.html'},*/
        //{title:'23转4异常分析', url:'/trade4G.html'},
                                                    
                                                    
                                                  ]
    },

    {title:'接口',menuId:'interface', class:'icon-tasks',list:[
        {title:'CUST分析',menuId:'alarm_ws_cust', list:[
            {title:'所有主机', url:'/InterfaceWEB.html?chartList=alarmWSCUSTGroupList&chartCList=alarmWSCUSTCalledSumList&host=all'},
            {title:'10.161.1.6_uipapp', url:'/InterfaceWEB.html?chartList=alarmWSCUSTGroupList&chartCList=alarmWSCUSTCalledSumList&host=10.161.1.6_uipapp'},
            {title:'10.161.1.7_uipapp', url:'/InterfaceWEB.html?chartList=alarmWSCUSTGroupList&chartCList=alarmWSCUSTCalledSumList&host=10.161.1.7_uipapp'}
        ]},
        {title:'CBSS分析', menuId:'alarm_ws_cbss', list:[
            {title:'所有主机', url:'/InterfaceWEB.html?chartList=alarmWSCBSSGroupList&chartCList=alarmWSCBSSCalledSumList&host=all'},
            {title:'10.161.1.26_uipapp', url:'/InterfaceWEB.html?chartList=alarmWSCBSSGroupList&chartCList=alarmWSCBSSCalledSumList&host=10.161.1.26_uipapp'},
            {title:'10.161.1.27_uipapp', url:'/InterfaceWEB.html?chartList=alarmWSCBSSGroupList&chartCList=alarmWSCBSSCalledSumList&host=10.161.1.27_uipapp'},
            {title:'10.161.1.28_uipapp', url:'/InterfaceWEB.html?chartList=alarmWSCBSSGroupList&chartCList=alarmWSCBSSCalledSumList&host=10.161.1.28_uipapp'},
            {title:'10.161.1.30_uipapp', url:'/InterfaceWEB.html?chartList=alarmWSCBSSGroupList&chartCList=alarmWSCBSSCalledSumList&host=10.161.1.30_uipapp'},
            {title:'10.161.1.31_uipapp', url:'/InterfaceWEB.html?chartList=alarmWSCBSSGroupList&chartCList=alarmWSCBSSCalledSumList&host=10.161.1.31_uipapp'},
            {title:'10.161.1.32_uipapp', url:'/InterfaceWEB.html?chartList=alarmWSCBSSGroupList&chartCList=alarmWSCBSSCalledSumList&host=10.161.1.32_uipapp'},
            {title:'10.161.1.33_uipapp', url:'/InterfaceWEB.html?chartList=alarmWSCBSSGroupList&chartCList=alarmWSCBSSCalledSumList&host=10.161.1.33_uipapp'},
            {title:'10.161.1.34_uipapp', url:'/InterfaceWEB.html?chartList=alarmWSCBSSGroupList&chartCList=alarmWSCBSSCalledSumList&host=10.161.1.34_uipapp'},
            {title:'10.161.1.35_uipapp', url:'/InterfaceWEB.html?chartList=alarmWSCBSSGroupList&chartCList=alarmWSCBSSCalledSumList&host=10.161.1.35_uipapp'},
            {title:'10.161.1.36_uipapp', url:'/InterfaceWEB.html?chartList=alarmWSCBSSGroupList&chartCList=alarmWSCBSSCalledSumList&host=10.161.1.36_uipapp'},
            {title:'10.161.1.37_uipapp', url:'/InterfaceWEB.html?chartList=alarmWSCBSSGroupList&chartCList=alarmWSCBSSCalledSumList&host=10.161.1.37_uipapp'}
        ]},
        {title:'3G_ESS分析', menuId:'alarm_ws_3gess', list:[
            {title:'所有主机', url:'/InterfaceWEB.html?chartList=alarmWS3GESSGroupList&chartCList=alarmWS3GESSCalledSumList&host=all'},
            {title:'10.161.1.6_uipapp', url:'/InterfaceWEB.html?chartList=alarmWS3GESSGroupList&chartCList=alarmWS3GESSCalledSumList&host=10.161.1.6_uipapp'},
            {title:'10.161.1.7_uipapp', url:'/InterfaceWEB.html?chartList=alarmWS3GESSGroupList&chartCList=alarmWS3GESSCalledSumList&host=10.161.1.7_uipapp'}
        ]},
        {title:'3G_HTTP分析', menuId:'alarm_ws_3ghttp',list:[
            {title:'所有主机', url:'/InterfaceWEB.html?chartList=alarmWS3GHTTPGroupList&chartCList=alarmWS3GHTTPCalledSumList&host=all'},
            {title:'10.161.1.6_uipapp', url:'/InterfaceWEB.html?chartList=alarmWS3GHTTPGroupList&chartCList=alarmWS3GHTTPCalledSumList&host=10.161.1.6_uipapp'},
            {title:'10.161.1.7_uipapp', url:'/InterfaceWEB.html?chartList=alarmWS3GHTTPGroupList&chartCList=alarmWS3GHTTPCalledSumList&host=10.161.1.7_uipapp'}
        ]}


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
  
  {title:'异常明细',class:'ico-warning-sign',list:[],url:"/historyQueryDetail.html?chartList=getWarning"},

    {title:'网络拓扑图(ing)',class:'icon-tasks',list:[],url:"/NetTopologyGraph.html"}
   
]