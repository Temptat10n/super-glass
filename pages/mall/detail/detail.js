// 获取APP函数，用于调用app.js中封装的函数
var app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');
Page({
    data: {
        indicatorDots: true, //是否显示面板指示点
        autoplay: true, //是否自动切换
        interval: 3000, //自动切换时间间隔,3s
        duration: 1000, // 滑动动画时长1s
        setCar:"加入购物车"
    },
    onLoad: function(potions) {
        // 将商品ID填入data
        this.setData({
            commodityId: potions.commodityId
        })
        var that = this;
        var commodityId = that.data.commodityId
        // 将当前商品ID存入本地
        wx.setStorage({
            key: 'commodityId',
            data: commodityId
        })
        // 请求商品详细信息
        wx.request({
            url: 'https://yj.beaconway.cn/proinfo/' + commodityId,
            success: function(res) {
                var commodityData = res.data.res;
                if (res.data.code == 200) {
                    var conter = commodityData.content;
                    that.setData({
                        commodityId: commodityData.id,
                        commodityTitle: commodityData.title,
                        commodityPrice: commodityData.price,
                        commodityOPrice: commodityData.oprice,
                        commodityImg: commodityData.img,
                        // commodityContent: commodityData.content,
                        commodityIs_new: commodityData.is_new
                    })
                    WxParse.wxParse('article', 'html', commodityData.content, that, 5);
                }
            }
        })
    },

    go_shop: function() {
        var that = this;
        var commodityId = this.data.commodityId;
        // 从本地获取用户ID
        wx.getStorage({
            key: 'userId',
            success: function(res) {
                // userId = String(res.data)
                var userId = res.data
                // 获取现有是购物车列表
                wx.request({
                    url: 'https://yj.beaconway.cn/shopcate/' + userId,
                    success: function (res) {
                        if (res.data.code == 200) {
                            var shopCartData = res.data.res
                            // 微信小程序中eval()函数不可用，所以以下方法不可实现JSON数组新增项
                            // 如果购物车列表不为空
                            if (shopCartData) {
                                var newShopCartData = []
                                // 将原有列表数据生成新的数据
                                for (var i = 0; i < shopCartData.length; i++) {
                                    newShopCartData[i] = { "id": shopCartData[i].id, "num": shopCartData[i].num }
                                }
                                // 将原有购物车列表数据转为字符串
                                shopCartData = JSON.stringify(newShopCartData)
                                // 将原有数据和新增部分结合为新的数据（配合后端接口，原有数据格式不匹配）
                                shopCartData = shopCartData.split("]")[0] + ",{ \"id\": " + commodityId + ", \"num\": 1 }]"
                                
                            } else {
                                // 购物车列表为空时
                                shopCartData = "[{\"id\": " + commodityId + ", \"num\": 1 }]"
                            }
                            // 将JSON数组字符串转为JSON对象
                            shopCartData = JSON.parse(shopCartData)
                            if (res.data.res) {
                                // 将现有购物车数据存入本地
                                wx.setStorage({
                                    key: 'shopCartData',
                                    data: shopCartData,
                                })
                                that.setData({
                                    setCar: "已成功加入",
                                })
                            }
                        } else {
                            console.log("============购物车列表加载失败================")
                        }
                    }
                })
                
            },
        }) 
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        // 调用app.js中封装的函数，app在该文件顶部声明
        // 函数功能：向服务器提交购物车列表数据
        app.setShopCartData()
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        // 离开商品详情页时，执行请求，需要加入校验，可在函数内部校验，用于公用
        app.setShopCartData()
    },
    go_order: function() {
        wx.navigateTo({
            url: '/pages/user/order/detail/detail?commodityId=' + this.data.commodityId,
        })
    }

})