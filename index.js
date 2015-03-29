'use strict';
var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/;


function camelize(string) {
	return string.toLowerCase().replace(/-(.)/g, function (match, group1) {
		return group1.toUpperCase();
	});
}

// Inspired by jQuery. See https://github.com/jquery/jquery/blob/master/src/data.js
function getValue(value) {
	var data = value,
		result = value;

	if (typeof data === 'string') {
		try {
			if (data === 'true') {
				result = true;
			} else if (data === 'false') {
				result = false;
			} else if (data === 'null') {
				result = null;
			} else if (+data + '' === data) {
				result = +data;
			} else {
				result = rbrace.test(data) ? JSON.parse(data) : data;
			}
		} catch (error) {
		}
	}
	return result;
}

function parseAttrs(el) {
	var attributes = el.attributes,
		dataHash = {};

	if (attributes !== null && attributes !== undefined) {
		for (let i = 0; i < attributes.length; i++) {
			var attr = attributes[i];

			if (attr.name.substr(0, 5) !== 'data-') {
				continue;
			}

			dataHash[camelize(attr.name.substr(5))] = getValue(attr.value);
		}

	}
	return dataHash;
}


module.exports = {
	initialize() {
		this.data = parseAttrs(this.el);
	}
};
