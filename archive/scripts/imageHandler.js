//declaring global variables
var gbCanvas;
var gbContext;
var gbImg;
var gbShapeArr = new Array();
var pageOffsetX = 9;
var pageOffsetY = 9;
// Type		: function
// parameter	: string imageURL
// return		: none
// description	: load the original image for editng
// author		: Lok

function loadImage(imageURL) {
	this.img = gbImg;	
	this.context = gbContext;
	this.context.drawImage(this.img,0,0,this.img.width,this.img.height);
}
/*
loadImage.prototype.draw = function(img){
	this.context = gbCanvas;
	img.onload = function(img){
	alert("aaa");
		this.context.drawImage(this.img,0,0);
	};
	this.img.src = this.URL;	
}
*/

// Type:		: class
// parameter	: none
// description	: abstract class for all the Shape objects
// remark		: do NOT create this object!!! Because this is an abstract super class
// author		: Lok
function Shape() {
}

Shape.prototype.init = function(name) {
	this.id = name;
	this.context = gbContext;
}

// Type:		: function
// parameter	: int xLoc, int yLoc
// description	: draw Shape at a particular location
// remark		: functions shared by all instances of Shape
// author		: Lok
Shape.prototype.draw = function(x, y){
}

Shape.prototype.setPos = function(x, y){
	this.xLoc = x;
	this.yLoc = y;
}

// Type:		: class
// parameter	: string name
// description	: constructor of ShapeCircle
// remark		: child class of Shape
// author		: Lok
function ShapeCircle(name, x, y, r) {
	this.init(name);
	this.xLoc = x;
	this.yLoc = y;
	this.radius = r;
}

//defining super class
ShapeCircle.prototype = new Shape();

// Type:		: function
// parameter	: int xLoc, int yLoc, float radius
// description	: draw a ShapeCircle object with a particular radius and location 
// remark		: functions shared by all instances of ShapeCircle
// author		: Lok
ShapeCircle.prototype.draw = function(){
	this.context.beginPath();
	this.context.arc(this.xLoc-pageOffsetX, this.yLoc-pageOffsetY, this.radius, 0, Math.PI*2, true); 
	this.context.fillStyle = 'white';
	this.context.fill();
	this.context.lineWidth = 0;
	this.context.strokeStyle = '#ffffff';	//circomference color
	this.context.stroke();
}

ShapeCircle.prototype.isInside = function(mx, my){
	var dx = Math.abs(this.xLoc - mx);
    var dy = Math.abs(this.yLoc - my);
	var sum = Math.pow(dx, 2)+Math.pow(dy, 2);
	var rSqr = Math.pow(this.radius, 2);
	if (sum <= rSqr)
		return true;
	else
		return false;
}

function writeMessage(gbCanvas, message) {
	gbContext.clearRect(550, 0, 300, 30);
	gbContext.font = '18pt Calibri';
	gbContext.fillStyle = 'black';
	gbContext.fillText(message, 550, 20);
}
function getMousePos(gbCanvas, evt) {
	var rect = gbCanvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

//draw all the Shape objects
function drawShape(){
	for(var i=0;i < gbShapeArr.length; i++){
		gbShapeArr[i].draw();
	}
}























