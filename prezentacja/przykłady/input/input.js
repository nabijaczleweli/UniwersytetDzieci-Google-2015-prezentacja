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
	};
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

		descriptionNode = document.createElement('SPAN')
		descriptionNode.appendChild(document.createTextNode(''));

		input.parentNode.insertBefore(descriptionNode, after);
	}

	descriptionNode.textContent = input.checked;
}
