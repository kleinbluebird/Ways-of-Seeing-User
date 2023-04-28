datasetTotal = [
    {label:"1-whistle", value:14.003},
    {label:"1-jigsaw puzzle", value:3.390},
    {label:"1-muzzle", value:2.602},

    {label:"2-jigsaw puzzle", value:96.321},
    {label:"2-joystick", value:0.916},
    {label:"2-remote control", value:0.152},

    {label:"3-disk brake", value:23.472},
    {label:"3-joystick", value:10.351},
    {label:"3-tripod", value:2.871},

    {label:"4-reflex camera", value:8.409},
    {label:"4-padlock", value:7.998},
    {label:"4-espresso maker", value:3.754}
];

var margin = {top: (parseInt(d3.select('a').style('height'), 10)/20),
        right: (parseInt(d3.select('a').style('width'), 10)/20),
        bottom: (parseInt(d3.select('a').style('height'), 10)/20),
        left: (parseInt(d3.select('a').style('width'), 10)/5)},
    width = parseInt(d3.select('a').style('width'), 10) - margin.left - margin.right,
    height = parseInt(d3.select('a').style('height'), 10) - margin.top - margin.bottom;

var div = d3.select("a").append("div").attr("class", "toolTip");

var formatPercent = d3.format("");

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .2, 0.5);

var x = d3.scale.linear()
    .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickSize(-height)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
//.tickFormat(formatPercent);

var svg = d3.select("a").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

change(datasetTotal);

function change(dataset) {

    y.domain(dataset.map(function(d) { return d.label; }));
    x.domain([0, d3.max(dataset, function(d) { return d.value; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.select(".y.axis").remove();
    svg.select(".x.axis").remove();

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("x", 50)
        .attr("dx", ".1em")
        .style("text-anchor", "end")
        .text("Confidence %");


    var bar = svg.selectAll(".bar")
        .data(dataset, function(d) { return d.label; });
    // new data:
    bar.enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.value); })
        .attr("y", function(d) { return y(d.label); })
        .attr("width", function(d) { return width-x(d.value); })
        .attr("height", y.rangeBand());

    bar
        .on("mousemove", function(d){
            div.style("left", d3.event.pageX+10+"px");
            div.style("top", d3.event.pageY-25+"px");
            div.style("display", "inline-block");
            div.html((d.label)+"<br>"+(d.value)+"%");
        });
    bar
        .on("mouseout", function(d){
            div.style("display", "none");
        });


    // removed data:
    bar.exit().remove();

    // updated data:
    bar.transition()
        .duration(5000)
        .attr("x", function(d) { return 0; })
        .attr("y", function(d) { return y(d.label); })
        .attr("width", function(d) { return x(d.value); })
        .attr("height", y.rangeBand());
};

// p5.js
let blocks = [];
let graphics;
let letters = ["A small elephant?", "A cow!", "A cow in the grass", "I think", "it's a football", "near the lake", "A football", "with a headphone", "on the playground"];
let word;
let num = 0;
let font;

function preload() {
    font = loadFont("./src/xero4.ttf");
}

function setup() {
    let cnv = createCanvas(600, 600);
    cnv.parent('container');

    matter.init();
    matter.changeGravity(0,-0.1);
    platform_top = matter.makeBarrier(width / 2, 0, width, 100);
    platform_bottom = matter.makeBarrier(width / 2, height, width, 100);
    platform_left = matter.makeBarrier(0, height/2, 5, height);
    platform_right = matter.makeBarrier(width, height/2, 5, height);

}

function makeWord(x, y, d) {
    tSize = random(d / 3, d / 1.5);
    textSize(tSize);
    let b = matter.makeSign(letters[num], x, y);
    b.textSize = tSize;
    blocks.push(b);
    num++;
}

function draw() {
    clear();
    textFont(font);

    // fill(255);
    // noStroke();
    // platform_bottom.show();
    // platform_left.show();
    // platform_right.show();

    if (frameCount % 60 == 0) {
        let d = random(width / 9, width / 5);
        let x = random(width/2 - d / 2, width / 2 + d / 2);
        let y = random(height - d / 3, height - d / 2);
        makeWord(x, y, d);
    }

    for (let i = blocks.length - 1; i >= 0; i--) {
        let b = blocks[i];
        let p = b.body.position;
        push();
        translate(p.x, p.y, 0);
        rotate(b.body.angle);
        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        // textStyle(BOLD);
        textSize(b.textSize);
        text(b.text, 0, 0);
        pop();


    }

    push();
    let g = get();
    clear();
    //background(0, 0, 0);

    image(g, 0, 0);
    pop();
}
