
// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = { top: 40, right: 100, bottom: 40, left: 175 };



// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) - 10, graph_1_height = 250;
let graph_2_width = (MAX_WIDTH / 2) - 10, graph_2_height = 275;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 575;

var svg1 = d3.select("#graph1").append("svg").attr("width", graph_1_width).attr("height", graph_1_height).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var svg2 = d3.select("#graph2").append("svg").attr("width", graph_2_width).attr("height", graph_2_height).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var svg3 = d3.select("#graph3").append("svg").attr("width", graph_3_width).attr("height", graph_3_height).append("g").attr("transform", "translate(" + margin.right + "," + margin.top + ")");

d3.csv("../data/video_games.csv").then(function (data) {

    // Graph 1
    var year = null;

    data1 = top10(data, year)
    data1 = data1.slice(0, 10)
    var x = d3.scaleLinear().domain([0, d3.max(data1, function (d) { return d.Global_Sales; })]).range([0, graph_1_width - margin.left - margin.right]);

    var y = d3.scaleBand().domain(data1.map(function (d) { return d.Name })).range([0, graph_1_height - margin.top - margin.bottom]).padding(.1);
    svg1.append("g").call(d3.axisLeft(y).tickSize(0).tickPadding(10));
    svg1.append("g").attr("transform", "translate(0," + 170 + ")").call(d3.axisBottom(x).tickSize(0).tickPadding(10));
    svg1.selectAll("rect").data(data1).enter().append("rect").attr("x", x(0)).attr("y", function (d) { return y(d.Name); })
        .attr("width", function (d) { return x(d.Global_Sales); }).attr("height", y.bandwidth()).attr("fill", "#6e89cc");
    graph22(0, "NA_Sales");

});

function graph22(index, attr) {

    d3.csv("../data/video_games.csv").then(function (data) {
        // Graph 2


        var test;

        var action = d3.sum(data.filter(function (d) { return d.Genre === "Action" }), d => d[attr]);
        var adventure = d3.sum(data.filter(function (d) { return d.Genre === "Adventure" }), d => d[attr]);
        var fighting = d3.sum(data.filter(function (d) { return d.Genre === "Fighting" }), d => d[attr]);
        var misc = d3.sum(data.filter(function (d) { return d.Genre === "Misc" }), d => d[attr]);
        var platform = d3.sum(data.filter(function (d) { return d.Genre === "Platform" }), d => d[attr]);
        var puzzle = d3.sum(data.filter(function (d) { return d.Genre === "Puzzle" }), d => d[attr]);
        var racing = d3.sum(data.filter(function (d) { return d.Genre === "Racing" }), d => d[attr]);
        var roleplay = d3.sum(data.filter(function (d) { return d.Genre === "Role-Playing" }), d => d[attr]);
        var shooter = d3.sum(data.filter(function (d) { return d.Genre === "Shooter" }), d => d[attr]);
        var simulation = d3.sum(data.filter(function (d) { return d.Genre === "Simulation" }), d => d[attr]);
        var sports = d3.sum(data.filter(function (d) { return d.Genre === "Sports" }), d => d[attr]);
        var strategy = d3.sum(data.filter(function (d) { return d.Genre === "Strategy" }), d => d[attr]);


        var dict = {};
        dict["Action"] = action;
        dict["Adventure"] = adventure;
        dict["Fighting"] = fighting;
        dict["Misc"] = misc;
        dict["Platform"] = platform;
        dict["Puzzle"] = puzzle;
        dict["Racing"] = racing;
        dict["Role-Playing"] = roleplay;
        dict["Shooter"] = shooter;
        dict["Simulation"] = simulation;
        dict["Sports"] = sports;
        dict["Strategy"] = strategy;
        console.log(roleplay);

        var x1 = d3.scaleBand().domain(data.map(function (d) { return d.Genre })).range([0, graph_1_width - margin.right - margin.left]).padding(.1);
        var y1 = d3.scaleLinear().domain([0, 2000]).range([0, graph_2_height - margin.top - margin.bottom]);



        svg2.append("g").call(d3.axisLeft(y1).tickSize(0).tickPadding(10));
        svg2.append("g").attr("transform", "translate(0," + 195 + ")").call(d3.axisBottom(x1).tickSize(0).tickPadding(10));
        let bars = svg2.selectAll("rect").data(d3.entries(dict));
        bars.enter()
            .append("rect")
            .merge(bars)
            .transition()
            .duration(1000)
            .attr("x", function (d) { return x1(d.key) })
            .attr("y", function (d) { return y1(d.value) })
            .attr("width", x1.bandwidth())
            .attr("height", function (d) { return y1(d.value) }).attr("fill", "#99c09d");



    });
}
function bestPublisher(index, attr) {
    // Graph 3
    d3.csv("../data/video_games.csv").then(function (data) {

        var numpublishers = 5;
        var authorlist = [];

        for (var i = 0; i < data.length; i++) {
            if (data[i].Genre == attr) {
                if (checkC(data[i].Publisher, authorlist) == false) {
                    authorlist.push(data[i].Publisher);
                }
                if (authorlist.length == numpublishers) {
                    break;
                }
            }
        }
        var dict1 = {};
        var count = numpublishers;
        for (var j = 0; j < authorlist.length; j++) {
            dict1[authorlist[j]] = count;
            count -= 1;
        }
        console.log(dict1);
        var x2 = d3.scaleBand().range([0, graph_3_width - margin.right - margin.left]).domain(authorlist.map(function (d) { return d }))
            .padding(1);
        var y2 = d3.scaleLinear().domain([0, 5]).range([graph_3_height, 0]);

        svg3.append("g").call(d3.axisLeft(y2).tickSize(0).tickPadding(10));
        svg3.append("g").attr("transform", "translate(0," + 450 + ")").call(d3.axisBottom(x2).tickSize(0).tickPadding(10));
        let bars1 = svg3.selectAll("rect").data(d3.entries(dict1));
        bars1.enter()
            .append("rect")
            .merge(bars1)
            .transition()
            .duration(1000)
            .attr("x", function (d) { return x2(d.key) })
            .attr("y", function (d) { return y2(d.value) })
            .attr("width", x2.bandwidth())
            .attr("height", function (d) { return y2(d.value) }).attr("fill", "#99c09d");

        bars1.exit().remove();

    });
}



function top10(data, year) {
    if (year != null) {
        return data.filter(function (d) { if (d.Year === year) return d });
    }
    else {
        return data;
    }
}

function checkC(Publisher, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == Publisher) {
            return true;
        }

    }
    return false;
}

