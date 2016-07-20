
import element from 'virtual-element';
import { render, tree } from 'deku';
import moment from 'moment';
import * as Time from '..';

const load = moment();
const past = moment().subtract(3, 'days');
const future = moment().add(3, 'days');

let app = tree(
  <ol>
    <li><Time /></li>
    <li><Time format="LLLL" /></li>
    <li><Time datetime={past} from="now" /></li>
    <li><Time datetime={past} to="now" /></li>
    <li><Time calendar="now" datetime={future} /></li>
    <li><Time datetime={load} from="now" refresh={1000} /></li>
  </ol>
);
render(app, document.querySelector('main'));
