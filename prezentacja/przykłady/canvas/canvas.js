var canvas;
var ctx;

const keyToCallback = {
	'L': {
		'setup': clearCanvas,
		'callback': drawLineCallback
	},
	'R': {
		'setup': clearCanvas,
		'callback': drawRectCallback
	}
};

var currentCallback;

window.onload = function() {
	canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx = canvas.getContext('2d');


	canvas.onmousemove = function() {
		var previous;

		ctx.strokeStyle = '#FFFFFF';
		clearCanvas();
		return function(e) {
			if(previous === undefined)
				previous = e;

			if(currentCallback !== undefined)
				currentCallback(e, previous);

			previous = e;
		};
	}();

	document.body.onkeydown = function() {
		var wasEsc = false;

		return function(e) {
			if(e.keyCode === 27) {
				if(!wasEsc)
					currentCallback = undefined;
				wasEsc = !wasEsc;
			} else {
				var key = String.fromCharCode(e.keyCode);
				if(wasEsc && key in keyToCallback) {
					var tmp = keyToCallback[key];
					tmp.setup();
					currentCallback = tmp.callback;
					wasEsc = false;
				}
			}
		};
	}();
}



function clearCanvas() {
	var originalFillStyle = ctx.fillStyle

	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = '#FFFFFF';
	ctx.font = '15px codeFont';
	const fontBasedDistance = parseInt(ctx.font.split('px')[0]) * 1.25;
	var c = 0;
	for(var key in keyToCallback) {
		ctx.fillText(key + ' = ' + keyToCallback[key].callback.name.split('Callback')[0], 0, canvas.height - 2 - (fontBasedDistance * c));
		++c;
	}

	ctx.fillStyle = '#5F5F5F';
	ctx.fillText('@nabijaczleweli', canvas.width - ctx.measureText('@nabijaczleweli').width - 2, canvas.height - 2 - (fontBasedDistance * 0.3));

	ctx.fillStyle = originalFillStyle;
}

function drawLineCallback(curr, prev) {
	ctx.moveTo(prev.layerX, prev.layerY);
	ctx.lineTo(curr.layerX, curr.layerY);
	ctx.stroke();
}

function drawRectCallback(curr, prev) {
	ctx.rect(prev.layerX, prev.layerY, curr.layerX - prev.layerX, curr.layerY - prev.layerY);
	ctx.stroke();
}
