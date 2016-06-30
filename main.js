module.exports = tag;

var append = require('yobert-append');

function tag() {
	var name = arguments[0];
	var attrs = arguments[1];
	var e = document.createElement(name);
	for(k in attrs) {
		var v = attrs[k];
		if(typeof v == 'function' && k.substr(0, 2) == 'on') {
			listen(e, k.substr(2), v);
		} else if(k == 'class') {
			e.className = v;
		} else if(k == 'style') {
			e.style.cssText = v;
		} else {
			e.setAttribute(k, v, 0);
		}
	}
	for(var i = 2; i < arguments.length; i++) {
		append(e, arguments[i]);
	}
	return e;
}

function listen(e, name, cb) {
	if(e.addEventListener)
		e.addEventListener(name, cb, false);
	else
		e.attachEvent('on'+name, cb);

	return;
}

