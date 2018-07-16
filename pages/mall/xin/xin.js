// 新款
Page({
  data: {
    // 导航
    _num: 3,
    // 导航
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
    var num = 3;
    // 导航显示
    wx.request({
      url: 'https://yj.beaconway.cn/cate',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          nav: res.data.res,
        })
        res.data.res;
      }
    })
    //  商品展示
    wx.request({
      url: 'https://yj.beaconway.cn/pro/' + num,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          zhihu: res.data.res,
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
    // 男款
    wx.switchTab({
      url: '../../mall/mall',
    })
  },
  menuClick2: function () {
    // 女款
    wx.redirectTo({
      url: '../../mall/nv/nv',
    })
  },
  menuClick3: function () {
    // 新款
    wx.redirectTo({
      url: '../../mall/xin/xin',
    })
  },
  menuClick4: function () {
    // 原创
    wx.redirectTo({
      url: '../../mall/yuan/yuan',
    })
  },
  menuClick5: function () {
    // 明星同款
    wx.redirectTo({
      url: '../../mall/tong/tong',
    })
  }


})
















// Page({
//   data: {
//     // tab切换  
//     currentTab: 0,
//   },
//   swichNav: function (e) {
//     var that = this;
//     if (this.data.currentTab === e.target.dataset.current) {
//       return false;
//     } else {
//       that.setData({
//         currentTab: e.target.dataset.current,
//       })
//     }
//   },
//   swiperChange: function (e) {
//     this.setData({
//       currentTab: e.detail.current,
//     })

//   },
//   onLoad: function (options) {
//     // 生命周期函数--监听页面加载
//   },
//   onReady: function () {
//     // 生命周期函数--监听页面初次渲染完成
//   },
//   onShow: function () {
//     // 生命周期函数--监听页面显示
//   },
//   onHide: function () {
//     // 生命周期函数--监听页面隐藏
//   },
//   onUnload: function () {
//     // 生命周期函数--监听页面卸载
//   },
//   onPullDownRefresh: function () {
//     // 页面相关事件处理函数--监听用户下拉动作
//   },
//   onReachBottom: function () {
//     // 页面上拉触底事件的处理函数
//   },
//   onShareAppMessage: function () {
//     // 用户点击右上角分享
//     return {
//       title: 'title', // 分享标题
//       desc: 'desc', // 分享描述
//       path: 'path' // 分享路径
//     }
//   }
// })





