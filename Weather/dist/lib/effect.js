'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STATUS_STOP = 'stop';
var STATUS_RUNNING = 'running';

var Rain = exports.Rain = function () {
  // particles;
  // timer;
  // ctx;
  // w;
  // h;
  // _opts;
  // status;
  function Rain(ctx, width, height, options) {
    _classCallCheck(this, Rain);

    this.timer = null;
    this.ctx = ctx;
    this.w = width;
    this.h = height;
    this._opts = options;
    this.status = STATUS_STOP;
    this._init();
  }

  _createClass(Rain, [{
    key: '_init',
    value: function _init() {
      var _opts2 = this._opts,
          _opts2$amount = _opts2.amount,
          amount = _opts2$amount === undefined ? 100 : _opts2$amount,
          _opts2$speedFactor = _opts2.speedFactor,
          speedFactor = _opts2$speedFactor === undefined ? 0.03 : _opts2$speedFactor;

      var w = this.w;
      var h = this.h;
      var speed = speedFactor * h;
      this.particles = [];
      for (var i = 0; i < amount; i++) {
        this.particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          l: 2 * Math.random(),
          xs: -1,
          ys: 10 * Math.random() + speed,
          color: 'rgba(255, 255, 255, 0.1)'
        });
      }
    }
  }, {
    key: '_draw',
    value: function _draw() {
      var ps = this.particles;
      var ctx = this.ctx;
      ctx.clearRect(0, 0, this.w, this.h);
      ps.forEach(function (p) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        ctx.setStrokeStyle(p.color);
        ctx.stroke();
      });
      ctx.draw();
      return this._update();
    }
  }, {
    key: 'run',
    value: function run() {
      var _this = this;

      if (this.status !== STATUS_RUNNING) {
        this.status = STATUS_RUNNING;
        this.timer = setInterval(function () {
          _this._draw();
        }, 30);
      }
      return this;
    }
  }, {
    key: '_update',
    value: function _update() {
      var w = this.w,
          h = this.h;

      for (var ps = this.particles, i = 0; i < ps.length; i++) {
        // 开始下一个周期的位置计算
        var s = ps[i];
        s.x += s.xs;
        s.y += s.ys;
        // 超出范围，重新回收，重复利用
        if (s.x > w || s.y > h) {
          s.x = Math.random() * w;
          s.y = -10;
        }
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.status = STATUS_STOP;
      clearInterval(this.timer);
      return this;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.stop();
      this.ctx.clearRect(0, 0, this.w, this.h);
      this.ctx.draw();
      return this;
    }
  }]);

  return Rain;
}();

;

var Snow = exports.Snow = function () {
  // particles;
  // timer;
  // w;
  // h;
  // ctx;
  // _tops;
  // status;
  function Snow(ctx, w, h, opts) {
    _classCallCheck(this, Snow);

    this.timer = null;
    this.ctx = ctx;
    this.w = w;
    this.h = h;
    this._opts = opts;
    this.status = STATUS_STOP;
    this._init();
  }

  _createClass(Snow, [{
    key: '_init',
    value: function _init() {
      var w = this.w,
          h = this.h,
          _opts = this._opts,
          particles = this.particles;
      var _opts$amount = _opts.amount,
          amount = _opts$amount === undefined ? 100 : _opts$amount,
          _opts$colors = _opts.colors,
          colors = _opts$colors === undefined ? ['#ccc', '#eee', '#fff', '#ddd'] : _opts$colors,
          _opts$speedFactor = _opts.speedFactor,
          speedFactor = _opts$speedFactor === undefined ? 0.3 : _opts$speedFactor,
          _opts$radius = _opts.radius,
          radius = _opts$radius === undefined ? 2 : _opts$radius;

      var speed = speedFactor * 0.15 * h;
      this.particles = [];
      for (var i = 0; i < amount; i++) {
        var x = Math.random() * w;
        var y = Math.random() * h;
        this.particles.push({
          x: x,
          y: y,
          ox: x,
          ys: Math.random() + speed,
          r: Math.floor(Math.random() * (radius + 0.5) + 0.5),
          color: colors[Math.floor(Math.random() * colors.length)],
          rs: Math.random() * 80
        });
      }
    }
  }, {
    key: 'run',
    value: function run() {
      var _this2 = this;

      if (this.status !== STATUS_RUNNING) {
        this.status = STATUS_RUNNING;
        this.timer = setInterval(function () {
          _this2._draw();
        }, 30);
      }
      return this;
    }
  }, {
    key: '_draw',
    value: function _draw() {
      var particles = this.particles,
          ctx = this.ctx;

      ctx.clearRect(0, 0, this.w, this.h);
      particles.forEach(function (p) {
        var x = p.x,
            y = p.y,
            r = p.r,
            color = p.color;

        ctx.beginPath();
        ctx.arc(x, y, r, Math.PI * 2, false);
        ctx.setFillStyle(color);
        ctx.fill();
        ctx.closePath();
      });
      ctx.draw();
      this._update();
    }
  }, {
    key: '_update',
    value: function _update() {
      var w = this.w,
          h = this.h,
          particles = this.particles;

      var v = this._opts.speedFactor / 10;
      particles = particles.map(function (p) {
        var ox = p.ox,
            ys = p.ys;

        p.rs += v;
        p.x = ox + Math.cos(p.rs) * w / 2;
        p.y += ys;
        if (p.x > w || p.y > h) {
          p.x = Math.random() * w;
          p.y = -10;
        }
        return p;
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.status = STATUS_STOP;
      clearInterval(this.timer);
      return this;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.stop();
      this.ctx.clearRect(0, 0, this.w, this.h);
      this.ctx.draw();
      return this;
    }
  }]);

  return Snow;
}();

;
//# sourceMappingURL=effect.js.map
