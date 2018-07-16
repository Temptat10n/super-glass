var app = getApp();
Page({

    data: {
        // 导航
        _num: 1,
        // 导航  
        name: [

        ]

    },
    onLoad: function(options) {
        var that = this;
        // 从本地获取用户ID
        wx.getStorage({
            key: 'userId',
            success: function (res) {
                var userId = res.data
                // 获取所有订单信息
                var getData = JSON.stringify({ "user_id": userId, "blei": 1})
                wx.request({
                    url: 'https://yj.beaconway.cn/order/' + getData,
                    method: "GET",
                    success: function (res) {
                        let orderInfoAll = res.data.res
                        for (let i = 0; i < orderInfoAll.length; i++) {
                            if (orderInfoAll[i].is_delete == 0) {
                                orderInfoAll[i].is_delete = "交易中  "
                            } else if (orderInfoAll[i].is_delete == 1) {
                                orderInfoAll[i].is_delete = "取消    "
                            } else if (orderInfoAll[i].is_delete == 2) {
                                orderInfoAll[i].is_delete = "完成    "
                            } else {
                                orderInfoAll[i].is_delete = "暂无    "
                            }
                        }
                        that.setData({
                            orderInfoAll: orderInfoAll,
                        })
                    }
                })
            },
        })
    },
    menuClick: function(e) {
        this.setData({
            _num: e.target.dataset.num
        })
    },
    deleteOrder: function(e) {
        const id = e.currentTarget.dataset.id;
        var _that = this
        let orderInfoAll = this.data.orderInfoAll;
        wx.request({
            url: 'https://yj.beaconway.cn/order/'+id,
            method: "DELETE",
            success: function (res) {
                if (res.data.code == 200) {
                    for (let i in orderInfoAll) {
                        // 循环本地数据
                        // 如果当前点击的商品ID和存储的数据相同
                        if (id == orderInfoAll[i].id) {
                            // 则删除当前项
                            orderInfoAll.splice(i, 1)
                            _that.setData({
                                orderInfoAll: orderInfoAll,
                            })
                        }
                    }
                }
            }
        })
    }
})
















// Page({
//   data: {
//     // tab切换  
//     currentTab: 0,
//   },
//   swichNav: function (e) {
//     console.log(e);
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
//     console.log(e);
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