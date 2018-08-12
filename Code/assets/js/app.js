// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
// Cross-Origin scripting error occurs in browser when reading directly from file://
// Solution: use a url to the file
var url = "https://raw.githubusercontent.com/the-Coding-Boot-Camp-at-UT/UTAUS201804DATA2-Class-Repository-DATA/master/16-D3/HOMEWORK/Instructions/data/data.csv?token=AhmYUATyObv3_DJQGLdTTBTjmAL8REfpks5bd5HiwA%3D%3D"

d3.csv(url).then(successHandle, errorHandle);

function successHandle(healthData){
    console.log(healthData);
    
    // log a list of names
    //var names = healthData.map(data => data.name);
    
    // Parse Data/Cast as numbers
    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.povertyMoe = +data.povertyMoe;
        data.age = +data.age;
        data.ageMoe = +data.ageMoe;
        data.income = +data.income;
        data.incomeMoe = +data.incomeMoe;
        data.healthcare = +data.healthcare;
        data.healthcareLow = +data.healthcareLow;
        data.healthcareHigh = +data.healthcareHigh;
        data.obesity = +data.obesity;
        data.obesityLow = +data.obesityLow;
        data.obesityHigh = +data.obesityHigh;
        data.smokes = +data.smokes;
        data.smokesLow = +data.smokesLow;
        data.smokesHigh = +data.smokesHigh;
    });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(healthData, d => d.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.healthcare)])
        .range([height, 0])
    
    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    chartGroup.append("g")
        .call(leftAxis);
    chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "pink")
        .attr("oppacity", ".5");
}

function errorHandle(error){
    return console.warn(error);
}