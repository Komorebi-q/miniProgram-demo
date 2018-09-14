const STATUS_STOP = 'stop';
const STATUS_RUNNING = 'running';

export class Rain {
  // particles;
  // timer;
  // ctx;
  // w;
  // h;
  // _opts;
  // status;

  constructor (ctx, width, height, options) {
    this.timer = null;
    this.ctx= ctx;
    this.w = width;
    this.h = height;
    this._opts = options;
    this.status = STATUS_STOP;

    this._init();
  }

  _init() {
    let {
      amount= 100,
      speedFactor= 0.03,
    } = this._opts;
    let w = this.w;
    let h = this.h;
    let speed = speedFactor * h;
    this.particles = [];

    for (let i = 0; i < amount; i++) {
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

  _draw() {
    let ps = this.particles;
    let ctx = this.ctx;

    ctx.clearRect(0, 0 , this.w, this.h);

    ps.forEach(p => {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
      ctx.setStrokeStyle(p.color);
      ctx.stroke();
    });

    ctx.draw();

    return this._update();
  }

  run() {
    if (this.status !== STATUS_RUNNING) {
      this.status = STATUS_RUNNING;

      this.timer = setInterval(() => {
        this._draw();
      }, 30);
    }

    return this;
  }

  _update() {
    const {
      w,
      h
    } = this;

    for (let ps = this.particles, i = 0; i < ps.length; i++) {
      // 开始下一个周期的位置计算
      let s = ps[i]
      s.x += s.xs
      s.y += s.ys
      // 超出范围，重新回收，重复利用
      if (s.x > w || s.y > h) {
        s.x = Math.random() * w
        s.y = -10
      }
    }
  }

  stop() {
    this.status = STATUS_STOP;
    clearInterval(this.timer);

    return this;
  }

  clear() {
    this.stop();
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.draw();
    return this;
  }
};

export class Snow {
  // particles;
  // timer;
  // w;
  // h;
  // ctx;
  // _tops;
  // status;

  constructor(ctx, w, h, opts) {
    this.timer = null;
    this.ctx= ctx;
    this.w = w;
    this.h = h;
    this._opts = opts;
    this.status = STATUS_STOP;

    this._init();
  }

  _init() {
    let {
      w, 
      h,
      _opts,
      particles
    } = this;

    const {
      amount= 100,
      colors= ['#ccc', '#eee', '#fff', '#ddd'],
      speedFactor= 0.3,
      radius= 2
    } = _opts;

    const speed = speedFactor * 0.15 * h;
    this.particles = [];

    for (let i = 0; i < amount; i++) {
      let x = Math.random() * w;
      let y = Math.random() * h;

      this.particles.push({
        x,
        y,
        ox: x,
        ys: Math.random() + speed,
        r: Math.floor(Math.random() * (radius + 0.5) + 0.5),
        color: colors[Math.floor(Math.random() * colors.length)],
        rs: Math.random() * 80
      });
    }

  }

  run() {
    if (this.status !== STATUS_RUNNING) {
      this.status = STATUS_RUNNING;

      this.timer = setInterval(() => {
        this._draw();
      }, 30);
    }

    return this;
  }

  _draw() {
    let {
      particles,
      ctx
    } = this;

    ctx.clearRect(0, 0, this.w, this.h)

    particles.forEach(p => {
      let {
        x,
        y,
        r,
        color
      } = p;

      ctx.beginPath();
      ctx.arc(x, y, r, Math.PI * 2, false);
      ctx.setFillStyle(color);
      ctx.fill();
      ctx.closePath();
    });

    ctx.draw();
    this._update()
  }

  _update() {
    let {
      w,
      h, 
      particles
    } = this
    const v = this._opts.speedFactor / 10

    particles = particles.map(p => {
      let {
        ox,
        ys
      } = p;

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

  stop() {
    this.status = STATUS_STOP;
    clearInterval(this.timer);

    return this;
  }

  clear() {
    this.stop();
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.draw();
    return this;
  }
};

