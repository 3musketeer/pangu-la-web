$(function(){
    var width = 1100,
        height = 800,
        root = {
            "name": "flare",
            "size": 10,
            "expand": true,
            "children": [
                {
                    "name": "ECS",
                    "expand": true,
                    "children": [
                        { "name": "2.107_tuxapp1", "size" : 5, "state" : 1 }, { "name": "2.107_tuxapp2", "size" : 5, "state" : 1 },
                        { "name": "2.108_tuxapp1", "size" : 5, "state" : 1 }, { "name": "2.108_tuxapp2", "size" : 5, "state" : 1 },
                        { "name": "2.109_tuxapp3", "size" : 5, "state" : 1 }, { "name": "2.109_tuxapp4", "size" : 5, "state" : 1 },
                        { "name": "2.110_tuxapp3", "size" : 5, "state" : 0 }, { "name": "2.110_tuxapp4", "size" : 5, "state" : 0 },
                        { "name": "2.231_tuxapp1", "size" : 5, "state" : 1 }, { "name": "2.231_tuxapp2", "size" : 5, "state" : 1 },
                        { "name": "2.232_tuxapp3", "size" : 5, "state" : 0 }, { "name": "2.232_tuxapp4", "size" : 5, "state" : 1 }
                    ]
                },
                {
                    "name": "全业务",
                    "expand": true,
                    "children": [
                        {"name": "2.112_tuxapp5", "size" : 5, "state" : 1 },
                        {"name": "2.113_tuxapp7", "size" : 5, "state" : 1 },
                        {"name": "2.233_tuxapp5", "size" : 5, "state" : 0 },
                        {"name": "2.233_tuxapp6", "size" : 5, "state" : 1 },
                        {"name": "2.234_tuxapp7", "size" : 5, "state" : 0 },
                        {"name": "2.234_tuxapp8", "size" : 5, "state" : 1 }
                    ]
                },
                {
                    "name": "一卡充",
                    "expand": true,
                    "children": [
                        {"name": "2.112_tuxapp6", "size" : 5, "state" : 1 },
                        {"name": "2.113_tuxapp8", "size" : 5, "state" : 1 }
                    ]
                },
                {
                    "name": "IBOSS",
                    "expand": true,
                    "children": [
                        {"name": "2.111_tuxapp5", "size" : 5, "state" : 0 },
                        {"name": "2.114_tuxapp7", "size" : 5, "state" : 1 }
                    ]
                },
                {
                    "name": "客服",
                    "expand": true,
                    "children": [
                        {"name": "2.111_tuxapp6", "size" : 5, "state" : 1 },
                        {"name": "2.114_tuxapp8", "size" : 5, "state" : 1 },
                    ]
                },
                {
                    "name": "BPM",
                    "expand": true,
                    "children": [
                        {"name": "2.141_bpmapp1", "size" : 5, "state" : 1 },
                        {"name": "2.141_bpmapp2", "size" : 5, "state" : 1 },
                        {"name": "2.142_bpmapp3", "size" : 5, "state" : 0 },
                        {"name": "2.142_bpmapp4", "size" : 5, "state" : 1 },
                        {"name": "2.143_bpmapp5", "size" : 5, "state" : 1 },
                        {"name": "2.143_bpmapp6", "size" : 5, "state" : 1 },
                        {"name": "2.144_bpmapp7", "size" : 5, "state" : 0 },
                        {"name": "2.144_bpmapp8", "size" : 5, "state" : 1 }
                    ]
                },
                {
                    "name": "前台Tuxedo",
                    "expand": true,
                    "children": [
                        {"name": "2.99_tuxapp1", "size" : 5, "state" : 1 },
                        {"name": "2.99_tuxapp2", "size" : 5, "state" : 0 },
                        {"name": "2.100_tuxapp1", "size" : 5, "state" : 1 },
                        {"name": "2.100_tuxapp2", "size" : 5, "state" : 1 },
                        {"name": "2.101_tuxapp3", "size" : 5, "state" : 1 },
                        {"name": "2.101_tuxapp4", "size" : 5, "state" : 1 },
                        {"name": "2.102_tuxapp3", "size" : 5, "state" : 1 },
                        {"name": "2.102_tuxapp4", "size" : 5, "state" : 0 },
                        {"name": "2.103_tuxapp5", "size" : 5, "state" : 1 },
                        {"name": "2.103_tuxapp6", "size" : 5, "state" : 1 },
                        {"name": "2.104_tuxapp5", "size" : 5, "state" : 1 },
                        {"name": "2.104_tuxapp6", "size" : 5, "state" : 1 },
                        {"name": "2.105_tuxapp7", "size" : 5, "state" : 1 },
                        {"name": "2.105_tuxapp8", "size" : 5, "state" : 0 },
                        {"name": "2.106_tuxapp7", "size" : 5, "state" : 1 },
                        {"name": "2.106_tuxapp8", "size" : 5, "state" : 1 }
                    ]
                }
            ]
        };

    var force = d3.layout.force()
        .gravity(.05)
        .distance(100)
        .charge(-750)
        .size([width, height])
        .on("tick", tick);

    var svg = d3.select("#topology").append("svg")
        .attr("width", width)
        .attr("height", height);

    var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");

        update();


    function update() {
        var nodes = flatten(root),
            links = d3.layout.tree().links(nodes);

        // Restart the force layout.
        force
            .nodes(nodes)
            .links(links)
            .start();

        // Update the links…
        link = link.data(links, function(d) {return d.target.id; });

        // Exit any old links.
        link.exit().remove();

        // Enter any new links.
        link.enter().insert("line", ".node")
            .attr("class", "link")
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        // Update the nodes…
        node = node.data(nodes, function(d) { return d.id; }).style("fill", color);

        // Exit any old nodes.
        node.exit().remove();

        // Enter any new nodes.
        var nodeEnter = node.enter().append("svg:g")
            .attr("class", "node")
            //.attr("cx", function(d) { return d.x; })
            //.attr("cy", function(d) { return d.y; })
            //.attr("r", function(d) { return d.size || 8; })
            //.style("fill", color)
            .on('click', function(d){ return d.expand && click(d) })
            //.on('click',function(d){ d.expand && click(d);})
            .on("mouseover", function (d) {
                if(d.expand) return;
                $.ajax({
                    type: 'get',
                    url: '/getStatDataByHost',
                    data: {
                        value: $('#value').val() || "2015-5-25",
                        host: "10.161." + d.name || "10.161.2.107_tuxapp1"
                    },
                    success: function(docs) {
                        showTooltip(d, docs)
                    }
                })
            })
            .on("mouseout", function (d) {
                $('#tooltip2').remove();
            })
            .call(force.drag);
        //console.log(nodeEnter)

        nodeEnter.append("svg:image")
            .attr("class", "circle")
            .attr("xlink:href", function(d){ return d.state == 1 || undefined === d.state ? "img/icons/server-ok.png" : "img/icons/server-down.png" })
            .attr("x", "-13px")
            .attr("y", "-13px")
            .attr("width", "26px")
            .attr("height", "26px")

        nodeEnter.append("svg:text")
            .attr("class", "nodetext")
            .attr("dx", +8)
            .attr("dy", -8)
            .text(function(d) { return d.name });
    }

    function tick() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    }

// Color leaf nodes orange, and packages white or blue.
    function color(d) {
        return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
    }

// Toggle children on click.
    function click(d) {
        if (d3.event.defaultPrevented) return;
        if(!d['_expand']){
            console.log('==1==',d)
            d._children = d.children;
            d.children = null;
            d['_expand'] = true;
        }else{
            console.log('==2==',d)
            d.children = d._children;
            d._children = null;
            d['_expand'] = false;
        }
        update();

    }

// Returns a list of all nodes under the root.
    function flatten(root) {
        var nodes = [], i = 0;

        function recurse(node) {
            if (node.children) node.children.forEach(recurse);
            if (!node.id) node.id = ++i;
            nodes.push(node);
        }

        recurse(root);
        return nodes;
    }

    function showTooltip(d, docs) {
        var rootElt = 'body';
        $('<table id="tooltip2" class="table table-striped table-hover">' +
        '<tbody>' +
        '<tr><td style="text-align: center">主机IP</td><td style="text-align: center">10.161.' + d.name.split('_')[0] + '</td></tr>' +
        '<tr><td style="text-align: center">用户</td><td style="text-align: center">' + d.name.split('_')[1] + '</td></tr>' +
        '<tr><td style="text-align: center">当日调用总量</td><td style="text-align: center">' + docs.CallCnt + '</td></tr>' +
        '<tr><td style="text-align: center">当日异常总量</td><td style="text-align: center">' + docs.FailCnt + '</td></tr>' +
        '<tr><td style="text-align: center">当日成功率</td><td style="text-align: center">' +
                                ((docs.CallCnt - docs.FailCnt)/docs.CallCnt).toFixed(2) + '%</td></tr>' +
        '</tbody></table>').css( {
            position: 'fixed',
            display: 'none',
            top: 245,
            right: 10,
            width: '300px',
            'z-index': '9999'
        }).prependTo(rootElt).show();
    }
})

