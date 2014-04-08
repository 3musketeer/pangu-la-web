$(function (){
    var data = {
       '1': {'symbolType':'start','symbolText':'开始','symbolDesc':'','symbolLink':''},
       '2': {'symbolType':'condition','symbolText':'是否明确故障主机','symbolLink':'/initQueryTopDetail.html'},
       '3': {'symbolType':'operation','symbolText':'显示主机对比图','symbolLink':'/realtimeCompareGraph.html?chartList=realTimeLcuSumCompareChart&module=true'},
       '4': {'symbolType':'operation','symbolText':'输入主机ip','symbolLink':'/historyComPareGraph.html?chartList=historyLcuSumCompareChart&module=true'},
       '5': {'symbolType':'operation','symbolText':'选择指标'},
       '6': {'symbolType':'operation','symbolText':'查看指标','symbolDesc':'查看各项指标，排名、仪表盘、曲线图、对比图、柱状图等'},
       '7': {'symbolType':'condition','symbolText':'是否查看其他指标','symbolLink':'/initQueryTopDetail.html'},
       '8': {'symbolType':'end','symbolText':'结束','symbolLink':''},
       'flowStep1': '1->2',
       'flowStep2': '2(yes)->4->5->6->7',
       'flowStep3': '2(no, right)->3->4->5',
       'flowStep4': '7(yes)->5',
       'flowStep5': '7(no, right)->8'
    };               
    var o = {
        'line-width': 3,
        'line-length': 30,
        'text-margin': 10,
        'font-size': 16,
        'font-color': 'a7a7a7',
        'line-color': '#a7a7a7',  
        'element-color': '#4ab0cd',      
        'fill': '#4ab0cd',
        'yes-text': 'yes',
        'no-text': 'no',
        'arrow-end': 'block',
        'symbols': {     
        'start': {
                  
            }
        }
    };
    
    chart = flowchart.parse(data);                  
    var  pageHtml = [];
    
    //drawPageFlow
    (function drawPageFlow(flowData,pageHtml){
        if (flowData.drawPathOk) return;
        if(flowData.symbolType !='start' && flowData.symbolType !='end'){
            pageHtml.push("<fieldset class='step' id='"+flowData.key+"'> ");
            pageHtml.push("<div class='step-title'>");
            pageHtml.push("<i>"+flowData.key+"</i>");
            pageHtml.push("<h5>"+flowData.text+"</h5>");
            pageHtml.push("<span>"+flowData.desc+"</span>");
            if(!flowData.yes && !flowData.no)
                pageHtml.push("<a onclick=\"getAjaxStepHtml('"+flowData.link+"','"+flowData.key+"')\""+" id='stepHref"+flowData.key+"'></a>");
            pageHtml.push("</div>");
            if(!flowData.yes && !flowData.no)
                pageHtml.push("<div id='stepDiv"+flowData.key+"'></div>");
            else{
                pageHtml.push("<div id='stepDiv"+flowData.key+"'>");
                pageHtml.push("<label class=\"control-label\">"+flowData.text+"：</label>");
                pageHtml.push("<select class=\"input_field_12em link required\" id='select"+flowData.key+"'>");
                pageHtml.push("<option value=\"\">请选择</option>");
                pageHtml.push("<option value='"+flowData.yes.key+"'>是</option>");
                pageHtml.push("<option value='"+flowData.no.key+"'>否</option>");
                pageHtml.push("</select>");
                pageHtml.push("</div>")
            }      
            pageHtml.push("</fieldset>");
        }
        
        if(flowData.no){
            flowData.drawPathOk = true;
            drawPageFlow(flowData.no,pageHtml);  
        }
        if(flowData.yes){
            flowData.drawPathOk = true;
            drawPageFlow(flowData.yes,pageHtml);
        }
        if(flowData.next){
            flowData.drawPathOk = true;
            drawPageFlow(flowData.next,pageHtml);
        }
          
    })(chart.start,pageHtml);

    for(var item in chart.symbols){      
        if(chart.symbols[item].symbolType == 'end'){
            var flowData = chart.symbols[item];
            pageHtml.push("<fieldset class='step' id='"+flowData.key+"'> ");
            pageHtml.push("<div class='step-title'>");
            pageHtml.push("<i>"+flowData.key+"</i>");
            pageHtml.push("<h5>"+flowData.text+"</h5>");
            pageHtml.push("<span>"+flowData.desc+"</span>");
            pageHtml.push("</div>");
            pageHtml.push("<div id='stepDiv"+flowData.key+"'></div>"); 
            pageHtml.push("</fieldset>");
        }
    }
    $("#flowStep").html(pageHtml.join(""));
       
    //drawFlowChart
    chart.drawSVG('canvas',o);
    chart.diagram.paper.getById(chart.start.next.key).attr({ fill: '#EF705B',stroke: '#EF705B'});
      
      
    //===== Form wizards =====//
    $("#wizard3").formwizard({       
        formPluginEnabled: true,
        validationEnabled: false,
        focusFirstInput : false,	 	
        formOptions :{
        	success: function(data){$("#status2").fadeTo(500,1,function(){ $(this).html("<span>Form was submitted!</span>").fadeTo(5000, 0); })},
        	beforeSubmit: function(data){$("#data2").html("<span>Form was submitted with ajax. Data sent to the server: " + $.param(data) + "</span>");},
        	resetForm: true
        },
        inAnimation : {height: 'show'},
            outAnimation: {height: 'hide'},
        		inDuration : 400,
        		outDuration: 400,
        		easing: 'easeInBack'
        }
    );
    
    $("#wizard3").bind("step_shown", function(event, data){
        if(data.isBackNavigation == true){
            
        }else{
            $('#stepHref'+data.currentStep).click();
            
        }
        
        for(var item in chart.symbols){   
            if(item == data.currentStep){
                chart.diagram.paper.getById(item).attr({ fill: '#EF705B',stroke: '#EF705B'});
            }else{
                chart.diagram.paper.getById(item).attr({ fill: '#4ab0cd',stroke: '#4ab0cd'});
            }
        }                    
    });
    
    
    function getAjaxStepHtml(stepUrl,nodeId){
        $.ajax({  
            type:"GET",  
            url:stepUrl,  
            data:"value="+$("#datepicker").attr("value")+"&requestParam="+"",  
            dataType:"html",  
            success:function(data){ 
              $('#stepDiv'+nodeId).html(data);  
            },  
            error:function(){  
              alert("ajax exception!");  
            }  
        });  
    }
    window.getAjaxStepHtml = getAjaxStepHtml;
        
});