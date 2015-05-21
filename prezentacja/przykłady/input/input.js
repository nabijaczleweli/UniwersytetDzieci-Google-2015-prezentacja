// NOTE: This script requires ECMAScript 6 support (uses `const`)


var inputs;

const typeToCallback = {
	'button': {
		'eventName': 'click',
		'callback': buttonCallback()
	},
	'checkbox': {
		'eventName': 'change',
		'callback': checkboxCallback
	},
	'color': {
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
