// pages/address/address.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit: '../../img/address_con_edit.png',
    del: '../../img/address_con_delete.png',
    // useing: '../../img/useing.png',
    checkedImg: '../../img/moren.png',
    unCheckedImg:'../../img/unCheckedImg.png',
    address: [
      {
        add:"撒大苏打实打实的",
        areaInfo:"北京市 市辖区 东城区",
        name:"算了",
        tel:"18888888888",
        id:1,
        checked:true,
      },
      {
        add: "撒大苏打实打实的",
        areaInfo: "四川省 成都市 高新区",
        name: "老王",
        tel: "18899999999",
        id: 2,
        checked: false,
      }
    ],
    //当前默认的地址id
    nowAddressId:0,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 600)
    this.setData({
      now_address_id: wx.getStorageSync('address_id')
    })
    // this.addressList(e)

  },
  //请求地址信息
  addressList:function(e) {
    var that = this
    var address = []
    wx.request({
      url: app.globalData.rootUrl + '/info/my_address',
      data: {
        user_id: user_id
      },
      success: function (res) {
        console.log("我的地址的返回", res.data)
        console.log("user_id", user_id)
        for (var i in res.data.data.data) {
          address.push(res.data.data.data[i])
        }
        console.log('组装后的地址', address)
        wx.setStorageSync('address', address)
        that.setData({
          address: address
        })
      }
    })
  },
  //选择地址
  choose: function (e) {
    var that = this
    var go = function (e) {
      var index = e.currentTarget.dataset.index;
      //地址id
      var id = e.currentTarget.dataset.id;
      wx.setStorageSync('address_id', id);
      var address = that.data.address;
      wx.setStorageSync('now_address', address[index])

      wx.navigateBack();
    }

    var data = { go, e }
    this.clickTooFast(data)
  },
  goPage: function (e) {
    var that = this
    console.log(e.target.dataset.page)
    var go = function (e) {
      var gopage = e.target.dataset.page
      var url = "../" + gopage + "/" + gopage
      wx.navigateTo({
        url: url
      })
    }

    var data = { go, e }
    this.clickTooFast(data)
  },
  //修改地址
  editAddress: function (e) {
    var that = this
    var go = function (e) {
      var edit_id = e.target.dataset.id
      wx.setStorageSync('edit_id', edit_id)
      var address = that.data.address
      var now_edit_address
      // 获取此时编辑的地址信息
      for (var i in address) {
        if (address[i].id === edit_id) {
          now_edit_address = address[i]
          break
        }
      }
      wx.setStorageSync('now_edit_address', now_edit_address)
      wx.redirectTo({
        url: '../editAddress/editAddress'
      })
    }

    var data = { go, e }
    this.clickTooFast(data)
  },
  //删除地址
  delAddress: function (e) {

    var that = this
    var go = function(e) {
      var address_id = e.target.dataset.id
      var now_address_id = wx.getStorageSync('address_id')
      if (address_id === now_address_id) {
        wx.showToast({
          title: '使用中的地址不可删除',
          content: '1000',
        })
      } else {
        wx.showModal({
          title: '确认删除',
          content: '是否删除选中地址？',
          success: function (res) {
            if (res.confirm) {
              try {
                let extData = wx.getExtConfigSync();
                let appid = extData.authorizer_appid;
                wx.request({
                  header: {
                    'data': appid
                  },
                  url: app.globalData.rootUrl + '/info/delete_address',
                  method: "POST",
                  data: {
                    address_id: address_id
                  },
                  success(res) {
                    wx.showToast({
                      title: '删除成功',
                      duration: 1000
                    })
                    console.log('删除地址的返回字段', res.data)

                    that.addressList(e)
                  }
                })
              } catch (e) {
                console.log(e)
              }
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }

    var data = { go, e }
    this.clickTooFast(data)
  },

  /*==========
  防止快速点击
  ===========*/
  clickTooFast: function (data) {
    var lastTime = this.data.lastTime
    var curTime = data.e.timeStamp
    if (lastTime > 0) {
      if (curTime - lastTime < 1000) {
        console.log('点击太快了')
        return
      } else {
        data.go(data.e)
      }
    } else {
      data.go(data.e)
    }
    this.setData({
      lastTime: curTime
    })
  }
})