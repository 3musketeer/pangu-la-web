$(document).ready(function() {

	//===== Datatables =====//

	oTableToplist = $('#data-table-error-toplist').dataTable({
	    "bProcessing": true,
		"bServerSide": true, 
	    "sAjaxSource":$("input[name='queryUrl-toplist']").val(),
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
     "fnInitComplete": function(oSettings, json) {
        this.$('tr').click(function (){
            var data = oTableToplist.fnGetData(this);
            if ($("#flowStepProvided-toplist"))
                $("#flowStepProvided-toplist").val(data[1]);
                
        });
     }
     
  });
  
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
});


  function queryTopCheck(){   
    if ($("#flowStepProvided-toplist").attr("value") == ""){
        alert("请选择一条记录！");
        return "";
    }else
        return $("#flowStepProvided-toplist").attr("value");
  }