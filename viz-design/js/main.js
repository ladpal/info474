$(document).ready(function() {

    //Trace for the negative gram staining bacteria types and their associated MIC values
    //creates a scatter plot
    var trace1 = {
        x: ['Aerobacter aerogenes', 'Brucella abortus', 'Escherichia coli', 'Klebsiella pneumoniae', 'Mycobacterium tuberculosis', 'Proteus vulgaris', 'Pseudomonas aeruginosa', 'Salmonella (Eberthella) typhosa', 'Salmonella schottmuelleri'],
        y: [1, 2, .4, 1.2, 5, .1, 2, .4, .8],
        mode: 'markers+text',
        type: 'scatter',
        name: 'Negative Gram Staining',
        marker: { 
            size: 10,
            color: "rgb(153, 0, 0)"
        },
        text: [1, 2, .4, 1.2, 5, .1, 2, .4, .8],
        textposition: 'top center',
        textfont: {
            family:  'Raleway, sans-serif'
        },
    };

    //Trace for the positive gram staining bacteria types and their associated MIC values
    //creates a scatter plot
    var trace2 = {
        x: ['Brucella anthracis', 'Diplococcus pneumoniae',  'Staphylococcus albus', 'Staphylococcus aureus', 'Streptococcus fecalis', 'Streptococcus hemolyticus', 'Streptococcus viridans'],
        y: [0.01, 11, .1, .03, 1, 14, 10],
        mode: 'markers+text',
        type: 'scatter',
        name: 'Positive Gram Staining',
        marker: { 
            size: 10,
            color: 'rgb(0, 102, 51)' 
        },
        text: [0.01, 11, .1, .03, 1, 14, 10],
        textposition: 'top center',
        textfont: {
            family:  'Raleway, sans-serif'
        },
    };

    var data1 = [ trace1, trace2 ];
    
    //layout specifications for the trace1 and trace2
    var layout1 = {
        xaxis: {
            type:"category",
            title: "Bacteria Type",
            tickangle:90
        },
        yaxis: {
            range: [0, 15],
            title: "MIC of Streptomycin",
            tickangle:90
        },
        height:509,
        width:891,
        autosize:true,
        margin: {                           
            b: 200, t: 40
        },
        title:'Gram Staining vs. the MIC of Streptomycin'
    };
    
    //plotting the scatterplot with the given specifications 
    Plotly.newPlot('graphStrep', data1, layout1, {staticPlot: true});
    
    //trace of negative gram staining bacterias and their associated MIC values for streptomycin
    //creates a horizontal grouped bar chart
    var trace3 = {
        orientation: 'h',
        y: ['Aerobacter aerogenes', 'Brucella abortus', 'Escherichia coli', 'Klebsiella pneumoniae', 'Mycobacterium tuberculosis', 'Proteus vulgaris', 'Pseudomonas aeruginosa', 'Salmonella (Eberthella) typhosa', 'Salmonella schottmuelleri'],
        x: [1, 2, .4, 1.2, 5, .1, 2, .4, .8],
        name: 'Streptomycin',
        type: 'bar',
        marker:{
            color:"rgb(255, 204, 255)"
        },
        mode: 'markers+text',
    };
    
    //trace of negative gram staining bacterias and their associated MIC values for neomycin
    //creates a horizontal grouped bar chart
    var trace4 = {
        orientation: 'h',
        y: ['Aerobacter aerogenes', 'Brucella abortus', 'Escherichia coli', 'Klebsiella pneumoniae', 'Mycobacterium tuberculosis', 'Proteus vulgaris', 'Pseudomonas aeruginosa', 'Salmonella (Eberthella) typhosa', 'Salmonella schottmuelleri'],
        x: [1.6, .02, .1, 1, 2, .1, .4, .008, .09,],
        name: 'Neomycin',
        type: 'bar',
        marker:{
            color:"rgb(51, 153, 153)"
        },
        mode: 'markers+text',
    };

    var data2 = [trace3, trace4];

    //layout specifications for trace3 and trace4
    var layout2 = {
        barmode: 'group',
        yaxis: {
            title: "Negative Gram Staining Bacteria Types",
            //tickangle:90 
        },
        xaxis: {
            title: "MIC of Antibiotic"
        },
        height:650,
        width:900,
        autosize:true,
        margin: {                           
           l: 220
        },
        title:'Negative Gram Staining Bacteria vs. the MIC of Streptomycin & Neomycin'
    };

    //plotting the grouped bar chart with the given specifications 
    Plotly.newPlot('graphMIC', data2, layout2, {staticPlot: true});
    
    //new trace of negative gram staining bacteria and their associated MIC values for penicillin
    //creates two scatterplots on non-aligned axis 
    var trace5 = {
        x: ['Aerobacter aerogenes', 'Brucella abortus', 'Escherichia coli', 'Klebsiella pneumoniae', 'Mycobacterium tuberculosis', 'Proteus vulgaris', 'Pseudomonas aeruginosa', 'Salmonella (Eberthella) typhosa', 'Salmonella schottmuelleri'],
        y: [870, 1, 100, 850, 800, 3, 850, 1, 10],
        mode: 'markers+text',
        type: 'scatter',
        name: 'Negative Gram Staining',
        marker: { 
            size: 10,
            color: 'rgb(153, 0, 0)'
        },
        text: [870, 1, 100, 850, 800, 3, 850, 1, 10],
        textposition: 'top center',
        textfont: {
            family:  'Raleway, sans-serif'
        },
    };
    
    //new trace of positive gram staining bacteria and their associated MIC values for penicillin
    //creates two scatterplots on non-aligned axis 
    var trace6 = {
        x: ['Brucella anthracis', 'Diplococcus pneumoniae',  'Staphylococcus albus', 'Staphylococcus aureus', 'Streptococcus fecalis', 'Streptococcus hemolyticus', 'Streptococcus viridans'],
        y: [.001, .005, .007, .03, 1, .001, .005],
        xaxis: 'x2',
        yaxis: 'y2',
        mode: 'markers+text',
        type: 'scatter',
        name: 'Positive Gram Staining',
        marker: { 
            size: 10,
            color: 'rgb(0, 102, 51)'
        },
        text: [.001, .005, .007, .03, 1, .001, .005],
        textposition: 'top center',
        textfont: {
            family:  'Raleway, sans-serif'
        },
    };
    
    //creates a solid line at y=1
    var trace7 = {
        x: ['Aerobacter aerogenes', 'Brucella abortus', 'Escherichia coli', 'Klebsiella pneumoniae', 'Mycobacterium tuberculosis', 'Proteus vulgaris', 'Pseudomonas aeruginosa', 'Salmonella (Eberthella) typhosa', 'Salmonella schottmuelleri'],
        y: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        mode: 'lines',
        name: 'Line which shows where the MIC of 1 is',
        line: {
            color: 'rgb(0, 102, 204)',
        }
    }
    
    //creates a solid line at y=1
    var trace8 = {
         x: ['Brucella anthracis', 'Diplococcus pneumoniae',  'Staphylococcus albus', 'Staphylococcus aureus', 'Streptococcus fecalis', 'Streptococcus hemolyticus', 'Streptococcus viridans'],
        y: [1, 1, 1, 1, 1, 1, 1],
        mode: 'lines',
        xaxis: 'x2',
        yaxis: 'y2',
        name: 'Line which shows where the MIC of 1 is',
        line: {
            color: 'rgb(0, 102, 204)',
        }
    }

    var data3 = [trace5, trace6, trace7, trace8];

    //layout specifications for trace5, trace6, trace7, trace8
    var layout3 = {
        xaxis: {
            domain: [0, 0.45],
            type:"category",
            title: "Bacteria Type",
            tickangle:90
        },
        yaxis2: {
            anchor: 'x2'
        },
        xaxis2: {
            domain: [0.55, 1],
            tickangle:90,
            title: "Bacteria Type"
        },
        yaxis: {
            // range: [0, 15],
            title: "MIC of Penicillin",
            tickangle:90
        },
        height:509,
        width:1000,
        autosize:true,
        margin: {                           
            b: 200, t: 40
        },
        title:'Negative vs. Positive Gram Staining and Penicillin'
    };
    
    //plotting the grouped bar chart with the given specifications 
    Plotly.newPlot('graph-gramStain', data3, layout3, {staticPlot: true});

});