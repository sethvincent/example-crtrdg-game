# aabb-2d

Axis aligned bounding boxes for fun and profit.

[![browser support](http://ci.testling.com/chrisdickinson/aabb-2d.png)](http://ci.testling.com/chrisdickinson/aabb-2d)

```javascript
var aabb = require('aabb-2d')

var bounding_box = aabb([0, 0], [12, 12])   // x, y == 0, 0; width, height == 12, 12
  , other = aabb([10, 10], [2, 2])

bounding_box.intersects(other) // true
bounding_box.union(other) // -> aabb([10, 10], [2, 2])

bounding_box.translate([2, 2])  // moves the bounding box
bounding_box.expand(other)  // returns a new aabb that surrounds both bboxes

```

# API

### aabb = [new ]aabb([x, y], [w, h])

returns a new aabb.

### aabb.perimeter() -> Number

returns the perimeter length of the box.

### aabb.intperimeter() -> Integer

returns the integer perimeter length of the box (using a bit shift instead of a multiply.) 

### aabb.area() -> Number

returns the area of the box.

### aabb.width() -> Number
### aabb.height() -> Number
### aabb.x0()
### aabb.y0()
### aabb.x1()
### aabb.y1()

returns:

```
    x0/y1 ------ x1/y1
      |           |
      |           | <-- height
      |           |
      |           |
    x0/y0 ------ x1/y0
            ^
            |
          width
```

### aabb.translate([x, y])

moves the box. returns itself.

### aabb.intersects(aabb) -> Boolean

returns true if the two bounding boxes intersect (or touch at all.)

### aabb.union(aabb) -> new aabb or null

returns a new `aabb` representing the shared area of the
two aabb's. returns `null` if the boxes don't intersect.

# License

MIT

