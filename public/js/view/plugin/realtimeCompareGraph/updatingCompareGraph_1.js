$(function () {
    
    var dataset =[];
    var dataobj = {};
    var totalPoints = 20;
    var updateInterval = 1000;
    var now = new Date().getTime() - 5000; 
    function GetData(cb) {     
        var dateCa = new Date(now);
        var hours = dateCa.getHours() < 10 ? "0" + dateCa.getHours() : dateCa.getHours();
        var minutes = dateCa.getMinutes() < 10 ? "0" + dateCa.getMinutes() : dateCa.getMinutes();
        var seconds = dateCa.getSeconds() < 10 ? "0" + dateCa.getSeconds() : dateCa.getSeconds();    
        var time =  hours + ":" + minutes + ":" + seconds;
        
        var date = dateCa.getDate() < 10 ? "0" + dateCa.getDate() : dateCa.getDate();
        var month = (dateCa.getMonth()+1) < 10 ? "0" + (dateCa.getMonth()+1) : (dateCa.getMonth()+1);
        var year = dateCa.getFullYear();     
        var value = year+"-"+month+"-"+date;

        $.ajax({  
            type:"GET",  
            url:"/getRealTimeCompareData",  
            data:"time="+time+"&value="+value+"&chartList="+$('#chart-list')[0].innerText,  
            dataType:"json",  
            success:function(data1){  
                
                for(var item in data1){ 
                   var data = [];
                   var temp =[];
                   if ((data1[item][data1[item].scopes[0]]).length >0) 
                        temp = [now, (data1[item][data1[item].scopes[0]])[0][data1[item].colNames[1]]];
                   else
                        temp = [now, 0];
                   if(typeof(dataobj[item]) == 'undefined'){
                       data.push(temp);
                       var obj ={};
                       obj.label = data1[item].name;
                       obj.color = data1[item].color;
                       obj.data = data;              
                       dataobj[item] = obj;
                       
                   }else{
                       if (dataobj[item].data.length >= totalPoints)
                           dataobj[item].data.shift();  
                       dataobj[item].data.push(temp);
                   }
                                             
                }
               
                cb();
               
                now += updateInterval;
            },  
            error:function(){  
               now += updateInterval;  
            }  
        }); 
    }

    var options = {
        series: {
            lines: { 
							lineWidth: 1,
							fill: false,
							fillColor: { colors: [ { opacity: 0.5 }, { opacity: 0.2 } ] },
							show: true
						},
            points: {
              show: true,
              radius: 2.5,
              fill: true,
              fillColor: "#ffffff",
              symbol: "circle",
              lineWidth: 1.5
            }
        },
        xaxis: {
            mode: "time",
            tickSize: [1, "second"],
            tickFormatter: function (v, axis) {
                var date = new Date(v);
    
                if (date.getSeconds() % 1 == 0) {
                    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    
                    return hours + ":" + minutes + ":" + seconds;
                } else {
                    return "";
                }
            },
            axisLabel: "Time",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 10
        },
        yaxis: {
            tickFormatter: function (v, axis) {
                if (v % 5 == 0) {
                    return v;
                } else {
                    return "";
                }
            },
            axisLabel: "",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 10
        },
        legend: {        
            labelBoxBorderColor: "#fff"
        },
        grid: { hoverable: true, clickable: true }
    };
    
    
	  //GetData(cb);

    function cb(){
        
        for(var item in dataobj){ 
            dataset.push(dataobj[item]);
        }

        $.plot($("#updatingGraph"), dataset, options);
    }
    
		function showTooltip(x, y, contents) {
        $('<div id="tooltip" class="chart-tooltip">' + contents + '</div>').css( {
            position: 'absolute',
            display: 'none',
            top: y - 46,
            left: x - 9,
            'z-index': '9999',
            opacity: 0.9
        }).appendTo("body").fadeIn(200);
    }

    var previousPoint = null;
    $("#updatingGraph").bind("plothover", function (event, pos, item) {
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));

        if ($("#updatingGraph").length > 0) {
            if (item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;
                    
                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);
                        
                    var date = new Date(item.datapoint[0]);
 
                    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                    var x1 = hours + ":" + minutes + ":" + seconds;
                    showTooltip(item.pageX, item.pageY,
                                 "��ǰ����ֵ <strong>" + x1 + "</strong> - " + item.series.label + " " + "<strong>" + y + "</strong>");
                }
            }
            else {
                $("#tooltip").remove();
                previousPoint = null;            
            }
        }
    });

    function update() {
        GetData(cb);
        timeId = setTimeout(update, updateInterval); //�˴����붨��ȫ��timeId
    }
    update();      
	});