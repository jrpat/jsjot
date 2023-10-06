;(function() {

const t = Math.pow,
      r = Math.sqrt,
      e = Math.sin,
      i = Math.cos,
      u = Math.PI,
      o = 1.70158,
      c = o * 1.525,
      a = o + 1,
      f = 2 * u / 3,
      I = 2 * u / 4.5

  window.Ease = {
    linear: n => n,
    inQuad: function(n) {
      return n * n
    },
    outQuad: function(n) {
      return 1 - (1 - n) * (1 - n)
    },
    inOutQuad: function(n) {
      return n < .5 ? 2 * n * n : 1 - t(-2 * n + 2, 2) / 2
    },
    inCubic: function(n) {
      return n * n * n
    },
    outCubic: function(n) {
      return 1 - t(1 - n, 3)
    },
    inOutCubic: function(n) {
      return n < .5 ? 4 * n * n * n : 1 - t(-2 * n + 2, 3) / 2
    },
    inQuart: function(n) {
      return n * n * n * n
    },
    outQuart: function(n) {
      return 1 - t(1 - n, 4)
    },
    inOutQuart: function(n) {
      return n < .5 ? 8 * n * n * n * n : 1 - t(-2 * n + 2, 4) / 2
    },
    inQuint: function(n) {
      return n * n * n * n * n
    },
    outQuint: function(n) {
      return 1 - t(1 - n, 5)
    },
    inOutQuint: function(n) {
      return n < .5 ? 16 * n * n * n * n * n : 1 - t(-2 * n + 2, 5) / 2
    },
    inSine: function(n) {
      return 1 - i(n * u / 2)
    },
    outSine: function(n) {
      return e(n * u / 2)
    },
    inOutSine: function(n) {
      return -(i(u * n) - 1) / 2
    },
    inExpo: function(n) {
      return n === 0 ? 0 : t(2, 10 * n - 10)
    },
    outExpo: function(n) {
      return n === 1 ? 1 : 1 - t(2, -10 * n)
    },
    inOutExpo: function(n) {
      return n === 0 ? 0 : n === 1 ? 1 : n < .5 ? t(2, 20 * n - 10) / 2 : (2 - t(2, -20 * n + 10)) / 2
    },
    inCirc: function(n) {
      return 1 - r(1 - t(n, 2))
    },
    outCirc: function(n) {
      return r(1 - t(n - 1, 2))
    },
    inOutCirc: function(n) {
      return n < .5 ? (1 - r(1 - t(2 * n, 2))) / 2 : (r(1 - t(-2 * n + 2, 2)) + 1) / 2
    },
    inBack: function(n) {
      return a * n * n * n - o * n * n
    },
    outBack: function(n) {
      return 1 + a * t(n - 1, 3) + o * t(n - 1, 2)
    },
    inOutBack: function(n) {
      return n < .5 ? t(2 * n, 2) * ((c + 1) * 2 * n - c) / 2 : (t(2 * n - 2, 2) * ((c + 1) * (n * 2 - 2) + c) + 2) / 2
    },
    inElastic: function(n) {
      return n === 0 ? 0 : n === 1 ? 1 : -t(2, 10 * n - 10) * e((n * 10 - 10.75) * f)
    },
    outElastic: function(n) {
      return n === 0 ? 0 : n === 1 ? 1 : t(2, -10 * n) * e((n * 10 - .75) * f) + 1
    },
    inOutElastic: function(n) {
      return n === 0 ? 0 : n === 1 ? 1 : n < .5 ? -(t(2, 20 * n - 10) * e((20 * n - 11.125) * I)) / 2 : t(2, -20 * n + 10) * e((20 * n - 11.125) * I) / 2 + 1
    },
    inBounce: function(n) {
      return 1 - s(1 - n)
    },
    outBounce: function(n) {
      return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375
    },
    inOutBounce: function(n) {
      return n < .5 ? (1 - s(1 - 2 * n)) / 2 : (1 + s(2 * n - 1)) / 2
    }
  }

}());
