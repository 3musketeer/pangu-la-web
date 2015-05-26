$(function(){
    var width = 1100,
        height = 800,
        root,
        updateInterval = 10 * 1000,
        warn = {};

    var force = d3.layout.force()
        .gravity(.05)
        //.distance(100)
        .linkDistance(function(d) { return (d.distance*10) || 70; })
        .charge(-750)
        .size([width, height])
        .on("tick", tick);

    var svg = d3.select("#topology").append("svg")
        .attr("width", width)
        .attr("height", height);

    var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");

    //setInterval(function(){}, updateInterval);

    $.getJSON('/getNTGNodes', function(data){
        root = data;
        update();
    })
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
            .on('click', function(d){ return (d['type'] == 'switch') && click(d) })
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
                    success: function (docs) {
                        showTooltip(d, docs)
                    }
                })
            })
            .on("mouseout", function (d) {
                hideTooltip();
            })
            .call(force.drag);
        //console.log(nodeEnter)

        nodeEnter.append("svg:image")
            .attr("class", "circle")
            .attr("xlink:href", function(d){
                return d['state'] == 0 ? "img/icons/ntg-warning.gif" : d.type == "switch"
                                    ? "img/icons/ntg-switch.png" : d.type == "point"
                                    ? "img/icons/server-ok.png" : d.type == "root"
                                    ? "img/icons/server-ok.png" : "img/icons/server-down.png"
            })
            .attr("x", function(d){
                return d.type == "switch" ? "-13px" : "-16px";
            })
            .attr("y", function(d){
                return d.type == "switch" ? "-13px" : "-16px";
            })
            .attr("width", function(d){
                return d.type == "switch" ? "26px" : "32px";
            })
            .attr("height", function(d){
                return d.type == "switch" ? "26px" : "32px";
            })

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
        if(d.children){
            d._children = d.children;
            d.children = null;
        }else{
            d.children = d._children;
            d._children = null;
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
        $("td#ntg-ip").text("10.161." + d.name.split("_")[0]);
        $("td#ntg-user").text(d.name.split("_")[1]);
        $("td#ntg-call").text(docs.CallCnt);
        $("td#ntg-fail").text(docs.FailCnt);
        $("td#ntg-rate").text(((docs.CallCnt - docs.FailCnt)*100/docs.CallCnt).toFixed(2) + "%");
        $("table#tooltip-topology").css("top", d.y);
        $("table#tooltip-topology").css("left", d.x);
        if(warn["10.161." + d.name]){
            $("tr#ntg-fail-content > td").html('<font color=red>'+warn["10.161." + d.name]['content']+'</font>');
            $("tr#ntg-fail-content").show();
        }else{
            $("tr#ntg-fail-content").hide();
        }
        $("table#tooltip-topology").show();
    }

    function hideTooltip(){
        $("table#tooltip-topology").hide();
        var display = $("table#tooltip-topology").css("display");
        if(display != 'none'){
            //console.log(display)
            $("table#tooltip-topology").css("display", "none");
        }
    }
})

