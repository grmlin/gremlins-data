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
/*!gremlins.js 0.8.1 - (c) 2013-2015 Andreas Wehr - https://github.com/grmlin/gremlins - Licensed under MIT license*/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.gremlins=e()}}(function(){return function e(t,n,r){function o(a,u){if(!n[a]){if(!t[a]){var c="function"==typeof require&&require;if(!u&&c)return c(a,!0);if(i)return i(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var s=n[a]={exports:{}};t[a][0].call(s.exports,function(e){var n=t[a][1][e];return o(n?n:e)},s,s.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t){"use strict";var n=e("./uuid"),r="gremlins_"+n(),o={},i=function(){var e=1;return function(){return e++}}(),a=function(e){return void 0!==e[r]},u=function(e){return e[r]=i()},c=function(e){return a(e)?e[r]:u(e)};t.exports={addGremlin:function(e,t){var n=c(t);void 0!==o[n]?console.warn("You can't add another gremlin to this element, it already uses one!",t):o[n]=e},getGremlin:function(e){var t=c(e),n=o[t];return void 0===n&&console.warn("This dom element does not use any gremlins!",e),n}}},{"./uuid":8}],2:[function(e,t){"use strict";function n(e,t){function n(){this.el=t,this.initialize()}n.call(e)}t.exports={createInstance:function(e,t){var r=Object.create(t);return n(r,e),r}}},{}],3:[function(e,t){"use strict";var n=e("object-assign"),r=e("./Mixins"),o=e("./GremlinElement"),i={},a=function(e,t){return i[e]=t},u=function(e){return void 0!==i[e]},c={initialize:function(){},destroy:function(){},create:function(e){var t=this,i=Object.create(t),c=e.name;if("string"!=typeof c)throw new Error("A gremlin spec needs a »name« property! It can't be found otherwise");if(u(c))throw new Error("Trying to add new Gremlin spec, but a spec for "+c+" already exists.");return void 0!==e.create&&console.warn("You are replacing the original create method for the spec "+c+". You know what you're doing, right?"),n(i,e),r.mixinProps(i),a(c,i),o.register(i),i}};t.exports=c},{"./GremlinElement":4,"./Mixins":5,"object-assign":10}],4:[function(e,t){"use strict";var n=e("./Factory"),r=e("./Data"),o="function"==typeof document.registerElement;if(!o)throw new Error("registerElement not available. Did you include the polyfill for older browsers?");var i=function(e,t){var o=n.createInstance(e,t);r.addGremlin(o,e)},a=function(e){r.getGremlin(e).destroy()};t.exports={register:function(e){var t=e.name,n=e.tagName,r="string"==typeof n,o={attachedCallback:{value:function(){i(this,e)}},detachedCallback:{value:function(){a(this)}}};n=r?n:t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()+"-gremlin";var u=document.registerElement(n,{name:n,prototype:Object.create(HTMLElement.prototype,o)});return u}}},{"./Data":1,"./Factory":2}],5:[function(e,t){"use strict";function n(e,t){Object.keys(t).forEach(function(n){var o=t[n];void 0===e[n]?e[n]=o:r(e,n,o)})}function r(e,t,n){var r=e[t],o=n,i=typeof r,a=typeof o,u=i===a;u&&"function"===a?e[t]=function(){return[o.apply(this,arguments),r.apply(this,arguments)]}:console.warn("Can't decorate gremlin property »"+e.name+"#"+t+":"+i+"« with »Module#"+t+":"+a+"«.\n		Only functions can be decorated!")}var o=function(e){return Array.isArray(e.mixins)?e.mixins:e.mixins?[e.mixins]:[]};t.exports={mixinProps:function(e){var t=o(e);t.reverse().forEach(function(t){return n(e,t)})}}},{}],6:[function(e,t){(function(e){"use strict";var n=function(){},r=["log","info","warn"];t.exports={create:function(){void 0===console&&(e.console={}),r.forEach(function(e){"function"!=typeof console[e]&&(console[e]=n())})}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],7:[function(e,t){"use strict";e("document-register-element");var n=e("./consoleShim"),r=e("./Gremlin"),o="gremlins_connected";if(document.documentElement[o])throw new Error("You tried to include gremlin.js multiple times. This will not work");n.create(),document.documentElement[o]=!0,t.exports={create:r.create}},{"./Gremlin":3,"./consoleShim":6,"document-register-element":9}],8:[function(e,t){"use strict";t.exports=function n(e){return e?(e^16*Math.random()>>e/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,n)}},{}],9:[function(){!function(e,t,n,r){"use strict";function o(e,t){for(var n=0,r=e.length;r>n;n++)v(e[n],t)}function i(e){for(var t,n=0,r=e.length;r>n;n++)t=e[n],E(t,P[u(t)])}function a(e){return function(t){tt(t)&&(v(t,e),o(t.querySelectorAll(G),e))}}function u(e){var t=e.getAttribute("is"),n=e.nodeName.toUpperCase(),r=U.call(_,t?k+t.toUpperCase():j+n);return t&&r>-1&&!c(n,t)?-1:r}function c(e,t){return-1<G.indexOf(e+'[is="'+t+'"]')}function l(e){var t=e.currentTarget,n=e.attrChange,r=e.prevValue,o=e.newValue;t.attributeChangedCallback&&"style"!==e.attrName&&t.attributeChangedCallback(e.attrName,n===e[x]?null:r,n===e[M]?null:o)}function s(e){var t=a(e);return function(e){t(e.target)}}function f(e){ft&&(ft=!1,e.currentTarget.removeEventListener(F,f)),o((e.target||t).querySelectorAll(G),e.detail===A?A:C),et&&m()}function d(e,t){var n=this;ot.call(n,e,t),h.call(n,{target:n})}function p(e,t){B(e,t),y?y.observe(e,ut):(st&&(e.setAttribute=d,e[O]=b(e),e.addEventListener(D,h)),e.addEventListener(T,l)),e.createdCallback&&(e.created=!0,e.createdCallback(),e.created=!1)}function m(){for(var e,t=0,n=nt.length;n>t;t++)e=nt[t],S.contains(e)||(nt.splice(t,1),v(e,A))}function v(e,t){var n,r=u(e);r>-1&&(w(e,P[r]),r=0,t!==C||e[C]?t===A&&!e[A]&&(e[C]=!1,e[A]=!0,r=1):(e[A]=!1,e[C]=!0,r=1,et&&U.call(nt,e)<0&&nt.push(e)),r&&(n=e[t+"Callback"])&&n.call(e))}if(!(r in t)){var h,g,b,y,w,E,O="__"+r+(1e5*Math.random()>>0),C="attached",A="detached",N="extends",x="ADDITION",L="MODIFICATION",M="REMOVAL",T="DOMAttrModified",F="DOMContentLoaded",D="DOMSubtreeModified",j="<",k="=",I=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,V=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],_=[],P=[],G="",S=t.documentElement,U=_.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},q=n.prototype,R=q.hasOwnProperty,Y=q.isPrototypeOf,Z=n.defineProperty,z=n.getOwnPropertyDescriptor,H=n.getOwnPropertyNames,$=n.getPrototypeOf,K=n.setPrototypeOf,W=!!n.__proto__,X=n.create||function dt(e){return e?(dt.prototype=e,new dt):this},B=K||(W?function(e,t){return e.__proto__=t,e}:H&&z?function(){function e(e,t){for(var n,r=H(t),o=0,i=r.length;i>o;o++)n=r[o],R.call(e,n)||Z(e,n,z(t,n))}return function(t,n){do e(t,n);while(n=$(n));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),J=e.MutationObserver||e.WebKitMutationObserver,Q=(e.HTMLElement||e.Element||e.Node).prototype,et=!Y.call(Q,S),tt=et?function(e){return 1===e.nodeType}:function(e){return Y.call(Q,e)},nt=et&&[],rt=Q.cloneNode,ot=Q.setAttribute,it=Q.removeAttribute,at=t.createElement,ut=J&&{attributes:!0,characterData:!0,attributeOldValue:!0},ct=J||function(){st=!1,S.removeEventListener(T,ct)},lt=!1,st=!0,ft=!0;K||W?(w=function(e,t){Y.call(t,e)||p(e,t)},E=p):(w=function(e,t){e[O]||(e[O]=n(!0),p(e,t))},E=w),et?(st=!1,function(){var e=z(Q,"addEventListener"),t=e.value,n=function(e){var t=new CustomEvent(T,{bubles:!0});t.attrName=e,t.prevValue=this.getAttribute(e),t.newValue=null,t[M]=t.attrChange=2,it.call(this,e),this.dispatchEvent(t)},r=function(e,t){var n=this.hasAttribute(e),r=n&&this.getAttribute(e),o=new CustomEvent(T,{bubles:!0});ot.call(this,e,t),o.attrName=e,o.prevValue=n?r:null,o.newValue=t,n?o[L]=o.attrChange=1:o[x]=o.attrChange=0,this.dispatchEvent(o)},o=function(e){var t,n=e.currentTarget,r=n[O],o=e.propertyName;r.hasOwnProperty(o)&&(r=r[o],t=new CustomEvent(T,{bubles:!0}),t.attrName=r.name,t.prevValue=r.value||null,t.newValue=r.value=n[o]||null,null==t.prevValue?t[x]=t.attrChange=0:t[L]=t.attrChange=1,n.dispatchEvent(t))};e.value=function(e,i,a){e===T&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[O]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",o)),t.call(this,e,i,a)},Z(Q,"addEventListener",e)}()):J||(S.addEventListener(T,ct),S.setAttribute(O,1),S.removeAttribute(O),st&&(h=function(e){var t,n,r,o=this;if(o===e.target){t=o[O],o[O]=n=b(o);for(r in n){if(!(r in t))return g(0,o,r,t[r],n[r],x);if(n[r]!==t[r])return g(1,o,r,t[r],n[r],L)}for(r in t)if(!(r in n))return g(2,o,r,t[r],n[r],M)}},g=function(e,t,n,r,o,i){var a={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:o};a[i]=e,l(a)},b=function(e){for(var t,n,r={},o=e.attributes,i=0,a=o.length;a>i;i++)t=o[i],n=t.name,"setAttribute"!==n&&(r[n]=t.value);return r})),t[r]=function(e,n){if(r=e.toUpperCase(),lt||(lt=!0,J?(y=function(e,t){function n(e,t){for(var n=0,r=e.length;r>n;t(e[n++]));}return new J(function(r){for(var o,i,a=0,u=r.length;u>a;a++)o=r[a],"childList"===o.type?(n(o.addedNodes,e),n(o.removedNodes,t)):(i=o.target,i.attributeChangedCallback&&"style"!==o.attributeName&&i.attributeChangedCallback(o.attributeName,o.oldValue,i.getAttribute(o.attributeName)))})}(a(C),a(A)),y.observe(t,{childList:!0,subtree:!0})):(t.addEventListener("DOMNodeInserted",s(C)),t.addEventListener("DOMNodeRemoved",s(A))),t.addEventListener(F,f),t.addEventListener("readystatechange",f),t.createElement=function(e,n){var r=at.apply(t,arguments),o=""+e,i=U.call(_,(n?k:j)+(n||o).toUpperCase()),a=i>-1;return n&&(r.setAttribute("is",n=n.toLowerCase()),a&&(a=c(o.toUpperCase(),n))),a&&E(r,P[i]),r},Q.cloneNode=function(e){var t=rt.call(this,!!e),n=u(t);return n>-1&&E(t,P[n]),e&&i(t.querySelectorAll(G)),t}),-2<U.call(_,k+r)+U.call(_,j+r))throw new Error("A "+e+" type is already registered");if(!I.test(r)||-1<U.call(V,r))throw new Error("The type "+e+" is invalid");var r,l=function(){return t.createElement(m,p&&r)},d=n||q,p=R.call(d,N),m=p?n[N].toUpperCase():r,v=_.push((p?k:j)+r)-1;return G=G.concat(G.length?",":"",p?m+'[is="'+e.toLowerCase()+'"]':m),l.prototype=P[v]=R.call(d,"prototype")?d.prototype:X(Q),o(t.querySelectorAll(G),C),l}}}(window,document,Object,"registerElement")},{}],10:[function(e,t){"use strict";function n(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}t.exports=Object.assign||function(e){for(var t,r,o=n(e),i=1;i<arguments.length;i++){t=arguments[i],r=Object.keys(Object(t));for(var a=0;a<r.length;a++)o[r[a]]=t[r[a]]}return o}},{}]},{},[7])(7)});
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

		gremlins.create({
			mixins: [gremlinsData],
			name: "data",
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