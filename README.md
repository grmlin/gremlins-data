# gremlins-data

gremlin.js element data mixin. 

## Installation

### NPM

    $ npm install gremlins-data
    
### Bower
    
    $ bower install gremlins-data
    
### Classic

download from `dist` 

    <script src="gremlins-data.js" />

## Usage

```html
<data-gremlin 
    data-string="foo" 
    data-number="42" 
    data-yes="true" 
    data-no="false" 
    data-object='{"foo":"bar","deep":{"foo":"bar"}}' 
    data-with-long-name="foo">
</data-gremlin>
```

```js
var gremlins = require('gremlins'),
  data = require('gremlins-data');
  
gremlins.create('data-gremlin', {
    mixins: [data],
    initialize() {
        console.log(data.string); // string foo
        console.log(data.number); // number 42
        console.log(data.yes); // boolean true
        console.log(data.no); // boolean false
        console.log(data.object); // object {foo: 'bar', deep: {foo: 'bar'}}
        
    }
});  
```
