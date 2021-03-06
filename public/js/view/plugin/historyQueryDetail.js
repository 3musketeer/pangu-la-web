$(function() {
	var table = null,
		oTable = null;

	//===== Datatables =====//
  if($("input[name='chartList']").val() == 'lcuTimeTopAnalyse'){
    	oTable = $('#data-table').dataTable({
    	  "bProcessing": true,
    		"bServerSide": true, 
    	  "sAjaxSource":$("input[name='queryUrl']").val(),
    	  "aLengthMenu": [[100], [100]],
    	  "bRetrieve":true,
    		"bJQueryUI": false,
    		"bAutoWidth": false,
    		"bSort": false,
    		"sPaginationType": "full_numbers",
    		"oLanguage": {
    			"sSearch": "<span>主机、流程过滤:</span> _INPUT_",
    			"sLengthMenu": "<span>每页显示数:</span> _MENU_",
    			"oPaginate": { "sFirst": "首页", "sLast": "末页", "sNext": ">", "sPrevious": "<" }, 
    		    "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录"
    		},
    		"fnDrawCallback": function () {
               
         }
      });
  
  
      var oSettings = oTable.fnSettings();
      oSettings._iDisplayLength = 100;
  }else if($("input[name='chartList']").val() == 'lcuTimeTopAnalyseRate'
	  							|| $("input[name='chartList']").val() == 'lcuTimeTopAnalyseRate'){
    	oTable = $('#data-table').dataTable({
    	  "bProcessing": true,
    		"bServerSide": true, 
    	  "sAjaxSource":$("input[name='queryUrl']").val(),
    	  "bRetrieve":true,
    		"bJQueryUI": false,
    		"bAutoWidth": false,
    		"bSort": false,
    		"sPaginationType": "full_numbers",
    		"oLanguage": {
    			"sSearch": "<span>主机、流程过滤:</span> _INPUT_",
    			"sLengthMenu": "<span>每页显示数:</span> _MENU_",
    			"oPaginate": { "sFirst": "首页", "sLast": "末页", "sNext": ">", "sPrevious": "<" }, 
    		    "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录"
    		},
    		"fnDrawCallback": function () {
               
         }
      });
  
  }else{
      oTable = $('#data-table').dataTable({
    	  "bProcessing": true,
    		"bServerSide": true, 
    	  "sAjaxSource":$("input[name='queryUrl']").val(),
    	  "bRetrieve":true,
    		"bJQueryUI": false,
    		"bAutoWidth": false,
    		"bSort": false,
    		"sPaginationType": "full_numbers",
    		"oLanguage": {
    			"sSearch": "<span>关键字过滤:</span> _INPUT_",
    			"sLengthMenu": "<span>每页显示数:</span> _MENU_",
    			"oPaginate": { "sFirst": "首页", "sLast": "末页", "sNext": ">", "sPrevious": "<" }, 
    		    "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录"
    		},
    		"fnDrawCallback": function () {
               
         }
      });
  }
      
	//===== Sparklines =====//
	
	$('#total-visits').sparkline(
		'html', {type: 'bar', barColor: '#ef705b', height: '35px', barWidth: "5px", barSpacing: "2px", zeroAxis: "false"}
	);
	$('#balance').sparkline(
		'html', {type: 'bar', barColor: '#91c950', height: '35px', barWidth: "5px", barSpacing: "2px", zeroAxis: "false"}
	);

	$(window).resize(function () {
		$.sparkline_display_visible();
	}).resize();


	initEvent();

	$("#data-table_wrapper tbody").delegate("tr", "dblclick", function() {
		var transcode = $("td:first", this).text();
		var host = $("td:eq(13)", this).text(),
			value = $("#value").val() || "2014-12-25";
		$('#lp_dialog_content_title').text("主机：" + host + ",  流程：" + transcode);
		$("#lp_host").val(host);
		$("#lp_trans").val(transcode);
		$.ajax({
			type: 'get',
			url: '/lcuPointServe',
			data: {
				value: value,
				host: host,
				TRANSCODE: transcode
			},
			success: function(res) {
				var html = "";
				for(var i=0; i<res.length; i++){
					html += "<option>" + res[i] + "</option>";
				}
				$("#lp_pids").html(html);
				initChartData();
			}
		})
	});

	//查询队列运行明细
	function initEvent() {

		$('#lp_dialog_header_close').click(function(){
			$('#lp_dialog').hide();
		});
		$('#lp_pids').change(function(){
			//initChartData();
			table.fnDraw();
		});

		$('#hqd_host_sl').change(function(){
			var host = $('#hqd_host_sl option:selected').text() || "全部显示",
				query_url = $("input[name='queryUrl']").val(),
				arr_url = query_url.split('&');
			if( host != '全部显示'){
				var flag = false;
				for(var i=0; i<arr_url.length; i++){
					if( arr_url[i].split('=')[0] == 'host' ){
						arr_url[i] = "host="+host;
						flag = true;
					}
				}
				if(!flag){
					arr_url.push("host="+host);
				}
				query_url = arr_url.join('&');
				console.log(query_url)
			}else{
				var resUrl = [];
				for(var i=0; i<arr_url.length; i++){
					if( arr_url[i].split('=')[0] != 'host' ){
						resUrl.push(arr_url[i]);
					}
				}
				query_url = resUrl.join('&');
				console.log(query_url)
			}
			$("input[name='queryUrl']").val(query_url);
			oTable.fnSettings().sAjaxSource = query_url;
			oTable.fnDraw();
		});
	}

	//初始化图表数据
	function initChartData() {
		table = $('#lp_table').dataTable({
			"bProcessing": true,
			"bServerSide": true,
			"sAjaxSource": '/lcuPointDataByPIDPage',
			"fnServerParams": function ( aoData ) {
				aoData.push( { "name": "value", "value": $('#value').val() } );
				aoData.push( { "name": "chartList", "value": "lcuPointDayList"});
				aoData.push( { "name": "host", "value": $("#lp_host").val() || "10.161.2.141_builder" } );
				aoData.push( { "name": "PID", "value": $('#lp_pids option:selected').text() || 23790082 } );
				aoData.push( { "name": "TRANSCODE", "value": $("#lp_trans").val() || "QAM_OWEFEE_QUERY" } );
			},
			"aoColumns": [
				{ "mData": "TIME" },
				{ "mData": "content" },
				{
					"mData": "timediff",
					fnRender: function(obj) {
						if(obj.aData['timediff'] !== undefined) {
							if (obj.aData['timediff'] >= 1000) {
								return '<div style="color: red"><b>' + obj.aData['timediff'] + '</b></div>';
							} else {
								return obj.aData['timediff'];
							}
						}else{
							return '<div style="color: green"><b>NULL</b></div>';
						}
					}
				}
			],
			"bRetrieve":true,
			"bJQueryUI": false,
			"bAutoWidth": false,
			"bSort": false,
			"sPaginationType": "full_numbers",
			"sScrollX": "100%",
			"sScrollY": 350,
			"oLanguage": {
				"sSearch": "<span>关键字过滤:</span> _INPUT_",
				"sLengthMenu": "<span>每页显示数:</span> _MENU_",
				"oPaginate": { "sFirst": "首页", "sLast": "末页", "sNext": ">", "sPrevious": "<" },
				"sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录"
			}
		});
		$('#lp_dialog').show();
	}



});
