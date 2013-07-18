var test = require('tape')
  , aabb = require('./index')
  , glmatrix = require('gl-matrix')
  , vec2 = glmatrix.vec2

if(typeof Float32Array === 'undefined') {

}

function random(n) {
  return Math.random() * (n || 10) + 1
}

function randint(n) {
  return ~~random(n)
}

function eps(x, y) {
  return Math.abs(x - y) < 10e-5
}

test('perimeter works', function(t) {
  var w = random()
    , h = random()
    , b = aabb([0, 0], [w, h])
    , c = aabb([0, 0], [~~w, ~~h])

  t.equals(b.perimeter(), 2 * (w + h), 'perimeter should equal 2 * (w + h)')
  t.equals(c.intperimeter(), 2 * (~~w + ~~h), 'intperimeter should equal 2 * (~~w + ~~h)')
  t.end()
})

test('dimensions works', function(t) {
  var w = random()
    , h = random()
    , x = random()
    , y = random()
    , b = aabb([x, y], [w, h])

  t.equals(b.width(), w, 'width() === w')
  t.equals(b.height(), h, 'height() === h')
  t.equals(b.x0(), x, 'x0() === x')
  t.equals(b.y0(), y, 'y0() === y')
  t.ok(eps(b.x1(), x + w), 'x1() === x + w')
  t.ok(eps(b.y1(), y + h), 'y1() === y + h')
  t.end()
})

test('translate works', function(t) {
  var w = random()
    , h = random()
    , b = aabb([0, 0], [w, h])
    , tx = random()
    , ty = random()

  t.equals(b.x0(), 0, 'x0 == 0')
  t.equals(b.y0(), 0, 'y0 == 0')
  t.ok(eps(b.x1(), w), 'x1 == w')
  t.ok(eps(b.y1(), h), 'y1 == h')

  b.translate([tx, ty])

  t.ok(eps(b.x0(), tx), 'x0 == tx')
  t.ok(eps(b.x1(), tx + w), 'x1 == tx + w')
  t.ok(eps(b.y0(), ty), 'y0 == ty')
  t.ok(eps(b.y1(), ty + h), 'y1 == ty + h')
  t.end()
})

test('expand works', function(t) {
  var b0 = aabb([0, 0], [10, 10])
    , b1 = aabb([-5, -5], [2, 2])
    , b2 

  b2 = b0.expand(b1)

  t.ok(eps(b2.y1(), b0.y1()), 'outer y bound is 10')
  t.ok(eps(b2.x1(), b0.x1()), 'outer x bound is 10')
  t.ok(eps(b2.x0(), b1.x0()), 'inner x bound is -5')
  t.ok(eps(b2.y0(), b1.y0()), 'inner y bound is -5')

  t.end()
})

test('intersects works', function(t) {
  var b0 = aabb([10, 10], [10, 10])
    , b1 = aabb([0, 0], [2, 2])

  t.equals(b0.intersects(b1), false, 'should not intersect (either axis)')

  b1 = aabb([0, 0], [20, 2])
  t.equals(b0.intersects(b1), false, 'should not intersect (x intersects)')

  b1 = aabb([0, 0], [2, 20])
  t.equals(b0.intersects(b1), false, 'should not intersect (y intersects)')
  
  b1 = aabb([21, 20], [20, 20])
  t.equals(b0.intersects(b1), false, 'should not intersect (y intersects base)')
  
  b1 = aabb([20, 21], [20, 20])
  t.equals(b0.intersects(b1), false, 'should not intersect (x intersects base)')

  b1 = aabb([20, 20], [20, 20])
  t.equals(b0.intersects(b1), true, 'should intersect (b0 touches b1)')

  b1 = aabb([12, 12], [4, 4])
  t.equals(b0.intersects(b1), true, 'should intersect (b0 contains b1)')

  t.end()
})

test('union works', function(t) {
  var b0 = aabb([10, 10], [10, 10])
    , b1 = aabb([0, 0], [2, 2])
    , b2

  t.equals(b0.union(b1), null, 'should not union (either axis)')

  b1 = aabb([0, 0], [20, 2])
  t.equals(b0.union(b1), null, 'should not union (x intersects)')

  b1 = aabb([0, 0], [2, 20])
  t.equals(b0.union(b1), null, 'should not union (y intersects)')
  
  b1 = aabb([21, 20], [20, 20])
  t.equals(b0.union(b1), null, 'should not union (y intersects base)')
  
  b1 = aabb([20, 21], [20, 20])
  t.equals(b0.union(b1), null, 'should not union (x intersects base)')

  b1 = aabb([20, 20], [20, 20])
  b2 = b0.union(b1)

  t.ok(eps(b2.x0(), 20), 'x0 === 20')
  t.ok(eps(b2.y0(), 20), 'y0 === 20')
  t.ok(eps(b2.x1(), 20), 'x1 === 20')
  t.ok(eps(b2.y1(), 20), 'y1 === 20')

  b1 = aabb([12, 12], [4, 4])
  b2 = b0.union(b1)
  t.ok(eps(b2.x0(), 12), 'x0 === 12')
  t.ok(eps(b2.y0(), 12), 'y0 === 12')
  t.ok(eps(b2.x1(), 16), 'x1 === 16')
  t.ok(eps(b2.y1(), 16), 'y1 === 16')

  t.end()
})
