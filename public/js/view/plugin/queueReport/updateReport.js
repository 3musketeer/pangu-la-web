$(function() {

    var host = null;

    $('#qr_serv').change(function(){
        updateTable();
    });

    function updateTable(){

        host = $('#qr_serv option:selected').text() || '134.32.28.36';
        $.ajax({
            type: 'get',
            url: '/getReportQueueData',
            data: {
                value: $('#value').val(),
                host: host
            },
            success: function(rows) {
                var html = '';
                for(var i=0; i<rows.length; i++){
                    if( i%2 == 0 ) {
                        html += '<tr class="odd">';
                    }else {
                        html += '<tr class="even">';
                    }
                    html += '<td style="text-align: center">'+rows[i]['queue_name']+'</td>';
                    html += '<td style="text-align: center">'+rows[i]['serve']+'</td>';
                    html += '<td style="text-align: center">'+rows[i]['lt_5']+'</td>';
                    html += '<td style="text-align: center">'+rows[i]['m5-10']+'</td>';
                    html += '<td style="text-align: center">'+rows[i]['m10-20']+'</td>';
                    html += '<td style="text-align: center">'+rows[i]['ge20']+'</td>';
                    html += '<td style="text-align: center">'+rows[i]['sum']+'</td>';
                    html += '<td style="text-align: center">'+rows[i]['max_queued']+'</td>';
                    html += '<td style="text-align: center">'+rows[i]['suggestion']+'</td>';
                    html += '<td style="text-align: center">'+rows[i]['mem_size']+'</td>';
                    if(rows[i]['change_mem'] > 0){
                        html += '<td style="color: #00FF00;text-align: center">'+rows[i]['change_mem']+'</td>';
                    }else{
                        html += '<td style="color: #FF0000;text-align: center">'+rows[i]['change_mem']+'</td>';
                    }
                }
                $('#qr_table > tbody').html(html);
            }
        });
    }

    updateTable();
})