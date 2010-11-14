// path functions for use in browser-side javascript

// adapted from couch.js
function encodeOptions(options) {
	var buf = []
	if (typeof(options) == "object" && options !== null) {
		for (var name in options) {
			if (!options.hasOwnProperty(name)) continue;
			var value = options[name];
			if (name == "key" || name == "startkey" || name == "endkey") {
				value = toJSON(value);
			}
			buf.push(encodeURIComponent(name) + "=" + encodeURIComponent(value))
		}
	}
	if (!buf.length) {
		return ""
	}
	return "?" + buf.join("&");
}

function concatArgs(array, args) {
	for (var i=0; i < args.length; i++) {
		array.push(args[i]);
	}
	return array
}

function makePath(array) {
	var options, path
  
	if (typeof array[array.length - 1] != "string") {
		// it's a params hash
		options = array.pop()
	}
	path = array.map(function(item) {
		return encodeURIComponent(item) }).join('/')
	if (options) {
		return document.location.protocol + '//' + document.location.host
			+ path + encodeOptions(options)
	} else {
		return document.location.protocol + '//' + document.location.host
			+ path
	}
}

function assetPath() {
	var p = document.location.pathname.split('/')
	var parts = [p[0], p[1] , p[2], p[3]];
	return makePath(concatArgs(parts, arguments));
};

function showPath() {
	var p = document.location.pathname.split('/')
	var parts = [p[0], p[1] , p[2], p[3], '_show']
	return makePath(concatArgs(parts, arguments))
}

function listPath() {
	var p = document.location.pathname.split('/')
	var parts = [p[0], p[1] , p[2], p[3], '_list']
	return makePath(concatArgs(parts, arguments))
}
