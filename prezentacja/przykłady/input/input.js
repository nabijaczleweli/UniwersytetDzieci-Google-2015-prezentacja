// NOTE: This script requires ECMAScript 6 support (uses `const`)


var inputs;

const me = document.currentScript;
const typeToCallback = {
	'button': {
		'eventName': 'click',
		'callback': buttonCallback()
	},
	'checkbox': {
		'eventName': 'change',
		'callback': checkboxCallback
	},
	'email': {
		'eventName': 'change',
		'callback': emailCallback
	},
	'file': {
		'eventName': 'change',
		'callback': fileCallback
	},
	'password': {
		'eventName': 'change',
		'callback': passwordCallback
	},
	'radio': {
		'eventName': 'change',
		'callback': radioCallback
	},
	'range': {
		'eventName': 'change',
		'callback': rangeCallback
	},
	'reset': {
		'eventName': 'click',
		'callback': resetCallback
	},
	'search': {
		'eventName': 'change',
		'callback': searchCallback
	},
	'submit': {
		'eventName': 'click',
		'callback': submitCallback
	},
	'tel': {
		'eventName': 'change',
		'callback': telCallback
	},
	'text': {
		'eventName': 'change',
		'callback': textCallback
	},
	'hidden': {
		'eventName': 'change',
		'callback': hiddenCallback
	},
	'image': {
		'eventName': 'click',
		'callback': imageCallback
	},
	'url': {
		'eventName': 'change',
		'callback': urlCallback
	}
};


window.onload = function() {
	inputs = document.getElementsByTagName('input');

	for(var i = 0; i < inputs.length; ++i) {
		const input = inputs[i];
		const type = input.getAttribute('type');

		const nameWithCallback = typeToCallback[type];

		input.nextElementSibling.textContent = type[0].toUpperCase() + type.substr(1);
		if(nameWithCallback !== undefined)
			input.addEventListener(nameWithCallback.eventName, nameWithCallback.callback)

		if('autocomplete' in input)
			input.autocomplete = true;

		const typeSupportedByBrowser = inputTypeSupported(type);
		const typeSupportedByDemonstation = type in typeToCallback;
		if(!typeSupportedByBrowser || !typeSupportedByDemonstation) {
			const descriptionNode = document.createElement('SPAN')
			const textNode = document.createTextNode((typeSupportedByBrowser ? '' : '!NOT SUPPORTED IN THIS BROWSER!') + (typeSupportedByDemonstation ? '' : ' !NOT SUPPORTED BY THE DEMONSTRATION!'));
			descriptionNode.appendChild(textNode);
			descriptionNode.className = 'unsupported';

			input.parentNode.insertBefore(descriptionNode, input.nextElementSibling);
		}
	};
}


// Based on http://stackoverflow.com/a/21840624/2851815
function inputTypeSupported(type) {
	try {
		var elem = document.createElement('input');
		elem.type = type;
		if(elem.type === type)
			return true;
	} catch(e) {}

	return false;
}


// For data encapsulation (`ctr` and `launched` not at global scope)
function buttonCallback() {
	var ctr;
	var launched = false;

	return function(e) {
		ctr = (Math.random() * 1000).toFixed();

		// Timeout-chain is forever, once launched
		const cbk = function() {
			if(ctr > 0)
				e.originalTarget.value = ctr-- + 'ms';
			else
				e.originalTarget.value = '';
			setTimeout(cbk, 1);
		};

		if(!launched) {
			launched = true;
			cbk();
		}
	}
}

function checkboxCallback(e) {
	const input = e.originalTarget;
	var descriptionNode = input.nextElementSibling;

	// Dynamically append description node
	if(descriptionNode.className !== '') {
		const after = descriptionNode;

		descriptionNode = document.createElement('SPAN');
		descriptionNode.appendChild(document.createTextNode(''));

		input.parentNode.insertBefore(descriptionNode, after);
	}

	descriptionNode.textContent = input.checked;
}

function emailCallback(e) {
	const input = e.originalTarget;
	var anchorNode = input.nextElementSibling;

	// Dynamically append description node
	if(anchorNode.className !== '') {
		const after = anchorNode;

		anchorNode = document.createElement('A');
		anchorNode.appendChild(document.createTextNode(''));

		input.parentNode.insertBefore(anchorNode, after);
	}

	anchorNode.textContent = input.value;
	anchorNode.href = 'mailto:' + input.value;
}

function fileCallback(e) {
	const input = e.originalTarget;
	var anchorNode = input.nextElementSibling;

	// Dynamically append description node
	if(anchorNode.className !== '') {
		const after = anchorNode;

		anchorNode = document.createElement('A');
		anchorNode.appendChild(document.createTextNode(''));

		input.parentNode.insertBefore(anchorNode, after);
	}

	anchorNode.textContent = 'Download/open ' + input.files[0].name;
	anchorNode.href = URL.createObjectURL(input.files[0]);
}

function passwordCallback(e) {
	const input = e.originalTarget;
	var descriptionNode = input.nextElementSibling;

	// Dynamically append description node
	if(descriptionNode.className !== '') {
		const after = descriptionNode;

		descriptionNode = document.createElement('SPAN');
		descriptionNode.appendChild(document.createTextNode(''));

		input.parentNode.insertBefore(descriptionNode, after);
	}

	descriptionNode.textContent = 'Psst! Your password is "' + input.value + '"';
}

function radioCallback(e) {
	const input = e.originalTarget;
	var descriptionNode = input.nextElementSibling;

	// Dynamically append description node
	if(descriptionNode.className !== '') {
		const after = descriptionNode;

		descriptionNode = document.createElement('SPAN');
		descriptionNode.appendChild(document.createTextNode(''));

		input.parentNode.insertBefore(descriptionNode, after);
	}

	if(input.checked) {
		descriptionNode.textContent = 'Noooooo! Why did you check it!';
		setTimeout(function() {
			descriptionNode.textContent = 'Crisis averted.';
			input.checked = false;
		}, 5000);
	}
}

function rangeCallback(e) {
	const input = e.originalTarget;
	if(input.min === '')
		input.min = (Math.random() * 100).toFixed();
	if(input.max === '')
		input.max = input.min + (Math.random() * 10000).toFixed();
	var descriptionNode = input.nextElementSibling;

	// Dynamically append description node
	if(descriptionNode.className !== '') {
		const after = descriptionNode;

		descriptionNode = document.createElement('SPAN');
		descriptionNode.appendChild(document.createTextNode(''));

		input.parentNode.insertBefore(descriptionNode, after);
	}

	descriptionNode.textContent = input.value + ' \u21D2 ' + ((input.value / (input.max - input.min)) * 100).toFixed(2) + '%';
}

function resetCallback(e) {
	window.location.reload();
}

function searchCallback(e) {
	const input = e.originalTarget;
	var descriptionNode = input.nextElementSibling;

	// Dynamically append description node
	if(descriptionNode.className !== '') {
		const after = descriptionNode;

		descriptionNode = document.createElement('SPAN');
		descriptionNode.appendChild(document.createTextNode(''));

		input.parentNode.insertBefore(descriptionNode, after);
	}


	const request = new XMLHttpRequest();
	request.onload = function(load) {
		const contains = load.target.responseText.contains(input.value)

		descriptionNode.textContent = 'The source script does ';
		if(!contains)
			descriptionNode.textContent += 'not ';
		descriptionNode.textContent += 'contain the string "' + input.value + '"';
	}
	request.open('GET', me.src);
	request.send();
}

function submitCallback(e) {
	const input = e.originalTarget;
	var descriptionNode = input.nextElementSibling;

	// Dynamically append description node
	if(descriptionNode.className !== '') {
		const after = descriptionNode;

		descriptionNode = document.createElement('SPAN');
		descriptionNode.appendChild(document.createTextNode('This would auto-submit a form if there were any!'));

		input.parentNode.insertBefore(descriptionNode, after);
	}
}

function telCallback(e) {
	const input = e.originalTarget;
	input.setAttribute('pattern', '[0-9]{9}');

	var descriptionNode = input.nextElementSibling;

	// Dynamically append description node
	if(descriptionNode.className !== '') {
		const after = descriptionNode;

		descriptionNode = document.createElement('SPAN');
		descriptionNode.appendChild(document.createTextNode(''));

		input.parentNode.insertBefore(descriptionNode, after);
	}

	if(input.validity.valid)
		descriptionNode.textContent = 'Your phone number is: ' + input.value.substr(0, 3) + '-' + input.value.substr(3, 3) + '-' + input.value.substr(6, 3);
	else
		descriptionNode.textContent = 'This ain\'t no phone number!';
}

function textCallback(e) {
	const input = e.originalTarget;
	var descriptionNode = input.nextElementSibling;

	// Dynamically append description node
	if(descriptionNode.className !== '') {
		const after = descriptionNode;

		descriptionNode = document.createElement('SPAN');
		descriptionNode.appendChild(document.createTextNode(''));

		input.parentNode.insertBefore(descriptionNode, after);
	}

	descriptionNode.textContent = 'This is the standard type of an <input> tag... Value: "' + input.value + '"';
}

function hiddenCallback(e) {
	const input = e.originalTarget;
	var descriptionNode = input.nextElementSibling;

	// Dynamically append description node
	if(descriptionNode.className !== '') {
		const after = descriptionNode;

		descriptionNode = document.createElement('SPAN');
		descriptionNode.appendChild(document.createTextNode(''));

		input.parentNode.insertBefore(descriptionNode, after);
	}

	descriptionNode.textContent = 'This is virtually impossible!';
}

function imageCallback(e) {
	const input = e.originalTarget;
	input.setAttribute('src', '../resources/image_tag.jpg');
	input.setAttribute('width', 100);
	input.setAttribute('height', 100);

	var descriptionNode = input.nextElementSibling;

	// Dynamically append description node
	if(descriptionNode.className !== '') {
		const after = descriptionNode;

		descriptionNode = document.createElement('SPAN');
		descriptionNode.appendChild(document.createTextNode(''));

		input.parentNode.insertBefore(descriptionNode, after);
	}

	descriptionNode.textContent = 'All this really does, is it lets you choose an image instead of a button, so have some Snoop';
}

function urlCallback(e) {
	const input = e.originalTarget;
	var descriptionNode = input.nextElementSibling;

	// Dynamically append description node
	if(descriptionNode.className !== '') {
		const after = descriptionNode;

		descriptionNode = document.createElement('A');
		descriptionNode.appendChild(document.createTextNode(''));

		input.parentNode.insertBefore(descriptionNode, after);
	}

	if(input.validity.valid) {
		descriptionNode.textContent = 'I will take you to your most hidden desires';
		descriptionNode.href = input.value;
		descriptionNode.style.pointerEvents = '';
	} else {
		descriptionNode.textContent = 'This ain\'t no link!';
		descriptionNode.href = 'javascript:';
		descriptionNode.style.pointerEvents = 'none';
	}
}
