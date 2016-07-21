
import assert from './utils/assert';
import element from 'virtual-element';
import isostring from 'isostring';
import Mock from 'component-mock';
import { mount } from './utils';
import moment from 'moment';
import Time from '../src';

describe('<Time />', function () {
  const mock = Mock(Time);

  it('should return a <time> element', function () {
    const node = mock.render();
    assert.node.isNode(node, 'time');
  });

  it('should include a datetime attribute', function () {
    const node = mock.render();
    assert.node.hasAttribute(node, 'datetime', function (value) {
      assert.isTrue(isostring(value));
    });
  });

  it('should include a title attribute', function () {
    const node = mock.render();
    assert.node.hasAttribute(node, 'title');
  });

  context('with props', function () {
    describe('class', function () {
      it('should add the class to the <time> element', function () {
        const props = { class: 'a' };
        const node = mock.render({ props });
        assert.node.hasClass(node, 'a');
      });

      it('should support the advanced features of magic-virtual-element', function () {
        const props = { class: { a: true } };
        const node = mock.render({ props });
        assert.node.hasClass(node, 'a');
      });
    });

    describe('calendar', function () {
      it('should use calendar timing from moment to render body of <time> element', function () {
        const datetime = new Date(2016, 6, 20, 11, 44, 5);
        const calendar = 'now';
        const props = { datetime, calendar };
        const node = mock.render({ props });
        assert.node.hasChildren(node, moment(datetime).calendar());
      });

      it('should support using an anchor time instead of just now', function () {
        const datetime = new Date(2016, 6, 20, 11, 44, 5);
        const calendar = new Date(2017);
        const props = { datetime, calendar };
        const node = mock.render({ props });
        assert.node.hasChildren(node, moment(datetime).calendar(calendar));
      });
    });

    describe('datetime', function () {
      it('should use the given date during render', function () {
        const datetime = new Date(2016, 6, 20, 11, 44, 5);
        const props = { datetime };
        const node = mock.render({ props });
        assert.node.hasChildren(node, moment(datetime).toISOString());
        assert.node.hasAttribute(node, 'datetime', moment(datetime).toISOString());
        assert.node.hasAttribute(node, 'title', moment(datetime).format('LLLL'));
      });
    });

    describe('format', function () {
      it('should format the date according to the string format in moment', function () {
        const datetime = new Date(2016, 6, 20, 11, 44, 5);
        const format = 'llll';
        const props = { datetime, format };
        const node = mock.render({ props });
        assert.node.hasChildren(node, moment(datetime).format(format));
      });
    });

    describe('from', function () {
      it('should use relative timing from moment to render body of <time> element', function () {
        const datetime = new Date(2016, 6, 20, 11, 44, 5);
        const from = 'now';
        const props = { datetime, from };
        const node = mock.render({ props });
        assert.node.hasChildren(node, moment(datetime).fromNow());
      });

      it('should support using an anchor time instead of just now', function () {
        const datetime = new Date(2016, 6, 20, 11, 44, 5);
        const from = new Date(2017);
        const props = { datetime, from };
        const node = mock.render({ props });
        assert.node.hasChildren(node, moment(datetime).from(from));
      });
    });

    describe('refresh', function () {
      it('should update the content on the refresh interval', function (done) {
        const datetime = moment().subtract(44, 'seconds').toDate();

        const app = mount(<Time datetime={datetime} from="now" refresh={100} />);
        assert.strictEqual(app.element.querySelector('time').innerHTML, 'a few seconds ago');
        setTimeout(() => {
          assert.strictEqual(app.element.querySelector('time').innerHTML, 'a minute ago');
          done();
        }, 750);
      });
    });

    describe('title', function () {
      it('should exclude the attribute if explicitly disabled', function () {
        const props = { title: false };
        const node = mock.render({ props });
        assert.node.hasAttribute(node, 'title', false);
      });
    });

    describe('to', function () {
      it('should use relative timing from moment to render body of <time> element', function () {
        const datetime = new Date(2016, 6, 20, 11, 44, 5);
        const to = 'now';
        const props = { datetime, to };
        const node = mock.render({ props });
        assert.node.hasChildren(node, moment(datetime).toNow());
      });

      it('should support using an anchor time instead of just now', function () {
        const datetime = new Date(2016, 6, 20, 11, 44, 5);
        const to = new Date(2017);
        const props = { datetime, to };
        const node = mock.render({ props });
        assert.node.hasChildren(node, moment(datetime).to(to));
      });
    });
  });
});
