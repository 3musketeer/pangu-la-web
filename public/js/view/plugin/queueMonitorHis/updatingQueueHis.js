$(document).ready(function () {
    var data = [];
    var dataset;
    var updateInterval = 2000;
    var now = new Date().getTime(),
        host = null,
        serv_sel = null,
        query_res = null;

    // prepare chart data
    var  sampleData = [
//        { Time:'10:00:00', Queue1:30, Queue2:15, Queue3: 25},
//        { Time:'10:00:30', Queue1:25, Queue2:25, Queue3: 30},
//        { Time:'10:01:00', Queue1:30, Queue2:20, Queue3: 25},
//        { Time:'10:01:30', Queue1:35, Queue2:25, Queue3: 45},
//        { Time:'10:02:00', Queue1:20, Queue2:20, Queue3: 25},
//        { Time:'10:02:30', Queue1:30, Queue2:20, Queue3: 30},
//        { Time:'10:03:00', Queue1:60, Queue2:45, Queue3: 90}
    ];

    // prepare jqxChart settings
//    var settings = {
//        padding: { left: 5, top: 5, right: 5, bottom: 5 },
//        titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
//        source: sampleData,
//        showBorderLine: false,
//        categoryAxis:
//        {
//            dataField: 'Time',
//            showGridLines: false
//        },
//        colorScheme: 'scheme01',
//        seriesGroups:
//            [
//                {
//                    type: 'line',
//                    columnsGapPercent: 30,
//                    seriesGapPercent: 0,
//                    valueAxis:
//                    {
//                        minValue: 0,
//                        maxValue: 100,
//                        unitInterval: 20,
//                        description: '队列积压数量'
//                    },
//                    series: [
//                        { dataField: 'Queue1', displayText: 'Queue1'},
//                        { dataField: 'Queue2', displayText: 'Queue2'},
//                        { dataField: 'Queue3', displayText: 'Queue3'},
//                        { dataField: 'Queue4', displayText: 'Queue4'},
//                        { dataField: 'Queue5', displayText: 'Queue5'},
//                        { dataField: 'Queue6', displayText: 'Queue6'},
//                        { dataField: 'Queue7', displayText: 'Queue7'}
//                    ]
//                }
//            ]
//    };

    $("#mh_hosts_sel").change(function(){
        host = $(this).children('option:selected').text();
        serv_sel = $("#mh_serve_sel").children('option:selected').text() || '全部显示';
        $.ajax({
            type: 'GET',
            //url: '/getQueueDataHis',
            url: '/getHostQueueHisMR',
//            url: '/getQueueGroupDataHis',
            data: {
                value: $('#value').val(),
                host: host
            },
            dataType: 'json',
            success: function(data) {
                query_res = data;
                sampleData =  data.data;
//                redraw(data.data);
                updateServeSelect(data.queueLabels);
                group(data.data, data.queueFields, data.queueLabels);
            },
            error: function() {

            }
        });
    });

    $("#mh_serve_sel").change(function() {
        serv_sel = $(this).children('option:selected').text();
        if (serv_sel == '全部显示') {
            group(query_res.data, query_res.queueFields, query_res.queueLabels);
        }else{
            var tmpdata = [];
            for(var i=0; i<query_res.data.length; i++){
                for(var j=0; j<query_res.data[i].data.length; j++){
                    if(serv_sel == query_res.data[i].data[j]['0']){
                        tmpdata.push({time:query_res.data[i].time, data:[query_res.data[i].data[j]]});
                    }
                }
            }
            $.ajax({
                type: 'GET',
                url: '/getHostQueueHisServe',
                data: {
                    value: $('#value').val(),
                    host: host,
                    name: serv_sel,
                    timestamp: tmpdata[0].time
                },
                dataType: 'json',
                success: function(data) {
                    var serve = data.serve;
                    for(var i=0; i<tmpdata.length; i++){
                        tmpdata[i].data.push({0:'serve', 1: serve});
                        if( null == tmpdata[i].data[0]['1']){
                            tmpdata[i].data[0]['1'] = 0;
                        }
                    }

                    group(tmpdata, [serv_sel, serve], [serv_sel, serve]);
                },
                error: function() {
                }
            });
        }
    });

    function getData() {
        host = $("#mh_hosts_sel").children("option:selected").text() || '134.32.28.36';
        serv_sel = $("#mh_serve_sel").children('option:selected').text() || '全部显示';
        //console.log(host)
        $.ajax({
            type: 'GET',
            //url: '/getQueueDataHis',
            url: '/getHostQueueHisMR',
//            url: '/getQueueGroupDataHis',
            data: {
                value: $('#value').val(),
                host: host
            },
            dataType: 'json',
            success: function(data) {
                query_res = data;
                sampleData =  data.data;
//                redraw(data.data);
                updateServeSelect(data.queueLabels);
                group(data.data, data.queueFields, data.queueLabels);
            },
            error: function() {

            }
        });
    }

    function updateServeSelect(qLabels){
        var serv_sel = $("#mh_serve_sel");
        var html = "<option>全部显示</option>";
        for(var i=0; i<qLabels.length; i++){
            html += "<option>" + qLabels[i] + "</option>";
        }
        serv_sel.html(html);
    }


    function redraw(data) {

        var settings = {
            padding: { left: 5, top: 5, right: 5, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: data,
            showBorderLine: false,
            categoryAxis:
            {
                dataField: 'Time',
                showGridLines: true
            },
            colorScheme: 'scheme01',
            seriesGroups:
                [
                    {
                        type: 'line',
                        lineWidth: 1.5,
                        columnsGapPercent: 30,
                        seriesGapPercent: 0,
                        valueAxis:
                        {
//                            minValue: 0,
//                            maxValue: 120,
                            unitInterval: 20,
                            description: '队列积压数量'
                        },
                        series: [
                            { dataField: 'Queue1', displayText: 'Queue1'},
                            { dataField: 'Queue2', displayText: 'Queue2'},
                            { dataField: 'Queue3', displayText: 'Queue3'},
                            { dataField: 'Queue4', displayText: 'Queue4'},
                            { dataField: 'Queue5', displayText: 'Queue5'},
                            { dataField: 'Queue6', displayText: 'Queue6'},
                            { dataField: 'Queue7', displayText: 'Queue7'}
                        ]
                    }
                ]
        };

        $('#queue_monitor').jqxChart(settings);
    }


    function group(data, queueFields, queueLabels) {
        /*var ds = [{
            label: 'Queue1',
            data: []
        }, {
            label: 'Queue2',
            data: []
        }, {
            label: 'Queue3',
            data: []
        }, {
            label: 'Queue4',
            data: []
        }, {
            label: 'Queue5',
            data: []
        }, {
            label: 'Queue6',
            data: []
        }, {
            label: 'Queue7',
            data: []
        }];*/

        var ds = [];
        for (var m = 0; m < queueLabels.length; m++) {
            ds.push({label: queueLabels[m], data: []});
        }

        for (var i = 0; i < data.length; i++) {
//            ds.push(data[i].value);
            for (var j = 0; j < queueLabels.length; j++) {
                ds[j].data.push([data[i].time, data[i].data[j]['1']]);
            }

        }

        var options = {
            series: {
                lines: {
                    show: true
                }
            },
            xaxis: {
                mode: "time",
                tickSize: [60, "second"],
                tickFormatter: function (v, axis) {
                    var date = new Date(v);

                    if (date.getSeconds() % 10 == 0) {
                        var day = (date.getMonth()+1) + '-' + date.getDate();
                        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

                        return hours + ':' + minutes;
                    } else {
                        return "";
                    }
                },
                show: false
            },
            yaxis: {
                show: false
            },
            selection: {
                mode: "x"
            }
        };

        var options_part = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: false
                }
            },
            legend: {
                noColumns: 8
            },
            xaxis: {
//                tickDecimals: 0
                mode: "time",
                tickSize: [60, "second"],
                tickFormatter: function (v, axis) {
                    var date = new Date(v);

                    if (date.getMinutes() % 10 == 0) {
                        var day = (date.getMonth()+1) + '-' + date.getDate();
                        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

                        return hours + ':' + minutes;
                    } else {
                        return "";
                    }
                }
            },
            yaxis: {
//                min: 0
            },
            hoverable: true,
            clickable: true
        };

        var placeholder = $("#queue_monitor");
        var pcpart = $("#queue_monitor_part");

        placeholder.bind("plotselected", function (event, ranges) {
            //console.log('plotselected...');
//            $("#selection").text(ranges.xaxis.from.toFixed(1) + " to " + ranges.xaxis.to.toFixed(1));
//
//            var zoom = $("#zoom").prop("checked");
//
//            if (zoom) {
            $.each(plot_part.getXAxes(), function(_, axis) {
                var opts = axis.options;
                opts.min = ranges.xaxis.from;
                opts.max = ranges.xaxis.to;
                //console.log('opts=>' + opts);
            });
            plot_part.setupGrid();
            plot_part.draw();
            //plot.clearSelection();
//            }
        });

        placeholder.bind("plotunselected", function (event) {
//            $("#selection").text("");
        });

        var plot = $.plot(placeholder, ds, options);
        var plot_part = $.plot(pcpart, ds, options_part);


        $('#mh_show_all').click(function() {
            plot_part.getAxes().min = null;
            plot_part.getAxes().max = null;
            plot_part = $.plot(pcpart, ds, options_part);
        });

        $('#mh_hours_sel').change(function() {
            var h = $(this).val();
            var date = $('#value').val();
//            console.log('start=>' + (date + ' ' + h + ':00:00') + '; end=>' + (date + ' ' + (parseInt(h)+2) + ':00:00'));
            var start = date + ' ' + h + ':00:00';
            var end = '';
            if (h == '22') {
                end = date + ' ' + '23:59:59';
            } else {
                end = date + ' ' + (parseInt(h)+2) + ':00:00';
            }
//            console.log('start=>', start, '; end=>', end);
//            plot.getAxes().min = 1399946400000;
//            plot.getAxes().max = 1399953600000;
//            plot = $.plot(placeholder, ds, options);

            plot.setSelection({
                xaxis: {
                    from: new Date(start).getTime(),
                    to: new Date(end).getTime()
                }
            });

//            $.each(plot.getXAxes(), function(_, axis) {
//                var opts = axis.options;
//                opts.min = 1388535200577.0913;
//                opts.max = 1388546758096.5574;
//            });
//            plot.setupGrid();
//            plot.draw();
//            plot.clearSelection();

        });

    }

    /*function test() {
        var data = [{
            label: "United States",
            data: [[1990, 18.9], [1991, 18.7], [1992, 18.4], [1993, 19.3], [1994, 19.5], [1995, 19.3], [1996, 19.4], [1997, 20.2], [1998, 19.8], [1999, 19.9], [2000, 20.4], [2001, 20.1], [2002, 20.0], [2003, 19.8], [2004, 20.4]]
        }, {
            label: "Russia",
            data: [[1992, 13.4], [1993, 12.2], [1994, 10.6], [1995, 10.2], [1996, 10.1], [1997, 9.7], [1998, 9.5], [1999, 9.7], [2000, 9.9], [2001, 9.9], [2002, 9.9], [2003, 10.3], [2004, 10.5]]
        }, {
            label: "United Kingdom",
            data: [[1990, 10.0], [1991, 11.3], [1992, 9.9], [1993, 9.6], [1994, 9.5], [1995, 9.5], [1996, 9.9], [1997, 9.3], [1998, 9.2], [1999, 9.2], [2000, 9.5], [2001, 9.6], [2002, 9.3], [2003, 9.4], [2004, 9.79]]
        }, {
            label: "Germany",
            data: [[1990, 12.4], [1991, 11.2], [1992, 10.8], [1993, 10.5], [1994, 10.4], [1995, 10.2], [1996, 10.5], [1997, 10.2], [1998, 10.1], [1999, 9.6], [2000, 9.7], [2001, 10.0], [2002, 9.7], [2003, 9.8], [2004, 9.79]]
        }, {
            label: "Denmark",
            data: [[1990, 9.7], [1991, 12.1], [1992, 10.3], [1993, 11.3], [1994, 11.7], [1995, 10.6], [1996, 12.8], [1997, 10.8], [1998, 10.3], [1999, 9.4], [2000, 8.7], [2001, 9.0], [2002, 8.9], [2003, 10.1], [2004, 9.80]]
        }, {
            label: "Sweden",
            data: [[1990, 5.8], [1991, 6.0], [1992, 5.9], [1993, 5.5], [1994, 5.7], [1995, 5.3], [1996, 6.1], [1997, 5.4], [1998, 5.4], [1999, 5.1], [2000, 5.2], [2001, 5.4], [2002, 6.2], [2003, 5.9], [2004, 5.89]]
        }, {
            label: "Norway",
            data: [[1990, 8.3], [1991, 8.3], [1992, 7.8], [1993, 8.3], [1994, 8.4], [1995, 5.9], [1996, 6.4], [1997, 6.7], [1998, 6.9], [1999, 7.6], [2000, 7.4], [2001, 8.1], [2002, 12.5], [2003, 9.9], [2004, 19.0]]
        }];

        var options = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: true
                }
            },
            legend: {
                noColumns: 2
            },
            xaxis: {
                tickDecimals: 0
            },
            yaxis: {
                min: 0
            },
            selection: {
                mode: "x"
            }
        };

        var placeholder = $("#queue_monitor");

        placeholder.bind("plotselected", function (event, ranges) {
            console.log('plotselected...');

//            $("#selection").text(ranges.xaxis.from.toFixed(1) + " to " + ranges.xaxis.to.toFixed(1));
//
//            var zoom = $("#zoom").prop("checked");
//
//            if (zoom) {
            $.each(plot.getXAxes(), function(_, axis) {
                var opts = axis.options;
                opts.min = ranges.xaxis.from;
                opts.max = ranges.xaxis.to;
            });
            plot.setupGrid();
            plot.draw();
            plot.clearSelection();
//            }
        });

        placeholder.bind("plotunselected", function (event) {
//            $("#selection").text("");
        });

        var plot = $.plot(placeholder, data, options);

//        $("#clearSelection").click(function () {
//            plot.clearSelection();
//        });
//
//        $("#setSelection").click(function () {
//            plot.setSelection({
//                xaxis: {
//                    from: 1994,
//                    to: 1995
//                }
//            });
//        });

        // Add the Flot version string to the footer

//        $("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
    }*/

    function update() {
        getData();


//        test();
//        timeId = setTimeout(update, updateInterval);
    }

    update();
});