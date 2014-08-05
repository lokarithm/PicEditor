//"main()" function
window.onload = function(){
	//initializeing the values of global variables
	gbCanvas = document.getElementById('mainCanvas');
	gbContext = gbCanvas.getContext('2d');
	gbImg = document.getElementById("mainImage");
	
	loadImage('images/sample001.jpg');
	// var img = new Image();
	// im.draw(img);
	// var gg = new ShapeCircle("Joe");
	// gg.draw(75,75,50);
	// var gag = new ShapeCircle("lala",105, 105, 50);
	// gag.draw();
	
	//detect regular mouse move
	$("#mainCanvas").mousemove(function(event) {
		var message = 'Mouse position: ' + event.pageX + ',' + event.pageY;
		writeMessage(gbCanvas, message);
	});
	
	var gg = new ShapeCircle("haha",155, 155, 70);
	gbShapeArr.push(gg);
	
	$('#mainCanvas').drag(function(event) {
		if(gg.isInside(event.pageX, event.pageY)==true){
			gg.setPos(event.pageX, event.pageY);
			loadImage('images/sample001.jpg');
			gg.draw();
			$('#mainCanvas').unbind("mousemove");
		}
	});
	
	// $('#mainCanvas').mousedown(function(event) {
		// $('#mainCanvas').mousemove(function() {
			// if(gg.isInside(event.pageX, event.pageY)==true){
				// gg.setPos(event.pageX, event.pageY);
				// loadImage('images/sample001.jpg');
				// gg.draw();
				// $('#mainCanvas').unbind("mousemove");
			// }
		// });
	// });
	
	//draw all the Shape Objects
	drawShape();
/*
	gbCanvas.addEventListener('mousemove', function(evt) {
		var mousePos = getMousePos(gbCanvas, evt);
		var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
		writeMessage(gbCanvas, message);
		var gg = new ShapeCircle("haha",155, 155, 50);
		gg.draw();
		if(gg.isInside(mousePos.x, mousePos.y))
			alert("true");
	}, false);
*/
}