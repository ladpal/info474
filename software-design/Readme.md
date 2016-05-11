# How to use my TreeMap software package
---

This software package can be used to create a tree map with a given dataset. 

**Before using this package, it's important to note that TreeMaps work best when one of the scales is ordinal. Keep this in mind while chosing a data set to use!**

By default settings, the boxes of the tree map are sized according to the y values, and labeled with the corresponding x value. To utilize my package, do start with the following: 

    var chartWrapper = d3.select('#my-div').datum([dataSet]).call(myChart);

This software packaged also exposes 5 methods, which can be used to manipulate the default values for the tree map.

1. choseLabel()

This method allows users to chose which column of a data set they would like their labels to be derived from. By default, the package will use the values that correspond to the y values. However, a user can input a new *valid* column name if they'd like to change it. 

2. x()

This method allows users to specify the x value the tree map will use. As a reminder, the x value is the constant variable in the tree map. Users can specify one of the column names within their dataset which they want to be used as the x value. It's important to chose a *valid* column so the graph knows which corresponding y values to retrieve. By default, the package choses the first column in the dataset as the x value. 

3. y()

This method allows users to specify the y value the tree map will use. As a reminder, the y value is responsible for determining the size of each box in the tree map. Users can specify one of the column names within their dataset which they want to be used as the y value. It's important to chose a *valid*, *numerical* column so the graph can calculate the size of each box. By default, the package choses the first numerical column as the y value.

4. color()

This method allows users to specify the color(s) they would like the tree map to be displayed in. It's important to note that this function takes in only one parameter, so if a multi-colored look is desired, the user must input something like `d3.scale.category20c()`. By default, the package uses `d3.scale.category10()` to determine color. 

5. fontSize()

This method allows users to specify the font size they'd like the labels of each box to be. The function takes in any integer greater than 0, but it's recommended to stay below 15, as the labels become hard to read, depending on the dataset. By default the package will use font size 9. 

To call any of these methods, do the following:
    
    myChart.method(newValue);
    chartWrapper.datum([newDataSet]).call(myChart);
    

