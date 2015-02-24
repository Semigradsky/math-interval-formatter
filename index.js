'use strict';

var merge = require('merge');
var formatNumber = require('simple-number-formatter');

var defaultOptions = {
	format:            'default',     // ['default', 'pretty', 'interval']
	excludedEndpoints: 'parenthesis', // ['parenthesis', 'reversed']
	infiniteEndpoints: 'default',     // ['default', 'none', 'math']
	numberFormat:      '0.[000]'      // see available formats in http://git.io/A1OG
};

module.exports = function (interval, options) {
	return format(interval, merge(true, defaultOptions, options));
};

function format(obj, opts) {
	if (obj.from.value === obj.to.value) {
		if (opts.format === 'default') {
			return '[' + getValue(obj.from.value, opts) + ']';
		} else {
			return '{' + getValue(obj.from.value, opts) + '}';
		}
	}

	return leftBrace (obj, opts) +
	       fromValue (obj, opts) +
	       delimeter (obj, opts) +
	       toValue   (obj, opts) +
	       rightBrace(obj, opts);
}

function leftBrace(obj, opts) {
	if (obj.from.included) {
		return '[';
	} else {
		switch (opts.excludedEndpoints) {
			case 'parenthesis':
				return '(';
			case 'reversed':
				return ']';
		}
	}
}

function getValue(value, opts) {
	if (Math.abs(value) !== Infinity) {
		return formatNumber(value, opts.numberFormat);
	} else {
		var sign = (value < 0) ? '-' : (opts.numberFormat.indexOf('+') >= 0 ? '+' : '');
		switch (opts.infiniteEndpoints) {
			case 'default':
				return sign + 'Infinity';
			case 'none':
				return '';
			case 'math':
				return sign + '∞';
		}
	}
}

function fromValue(obj, opts) {
	return getValue(obj.from.value, opts);
}

function delimeter(obj, opts) {
	switch (opts.format) {
		case 'default':
			return ',';
		case 'pretty':
			return ', ';
		case 'interval':
			return '..';
	}
}

function toValue(obj, opts) {
	return getValue(obj.to.value, opts);
}

function rightBrace(obj, opts) {
	if (obj.to.included) {
		return ']';
	} else {
		switch (opts.excludedEndpoints) {
			case 'parenthesis':
				return ')';
			case 'reversed':
				return '[';
		}
	}
}
