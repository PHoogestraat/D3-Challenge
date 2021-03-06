// @TODO: YOUR CODE HERE!
console.log("D3 Homework");

 

//*****************************************************
// set the dimensions and margins of the graph
var svgWidth = 880;
var svgHeight = 475;

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
d3.csv("assets/data/data.csv").then(function(raw){ 
    console.log("raw")
    console.log(raw)

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    raw.forEach(function(data) {
        
        // x axis
        data.poverty = +data.poverty;
        obesity = +data.obesity;
        obesityLow = +data.obesityLow 
        obesityHigh = +data.obesityHigh
        smokes = +data.smokes
        smokesLow = +data.smokesLow
        smokesHigh = +data.smokesHigh
        //y axis
        income = +data.income
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
      // - 1 shifts scale plot axis
      .domain([d3.min(raw, d => d.poverty) -1, d3.max(raw, d => d.poverty)])
    
    // Leave alone
      .range([0, width]);
        


    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(raw, d => d.healthcare) -4, d3.max(raw, d => d.healthcare)])
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
    //.attr("text", d => d.state)
    .attr("opacity", ".5");
    
    

    // New effort to label bubbles with state abreviation (effort 1/12/2011 #1)

      var statename = chartGroup.append("g")
      var statetext = statename.selectAll("text")
          .data(raw)
          .enter()
          .append("text")
          .text(d=>d.abbr) // labels state abreviation
          .attr("x", d=> xLinearScale(d.poverty))
          .attr("y", d=> yLinearScale(d.healthcare))
          .attr("font-size", "10px")
          .style("fill", "white")
          .attr("text-anchor", "middle");


    // Short code for inserting state abreviation into bubble effort 1
    /*var cicrleText = circlesGroup.append('text').text(d => d.abbr)
        .attr("dx", d => xLinearScale(d.poverty))
        .attr("dy", d => yLinearScale(d.healthcare))
        .attr("fill", "red")
        .attr("font-size", "10px")
    */
    // Long version code for inserting state abreviation into bubble effort 1
    // Not needed /*
    
    // var textCircles = chartGroup.selectAll("circle")
    //   .selectAll("text")  // Select text to bind
    //   .data(raw)
    //   .enter()
    //   .append("text")
    //   .text(d => d.abbr)
      
    //   //.attr("dx", 9.2)
    //   //.attr("dy", 11.4)

    //   .attr("dx", d => xLinearScale(d.poverty))
    //   .attr("dy", d => yLinearScale(d.healthcare))
    //   //.attr("dx", d => xLinearScale(9.2))
    //   //.attr("dy", d => yLinearScale(11.4))
      
    //   .attr("font-family", "sans-serif")
    //   .attr("text-anchor", "middle")
    //   .attr("font-size", "20px")
    //   .style("fill", "red")
    //   .attr("font-weight", "bold");
    

    
    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -80])
      .html(function(d) {
        return (`<u>${d.state}</u> 
        <br>Age (ave): ${d.age} 
        <br>Income (ave$): ${d.income} 
        <br>Smokes (%): ${d.smokes} 
        <br>Obesity (%): ${d.obesity}
        <br>Poverty (%): ${d.poverty}
        <br>Healthcare (%): ${d.healthcare} `);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    circlesGroup.call(toolTip);

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
      .attr("font-size", "30px")
      .style("fill", "green")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .attr("font-size", "30px")
      .style("fill", "green")
      .text("In Poverty (%)");
      
  }).catch(function(error) {
    console.log(error);
  });


    
