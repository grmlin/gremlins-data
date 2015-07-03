'use strict';

var gremlins = require('gremlins'),
	gremlinsData = require('../../index');

describe('gremlinjs-data', function () {

	it('augments gremlin instances', function (done) {
		var complex = {
			foo: 'bar',
			deep: {
				foo: 'bar'
			}
		};

		gremlins.create('data-gremlin', {
			mixins: [gremlinsData],
			initialize() {
				try {
					expect(this.data).to.be.an('object');

					expect(this.data).to.have.property('string');
					expect(this.data.string).to.be('foo');

					expect(this.data).to.have.property('number');
					expect(this.data.number).to.be(42);

					expect(this.data).to.have.property('yes');
					expect(this.data.yes).to.be.ok();

					expect(this.data).to.have.property('no');
					expect(this.data.no).not.to.be.ok();

					expect(this.data).to.have.property('object');
					expect(this.data.object).to.eql(complex);

					expect(this.data).to.have.property('withLongName');
					expect(this.data.withLongName).to.be('foo');
					done();
				} catch (e) {
					done(e);
				}
			}
		});

		var el = document.createElement('data-gremlin');
		el.setAttribute('data-string', 'foo');
		el.setAttribute('data-number', '42');
		el.setAttribute('data-yes', 'true');
		el.setAttribute('data-no', 'false');
		el.setAttribute('data-object', JSON.stringify(complex));
		el.setAttribute('data-with-long-name', 'foo');
		document.body.appendChild(el);
	});


});
