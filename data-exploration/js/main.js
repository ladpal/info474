$(function() {
	// Read in your data. On success, run the rest of your code
	d3.csv('data/prepped_data.csv', function(error, data){
		// Setting defaults
		var margin = {top: 40, right: 10, bottom: 10, left: 10},
		    width = 960 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

		// variable to visualize
		var measure = 'fertility_rate';
		var color = d3.scale.category10();

		// Wrapper div for the chart
		var div = d3.select('#vis')
								.append("div")
								.attr('height', 600)
								.attr('width', 600)
								.style("left", margin.left + "px")
								.style("top", margin.top + "px");

		// Function to arrange divs (will be called seperately for entering and updating)
		var position = function() {
			// Set the position of each div using the properties computed from the treemap function
			this.style("left", function(d,i) {return d.x + "px"; })
					.style("top", function(d) { return d.y + "px"; })
					.style('width', function(d){return d.dx + 'px'})
					.style("height", function(d) { return d.dy + "px"; })
					.style("background", function(d) {return !d.values ? color(d.region) : null; })
		}

		// Construct a nest function using `d3.nest`, and create a variable with your nested data
        
        var nest = d3.nest() // function that returns a function...              
                .key(function(d){return d.region;});
                
        // Pass your (tabular) data to the nest function to create your nested array 
        var nestedData = nest.entries(data);

		// Construct a treemap function that sizes elements based on the current `measure`, and
		// Make sure to specify how to retrieve the `children` from each element
        
        // Construct a treemap function that will retrieve values from your nested data 
        var treemap = d3.layout.treemap() // function that returns a function!     
            .size([width, height]) // set size: scaling will be done internally     
            .sticky(true) // If data changes, keep elements in the same position     
            .value(function(d) {return d[measure]}) // Assert value to be used to     
            .children(function(d) {return d.values}); // Determine how the function will find the children of each node
            
        // Retrieve the individual nodes from the tree 
       // Object to be traversed looking for child elements


		// Write your `draw` function to bind data, and position elements
        var draw = function() {
        
            treemap.value(function(d) {return d[measure];});
            var treemapData = treemap.nodes({values:nestedData}); 
            
            var nodes = div.selectAll('.node').data(treemapData)
            
            nodes.enter()
                 .append('div')
                 .attr("class", 'node')
                 .text(function(d) {return d.country_code})
                 .call(position);
                 
            nodes.transition().duration(500).call(position);
        }

		// Call your draw function
        draw()

		// Listen to change events on the input elements
		$("input").on('change', function() {
            measure = $(this).val();

			// Draw your elements
			draw();
			
		});

	});
});
