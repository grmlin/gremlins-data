(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.gremlinsData = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
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

	if (typeof data === "string") {
		try {
			if (data === "true") {
				result = true;
			} else if (data === "false") {
				result = false;
			} else if (data === "null") {
				result = null;
			} else if (+data + "" === data) {
				result = +data;
			} else {
				result = rbrace.test(data) ? JSON.parse(data) : data;
			}
		} catch (error) {}
	}
	return result;
}

function parseAttrs(el) {
	var attributes = el.attributes,
	    dataHash = {};

	if (attributes !== null && attributes !== undefined) {
		for (var i = 0; i < attributes.length; i++) {
			var attr = attributes[i];

			if (attr.name.substr(0, 5) !== "data-") {
				continue;
			}

			dataHash[camelize(attr.name.substr(5))] = getValue(attr.value);
		}
	}
	return dataHash;
}

module.exports = {
	initialize: function initialize() {
		this.data = parseAttrs(this.el);
	}
};

},{}],2:[function(require,module,exports){
(function (global){
/*!gremlins.js 0.9.0 - (c) 2013-2015 Andreas Wehr - https://github.com/grmlin/gremlins - Licensed under MIT license*/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.gremlins=e()}}(function(){return function e(t,n,r){function i(a,u){if(!n[a]){if(!t[a]){var c="function"==typeof require&&require;if(!u&&c)return c(a,!0);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var s=n[a]={exports:{}};t[a][0].call(s.exports,function(e){var n=t[a][1][e];return i(n?n:e)},s,s.exports,e,t,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(e,t,n){"use strict";e("document-register-element"),t.exports=e("./lib/gremlins")},{"./lib/gremlins":8,"document-register-element":10}],2:[function(e,t,n){"use strict";var r=e("./uuid"),i="gremlins_"+r(),o={},a=function(){var e=1;return function(){return e++}}(),u=function(e){return void 0!==e[i]},c=function(e){return e[i]=a()},l=function(e){return u(e)?e[i]:c(e)};t.exports={addGremlin:function(e,t){var n=l(t);void 0!==o[n]?console.warn("You can't add another gremlin to this element, it already uses one!",t):o[n]=e},getGremlin:function(e){var t=l(e),n=o[t];return void 0===n&&console.warn("This dom element does not use any gremlins!",e),n}}},{"./uuid":9}],3:[function(e,t,n){"use strict";t.exports={createInstance:function(e,t){var n=Object.create(t,{el:{value:e,writable:!1}});return n}}},{}],4:[function(e,t,n){"use strict";var r=e("object-assign"),i=e("./Mixins"),o=e("./GremlinElement"),a={},u=function(e,t){return a[e]=t},c=function(e){return void 0!==a[e]},l={initialize:function(){},destroy:function(){},create:function(e){var t=void 0===arguments[1]?{}:arguments[1],n=this,a=Object.create(n,{name:{value:e,writable:!0}});if("string"!=typeof e)throw new TypeError("Gremlins.create expects the gremlins tag name as a first argument");if(c(e))throw new Error("Trying to add new Gremlin spec, but a spec for "+e+" already exists.");return void 0!==t.create&&console.warn("You are replacing the original create method for the spec of "+e+". You know what you're doing, right?"),r(a,t),i.mixinProps(a),u(e,a),o.register(e,a),a}};t.exports=l},{"./GremlinElement":5,"./Mixins":6,"object-assign":11}],5:[function(e,t,n){"use strict";var r=e("./Factory"),i=e("./Data"),o="function"==typeof document.registerElement;if(!o)throw new Error("registerElement not available. Did you include the polyfill for older browsers?");var a=function(e,t){var n=r.createInstance(e,t);i.addGremlin(n,e),n.initialize()},u=function(e){i.getGremlin(e).destroy()};t.exports={register:function(e,t){var n={attachedCallback:{value:function(){a(this,t)}},detachedCallback:{value:function(){u(this)}}},r=document.registerElement(e,{name:e,prototype:Object.create(HTMLElement.prototype,n)});return r}}},{"./Data":2,"./Factory":3}],6:[function(e,t,n){"use strict";function r(e,t){Object.keys(t).forEach(function(n){var r=t[n];void 0===e[n]?e[n]=r:i(e,n,r)})}function i(e,t,n){var r=e[t],i=n,o=typeof r,a=typeof i,u=o===a;u&&"function"===a?e[t]=function(){return[i.apply(this,arguments),r.apply(this,arguments)]}:console.warn("Can't decorate gremlin property <"+e.tagName+" />#"+t+":"+o+"« with »Module#"+t+":"+a+"«.\n		Only functions can be decorated!")}var o=function(e){return Array.isArray(e.mixins)?e.mixins:e.mixins?[e.mixins]:[]};t.exports={mixinProps:function(e){var t=o(e);t.reverse().forEach(function(t){return r(e,t)})}}},{}],7:[function(e,t,n){(function(e){"use strict";var n=function(){},r=["log","info","warn"];t.exports={create:function(){void 0===console&&(e.console={}),r.forEach(function(e){"function"!=typeof console[e]&&(console[e]=n())})}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(e,t,n){"use strict";var r=e("./consoleShim"),i=e("./Gremlin"),o=e("./Data"),a="gremlins_connected";if(document.documentElement[a])throw new Error("You tried to include gremlin.js multiple times. This will not work");r.create(),document.documentElement[a]=!0,t.exports={create:i.create.bind(i),findGremlin:function(e){return o.getGremlin(e)}}},{"./Data":2,"./Gremlin":4,"./consoleShim":7}],9:[function(e,t,n){"use strict";t.exports=function r(e){return e?(e^16*Math.random()>>e/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,r)}},{}],10:[function(e,t,n){!function(e,t,n,r){"use strict";function i(e,t){for(var n=0,r=e.length;r>n;n++)v(e[n],t)}function o(e){for(var t,n=0,r=e.length;r>n;n++)t=e[n],O(t,_[u(t)])}function a(e){return function(t){ne(t)&&(v(t,e),i(t.querySelectorAll(S),e))}}function u(e){var t=e.getAttribute("is"),n=e.nodeName.toUpperCase(),r=R.call(V,t?k+t.toUpperCase():P+n);return t&&r>-1&&!c(n,t)?-1:r}function c(e,t){return-1<S.indexOf(e+'[is="'+t+'"]')}function l(e){var t=e.currentTarget,n=e.attrChange,r=e.prevValue,i=e.newValue;pe&&t.attributeChangedCallback&&"style"!==e.attrName&&t.attributeChangedCallback(e.attrName,n===e[T]?null:r,n===e[M]?null:i)}function s(e){var t=a(e);return function(e){h.push(t,e.target)}}function f(e){me&&(me=!1,e.currentTarget.removeEventListener(j,f)),i((e.target||t).querySelectorAll(S),e.detail===N?N:A),te&&p()}function d(e,t){var n=this;oe.call(n,e,t),g.call(n,{target:n})}function m(e,t){J(e,t),w?w.observe(e,ce):(de&&(e.setAttribute=d,e[C]=y(e),e.addEventListener(D,g)),e.addEventListener(F,l)),e.createdCallback&&pe&&(e.created=!0,e.createdCallback(),e.created=!1)}function p(){for(var e,t=0,n=re.length;n>t;t++)e=re[t],q.contains(e)||(re.splice(t,1),v(e,N))}function v(e,t){var n,r=u(e);r>-1&&(E(e,_[r]),r=0,t!==A||e[A]?t===N&&!e[N]&&(e[A]=!1,e[N]=!0,r=1):(e[N]=!1,e[A]=!0,r=1,te&&R.call(re,e)<0&&re.push(e)),r&&(n=e[t+"Callback"])&&n.call(e))}if(!(r in t)){var h,g,b,y,w,E,O,C="__"+r+(1e5*Math.random()>>0),A="attached",N="detached",x="extends",T="ADDITION",L="MODIFICATION",M="REMOVAL",F="DOMAttrModified",j="DOMContentLoaded",D="DOMSubtreeModified",P="<",k="=",G=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,I=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],V=[],_=[],S="",q=t.documentElement,R=V.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},U=n.prototype,H=U.hasOwnProperty,Y=U.isPrototypeOf,z=n.defineProperty,Z=n.getOwnPropertyDescriptor,K=n.getOwnPropertyNames,W=n.getPrototypeOf,X=n.setPrototypeOf,$=!!n.__proto__,B=n.create||function ve(e){return e?(ve.prototype=e,new ve):this},J=X||($?function(e,t){return e.__proto__=t,e}:K&&Z?function(){function e(e,t){for(var n,r=K(t),i=0,o=r.length;o>i;i++)n=r[i],H.call(e,n)||z(e,n,Z(t,n))}return function(t,n){do e(t,n);while((n=W(n))&&!Y.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),Q=e.MutationObserver||e.WebKitMutationObserver,ee=(e.HTMLElement||e.Element||e.Node).prototype,te=!Y.call(ee,q),ne=te?function(e){return 1===e.nodeType}:function(e){return Y.call(ee,e)},re=te&&[],ie=ee.cloneNode,oe=ee.setAttribute,ae=ee.removeAttribute,ue=t.createElement,ce=Q&&{attributes:!0,characterData:!0,attributeOldValue:!0},le=Q||function(e){de=!1,q.removeEventListener(F,le)},se=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,10)},fe=!1,de=!0,me=!0,pe=!0;X||$?(E=function(e,t){Y.call(t,e)||m(e,t)},O=m):(E=function(e,t){e[C]||(e[C]=n(!0),m(e,t))},O=E),te?(de=!1,function(){var e=Z(ee,"addEventListener"),t=e.value,n=function(e){var t=new CustomEvent(F,{bubbles:!0});t.attrName=e,t.prevValue=this.getAttribute(e),t.newValue=null,t[M]=t.attrChange=2,ae.call(this,e),this.dispatchEvent(t)},r=function(e,t){var n=this.hasAttribute(e),r=n&&this.getAttribute(e),i=new CustomEvent(F,{bubbles:!0});oe.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[L]=i.attrChange=1:i[T]=i.attrChange=0,this.dispatchEvent(i)},i=function(e){var t,n=e.currentTarget,r=n[C],i=e.propertyName;r.hasOwnProperty(i)&&(r=r[i],t=new CustomEvent(F,{bubbles:!0}),t.attrName=r.name,t.prevValue=r.value||null,t.newValue=r.value=n[i]||null,null==t.prevValue?t[T]=t.attrChange=0:t[L]=t.attrChange=1,n.dispatchEvent(t))};e.value=function(e,o,a){e===F&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[C]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",i)),t.call(this,e,o,a)},z(ee,"addEventListener",e)}()):Q||(q.addEventListener(F,le),q.setAttribute(C,1),q.removeAttribute(C),de&&(g=function(e){var t,n,r,i=this;if(i===e.target){t=i[C],i[C]=n=y(i);for(r in n){if(!(r in t))return b(0,i,r,t[r],n[r],T);if(n[r]!==t[r])return b(1,i,r,t[r],n[r],L)}for(r in t)if(!(r in n))return b(2,i,r,t[r],n[r],M)}},b=function(e,t,n,r,i,o){var a={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};a[o]=e,l(a)},y=function(e){for(var t,n,r={},i=e.attributes,o=0,a=i.length;a>o;o++)t=i[o],n=t.name,"setAttribute"!==n&&(r[n]=t.value);return r})),t[r]=function(e,n){if(r=e.toUpperCase(),fe||(fe=!0,Q?(w=function(e,t){function n(e,t){for(var n=0,r=e.length;r>n;t(e[n++]));}return new Q(function(r){for(var i,o,a=0,u=r.length;u>a;a++)i=r[a],"childList"===i.type?(n(i.addedNodes,e),n(i.removedNodes,t)):(o=i.target,pe&&o.attributeChangedCallback&&"style"!==i.attributeName&&o.attributeChangedCallback(i.attributeName,i.oldValue,o.getAttribute(i.attributeName)))})}(a(A),a(N)),w.observe(t,{childList:!0,subtree:!0})):(h=[],se(function g(){for(;h.length;)h.shift().call(null,h.shift());se(g)}),t.addEventListener("DOMNodeInserted",s(A)),t.addEventListener("DOMNodeRemoved",s(N))),t.addEventListener(j,f),t.addEventListener("readystatechange",f),t.createElement=function(e,n){var r=ue.apply(t,arguments),i=""+e,o=R.call(V,(n?k:P)+(n||i).toUpperCase()),a=o>-1;return n&&(r.setAttribute("is",n=n.toLowerCase()),a&&(a=c(i.toUpperCase(),n))),pe=!t.createElement.innerHTMLHelper,a&&O(r,_[o]),r},ee.cloneNode=function(e){var t=ie.call(this,!!e),n=u(t);return n>-1&&O(t,_[n]),e&&o(t.querySelectorAll(S)),t}),-2<R.call(V,k+r)+R.call(V,P+r))throw new Error("A "+e+" type is already registered");if(!G.test(r)||-1<R.call(I,r))throw new Error("The type "+e+" is invalid");var r,l=function(){return m?t.createElement(p,r):t.createElement(p)},d=n||U,m=H.call(d,x),p=m?n[x].toUpperCase():r,v=V.push((m?k:P)+r)-1;return S=S.concat(S.length?",":"",m?p+'[is="'+e.toLowerCase()+'"]':p),l.prototype=_[v]=H.call(d,"prototype")?d.prototype:B(ee),i(t.querySelectorAll(S),A),l}}}(window,document,Object,"registerElement")},{}],11:[function(e,t,n){"use strict";function r(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function i(e){var t=Object.getOwnPropertyNames(e);return Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(e))),t.filter(function(t){return o.call(e,t)})}var o=Object.prototype.propertyIsEnumerable;t.exports=Object.assign||function(e,t){for(var n,o,a=r(e),u=1;u<arguments.length;u++){n=arguments[u],o=i(Object(n));for(var c=0;c<o.length;c++)a[o[c]]=n[o[c]]}return a}},{}]},{},[1])(1)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
"use strict";

var gremlins = require("gremlins"),
    gremlinsData = require("../../index");

describe("gremlinjs-data", function () {

	it("augments gremlin instances", function (done) {
		var complex = {
			foo: "bar",
			deep: {
				foo: "bar"
			}
		};

		gremlins.create("data-gremlin", {
			mixins: [gremlinsData],
			initialize: function initialize() {
				try {
					expect(this.data).to.be.an("object");

					expect(this.data).to.have.property("string");
					expect(this.data.string).to.be("foo");

					expect(this.data).to.have.property("number");
					expect(this.data.number).to.be(42);

					expect(this.data).to.have.property("yes");
					expect(this.data.yes).to.be.ok();

					expect(this.data).to.have.property("no");
					expect(this.data.no).not.to.be.ok();

					expect(this.data).to.have.property("object");
					expect(this.data.object).to.eql(complex);

					expect(this.data).to.have.property("withLongName");
					expect(this.data.withLongName).to.be("foo");
					done();
				} catch (e) {
					done(e);
				}
			}
		});

		var el = document.createElement("data-gremlin");
		el.setAttribute("data-string", "foo");
		el.setAttribute("data-number", "42");
		el.setAttribute("data-yes", "true");
		el.setAttribute("data-no", "false");
		el.setAttribute("data-object", JSON.stringify(complex));
		el.setAttribute("data-with-long-name", "foo");
		document.body.appendChild(el);
	});
});

},{"../../index":1,"gremlins":2}]},{},[3])(3)
});