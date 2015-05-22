$(function(){
    $('#3gess_operate').change(function(){
        updateTable();
    });
    $('#3gess_service').change(function(){
        getOperate();
    });
    $('#3gess_host').change(function(){
        getService();
    });

    function initChartData (data) {
        var rows = [],
            tmpR = {};
        for(var i=0; i<data.results.length; i++){
            if(tmpR[data.results[i]['rspcode']] === undefined){
                tmpR[data.results[i]['rspcode']] = data.results[i]['count'];
            }else{
                tmpR[data.results[i]['rspcode']] += data.results[i]['count'];
            }
        }
        for(var idx in tmpR){
            rows.push({label: idx, data: tmpR[idx]});
        }
        $.plot($("#bingtu"), rows,{
                series: {
                    pie: {
                        show: true,
                        tilt: 0.6,
                        combine: {
                            color: '#999',
                            threshold: 0.05
                        }
                    }
                },
                legend: {
                    show: false
                }
        });
        $.plot($("#total"), [
            {label: '失败', data: data['failure']},
            {label: '成功', data: data['success']}
        ],{
            series: {
                pie: {
                    show: true,
                    tilt: 0.7
                }
            },
            legend: {
                show: false
            }
        });

    };

    function updateTable(){

        var _operate = $('#3gess_operate option:selected').text() || 'all',
            _service = $('#3gess_service option:selected').text() || 'all',
            host = $('#3gess_host option:selected').text() || 'all';
        $.ajax({
            type: 'get',
            url: '/getAlarm3GESSData',
            data: {
                value: $('#value').val() || '2015-05-19',
                host: host,
                _operate: _operate,
                _service: _service,
                charList: $('#charList').val() || 'alarm3GESSGroupList',
                charBList: $('#charBList').val() || 'alarm3GESSBaseList'
            },
            success: function(data) {
                var html = '',
                    total = data.total,
                    rows = data.results,
                    colName = data.tabColName;
                if( rows.length == 0){
                    $('#_total').hide();
                    return;
                }else{
                    $('#_total').show();
                }
                $('#TradeTotal').html('<strong>' + data['count'] + '</strong>');
                $('#TradeSuccess').html('<strong>' + data['success'] + '</strong>');
                $('#TradeFailure').html('<strong>' + data['failure'] + '</strong>');
                $('#TradeFailureRate').html('<strong>' + (data['failure'] / data['count'] * 100).toFixed(2) + '%</strong>');
                html += '<tr>';
                for(var i=0; i<colName.length; i++){
                    html += '<th style="text-align: center">' + colName[i] + '</th>';
                }
                html += '</tr>';
                $('#3gess_table > thead').html(html);
                html = '';
                for(var i=0; i<rows.length; i++){
                    if( i%2 == 0 ) {
                        html += '<tr class="odd">';
                    }else {
                        html += '<tr class="even">';
                    }
                    html += '<td style="text-align: left">' + rows[i]['servicename'] + '</td>';
                    html += '<td style="text-align: left">' + rows[i]['operatename'] + '</td>';
                    html += '<td style="text-align: center">' + rows[i]['rspcode'] + '</td>';
                    html += '<td style="text-align: center">'+rows[i]['count']+'</td>';
                    html += '<td style="text-align: center">' + (rows[i]['count']/total*100).toFixed(3) + '</td>';

                }
                $('#3gess_table > tbody').html(html);
                initChartData(data);
            }
        });
    }

    function getHosts(){
        $.ajax({
            type: 'get',
            url: '/getAlarm3GESSHost',
            data: {
                value: $('#value').val() || '2015-05-19',
                charList: $('#charList').val() || 'alarm3GESSGroupList'
            },
            success: function(rows) {
                var html = "<option>all</option>";
                for(var idx=0; idx<rows.length; idx++){
                    html += "<option>" + rows[idx] + "</option>"
                }
                $('#3gess_host').html(html);
                getService();
            }
        });
    }

    function getService(){
        $.ajax({
            type: 'get',
            url: '/getAlarm3GESSService',
            data: {
                value: $('#value').val() || '2015-05-19',
                host: $('#3gess_host option:selected').text() || 'all',
                charList: $('#charList').val() || 'alarm3GESSGroupList'
            },
            success: function(rows) {
                var html = "<option>all</option>";
                for(var idx=0; idx<rows.length; idx++){
                    html += "<option>" + rows[idx] + "</option>"
                }
                $('#3gess_service').html(html);
                getOperate();
            }
        });
    }

    function getOperate(){
        $.ajax({
            type: 'get',
            url: '/getAlarm3GESSOperate',
            data: {
                value: $('#value').val() || '2015-05-19',
                host: $('#3gess_host option:selected').text() || 'all',
                charBList: $('#charBList').val() || 'alarm3GESSBaseList',
                _service: $('#3gess_service option:selected').text() || 'ESSTermSer'
            },
            success: function(rows) {
                var html = "<option>all</option>";
                for(var idx=0; idx<rows.length; idx++){
                    html += "<option>" + rows[idx] + "</option>"
                }
                $('#3gess_operate').html(html);
                updateTable();
            }
        });
    }

    getHosts();
});
