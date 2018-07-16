const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: ''
        })
    },
    onLoad: function() {
        console.log(wx.canIUse('button.open-type.getUserInfo'));
        console.log("==========app.globalData.userInfo=============" + app.globalData.userInfo)
        // console.log("==========res.userInfo=============" + res.userInfo)
        // console.log("==========res.userInfo=============" + res.userInfo)
        if (app.globalData.userInfo) {
            console.log("==========app.globalData.userInfo=============" + app.globalData.userInfo)
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            app.userInfoReadyCallback = res => {
                console.log("==========res.userInfo=============" + res.userInfo)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    console.log("==========res.userInfo=============" + res.userInfo)
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function(e) {
        console.log("=============e.detail.userInfo================---------" + JSON.stringify(e.detail.userInfo))
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    mapShowClick: function() {
        // 地图显示点击事件
        var that = this
        wx.openLocation({ //出发wx.openLocation API
            latitude: 39.9919600000, //坐标纬度（从地图获取坐标）
            longitude: 116.3392400000, //坐标经度（从地图获取坐标）
            name: "久川睛匠", //打开后显示的地址名称
            address: "北京市海淀区成府路28号3层301-21号　" //地址
        })
    }
})