// pages/user/order/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressId: "请确认",
        address: "请确认",
        addressName:"请确认",
        addressPhone:"请确认"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options) {
            this.setData({
                addressId: options.addressId,// 地址ID
                address: options.address, // 地址内容（详细地址）
                addressName: options.name, // 收件人
                addressPhone: options.phone // 收件人电话
            })
        }
        
        var that = this;
        var getCommodityInfo = function (commodityId) {
            // 请求商品信息
            wx.request({
                url: 'https://yj.beaconway.cn/proinfo/' + commodityId,
                success: function (res) {
                    var commodityData = res.data.res;
                    if (res.data.code == 200) {
                        that.setData({
                            commodityId: commodityData.id, // 商品ID
                            commodityTitle: commodityData.title, // 商品名称
                            commodityPrice: commodityData.price, // 商品价格
                            commodityImg: commodityData.img, // 商品图片展示
                            commodityContent: commodityData.content, // 商品详情
                            commodityIs_new: commodityData.is_new // 这个我也不知道，暂时用不到
                        })
                    }
                }
            })
        }
        var commodityId = options.commodityId;
        // 获取订单页商品ID
        if (!commodityId) {
            wx.getStorage({
                key: 'commodityId',
                success: function (res) {
                    // console.log("+++commodityId++++" + JSON.stringify(res.data))
                    commodityId = res.data
                    getCommodityInfo(commodityId);
                }
            })
        } else {
            getCommodityInfo(commodityId);
        }
        
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})