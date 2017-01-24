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
    } catch (error) {
    }
  }
  return result;
}

function parseAttrs(gremlin) {
  var attributes = gremlin.el.attributes;
  var dataHash = {};
  var propsHash = {};

  if (attributes !== null && attributes !== undefined) {
    for (let i = 0; i < attributes.length; i++) {
      var attr = attributes[ i ];

      if (isDataAttribute(attr.name)) {
        dataHash[ camelize(attr.name.substr(5)) ] = getValue(attr.value);
      } else {
        propsHash[ camelize(attr.name) ] = getValue(attr.value);
      }
    }

  }
  gremlin.data = dataHash;
  gremlin.props = propsHash;
}


module.exports = {
  created() {
    parseAttrs(this);
    this.__didInitializeAttributes = true;
  },
  attributeDidChange(name, previousValue, value){
    if (this.__didInitializeAttributes) {
      let val = getValue(value);
      if (isDataAttribute(name)) {
        this.data[ camelize(name.substr(5)) ] = val;
      } else {
        this.props[ camelize(name) ] = val;
      }
    }
  }
};
