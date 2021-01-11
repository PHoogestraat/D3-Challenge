// @TODO: YOUR CODE HERE!
console.log("D3 Homework");


/*
// Load data
d3.csv("assets/data/data.csv").then(dataRaw => {
    console.log(dataRaw)
    
    var state = dataRaw.map(dataR => dataR.state);
    console.log("State:", state);
    
    var poverty = dataRaw.map(dataR => dataR.poverty);
    console.log("Poverty:", poverty);
    
    var obesity = dataRaw.map(dataR => dataR.obesity);
    console.log("Obesity:", obesity);


    // Cast the hours value to a number for each piece of tvData
    data.forEach(function(data) {
        console.log("state:" data.state);
    });



}).catch(function(error) {
    console.log(error);

});
*/

//***************************************************** */
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data


d3.csv("assets/data/data.csv").then(function(raw) {
    console.log("raw")
    console.log(raw)
    
  // cast the data from the csv as numbers
    raw.forEach(function(data) {
        data.poverty = +data.poverty;

        data.obesity = +data.obesity;
        data.healthcare = +data.healthcare;

        console.log("data1");
        //console.log(data);
    });
    
    // changes obesity and poverty to a number for in raw
    console.log("raw2");
    console.log(raw);
    
    // Add X axis   Obesity
    var x = d3.scaleLinear()
        .domain(d3.extent(raw, d => d.poverty))
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis   Poverty
    var y = d3.scaleLinear()
        .domain([0, d3.max(raw, d => d.healthcare)])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(raw)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.poverty); } )
            .attr("cy", function (d) { return y(d.healthcare); } )
            .attr("r", 5.0)
            .style("fill", "#69b3a2")

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 1))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Number of Billboard 100 Hits");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Hair Metal Band Hair Length (inches)");


}).catch(function(error) {
    console.log(error);
});


    
