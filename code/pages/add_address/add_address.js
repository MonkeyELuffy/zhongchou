// pages/add_address/add_address.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    list: [{
      text: '收货人',
      id: 'user',
      placeholder: '请输入收货人'
    }, {
      text: '手机号码',
      id: 'tel',
      placeholder: '请输入手机号码'
      }, {
        text: '所在地区',
        id: 'zone',
        placeholder: '请输入所在地区'
    }, {
      text: '所在地区',
      id: 'address',
      placeholder: '请输入详细地址'
    }],
    new_address: {}

  },
  //录入地址信息
  change: function (e) {
    var that = this;
    var index = e.target.dataset.index
    var new_address = this.data.new_address
    switch (index) {
      case 0:
        new_address.name = e.detail.value;
        break
      case 1:
        new_address.tel = e.detail.value;
        break
      case 2:
        new_address.add = e.detail.value;
        break
    }
    this.setData({
      new_address: new_address
    })
  },
  //新增地址
  add: function (e) {
    var that = this

    wx.showLoading({
      title: '正在添加',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 400)
    var go = function(e) {
      var new_address = that.data.new_address
      var user_id = wx.getStorageSync('user_id');
      var user_name = new_address.name;
      var address = new_address.add
      var mobile = parseInt(new_address.tel)
      var reg = /^1[3|5|7|8]\d{9}$/;
      if (!user_name || user_name === '') {
        wx.showToast({
          title: '请输入用户姓名',
          content: '600',
        })
      } else if (!mobile || !reg.test(mobile)) {
        wx.showToast({
          title: '请输入正确的手机号',
          content: '600',
        })
      } else if (!address || address === '') {
        wx.showToast({
          title: '请输入地址',
          content: '600',
        })
      } else {
        //保存新地址
        wx.getStorage({
          key: 'address',
          success: function (res) {
            console.log(res.data)
            res.data.push(new_address)
            var new_addressList = res.data
            wx.setStorageSync('address', new_addressList)

            that.submit(new_address)

          },
          fail: function () {
            console.log('不能返回地址列表')
          }
        })
      }
    }

    var data = { go, e }
    this.clickTooFast(data)
  },
  //向服务器添加地址
  submit: function (new_address) {
    var user_id = wx.getStorageSync('user_id');
    let extData = wx.getExtConfigSync();
    let appid = extData.authorizer_appid;
    wx.request({
      header: {
        'data': appid
      },
      url: app.globalData.rootUrl + '/info/insert_address',
      method: 'POST',
      data: {
        user_id: user_id,
        user_name: new_address.name,
        address: new_address.add,
        mobile: new_address.tel,
      },
      success: function (res) {
        console.log('修改地址后返回的信息：', res.data.message)
        console.log('new_address.mobile', new_address.mobile)

      },
      fail: function (res) {
        wx.showToast({
          title: '修改地址失败,请重新提交',
          content: '1000',
        })
      },
      complete: function () {
        wx.redirectTo({
          url: '../address/address'
        })
      }
    })
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