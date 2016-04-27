// $(function() {
// 	// Read in your data. On success, run the rest of your code
// 	d3.csv('data/bad-drivers.csv', function(error, data){
// 		// Setting defaults
// 		var margin = {top: 40, right: 10, bottom: 10, left: 10},
// 		    width = 960 - margin.left - margin.right,
// 		    height = 500 - margin.top - margin.bottom;

// 		// variable to visualize
// 		var measure = 'Percentage Of Drivers Involved In Fatal Collisions Who Were Speeding';
// 		var color = d3.scale.category10();

// 		// Wrapper div for the chart
// 		var div = d3.select('#vis')
// 								.append("div")
// 								.attr('height', 600)
// 								.attr('width', 600)
// 								.style("left", margin.left + "px")
// 								.style("top", margin.top + "px");

// 		// Function to arrange divs (will be called seperately for entering and updating)
// 		var position = function() {
// 			// Set the position of each div using the properties computed from the treemap function
// 			this.style("left", function(d,i) {return d.x + "px"; })
// 					.style("top", function(d) { return d.y + "px"; })
// 					.style('width', function(d){return d.dx + 'px'})
// 					.style("height", function(d) { return d.dy + "px"; })
// 					.style("background", function(d) {return !d.values ? color(d.State) : null; })
// 		}

// 		// Construct a nest function using `d3.nest`, and create a variable with your nested data
        
//         var nest = d3.nest() // function that returns a function...              
//                 .key(function(d){return d.State;});
                
//         // Pass your (tabular) data to the nest function to create your nested array 
//         var nestedData = nest.entries(data);
//         console.log(nestedData);

// 		// Construct a treemap function that sizes elements based on the current `measure`, and
// 		// Make sure to specify how to retrieve the `children` from each element
        
//         // Construct a treemap function that will retrieve values from your nested data 
//         var treemap = d3.layout.treemap() // function that returns a function!     
//             .size([width, height]) // set size: scaling will be done internally     
//             .sticky(true) // If data changes, keep elements in the same position     
//             .value(function(d) {return d[measure]}) // Assert value to be used to     
//             .children(function(d) {return d.values}); // Determine how the function will find the children of each node
            
//         // Retrieve the individual nodes from the tree 
//        // Object to be traversed looking for child elements


// 		// Write your `draw` function to bind data, and position elements
//         var draw = function() {
        
//             treemap.value(function(d) {return d[measure];});
//             var treemapData = treemap.nodes({values:nestedData}); 
            
//             var nodes = div.selectAll('.node').data(treemapData);

            
//             nodes.enter()
//                  .append('div')
//                  .attr("class", 'node')
//                  .text(function(d) {return d.State})
//                  .call(position);
                 
//             nodes.transition().duration(500).call(position);
//         }

// 		// Call your draw function
//         draw()

// 		// Listen to change events on the input elements
// 		$("input").on('change', function() {
//             measure = $(this).val();

// 			// Draw your elements
// 			draw();
			
// 		});

// 	});
// });

$(function() {
	// Read in prepped_data file
	d3.csv('data/bad-drivers.csv', function(error, allData){
		// Variables that should be accesible within the namespace
		var xScale, yScale, currentData;

		// Track the sex (male, female) and drinking type (any, binge) in variables
		var activity = 'speeding';

		// Margin: how much space to put in the SVG for axes/titles
		var margin = {
			left:50,
			bottom:100,
			top:50,
			right:50,
		};

		// Height/width of the drawing area for data symbols
		var height = 600 - margin.bottom - margin.top;
		var width = 1000 - margin.left - margin.right;

	 	// Select SVG to work with, setting width and height (the vis <div> is defined in the index.html file)
		var svg = d3.select('#vis')
			.append('svg')
			.attr('height', 600)
			.attr('width', 1000);

		// Append a 'g' element in which to place the rects, shifted down and right from the top left corner
		var g = svg.append('g')
				.attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')')
				.attr('height', height)
				.attr('width', width);

		// Append an xaxis label to your SVG, specifying the 'transform' attribute to position it (don't call the axis function yet)
		var xAxisLabel = svg.append('g')
												.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
												.attr('class', 'axis')

		// Append a yaxis label to your SVG, specifying the 'transform' attribute to position it (don't call the axis function yet)
		var yAxisLabel = svg.append('g')
										.attr('class', 'axis')
										.attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')

		// Append text to label the y axis (don't specify the text yet)
		var xAxisText = svg.append('text')
											 .attr('transform', 'translate(' + (margin.left + width/2) + ',' + (height + margin.top + 40) + ')')
											 .attr('class', 'title')

		// Append text to label the y axis (don't specify the text yet)
		var yAxisText = svg.append('text')
											 .attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + height/2) + ') rotate(-90)')
											 .attr('class', 'title')

		// Write a function for setting scales.
		var setScales = function(data) {
			// Get the unique values of states for the domain of your x scale
			var states = data.map(function(d) {return d.State});

			// Define an ordinal xScale using rangeBands
			xScale  = d3.scale.ordinal().rangeBands([0, width], .2).domain(states);

			// Get min/max values of the percent data
			var yMin = d3.min(data, function(d){return +d[activity]});
			var yMax = d3.max(data, function(d){return +d[activity]});

			// Define the yScale: remember to draw from top to bottom!
			yScale = d3.scale.linear().range([height, 0]).domain([0, yMax]);
		}

		// Function for setting axes
		var setAxes = function() {
			// Define x axis using d3.svg.axis(), assigning the scale as the xScale
			var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient('bottom')

			// Define y axis using d3.svg.axis(), assigning the scale as the yScale
			var yAxis = d3.svg.axis()
						.scale(yScale)
						.orient('left')
						.tickFormat(d3.format('.2s'));

			// Call xAxis
			xAxisLabel.transition().duration(1500).call(xAxis);

			// Call yAxis
			yAxisLabel.transition().duration(1500).call(yAxis);

			// Update labels
			xAxisText.text('State')
            
            var temp = "";
            
            if (activity == "notDistracted") {
                temp += "Not Distracted";
            } else if (activity == "drunkDriving") {
                temp += "Driving Drunk"
            } else {
                temp += "Speeding"
            }
            
			yAxisText.text('Percent Fatal Accidents Where Drivers were ' + temp)
		}

		// Write a function to filter down the data to the current sex and type
		var filterData = function() {
			currentData = allData.filter(function(d) {
				return d[activity]
			})
			// Sort the data alphabetically
			// Hint: http://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
			.sort(function(a,b){
				if(a.State < b.State) return -1;
				if(a.State > b.State) return 1;
				return 0;
			});
		}

		// Store the data-join in a function: make sure to set the scales and update the axes in your function.
		var draw = function(data) {
			// Set scales
			setScales(data)

			// Set axes
			setAxes()

			// Select all rects and bind data
			var bars = g.selectAll('rect').data(data);

			// Use the .enter() method to get your entering elements, and assign initial positions
            
            bars.enter().append('rect')
				.attr('x', function(d){return xScale(d.State)})
				.attr('y', height)
				.attr('height', 0)
				.attr('width', xScale.rangeBand())
				.attr('class', 'barSpeed')
				.attr('title', function(d) {return d.State});

			// Use the .exit() and .remove() methods to remove elements that are no longer in the data
			bars.exit().remove();

			// Transition properties of the update selection
			bars.transition()
				.duration(1500)
				.delay(function(d,i){return i*50})
				.attr('x', function(d){return xScale(d.State)})
				.attr('y', function(d){return yScale(d[activity])})
				.attr('height', function(d) {return height - yScale(d[activity])})
				.attr('width', xScale.rangeBand())
                .attr('class', activity == "drunkDriving" ? "barDrunk" : activity == "notDistracted" ? "barDistract" : "barSpeed")	
                .attr('title', function(d) {return d.State});
                console.log(activity)
		}

		// Assign a change event to input elements to set the sex/type values, then filter and update the data
		$("input").on('change', function() {
			// Get value, determine if it is the sex or type controller
			activity = $(this).val();
            
			filterData();
			draw(currentData);
		});

		// Filter data to the current settings then draw
		filterData()
		draw(currentData)

		/* Using jQuery, select all circles and apply a tooltip
		If you want to use bootstrap, here's a hint:
		http://stackoverflow.com/questions/14697232/how-do-i-show-a-bootstrap-tooltip-with-an-svg-object
		*/
		$("rect").tooltip({
			'container': 'body',
			'placement': 'top'
		});

	});
});