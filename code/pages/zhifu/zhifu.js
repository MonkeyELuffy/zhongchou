// pages/zhifu/zhifu.js
const util = require('../../utils/util.js');
const bannerTemp = require('../../utils/bannerTemp.js');
const zhongchouItem = require('../../utils/zhongchouItem.js');
const loadListData = require('../../utils/loadListData.js');
const basic = require('../../utils/basic.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopName:'千户石锅拌饭',
    seller_id:'',
    icon:'../../img/shangjia2.png',
    youhuiNum:10,
    finalNum:69,
  },

  input(e) {
    var amount = e.detail.value
    this.setData({
      amount: amount
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
      var seller_name= options.seller_name;
      var seller_id =options.seller_id;
      this.setData({
        shopName: seller_name,
        seller_id:seller_id
      });    
  },

  pay: function (e) {
    console.log(1);
    var that = this;
      wx.showLoading({
        title: '支付中',
      })
      var data = {
        member_id: app.globalData.member_id,
        amount: this.data.amount,
        body: app.globalData.userInfo.nickname + '买单'
      }
      // 调用支付接口
      util.httpPost(app.globalUrl + 'Payment/prompt', data, that.processPayData);
  },
  //处理支付结果
  processPayData: function (res) {
    var that=this;
    console.log(res);
    if (res.suc == 'y') {
      console.log(res);
        // 微信支付
        that.wxPay(res)
    } else {
      wx.hideLoading();
      wx.showToast({
        title: res.msg,
      })
    }
  },
  // 调用微信支付
  wxPay(res) {
    var that = this;
    wx.requestPayment({
      timeStamp: res.data.timeStamp.toString(),
      nonceStr: res.data.nonceStr,
      package: res.data.package,
      signType: res.data.signType,
      paySign: res.data.paySign,
      success: function (msg) {
        if (msg.errMsg == 'requestPayment:ok') {
          wx.hideLoading();
          util.showTip('支付成功');
          that.setData({
            showSuccess: true
          })
        }
      },
      fail: function (err) {
        util.showTip('支付失败');
        wx.hideLoading();
      }
    });
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
  
  }
})