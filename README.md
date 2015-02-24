# Math interval formatter [![Build Status](https://travis-ci.org/Semigradsky/math-interval-formatter.svg)](https://travis-ci.org/Semigradsky/math-interval-formatter) [![Dependency Status](https://david-dm.org/Semigradsky/math-interval-formatter.svg)](https://david-dm.org/Semigradsky/math-interval-formatter)

> Parse math interval object to string.


## Install

```sh
$ npm install --save math-interval-formatter
```


## Usage

`format(interval, options)`

```js
var format = require('math-interval-formatter');

var interval = {
	from: {
		value: -Math.PI,
		included: true
	},
	to: {
		value: Infinity,
		included: false
	}
};

format(interval);
//=> '[-3.142,Infinity)'

format(interval, {
	format: 'pretty',
	infiniteEndpoints: 'math',
	numberFormat: '+0.0000'
});
//=> '[3.1416, +∞)'

```

See tests for more details.


### Available options

- `format`
	- 'default' //=> '[-10,10]'
	- 'pretty' //=> '[-10, 10]'
	- 'interval' //=> '[-10..10]'

- `excludedEndpoints`
	- 'parenthesis' //=> '(-10,10)'
	- 'reversed' //=> ']-10,10['

- `infiniteEndpoints`
	- 'default' //=> '[0,Infinity)'
	- 'none' //=> '[0,)'
	- 'math' //=> '[0,∞)'

- `numberFormat` // default '0.[000]'
	- See available formats in [simple-number-formatter repo](https://github.com/Semigradsky/simple-number-formatter)


## License

MIT © Dmitry Semigradsky
