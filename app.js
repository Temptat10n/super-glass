//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    wx.getUserInfo({
                        success: function(ress) {
                            wx.request({
                                url: 'https://yj.beaconway.cn//user',
                                data: {
                                    code: res.code,
                                    nick: ress.userInfo.nickName,
                                    avaurl: ress.userInfo.avatarUrl,
                                    sex: ress.userInfo.gender
                                },
                                success: function(res) {
                                    // 将用户ID存入本地
                                    wx.setStorage({
                                        key: 'userId',
                                        data: res.data.res.id,
                                    })
                                    // 从本地获取用户ID
                                    // wx.getStorage({
                                    //     key: 'userId',
                                    //     success: function(res) {
                                    //         console.log("+++++++" + JSON.stringify(res.data))
                                    //     },
                                    // })
                                }
                            })
                        }
                    })
                }
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    setShopCartData:function(){
        wx.getStorage({
            key: 'userId',
            success: function (res) {
                // userId = String(res.data)
                var userId = res.data
                // 从本地获取用户ID
                if (userId) {
                    wx.getStorage({
                        key: 'shopCartData',
                        success: function (res) {
                            var pro = JSON.stringify(res.data);
                            // 将当前商品加入购物车
                            wx.request({
                                url: 'https://yj.beaconway.cn/shopcate/',
                                // url: 'https://yj.beaconway.cn/shopcate444/',
                                data: {
                                    user_id: userId,
                                    pro: pro
                                },
                                method: "POST",
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                                },
                                success: function (res) {
                                    var commodityData = res.data.res;
                                    /**
                                     * 加入购物车不用每次加入都操作数据库
                                     * 可以先将商品数据存入本地
                                     * 然后当小程序退出时再将商品数据一次加入至数据库
                                     */
                                    if (res.data.code == 200) {
                                        console.log("============加入购物车成功================")
                                        // wx.switchTab({
                                        //     url: '/pages/shop/shop?commodityId=' + this.data.commodityId,
                                        // })
                                    } else {
                                        console.log("============加入购物车失败================")
                                    }
                                }
                            })
                        },
                    })
                }
                

            },
        })
    },
    globalData: {
        userInfo: null
    }
})