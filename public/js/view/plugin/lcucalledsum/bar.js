$(function() {
  
    var objDiv = $('#placeholder-1');
    var now = new Date();
    var date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    var month = (now.getMonth()+1) < 10 ? "0" + (now.getMonth()+1) : (now.getMonth()+1);
    var year = now.getFullYear();     
    var value = year+"-"+month+"-"+Date;
    
    $('#transcodeValue').change(function(){
        var param = "";
        param=$(this).children('option:selected').val();
        
        if($("#datepicker") && $("#datepicker").attr("value") != ""){        
            value = $("#datepicker").attr("value");
        }

        $.ajax({  
            type:"GET",  
            url:"/lcuCalledSum.html",  
            data:"value="+value+"&chartList="+$('#chart-list')[0].innerText+"&TRANSCODE="+param+"&ajaxGetTag=true",  
            dataType:"json",  
            success:function(data1){  
             
              for(var item in data1){ 
                   $('#caculateDateId').html("统计日期:"+data1[item].caculateDate);  
                   draw(data1[item][data1[item].scopes[0]]);

              } 
             
            },  
            error:function(){         
            }  
        });    
    }); 
    
    
  function draw(data){ 

			var len = data.length;
			var dataobj = {};
			var dataset =[];
      var order = 1;
      
      for (var i =0;i<len; i++){
          var temp = data[i];
          var item = temp.host;
          var tempData = [temp.hours,temp._count];
          var bars = {
              show: true, 
              barWidth: 0.5
          };
          if(typeof(dataobj[item]) == 'undefined'){         
              var obj ={};
              obj.data = []; 
              obj.data.push(tempData);
              bars.order = order;
              obj.bars = bars;   
              obj.label = item;    
              //obj.color = "#f0471a";
              dataobj[item] = obj;
              order ++;
           
          }else{
              dataobj[item].data.push(tempData);
          }
      }
    
    for(var item in dataobj){ 
        dataset.push(dataobj[item]);
    }
    
	  var plot = $.plot(objDiv, dataset, {		    
	    grid:{
          hoverable:true
      },
	    legend: {show: true}
	   
	  });
	 
  }
  
   function showTooltip(x, y, contents, areAbsoluteXY) {
    var rootElt = 'body';
        $('<div id="tooltip2" class="chart-tooltip">' + contents + '</div>').css( {
        position: 'absolute',
        display: 'none',
        top: y - 45,
        left: x - 8,
			 'z-index': '9999',
			 'color': '#fff',
			 'font-size': '11px',
        opacity: 0.8
    }).prependTo(rootElt).show();
 }

	var previousPoint = null;
	$('#placeholder-1').bind("plothover",function (event, pos, item) {

		if ($('#placeholder-1').length > 0) {
    
			if (item) {
				if (previousPoint != item.datapoint) {
					previousPoint = item.datapoint;
					
					$('.chart-tooltip').remove();
					var x = item.datapoint[0];
					
					if(item.series.bars.order){
              for(var i=0; i < item.series.data.length; i++){
                if(item.series.data[i][3] == item.datapoint[0])
                    x = item.series.data[i][0];
              }
           }
           var y = item.datapoint[1];
           showTooltip(item.pageX+5, item.pageY+5,x + '时调用量为:'+ y);
				}
			}
			else {
				 $('.chart-tooltip').remove();
         previousPoint = null;        
			}
		}
	});
   
  draw(jQuery.parseJSON($('#placeholder-data1')[0].innerText));

});
