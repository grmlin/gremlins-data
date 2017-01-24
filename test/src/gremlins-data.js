'use strict';

var gremlins = require('gremlins'),
  gremlinsData = require('../../lib/index');

describe('gremlinjs-data', function () {

  it('it reads data attributes', function (done) {
    var complex = {
      foo: 'bar',
      deep: {
        foo: 'bar'
      }
    };

    gremlins.create('data-gremlin', {
      mixins: [ gremlinsData ],
      attached() {
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

          expect(this.data).to.have.property('obj');
          expect(this.data.obj).to.eql(complex);

          expect(this.data).to.have.property('withLongName');
          expect(this.data.withLongName).to.be('foo');
          done();
        } catch (e) {
          done(e);
        }
      }
    });

    var container = document.createElement('div');
    container.innerHTML = `
		<data-gremlin
			data-string="foo"
			data-number="42"
			data-yes="true"
			data-no="false"
			data-obj='${JSON.stringify(complex)}'
			data-with-long-name="foo"
		>
		</data-gremlin>
		`;
    document.body.appendChild(container);
  });

  it('it reads normal attributes', function (done) {
    var complex = {
      foo: 'bar',
      deep: {
        foo: 'bar'
      }
    };

    gremlins.create('data-gremlin-2', {
      mixins: [ gremlinsData ],
      attached() {
        try {
          expect(this.props).to.be.an('object');

          expect(this.props).to.have.property('string');
          expect(this.props.string).to.be('foo');

          expect(this.props).to.have.property('number');
          expect(this.props.number).to.be(42);

          expect(this.props).to.have.property('yes');
          expect(this.props.yes).to.be.ok();

          expect(this.props).to.have.property('no');
          expect(this.props.no).not.to.be.ok();

          expect(this.props).to.have.property('obj');
          expect(this.props.obj).to.eql(complex);

          expect(this.props).to.have.property('withLongName');
          expect(this.props.withLongName).to.be('foo');
          done();
        } catch (e) {
          done(e);
        }
      }
    });

    var el = document.createElement('data-gremlin-2');
    el.setAttribute('string', 'foo');
    el.setAttribute('number', '42');
    el.setAttribute('yes', 'true');
    el.setAttribute('no', 'false');
    el.setAttribute('obj', JSON.stringify(complex));
    el.setAttribute('with-long-name', 'foo');
    document.body.appendChild(el);
  })

});
