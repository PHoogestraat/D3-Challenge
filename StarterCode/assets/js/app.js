// @TODO: YOUR CODE HERE!
console.log("D3 Homework");

 

//*****************************************************
// set the dimensions and margins of the graph
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data +++++++++++++++++++++++++++
d3.csv("assets/data/data.csv").then(function(raw) {
    console.log("raw")
    console.log(raw)

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    raw.forEach(function(data) {
        
        // x axis
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
        obesityLow = +data.obesityLow
        obesityHigh = +data.obesityHigh
        smokes = +data.smokes
        smokesLow = +data.smokesLow
        smokesHigh = +data.smokesHigh
        //y axis
        
        data.healthcare = +data.healthcare;
        healthcareLow = +data.healthcareLow
        healthcareHigh = +data.healthcareHigh
        age= +data.age
        
        console.log("data1");
        //console.log(data.healthcare);
        
        // needed for bubble label
        //console.log(data.abbr)




    });
    





    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(raw, d => d.poverty)])
      .range([0, width]);
        


    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(raw, d => d.healthcare)])
      .range([height, 0]);



    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);


    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    //* ==============================
    
    var circlesGroup = chartGroup.selectAll("circle")
    .data(raw)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("text", d => d.state)
    .attr("opacity", ".5");
    
    /*
    var node = chartGroup.selectAll("circle")
    .data(raw)
    .enter()
    .append("g");

    node.append("circle")
        .attr("class", "dot")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 12);

    node.append("text")
        .attr("x",d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .text(d=>d.state);
        */
    // State labels ????????
    //console.log(d.abbr)
    
    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Poverty%: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
   
    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 20)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  }).catch(function(error) {
    console.log(error);
  });


