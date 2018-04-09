// pages/shenqingruzhu/shenqingruzhu.js
var util = require('../../utils/util.js');
var basic = require('../../utils/basic.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowAddr:'湖北省武汉市武汉火车站666号',
    nowType:'旅游业',
    img1:'../../img/banner.png',
    img2:'../../img/banner.png',
    more:'../../img/more.png',
    icon1: '../../img/xingming.png',
    icon2: '../../img/yanzheng.png', 
    icon3: '../../img/dengdai.png', 
    hiddenSuccess:false,
    shopName: '',
    adminName: '',
    adminCard:'',
    telNum:'027-32442522'
  },
  // 店铺名称
  shopName: function (e) {
    this.setData({
      shopName: e.detail.value
    })
  },
  // 管理员项目
  adminName(e){
    this.setData({
      adminName: e.detail.value
    })
  },
  // 管理员身份证
  adminCard(e) {
    this.setData({
      adminCard: e.detail.value
    })
  },
  chooseType(e){
    var that = this
    basic.goPage('chooseType',that,e)
  },
  submit(e) {
    var that = this
    var go = function (e) {
      var shopName = that.data.shopName
      var adminName = that.data.adminName
      var adminCard = that.data.adminCard
      if (!basic.checkNull(shopName)) {
        wx.showToast({
          title: '请输入店铺名称',
          content: '600',
        })
      } else if (!basic.checkNull(adminName)) {
        wx.showToast({
          title: '请输入管理员姓名',
          content: '600',
        })
      } else if (!basic.checkCard(adminCard)) {
        wx.showToast({
          title: '请输入正确的身份证号',
          content: '600',
        })
      } else {
        wx.showLoading({
          title: '正在提交',
          mask:true
        })
        setTimeout(function(){
          wx.hideLoading()
          // 页面设置为不可滚动
          that.setData({
            hiddenSuccess: false
          })
        },2000)
      }
    }
    var data = { go, e }
    this.clickTooFast(data)
  },
  processData(res) {
    if (res.suc == 'y') {
    } else {
      wx.showToast({
        title: res.msg,
      })
    }
  },
  /*==========
  防止快速点击
  ===========*/
  clickTooFast: function (data) {
    var lastTime = this.data.lastTime
    var curTime = data.e.timeStamp
    if (lastTime > 0) {
      // 此页面设置为100000，实现“点击之后就不能再点击的效果”
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
  },
})