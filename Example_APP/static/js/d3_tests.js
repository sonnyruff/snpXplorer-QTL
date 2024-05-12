/* #region dots */
// set the dimensions and margins of the graph
var margin = {top: 10, right: 40, bottom: 30, left: 30},
    width = 1200 - margin.left - margin.right,
    height = 100 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


d3.tsv("/chr22", function(data) {
  // X scale and Axis
  var x = d3.scaleLinear()
      .domain([d3.min(data, (d)=>d.POS), d3.max(data, (d)=>d.POS)])         // This is the min and the max of the data: 0 to 100 if percentages
      .range([0, width]);       // This is the corresponding value I want in Pixel
  svg
    .append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  
  // Y scale and Axis
  var y = d3.scaleLinear()
      .domain([d3.min(data, (d)=>d.P), d3.max(data, (d)=>d.P)])         // This is the min and the max of the data: 0 to 100 if percentages
      .range([height, 0]);       // This is the corresponding value I want in Pixel
  svg
    .append('g')
    .call(d3.axisLeft(y));
    
  svg.selectAll()
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", (d)=>x(d.POS))
        .attr("cy", (d)=>y(d.P))
        .attr("r", 7)
})

// ####################################################################################################

/* #region heatmap */
// // set the dimensions and margins of the graph
// var margin = {top: 30, right: 30, bottom: 30, left: 30},
//   width = 450 - margin.left - margin.right,
//   height = 450 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
// .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
// .append("g")
//   .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");

// // Labels of row and columns
// var myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
// var myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

// // Build X scales and axis:
// var x = d3.scaleBand()
//   .range([ 0, width ])
//   .domain(myGroups)
//   .padding(0.01);
// svg.append("g")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x))

// // Build X scales and axis:
// var y = d3.scaleBand()
//   .range([ height, 0 ])
//   .domain(myVars)
//   .padding(0.01);
// svg.append("g")
//   .call(d3.axisLeft(y));

// // Build color scale
// var myColor = d3.scaleLinear()
//   .range(["white", "#69b3a2"])
//   .domain([1,100])

// //Read the data
// d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function(data) {

//   svg.selectAll()
//       .data(data, function(d) {return d.group+':'+d.variable;})
//       .enter()
//       .append("rect")
//       .attr("x", function(d) { return x(d.group) })
//       .attr("y", function(d) { return y(d.variable) })
//       .attr("width", x.bandwidth() )
//       .attr("height", y.bandwidth() )
//       .style("fill", function(d) { return myColor(d.value)} )

// })
/* #endregion */

// ####################################################################################################

/* #region arc */
// // set the dimensions and margins of the graph
// var margin = {top: 20, right: 30, bottom: 20, left: 30},
//   width = 450 - margin.left - margin.right,
//   height = 300 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");

// // Read dummy data
// d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json", function( data) {

//   // List of node names
//   var allNodes = data.nodes.map(function(d){return d.name})

//   // A linear scale to position the nodes on the X axis
//   var x = d3.scalePoint()
//     .range([0, width])
//     .domain(allNodes)

//   // Add the circle for the nodes
//   var nodes = svg
//     .selectAll("mynodes")
//     .data(data.nodes)
//     .enter()
//     .append("circle")
//       // .attr("cx", (function(d){ return(x(d.name))}))
//       .attr("cx", (d)=>x(d.name))
//       .attr("cy", height-30)
//       .attr("r", 8)
//       .style("fill", "#69b3a2")

//   // And give them a label
//   var labels = svg
//     .selectAll("mylabels")
//     .data(data.nodes)
//     .enter()
//     .append("text")
//       .attr("x", function(d){ return(x(d.name))})
//       .attr("y", height-10)
//       .text(function(d){ return(d.name)})
//       .style("text-anchor", "middle")

//   // Add links between nodes. Here is the tricky part.
//   // In my input data, links are provided between nodes -id-, NOT between node names.
//   // So I have to do a link between this id and the name
//   var idToNode = {};
//   data.nodes.forEach(function (n) {
//     idToNode[n.id] = n;
//   });
//   // Cool, now if I do idToNode["2"].name I've got the name of the node with id 2

//   // Add the links
//   var links = svg
//     .selectAll('mylinks')
//     .data(data.links)
//     .enter()
//     .append('path')
//     .attr('d', function (d) {
//       start = x(idToNode[d.source].name)    // X position of start node on the X axis
//       end = x(idToNode[d.target].name)      // X position of end node
//       return ['M', start, height-30,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
//         'A',                            // This means we're gonna build an elliptical arc
//         (start - end)/2, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
//         (start - end)/2, 0, 0, ',',
//         start < end ? 1 : 0, end, ',', height-30] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
//         .join(' ');
//     })
//     .style("fill", "none")
//     .attr("stroke", "black")

//     // Add the highlighting functionality
//     nodes
//       .on('mouseover', function (d) {
//         // Highlight the nodes: every node is green except of him
//         nodes.style('fill', "#B8B8B8")
//         d3.select(this).style('fill', '#69b3b2')
//         // Highlight the connections
//         links
//           .style('stroke', function (link_d) { return link_d.source === d.id || link_d.target === d.id ? '#69b3b2' : '#b8b8b8';})
//           .style('stroke-width', function (link_d) { return link_d.source === d.id || link_d.target === d.id ? 4 : 1;})
//       })
//       .on('mouseout', function (d) {
//         nodes.style('fill', "#69b3a2")
//         links
//           .style('stroke', 'black')
//           .style('stroke-width', '1')
//       })
// })

// // text hover nodes
// svg
//   .append("text")
//     .attr("text-anchor", "middle")
//     .style("fill", "#B8B8B8")
//     .style("font-size", "17px")
//     .attr("x", 50)
//     .attr("y", 10)
//     .html("Hover nodes")
/* #endregion */

// ####################################################################################################


// https://gtexportal.org/home/transcriptPage