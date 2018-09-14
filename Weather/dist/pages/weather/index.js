'use strict';

var _qqMap = require('./../../lib/qq.map.min');

var _qqMap2 = _interopRequireDefault(_qqMap);

var _effect = require('./../../lib/effect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var qqMapSdk = void 0;
Page({
  data: {
    backgroundImage: '../../images/cloud.jpg',
    backgroundColor: '#62aadc',
    address: '北京海淀区',
    tips: '天气还不错~',
    air: {
      "status": 0,
      "aqi": "77",
      "color": "#00cf9a",
      "name": "良"
    },
    current: {
      "backgroundImage": "https://tianqi-1d3bf9.tcb.qcloud.la/bg/day/overcast.jpg",
      "backgroundColor": "#5c7a93",
      "temp": "35",
      "wind": "南风",
      "windLevel": "1",
      "weather": "阴",
      "humidity": "73",
      "icon": "yin",
      "ts": "2018-08-12 14:54"
    },
    today: {
      "temp": "24/30°",
      "icon": "leizhenyu",
      "weather": "雷阵雨"
    },
    tomorrow: {
      "temp": "24/30°",
      "icon": "leizhenyu",
      "weather": "雷阵雨"
    },
    // 24小时天气数据
    hourlyData: [{
      "temp": "29",
      "time": "16:00",
      "weather": "雷阵雨",
      "icon": "leizhenyu"
    }],
    // 一周天气数据
    weeklyData: [{
      "day": "雷阵雨",
      "dayIcon": "leizhenyu",
      "dayWind": "南风",
      "dayWindLevel": "1-2",
      "maxTemp": "30",
      "minTemp": "24",
      "night": "中雨",
      "nightIcon": "zhenyuye",
      "nightWind": "南风",
      "nightWindLevel": "1-2",
      "time": 1534032000000
      // ...
    }],
    // 生活指数
    lifeStyle: [{
      "name": "舒适度", // 指数名称
      "icon": "guominzhishu", // 指数对应的icon图标type
      "info": "较不舒适", // 指数数值
      // 指数的详情
      "detail": "白天虽然有雨，但仍无法削弱较高气温带来的暑意，同时降雨造成湿度加大会您感到有些闷热，不很舒适。"
      // ...
    }]
  },
  onLoad: function onLoad(query) {
    var _this = this;

    wx.getSystemInfo({
      success: function success(res) {
        console.log(res.statusBarHeight, res.windowWidth);
        _this.setData({
          paddingTop: res.statusBarHeight + 12,
          scale: res.windowWidth / 375,
          width: res.windowWidth
        });
      }
    });
    qqMapSdk = new _qqMap2.default({
      key: '6LLBZ-CE5EW-4RVR6-O6B2Q-BDRZT-NUFAC'
    });
  },
  onReady: function onReady() {
    var canvasId = 'effect';
    var ctx = wx.createCanvasContext(canvasId);
    var _data = this.data,
        width = _data.width,
        scale = _data.scale;

    var h = 768 / 2 * scale;
    var rain = new _effect.Snow(ctx, width, h, {
      amount: 100,
      speedFactor: 0.03
    });
    rain.run();
  },
  onShow: function onShow() {
    var _this2 = this;

    wx.getLocation({
      type: 'wgs84',
      success: function success(res) {
        qqMapSdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function success(addressRes) {
            var address = addressRes.result.formatted_addresses.recommend;
            _this2.setData({
              address: address
            });
          }
        });
      }
    });
  }
});
//# sourceMappingURL=index.js.map
