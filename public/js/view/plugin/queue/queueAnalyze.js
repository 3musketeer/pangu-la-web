$(function() {

    var table = null;
    var host = null;
    var param = null;

    //页面初始化调用
    function init() {

        host = (!host || host == '') ? $('#qa_serv option:selected').text() : host;
        console.log(host)
        table = $('#qa_table').dataTable({
            "bProcessing": true,
            "bServerSide": true,
            "sAjaxSource": '/queueAnalyzeDayPage',
            "fnServerParams": function ( aoData ) {
                aoData.push( { "name": "value", "value": $('#value').val() } );
                aoData.push( { "name": "chartList", "value": $('#chartList').val() } );
                aoData.push( { "name": "chartBList", "value": $('#chartBList').val() } );
                aoData.push( { "name": "host", "value": host } )
            },
            "aoColumns": [
                { "mData": "name" },
                { "mData": "queue" },
                { "mData": "serve", sClass: 'text-right' },
                { "mData": "lt_5", sClass: 'text-right' },
                { "mData": "m5-10", sClass: 'text-right' },
                { "mData": "m10-20", sClass: 'text-right' },
                { "mData": "ge20", sClass: 'text-right' },
                { "mData": "sum", sClass: 'text-right' },
                {
                    "mData": "overflow",
                    fnRender: function(obj) {
                        return ['<div class="progress progress-striped progress-success active">',
                            '<div class="bar" style="width: ',
                            Math.floor((obj.aData['sum']-obj.aData['overflow'])/obj.aData['sum']*100),
                            '%;"></div></div>'].join('')
                    }
                },
                { "mData": "max_queued", sClass: 'text-right' }/*,
                { "mData": "suggestion", sClass: 'text-right' }*/
            ],
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
            }
        });

        initServ();

        $("#qa_table tbody").delegate("tr", "dblclick", function() {
            var server = $("td:first", this).text();
            var queue = $("td:eq(1)", this).text();
            var sug = $('td:eq(10)', this).text();

            findDetail(server, queue, sug, host);
        });

    }

    //初始化服务器选择事件
    function initServ() {

        /*$('#qa_serv').delegate('li', 'click', function() {
            host = $(this).text();

            table.fnDraw();
        });*/
        $('#qa_serv').change(function(){
            host = $('#qa_serv option:selected').text();

            table.fnDraw();
        });

        $('#qa_dialog_header_close').click(function() {
            $('#qa_dialog').hide();

            //placeholder.unbind();
        });
    }

    //查询队列运行明细
    function findDetail(serv, que, sug, host) {
        $.ajax({
            type: 'get',
            url: '/getAnalyzeDayDetail',
            data: {
                server: serv,
                queue: que,
                value: $('#value').val(),
                chartList: $('#chartList').val(),
                chartBList: $('#chartBList').val(),
                host: host
            },
            success: function(res) {
                initChartData(res, sug);
            }
        })
    }

    //初始化图表数据
    function initChartData (rows, sug) {
        $('#qa_dialog').show();

        var data = [{
            label: '运行深度',
            data: []
        }, {
            label: '配置深度',
            data: []
        }];

        var conf;
        var date;
        var server;
        var queue;
        var data1 = new Array(24*60);
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var time = row.time;
            var queued = row.queued;

            if (i == 0) {
                conf = row.serve;
                server = row.name;
                queue = row.queue;
                date = new Date(time.split(' ')[0].replace(/-/g, '/'));
            }

            var btime = time.split(' ')[1].split(':');
            var hours = parseInt(btime[0]);
            var minutes = parseInt(btime[1]);

            data1[hours * 60 + minutes] = [date.getTime() + (hours * 60 + minutes)*60000, queued];

        }

        var data2 = new Array(24*60);
        var date3 = sug > 0 ? new Array(24*60) : null;
        for (var j = 0; j < 24*60; j++) {
            data2[j] = [date.getTime() + j*60000, conf];
            if (!data1[j]) data1[j] = [date.getTime() + j*60000, 0];
            if (sug > 0) date3[j] = [date.getTime() + j*60000, sug];
        }

        data[0].data = data1;
        data[1].data = data2;

        /*if (sug > 0) {
            data.push({
                label: '建议配置',
                data: date3
            });
        }*/

        var options = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: false
                }
            },
            grid: { hoverable: true, clickable: true },
            legend: {
                noColumns: 2
            },
            xaxis: {
//                tickDecimals: 0
                mode: "time",
                tickSize: [3600, "second"],
                tickFormatter: function (v, axis) {
                    var date = new Date(v);

                    if (date.getSeconds() % 6 == 0) {
                        var day = (date.getMonth()+1) + '-' + date.getDate();
                        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

                        return hours;
                    } else {
                        return "";
                    }
                }
            },
            yaxis: {
//                min: 0
            },
            selection: {
                mode: "x"
            }
        };

        drawChart(data, options, '服务:' + server + '; 队列:' + queue + '; 时间:' + $('#value').val());

    }

    //构建图表
    function drawChart(data, options, title) {
        var placeholder = $("#qa_dialog_content");

        placeholder.bind("plotselected", function (event, ranges) {
            console.log('plotselected...');

            $.each(plot.getXAxes(), function(_, axis) {
                var opts = axis.options;
                opts.min = ranges.xaxis.from;
                opts.max = ranges.xaxis.to;
                console.log('opts=>' + opts);
            });
            plot.setupGrid();
            plot.draw();
            plot.clearSelection();
        });

        placeholder.bind("plotunselected", function (event) {
//            $("#selection").text("");
        });

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
        placeholder.bind("plothover",function (event, pos, item) {

            if (placeholder.length > 0) {
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
                        var time = new Date(x);
                        var tx = time.getHours() > 9 ? time.getHours() : ('0' + time.getHours());
                        tx += ':';
                        tx += time.getMinutes() > 9 ? time.getMinutes() : ('0' + time.getMinutes());
                        showTooltip(
                            item.pageX+5,
                            item.pageY-20,
                            '时间: ' + tx + '<br>队列深度: ' + y);
                    }
                }
                else {
                    $('.chart-tooltip').remove();
                    previousPoint = null;
                }
            }
        });

        var plot = $.plot(placeholder, data, options);

        $('#qa_dialog_header_close').click(function() {
            $('#qa_dialog').hide();

            placeholder.unbind();
        });

        $('#qa_dialog_content_title').html(title);

        $('#qa_dialog_header_max').click(function() {
            plot.getAxes().min = null;
            plot.getAxes().max = null;
            plot = $.plot(placeholder, data, options);
        });
    }

    /*function getInitData() {
        $.ajax({
            type: 'get',
            url: '/queueAnalyzeDay',
            data: {

            },
            success: function(res) {
                initGridData(res.data);
            }
        })
    }

    function initGridData(rows) {
        var dg = $('#qa_table>tbody');
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            dg.append(['<tr>',
                            '<td>', row.server, '</td>',
                            '<td>', row.queue, '</td>',
                            '<td>', row.config, '</td>',
                            '<td>', row.grade1, '</td>',
                            '<td>', row.grade2, '</td>',
                            '<td>', row.grade3, '</td>',
                            '<td>', row.grade4, '</td>',
                            '<td>', row.total, '</td>',
                            '<td><div class="progress progress-striped progress-success active">',
                            '<div class="bar" style="width: ', row.state2, ';"></div></div></td>',
                            '<td>', row.max, '</td>',
                            '<td>', row.suggestion, '</td>',
                        '</tr>'].join(''));
        }

        $('#qa_table>tbody tr').click(function() {
            var row = $(this).find('td')[0].innerText;
            console.log(row);

            $('.dialog_content').dialogModal({
                onOkBut: function() {},
                onCancelBut: function() {},
                onLoad: function() {},
                onClose: function() {}
            });
        });
    }*/

//    getInitData();

    init();
})