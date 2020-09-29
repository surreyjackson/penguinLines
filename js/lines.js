



//penguins is the array of data
//target is the selection of the g element to place the graph in
//xscale,yscale are the x and y scales.
var drawLines = function(penguins,target,
                         xScale,yScale,margins)
{
var lineGenerator = d3.line()
    .x(function(grade,day) { return xScale(day);})
    .y(function(grade)   { return yScale(grade);})
var lines = d3.select("svg")
    .select("#graph")
    .selectAll("g")
    .data(penguins)
    .enter()
    .append("g")
    .classed("line",true)
    .attr("fill","none")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")")
        .on("mouseover",function(penguin)
        {   
                var xPos = d3.event.pageX;
                var yPos = d3.event.pageY;
                
                d3.select("#tooltip")
                    .classed("hidden",false)
                    .style("top",yPos+"px")
                    .style("left",xPos+"px");
                d3.select("img")
                    .attr("src",getPicture(penguin));                var xPos = d3.event.pageX;
                var yPos = d3.event.pageY;
                
                d3.select("#tooltip")
                    .classed("hidden",false)
                    .style("top",yPos+"px")
                    .style("left",xPos+"px");
                d3.select("img")
                    .attr("src",getPicture(penguin));
            d3.selectAll(".line")
            .classed("fade",true);
            
            d3.select(this)
                .classed("fade",false)
                .classed("selected",true)
                .raise() //move to top

        })
        .on("mouseout",function(penguin)
           {

            d3.selectAll(".line")
                .classed("fade",false)
                .classed("selected",false);
            d3.select("#tooltip")
                .classed("hidden",true)
            
        })
lines.append("path")
    .datum(function(penguin) 
        { return penguin.quizes.map(grade);}
        )
    .attr("class","line")
    .attr("stroke","black")
    .attr("d",lineGenerator); 
}


var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}


//graphDim is an object that describes the width and height of the graph area.
//margins is an object that describes the space around the graph
//xScale and yScale are the scales for the x and y scale.
var drawAxes = function(graphDim,margins,
                         xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    var axes = d3.select("svg")
        .append("g")
    axes.append("g")
        .attr("transform","translate("+(margins.left +30)+","
             +(margins.top+graphDim.height + 20)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+(margins.left +30)+","
             +(margins.top +20)+")")
        .call(yAxis)
}     
 



//graphDim -object that stores dimensions of the graph area
//margins - object that stores the size of the margins
var drawLabels = function(graphDim,margins)
{
var labels = d3.select("svg")
        .append("g")
        .classed("labels",true)
        
    labels.append("text")
        .text("Weight Over Time")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graphDim.width/2))
        .attr("y",margins.top)
    
    labels.append("text")
        .text("Day")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graphDim.width/2))
        .attr("y",graphDim.height + margins.top + 50)
    
    labels.append("g")
        .attr("transform","translate(20,"+ 
              (margins.top+(graphDim.height/2))+")")
        .append("text")
        .text("Grade")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
}




//sets up several important variables and calls the functions for the visualization.
var initGraph = function(penguins)
{
    //size of screen
    var screen = {width:800,height:600}
    //how much space on each side
    var margins = {left:50,right:20,top:20,bottom:30}
    
    
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("svg")
    .attr("width",(screen.width +100))
    .attr("height",(screen.height+100))
    
    var target = d3.select("svg")
    .append("g")
    .attr("id","graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    var maxDay = d3.max(penguins[0].quizes,
                        function(quiz)
                        {return quiz.day});
    
    var xScale = d3.scaleLinear()
        .domain([1,maxDay])
        .range([0,graph.width])

    var yScale = d3.scaleLinear()
        .domain([0,10])
        .range([graph.height,0])
    console.log(target);
    drawAxes(graph,margins,xScale,yScale);
    drawLines(penguins,target,xScale,yScale,margins);
    drawLabels(graph,margins);
}

var grade = function(quiz)
{
    return quiz.grade;
}
var getPicture = function(penguin)
{
    return "imgs/" + penguin.picture;
}

var successFCN = function(penguins)
{
    console.log("penguins",penguins);
    initGraph(penguins);
    
    
}

var failFCN = function(error)
{
    console.log("error",error);
}

var polPromise = d3.json("classData.json")
polPromise.then(successFCN,failFCN);