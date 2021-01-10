// @TODO: YOUR CODE HERE!
console.log("test");
var rawDatax = d3.csv("assets/data/data.csv")
console.log(rawDatax)

d3.csv("assets/data/data.csv").then(dataRaw => {
        console.log(dataRaw)
});

// Load Data
d3.csv("assets/data/data.csv")
    .then(res => {
        console.log(res)
    })

d3.csv("data.csv").then(function(tvData) {
    console.log(tvData);

}).catch(function(error) {
console.log(error);
});
      