# gremlins-data

gremlin.js element data mixin. 

## Installation

### NPM

    $ npm install gremlins-data
    
## Usage

- all `data` attributes will be parsed into the `.data` object of the gremlin's instance.
- all other attributes can be found in the `.props` object of the gremlin's instance.
 
 Properties and data will be updated if they are changed in the dom, use the `attributeDidChange` callback if you need to update the component then.

```html
<data-gremlin 
    id="foo"
    name="Gizmo"
    data-string="foo" 
    data-number="42" 
    data-yes="true" 
    data-no="false" 
    data-obj='{"foo":"bar","deep":{"foo":"bar"}}'
    data-with-long-name="foo">
</data-gremlin>
```

```js
const gremlins = require('gremlins');
const data = require('gremlins-data');
  
gremlins.create('data-gremlin', {
    mixins: [data],
    attached() {
        console.log(this.props.id); // string foo
        console.log(this.props.name); // string Gizmo
        console.log(this.data.string); // string foo
        console.log(this.data.number); // number 42
        console.log(this.data.yes); // boolean true
        console.log(this.data.no); // boolean false
        console.log(this.data.obj); // object {foo: 'bar', deep: {foo: 'bar'}}
    },
    attributeDidChange(attributeName, previousValue, value){
        console.log(attributeName + ' changed to it\'s value to', value);
    }
});  
```
