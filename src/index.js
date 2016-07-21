
import element from 'magic-virtual-element';
import moment from 'moment';


const timers = {};

const defaultProps = {
  title: 'LLLL'
}

function afterMount({ props, id }, el, setState) {
  const { refresh } = props;

  if (refresh) {
    const handler = () => setState({});
    timers[id] = setInterval(handler, refresh);
  }
}

export function render({ props, state }) {
  const datetime = moment(props.datetime);
  const title = props.title ? datetime.format(props.title) : false;
  return (
    <time class={props.class} datetime={datetime.toISOString()} title={title}>
      {display(datetime, props)}
    </time>
  );
}

function beforeUnmount({ id }) {
  if (id in timers) {
    clearInterval(timers[id]);
    delete timers[id];
  }
}

export default { defaultProps, afterMount, render, beforeUnmount };


function display(datetime, { format, from, to, calendar }) {
  if (format) {
    return datetime.format(format);
  } else if (from) {
    return from === 'now' ? datetime.fromNow() : datetime.from(from);
  } else if (to) {
    return to === 'now' ? datetime.toNow() : datetime.to(to);
  } else if (calendar) {
    return datetime.calendar(calendar !== 'now' ? calendar : undefined);
  } else {
    return datetime.toISOString();
  }
}
