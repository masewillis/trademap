var width = 500,
    height = 50;

var buttonTexts = ["One", "Two", "Three", "Four", "Five", "Six", "Seven"];

var x = d3.scale.linear()
    .domain([0,buttonTexts.length+1])
    .range([0,width]);

var buttonWidth = x(1)-x(0);
var buttonHeight = 60;
var buttonPadding = 2;
var buttonMouseover = false;
var isHover = false;
var movedBy = 0;

var durationFactor = 1;

var activeButtonId = Math.round((buttonTexts.length-1)/2);
var activePosId = activeButtonId;

var line = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

/* ************* Useful functions ************* */

// http://stackoverflow.com/questions/14167863/how-can-i-bring-a-circle-to-the-front-with-d3
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

// http://stackoverflow.com/questions/9063383/how-to-invoke-click-event-programmaticaly-in-d3
jQuery.fn.mouseevent = function (type) {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    e.dispatchEvent(evt);
  });
};

/* ************* Buttons Array ************* */

var buttons = d3.range(buttonTexts.length).map(function(d,i) {
    return {
        id: i,
        posId: i,
        prevPosId: i,
        text:buttonTexts[i],
        y: height/2,
        widthHover: buttonWidth - buttonPadding,
        wrapped: 0
    }
});

function calcX(i) {
    var xValue = width/2 + (i - (buttonTexts.length-1)/2) * buttonPadding*2;
    if (i > activePosId) return xValue - buttonWidth/2 + buttonWidth - buttonPadding*2;
    else return xValue - buttonWidth/2;
}

function calcXHover(i) {
    return x(i+1) - buttonWidth/2;
}

function calcWidth(i) {
    if (i === activeButtonId) return buttonWidth - buttonPadding;
    else return 2;
}

/* ************* Create SVG ************* */

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var mouseOverArea = svg.append("rect")
    .attr("id", "mouseOverArea")
    .attr("opacity", 0)
    .attr("width", "160")
    .attr("height",buttonHeight +2)
    .attr("x", function() { return width/2 - this.width.animVal.value / 2; } )
    .attr("y", height/2 - buttonHeight/2 )
    .on("mouseover", function(d,i) {
        isHover = true;
        d3.select(this).transition()
            .duration(200*durationFactor)
            .attr("width", width)
            .attr("x", width/2 - width/2 );
        d3.selectAll(".buttonContainer").transition()
            .duration(200*durationFactor)
            .attr("opacity", 1)
            .attr("transform", function(d) { return "translate("+d.xHover+","+d.y+")"; } );
        d3.selectAll(".button").transition()
            .duration(200*durationFactor)
            .attr("width", function(d) { return d.widthHover; });
        d3.selectAll(".buttonText.inactive").transition()
            .duration(200*durationFactor)
            .attr("x", function(d) { return d.widthHover/2; }).attr("opacity", 1);
        d3.selectAll(".arrow").attr("opacity", 0);
    })
    .on("mouseout", function(d,i) {
        isHover = false;
        if (!buttonMouseover) {
            d3.select(this).transition()
                .duration(200*durationFactor)
                .attr("width", 160)
                .attr("x", width/2 - 80);
            d3.selectAll(".buttonContainer").transition()
                .duration(200*durationFactor)
                .attr("opacity", 1)
                .attr("transform", function(d) { return "translate("+d.x+","+d.y+")"; });
            d3.selectAll(".button").transition()
                .duration(200*durationFactor)
                .attr("width", function(d) { return d.width; })
            d3.selectAll(".buttonText.inactive").transition()
                .duration(200*durationFactor)
                .attr("x", function(d) { return d.width/2; }).attr("opacity", 0);
            d3.selectAll(".arrow").attr("opacity", 1);
        }
    });

var buttonContainer = svg.selectAll("g")
    .data(buttons)
  .enter().append("g")
    .attr("class", "buttonContainer")
    .attr("id", function(d,i) { return "group"+i; });

buttonContainer.append("rect")
    .attr("id", function(d,i) { return "button"+i; })
    .attr("class", "button")
    .attr("height", buttonHeight)
    .attr("y", -buttonHeight/2 )
    .attr("cursor", "pointer")
    .on("mouseover", function(d) {
        buttonMouseover = true;
        $("#mouseOverArea").mouseevent("mouseover");
        d3.select(this).attr("fill", "springgreen");
        d3.select("#text"+d.id).attr("fill", "black" );
    })
    .on("mouseout", function(d,i) {
        buttonMouseover = false;
        $("#mouseOverArea").mouseevent("mouseout");
        d3.select(this).attr("fill", function(d) {
            if (d.id === activeButtonId) return "black";
            else return "lightgrey";
        });
        d3.select("#text"+d.id).attr("fill", function(d) {
            if (d.id === activeButtonId) return "white";
            else return "black"
        });
    })
    .on("click", function(d) {
            movedBy = activeButtonId - d.id;
        if (movedBy > activePosId) movedBy -= buttons.length;
        else if (movedBy < -activePosId) movedBy += buttons.length;
        activeButtonId = d.id;

        buttons.map(function(d) {
            d.prevPosId = d.posId;
            d.prevXHover = d.xHover;
            d.wrapped = 0;
            d.posId += movedBy;
            if (d.posId >= buttons.length) { d.wrapped = -1; d.posId -= buttons.length; }
            else if (d.posId < 0) { d.wrapped = 1; d.posId += buttons.length; }
        });
        updateButtons();
    });

// Add arrows to active button
d3.select("#group"+activeButtonId).append("path")
    .attr("id", "arrowright")
    .attr("d",line([
        {x: -1, y: -10},
        {x: 10, y: 0},
        {x: -1, y: 10}
    ]))
    .attr("class", "arrow")
    .attr("transform", function() {
        var xPos = buttonWidth - buttonPadding;
        return "translate("+ xPos + ",0)";
    })
    .attr("fill", "black" );

d3.select("#group"+activeButtonId).append("path")
    .attr("id", "arrowleft")
    .attr("d",line([
        {x: 1, y: -10},
        {x: -10, y: 0},
        {x: 1, y: 10}
    ]))
    .attr("class", "arrow")
    .attr("fill", "black" );

buttonContainer.append("text")
    .attr("class", "buttonText")
    .text(function(d) { return d.text; })
    .attr("text-anchor", "middle")
    .attr("y", 5)
    .attr("id", function(d) { return "text" + d.id; })
    .attr("font-size", "14px")
    .attr("opacity", 0)
    .attr("pointer-events", "none");


/* ************* Update Buttons after click ************* */

function updateButtons() {

    buttons.map(function(d,i) {
        d.x = calcX(d.posId);
        d.xHover = calcXHover(d.posId);
        d.width = calcWidth(d.id);

        if (d.wrapped) { // animations if menu item should come in from opposite side
            d3.select("#group"+d.id)

                .transition()
                .ease("cubic-in")
                .attr("transform", function(d) {
                    var xPos = d.prevXHover + buttonWidth*movedBy;
                    return "translate("+xPos+","+d.y+")";
                })
                .attr("opacity", 0)
                .duration(180*durationFactor)

                .transition()
                .ease("linear")
                .attr("transform", function(d) {
                    var xPos = d.xHover - buttonWidth*movedBy * 2;
                    return "translate("+xPos+","+d.y+")";
                })
                .duration(20*durationFactor)

                .transition()
                .ease("cubic-out")
                .duration(300*durationFactor)
                .attr("opacity", 1)
                .attr("transform", function(d) {
                    if (isHover) return "translate("+d.xHover+","+d.y+")";
                    else return "translate("+d.x+","+d.y+")";
                });
        }
        else { // animations if menu item just moves withouth wrapping around
            d3.select("#group"+d.id)
                .transition()
                .ease("cubic-in-out")
                .duration(function() {
                    if (isHover) return 400*durationFactor;
                    else return 0;
                })
                .attr("opacity", 1)
                .attr("transform", function(d) {
                    if (isHover) return "translate("+d.xHover+","+d.y+")";
                    else return "translate("+d.x+","+d.y+")";
                });
        }
    });

    d3.selectAll(".button")
        .attr("fill", function(d,i) {
            if (d.id === activeButtonId) return "black";
            else return "lightgrey";
        })
        .attr("width", function(d) {
            if (isHover) return d.widthHover;
            else return d.width;
        });

    d3.selectAll(".buttonText")
        .attr("opacity", function() { if (isHover) return 1; else return 0; })
        .classed("active", function(d) {
            if (d.id === activeButtonId) return true;
            else return false;
        })
        .classed("inactive", function(d) {
            if (d.id === activeButtonId) return false;
            else return true;
        })
        .attr("fill", function(d) {
            if (d.id === activeButtonId) return "white";
            else return "black";
        })
        .attr("x", function(d) {
            if (isHover) return d.widthHover/2;
            else return d.width/2;
        });

    $("#group"+activeButtonId).append($(".arrow"));

    d3.select("#text"+activeButtonId).attr("opacity",1);
    d3.select("#group"+activeButtonId).moveToFront();

};

updateButtons();

d3.select("body").on("keydown", function(e) {
    if (d3.event.shiftKey) { durationFactor = 4; }
    else { durationFactor = 1; }
});
