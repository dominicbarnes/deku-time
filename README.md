# deku-time

> A component for rendering a datetime using an HTML5 `<time>` element. It supports just about any
> display format supported by [moment](http://momentjs.com) as well as auto-updating on a set interval.

[![npm version](https://img.shields.io/npm/v/deku-time.svg)](https://www.npmjs.com/package/deku-time)
[![npm dependencies](https://img.shields.io/david/dominicbarnes/deku-time.svg)](https://david-dm.org/dominicbarnes/deku-time)
[![npm dev dependencies](https://img.shields.io/david/dev/dominicbarnes/deku-time.svg)](https://david-dm.org/dominicbarnes/deku-time#info=devDependencies)
[![build status](https://img.shields.io/travis/dominicbarnes/deku-time.svg)](https://travis-ci.org/dominicbarnes/deku-time)

## Example

```html
<Time datetime="now" format="LLLL" />
<Time datetime={createdAt} from="now" refresh="1s" />
<Time datetime={createdAt} calendar="now" />
```

## Attributes

### datetime

This determines the date/time to display. Anything accepted by moment is supported, and the value "now"
is treated as a special case. (by excluding the attribute altogether, "now" is assumed)

### format

If passed, this will render the `datetime` using `format()`.

### from

If passed, this will render the `datetime` using `from(date)`. (anything accepted by moment is supported)
The value "now" is treated as a special case. (and will use `fromNow()` instead)

### to

If passed, this will render the `datetime` using `to(date)`. (anything accepted by moment is supported)
The value "now" is treated as a special case. (and will use `toNow()` instead)

### calendar

If passed, this will render the `datetime` using `calendar(date)`. (anything accepted by moment is supported)
The value "now" is treated as a special case.

### refresh

If passed, the component will auto-update on the given interval. Generally, this is useful when displaying
relative times so that the displayed value doesn't become stale.

### class

Used to extend the `<time>` element with your own CSS hooks. (passed to [magic-virtual-element](https://www.npmjs.com/package/magic-virtual-element))
