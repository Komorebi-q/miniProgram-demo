const express = require('express');
const path = require('path');
const { PORT } = require('./../project.server.json');
const app = express();

const test = require('./cloud-functions/test').main;

// 添加static
app.use(
  '/static',
  express.static(path.join(__dirname, 'static'), {
    index: false,
    maxage: '30d'
  })
);

app.get('/api/test', (req, res, next) => {
  // 将 req.query 传入
  test(req.query).then(res.json.bind(res)).catch((e) => {
    console.error(e)
    next(e)
  })
  // next()
});

app.listen(PORT, () => {
  console.log(`开发服务器启动成功：http://127.0.0.1:${PORT}`);
});
