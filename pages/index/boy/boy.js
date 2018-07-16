Page({
  data: {
    // 导航
    _num: 1,
    // 导航
    // 轮播
    duration: 1000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
  },
  //  轮播
  // 轮播
  onLoad: function () {
    var that = this;
    var num = 0;
    wx.request({
      url: 'https://yj.beaconway.cn/banner',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.res)
        that.setData({
          lun: res.data.res,
        })
      }
    })
     // 商品
    // 次接口暂无数据
    wx.request({
      url: 'https://yj.beaconway.cn/pro/1',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          commodity: res.data.res,
        })
      }
    })
  //  导航 
    wx.request({
      url: 'https://yj.beaconway.cn/cate',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          nav: res.data.res,
        })
      }
    })

  },
 
  menuClick: function (e) {
    this.setData({
      _num: e.target.dataset.num
    })
  }, 
  menuClick: function () {
    wx.switchTab({
      url: '../../index/index',
    })
  },
  menuClick1: function () {
    wx.redirectTo({
      url: '../boy/boy',
    })
  },
  menuClick2: function () {
    wx.redirectTo({
      url: '../girl/girl',
    })
  },
  menuClick3: function () {
    wx.redirectTo({
      url: '../new/new',
    })
  },
  menuClick4: function () {
    wx.redirectTo({
      url: '../yuan/yuan',
    })
  },
  menuClick5: function () {
    wx.redirectTo({
      url: '../star/star',
    })
  }
})