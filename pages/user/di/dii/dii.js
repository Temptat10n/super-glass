// pages/index/wd/wd.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // 收货地址列表显示
        wx.getStorage({
            key: 'userId',
            method: "DELETE",
            success: function (res) {
                wx.request({
                    url: 'https://yj.beaconway.cn/address/' + res.data,
                    success: function (res) {
                        if (res.data.code == 200) {
                            that.setData({
                                addressList: res.data.res,
                            })
                        }
                    }
                })
            },
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    deleteRess: function (e) {
        // 获取收货地址ID
        const ressId = e.currentTarget.dataset.id;
        var _that = this
        // 获取当前所有收货地址数据
        let ressInfoAll = this.data.addressList;
        // 删除收货地址请求
        wx.request({
            url: 'https://yj.beaconway.cn/address/' + ressId,
            method: "DELETE",
            success: function (res) {
                // 如果删除成功
                if (res.data.code == 200) {
                    for (let i in ressInfoAll) {
                        // 循环本地数据
                        // 如果当前点击的地址ID和存储的数据相同
                        if (ressId == ressInfoAll[i].id) {
                            // 则删除当前项
                            ressInfoAll.splice(i, 1)
                            // 更新数据
                            _that.setData({
                                addressList: ressInfoAll,
                            })
                        }
                    }
                }
            }
        })
    }
})