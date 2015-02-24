'use strict';

var assert = require('assert');
var format = require('./');

var infinityInterval = { from: { value: -Infinity, included: true  }, to: { value: Infinity, included: false } };
var oneValueInterval = { from: { value: Math.PI,   included: true  }, to: { value: Math.PI,  included: true  } };
var commonInterval   = { from: { value: -42,       included: false }, to: { value: +42,      included: true  } };

describe('Formatter shoul correctly working with', function () {

	it('default options', function () {
		assert.equal('[-Infinity,Infinity)', format(infinityInterval));
		assert.equal('[3.142]', format(oneValueInterval));
		assert.equal('(-42,42]', format(commonInterval));
	});

	it('custom format: pretty', function() {
		assert.equal('[-Infinity, Infinity)', format(infinityInterval, { format: 'pretty' }));
		assert.equal('{3.142}', format(oneValueInterval, { format: 'pretty' }));
		assert.equal('(-42, 42]', format(commonInterval, { format: 'pretty' }));
	});

	it('custom format: interval', function() {
		assert.equal('[-Infinity..Infinity)', format(infinityInterval, { format: 'interval' }));
		assert.equal('{3.142}', format(oneValueInterval, { format: 'interval' }));
		assert.equal('(-42..42]', format(commonInterval, { format: 'interval' }));
	});

	it('custom excludedEndpoints: reversed', function() {
		assert.equal('[-Infinity,Infinity[', format(infinityInterval, { excludedEndpoints: 'reversed' }));
		assert.equal('[3.142]', format(oneValueInterval, { excludedEndpoints: 'reversed' }));
		assert.equal(']-42,42]', format(commonInterval, { excludedEndpoints: 'reversed' }));
	});

	it('custom infiniteEndpoints: none', function() {
		assert.equal('[,)', format(infinityInterval, { infiniteEndpoints: 'none' }));
		assert.equal('[3.142]', format(oneValueInterval, { infiniteEndpoints: 'none' }));
		assert.equal('(-42,42]', format(commonInterval, { infiniteEndpoints: 'none' }));
	});

	it('custom infiniteEndpoints: math', function() {
		assert.equal('[-∞,∞)', format(infinityInterval, { infiniteEndpoints: 'math' }));
		assert.equal('[3.142]', format(oneValueInterval, { infiniteEndpoints: 'math' }));
		assert.equal('(-42,42]', format(commonInterval, { infiniteEndpoints: 'math' }));
	});

	it('custom number format: ', function () {
		assert.equal('[-Infinity,+Infinity)', format(infinityInterval, { numberFormat: '+0.0000' }));
		assert.equal('[+3.1416]', format(oneValueInterval, { numberFormat: '+0.0000' }));
		assert.equal('(-42.0000,+42.0000]', format(commonInterval, { numberFormat: '+0.0000' }));
	});

});
