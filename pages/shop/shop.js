// pages/shop/shop.js

// 获取APP函数，用于调用app.js中封装的函数
var app = getApp();
Page({

    /*
     * 页面的初始数据
     */
    data: {
        carts: [], // 购物车列表
        hasList: false, // 列表是否有数据
        totalPrice: 0.00 // 总价，初始为0
        // selectAllStatus: true // 全选状态，默认全选
    },
    getTotalPrice(options) {
        let carts = this.data.carts; // 获取购物车列表
        let total = 0;
        for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
            if (carts[i].selected) { // 判断选中才会计算价格
                total += carts[i].num * carts[i].price; // 所有价格加起来
            }
        }
        this.setData({ // 最后赋值到data中渲染到页面
            carts: carts,
            totalPrice: total.toFixed(2)
        });
    },
    onShow() {
        // this.setData({
        //     hasList: true, // 既然有数据了，那设为true吧
        //     carts: [{
        //             id: 1,
        //             title: '太阳镜',
        //             image: '/img/mall_jpg1.jpg',
        //             num: 0,
        //             price: 100.00,
        //             selected: true
        //         },
        //         {
        //             id: 2,
        //             title: '明星同款眼镜明星同款眼镜明星同款眼镜明星同款眼镜',
        //             image: '/img/mall_jpg1.jpg',
        //             num: 1,
        //             price: 200.00,
        //             selected: true
        //         }
        //     ]
        // });
        // this.getTotalPrice();

        
    },

    onLoad: function(options) {
        // 函数功能：向服务器提交购物车列表数据{存在延迟问题，可用同步执行解决}
        app.setShopCartData()
        var that = this;
        // 获取userID
        wx.getStorage({
            key: 'userId',
            success: function (res) {
                var userId = res.data
                // 获取购物车列表
                wx.request({
                    url: 'https://yj.beaconway.cn/shopcate/' + userId,
                    success: function (res) {
                        
                        if (res.data.code == 200) {
                            if (res.data.res) {
                                
                                that.setData({
                                    // hasList: true, // 既然有数据了，那设为true吧
                                    carts: res.data.res
                                });
                                that.getTotalPrice();
                            }
                        } else {
                            console.log("============购物车列表加载失败================")
                        }
                    }
                })
            },
        })
    },
    selectList(e) {
        const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
        let carts = this.data.carts; // 获取购物车列表
        const selected = carts[index].selected; // 获取当前商品的选中状态
        carts[index].selected = !selected; // 改变状态
        this.setData({
            carts: carts
        });
        this.getTotalPrice(); // 重新获取总价
    },
    selectAll(e) {
        let selectAllStatus = this.data.selectAllStatus; // 是否全选状态
        selectAllStatus = !selectAllStatus;
        let carts = this.data.carts;

        for (let i = 0; i < carts.length; i++) {
            carts[i].selected = selectAllStatus; // 改变所有商品状态
        }
        this.setData({
            selectAllStatus: selectAllStatus,
            carts: carts
        });
        this.getTotalPrice(); // 重新获取总价
    },
    // 增加数量
    addCount(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        let num = carts[index].num;
        num = num + 1;
        carts[index].num = num;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },
    // 减少数量
    minusCount(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        let num = carts[index].num;
        if (num <= 1) {
            return false;
        }
        num = num - 1;
        carts[index].num = num;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },
    deleteList(e) {
        // 获取点击位置的信息（X,Y,等等）
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        carts.splice(index, 1); // 删除购物车列表里这个商品
        let deletecommodityId = carts[index].id
        this.setData({
            carts: carts
        });
        if (!carts.length) { // 如果购物车为空
            this.setData({
                hasList: false // 修改标识为false，显示购物车为空页面
            });
        } else { // 如果不为空
            this.getTotalPrice(); // 重新计算总价格
        }
        wx.getStorage({
            key: 'shopCartData',
            success: function (res) {
                // 获取本地存储的购物车数据
                let pro = res.data;
                for (let i in pro) {
                    // 循环本地数据
                    // 如果当前点击的商品ID和存储的数据相同
                    if (deletecommodityId == pro[i].id) {
                        // 则删除当前项
                        pro.splice(i, 1) 
                        // 将删除后的JSON数组存入本地，等待想后端传送
                        wx.setStorage({
                            key: 'shopCartData',
                            data: pro
                        })
                        // return作用：只删除一条，防止多删
                        return
                    }
                }
            },
        })
    },
    go_payment: function(e) {
        wx.navigateTo({
            url: '/pages/user/order/detail/detail',
        })
    }

})