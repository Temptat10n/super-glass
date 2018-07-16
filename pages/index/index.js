var app = getApp();
Page({
  data: {
    // 导航
    _num: 0,
    // 导航
    // 轮播
    duration: 1000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    //  轮播
    // 商品展示
    // shang: [
    //   {
    //     src: "",
    //     name: "太阳镜",
    //     jia: "￥299"
    //   }
    // ],
  },
  //  商品展示
  onLoad: function () {
    var that = this
    // 导航
    var num = 0;

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
        // 商品
        // var num = 0;
        wx.request({
          url: 'https://yj.beaconway.cn/pro/0',
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res.data.res)
            if (res.data.res == null) {
              return
            }
            that.setData({
              zhihu: res.data.res, 
            })
          }
        })
        // 轮播
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
    
  },

  menuClick: function (e) {
    this.setData({
      _num: e.target.dataset.num
    })
  },
  menuClick1: function () {
    wx.redirectTo({
      url: "./boy/boy",
    })
  },
  menuClick2: function () {
    wx.redirectTo({
      url: "./girl/girl",
    })
  },
  menuClick3: function () {
    wx.redirectTo({
      url: "./new/new",
    })
  },
  menuClick4: function () {
    wx.redirectTo({
      url: "./yuan/yuan",
    })
  },
  menuClick5: function () {
    wx.redirectTo({
      url: "./star/star",
    })
  }

})




















