// Load data from data.csv
// Cross-Origin scripting error occurs in browser when reading directly from file://
// Solution: use a url to the file
var url = "https://raw.githubusercontent.com/the-Coding-Boot-Camp-at-UT/UTAUS201804DATA2-Class-Repository-DATA/master/16-D3/HOMEWORK/Instructions/data/data.csv?token=AhmYUATyObv3_DJQGLdTTBTjmAL8REfpks5bd5HiwA%3D%3D"

d3.csv(url).then(successHandle, errorHandle);

function successHandle(healthData){
    console.log(healthData);
    
    // log a list of names
    var names = healthData.map(data => data.name);
    // console.log("names", names);
    
    // Cast the hours value to a number for each piece of healthData
    healthData.forEach(function(data) {
        data.hours = +data.hours;
        // console.log("Name:", data.name);
        // console.log("Hours:", data.hours);
    });
}

function errorHandle(error){
    return console.warn(error);
}

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
var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);