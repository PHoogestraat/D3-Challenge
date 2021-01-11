// @TODO: YOUR CODE HERE!
console.log("D3 Homework");



// Load data
d3.csv("assets/data/data.csv").then(dataRaw => {
    console.log(dataRaw)
    
    var state = dataRaw.map(data => data.state);
    console.log("State:", state);
    
    var poverty = dataRaw.map(data => data.poverty);
    console.log("Poverty:", poverty);
    
    var obesity = dataRaw.map(data => data.obesity);
    console.log("Obesity:", obesity);

/*
    // Cast the hours value to a number for each piece of tvData
    data.forEach(function(data) {
        console.log("state:" data.state);
    });
*/


}).catch(function(error) {
    console.log(error);
});