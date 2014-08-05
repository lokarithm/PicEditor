var mDnX, mDnY;	//declare starting point when mouse down
var mUpX, mUpY; //declare ending point when mouse up
var rect;

//declare stage
var stage = new Kinetic.Stage({
	container: 'container',
	width: 1000,
	height: 2000
});

//declare layers
var messageLayer = new Kinetic.Layer();
var mainLayer = new Kinetic.Layer();

//declare image object
var imageObj = new Image();
imageObj.onload = function() {
	var mainImage = new Kinetic.Image({
		x: 0,
		y: 0,
		image: imageObj,
		width: imageObj.width,
		height: imageObj.height
	});

	var mDnX=0;
	var mDnY=0;
	var mUpX=0;
	var mUpY=0;
	//enable listening events for mainImage
	mainImage.setListening(true);

	//create circle object
	var circle = new Kinetic.Circle({
		x: 400,
		y: 180,
		radius: 50,
		fill: 'red',
		stroke: 'black',
		strokeWidth: 0,
		draggable: true
	});

	////detect regular mouse move
	mainImage.on('mousemove', function() {
		var message = 'Mouse position: ' + event.pageX + ',' + event.pageY;
		writeMessage(messageLayer,
		message);
	});

	//detect regular mouse mousedown
	mainImage.on('mousedown', function() {
		mDnX = event.pageX;
		mDnY = event.pageY;
	});

	//detect regular mouse mouseup
	mainImage.on('mouseup', function() {
		mUpX = event.pageX;
		mUpY = event.pageY;
		var stpPtX = mDnX;
		var stpPtY = mDnY;
		if(mUpY < mDnY){
			stpPtY = mUpY;
		}
		if(mUpX < mDnX){
			stpPtX = mUpX;
		}
		rect = new Kinetic.Rect({
	        x: stpPtX,
	        y: stpPtY,
			
	        width: Math.abs(mDnX - mUpX),
	        height: Math.abs(mDnY - mUpY),
	        fill: 'green',
	        stroke: 'black',
	        strokeWidth: 4,
			draggable: true
		});
		drawRectangle(rect);
	});
	

	// add the shape to the layer
	mainLayer.add(mainImage);
	mainLayer.add(circle);


	// add the layer to the stage
	stage.add(mainLayer);
	stage.add(messageLayer);
};
imageObj.src = "images/sample001.jpg";


function drawRectangle(rect){

	mainLayer.add(rect);
	mainLayer.draw();
}





























































function writeMessage(messageLayer, message) {
	var context = messageLayer.getContext();
	messageLayer.clear();
	context.font = '18pt Calibri';
	context.fillStyle = 'black';
	context.fillText(message, 500, 20);
}