$(function() {
	//===== Datatables =====//

	oTable = $('#data-table').dataTable({
	  "bProcessing": true,
		"bServerSide": true, 
	  "sAjaxSource":$("input[name='queryUrl']").val(),
	  "bRetrieve":true,
		"bJQueryUI": false,
		"bAutoWidth": false,
		"bSort": false,
		"sPaginationType": "full_numbers",
		"aLengthMenu": [[parseInt($("input[name='displayLength']").val())], [parseInt($("input[name='displayLength']").val())]],
		"oLanguage": {
			"sSearch": "<span>关键字过滤):</span> _INPUT_",
			"sLengthMenu": "<span>每页显示数:</span> _MENU_",
			"oPaginate": { "sFirst": "首页", "sLast": "末页", "sNext": ">", "sPrevious": "<" }, 
		    "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录"
		},
		"fnServerData": function ( sSource, aoData, fnCallback ) {
        $.ajax({
            "dataType": 'json',
            "type": "get",
            "url": sSource,
            "data": aoData,
            "success": fnCallback,
            "error": function (XMLHttpRequest, textStatus, errorThrown) {
              //alert("实时获取数据失败！"̀);
            } 
        });
    },
		"fnDrawCallback": function () {
           
     }
  });
  
  var oSettings = oTable.fnSettings();
  oSettings._iDisplayLength = parseInt($("input[name='displayLength']").val());
  function updateAjax() {
     oTable.fnPageChange( 'next' );
     timeId = setTimeout(updateAjax, 3000); //此处必须定义全局timeId
  }
  updateAjax();

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


function ctrolAjax(idx) {
      if(idx == '0'){
          if(typeof(timeId) !='undefined'){ 
            clearTimeout(timeId);
            delete timeId;
          }
      }else{ 
         if(typeof(timeId) !='undefined'){ 
            clearTimeout(timeId);
            delete timeId;
         }
         oTable.fnPageChange( 'next' )
         timeId = setTimeout(ctrolAjax, 3000); //此处必须定义全局timeId
    }
}