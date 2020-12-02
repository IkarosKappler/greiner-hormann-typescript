[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
Greiner-Hormann polygon clipping (TypeScript port)
==================================================

This is the TypeScript port of the original package
[w8r/GreinerHormann](https://github.com/w8r/GreinerHormann)
Thanks to [Alexander Milevski](https://github.com/w8r) for the original es6 implementation.


 * Does AND, OR, XOR (intersection, union, difference, if you're human)
 * Plays nicely with [Leaflet](http://github.com/leaflet/leaflet/), comes with an adaptor for it
 * Handles non-convex polygons and multiple clipping areas
 * ~5kb compressed, no dependencies

[Original demo and documentation](http://w8r.github.io/GreinerHormann/)

![New test and demo](https://www.int2byte.de/public/plotboilerplate/screenshots/screenshot-20201202-1-polygon-intersection.png "New test and demo")

[New test and demo](https://www.int2byte.de/public/plotboilerplate/demos/27-polygon-intersection-greinerhormann/)

**Note:** If you are looking for something more powerful, take a look at the [Martinez polygon clipping](https://github.com/w8r/martinez) implementation.

## Install
```bash
$ npm install greiner-hormann-typescript
```

Browserify
```js
var greinerHormann = require('greiner-hormann-typescript');
```

Browser
```html
<script src="path/to/greiner-hormann-typescript(.leaflet).min.js"></script>
```

## Use
```typescript
...
const intersection : Array<Array<IVertex>> = greinerHormann.intersection(source, clip);
const union : Array<Array<IVertex>>        = greinerHormann.union(source, clip);
const diff : Array<Array<IVertex>>         = greinerHormann.diff(source, clip);

...

if(intersection){
    if(typeof intersection[0][0] === 'number'){ // single linear ring
        intersection = [intersection];
    }
    for(var i = 0, len = intersection.length; i < len; i++) {
        L.polygon(intersection[i], {...}).addTo(map);
    }
}
```

## Format
Input and output can be `{x:x, y:y}` objects or `[x,y]` pairs. It will output the points in the same format you put in.

