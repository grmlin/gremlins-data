(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.gremlinsData = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/;

function camelize(string) {
    return string.toLowerCase().replace(/-(.)/g, function (match, group1) {
        return group1.toUpperCase();
    });
}

function isDataAttribute(name) {
    return name.substr(0, 5) === 'data-';
}

// Inspired by jQuery. See https://github.com/jquery/jquery/blob/master/src/data.js
function getValue(value) {
    var data = value,
        result = value;

    if (typeof data === 'string') {
        try {
            if (!data || data === 'true') {
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
        } catch (error) {}
    }
    return result;
}

function parseAttrs(gremlin) {
    var el = gremlin.el;
    var attributes = el.attributes;
    var dataHash = {};
    var propsHash = {};

    if (attributes !== null && attributes !== undefined) {
        for (var i = 0; i < attributes.length; i++) {
            var attr = attributes[i];

            if (isDataAttribute(attr.name)) {
                dataHash[camelize(attr.name.substr(5))] = getValue(attr.value);
            } else {
                propsHash[camelize(attr.name)] = getValue(attr.value);
            }
        }
    }
    gremlin.data = dataHash;
    gremlin.props = propsHash;
}

module.exports = {
    __didInitializeAttributes: false,
    initialize: function initialize() {
        parseAttrs(this);
        this.__didInitializeAttributes = true;
    },
    attributeDidChange: function attributeDidChange(name, previousValue, value) {
        if (this.__didInitializeAttributes) {
            var val = getValue(value);
            if (isDataAttribute(name)) {
                this.data[camelize(name.substr(5))] = val;
            } else {
                this.props[camelize(name)] = val;
            }
        }
    }
};

},{}]},{},[1])(1)
});