// Create a function ParagraphChart that will be your reusable function
var TreeMap = function() {
   // Create variables within the function scope to track your color and fontSize
   var fontSize;
   var xValue;
   var yValue;
   var label;
   var fontSize = 9;
   var color = d3.scale.category10();
   var margin = {top: 40, right: 10, bottom: 10, left: 10},
   width = 960 - margin.left - margin.right,
   height = 500 - margin.top - margin.bottom;
   
   function tree(selection) {
      selection.each(function(data) {
         
         var headers = d3.keys(data[0]);
         var firstData = d3.keys(data[50]);
         
         xValue = headers[0];
         label = xValue;
         
         var temp1 = d3.values(data);
                
         var temp = d3.values(data[0]);
                 
         
         for (j = 1; j < temp1.length; j++) {
            for (i = 1; i < temp.length; i++) {
               if (!isNaN(temp[i])) {
                  yValue = headers[i];
                  break;
               }
            }
            temp = d3.values(data[j]);         
         }
                 
         // Wrapper div for the chart
         var div = d3.select(this)
         .append("div")
         .attr('height', 600)
         .attr('width', 600)
         .style("left", margin.left + "px")
         .style("top", margin.top + "px");
         
         // Function to arrange divs (will be called seperately for entering and updating)
         
         // Set the position of each div using the properties computed from the treemap function
         var position = function() {
            this.style("left", function(d,i) {return d.x + "px"; })
            .style("top", function(d) { return d.y + "px"; })
            .style('width', function(d){return d.dx + 'px'})
            .style("height", function(d) { return d.dy + "px"; })
            .style("background", function(d) {return !d.values ? color(d[xValue]) : null; })
         }
         
         
         // Construct a nest function using `d3.nest`, and create a variable with your nested data
         var nestedData = d3.nest() // function that returns a function...
         .key(function(d){return d[xValue];})
         .entries(data);
         
         // Construct a treemap function that sizes elements based on the current `measure`, and
         // Make sure to specify how to retrieve the `children` from each element
         var treemap = d3.layout.treemap() // function that returns a function!
         .size([width, height]) // set size: scaling will be done internally
         .sticky(true) // If data changes, keep elements in the same position
         .value(function(d) {return d[yValue];}) // Assert value to be used to
         .children(function(d){return d.values;}); // Determine how the function will find the children of each node
         
         // Write your `draw` function to bind data, and position elements
         var draw = function() {
            // Set the `value` property of your `treemap` fucntion, as it may have changed
            treemap.value(function(d) {return d[yValue];});
            
            // Bind your data to a selection of node elements
            var nodes = div.selectAll(".node").data(treemap.nodes({values:nestedData}));
            
            // Enter and append elements, then position them by using `.call`
            nodes.enter()
            .append("div")
            .attr('class', 'node')
            .text(function(d){return d[label]}) // Set text: a big advantage of using divs over rects
            .style('font-size', fontSize + 'px')
            .call(position); // This prevents a strange transition on enter()
            
            // Update the nodes
            nodes.transition().duration(500).call(position);
         }
         
         //calling the draw function
         draw();
         
         
      });
   }
   
   //allows user to specify the column name which the labeling will derive it's values from
   tree.choseLabel = function(_) {
      if (!arguments.length) return label;
      label = _;
      return this;
   }
   
   //allows user to specify the x value for the tree map
   tree.x = function(_) {
      if (!arguments.length) return xValue;
      xValue = _;
      return this;
   };
   
   //allows user to specify the y value for the tree map
   tree.y = function(_) {
      if (!arguments.length) return yValue;
      yValue = _;
      return this;
   };
   
   //allows user to specify what color they want the tree map to be
   tree.color = function(_) {
      if (!arguments.length) return color;
      color = _;
      return this;
   }
   
   //allows user to specify the font size of the labels
   tree.fontSize = function(_) {
      if (!arguments.length) return fontSize;
      fontSize = _;
      return this;
   }
   
   
   //Return the tree object
   return tree;
   
}