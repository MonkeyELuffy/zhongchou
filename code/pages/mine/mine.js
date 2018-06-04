var app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    more: '../../img/more.png',
    topNav: [
      {
        value: '0',
        name: '浏览',
        page: 'liulanjilu'
      },
      {
        value: '0',
        name: '关注',
        page: 'wodeguanzhu'
      },
      {
        img: '../../img/center/xiaoxi.png',
        name: '消息',
        page: 'msgCenter'
      },
      {
        img: '../../img/center/saoyisao.png',
        name: '扫一扫'
      },
    ],
    orderNav: [
      {
        name: '待付款',
        type: 1,
        img: '../../img/center/daifahuo.png',
      }, {
        name: '待收货',
        type: 2,
        img: '../../img/center/daishouhuo.png',
      }, {
        name: '待评价',
        type: 3,
        img: '../../img/center/daifukuan.png',
      }, {
        name: '已完成',
        type: 4,
        img: '../../img/center/daipingjia.png',
      }
    ],
    mineNav: [
      {
        img: '../../img/center/zhongcou.png',
        name: '我的U份',
        page: 'wodezhongchou'
      },
      {
        img: '../../img/center/wode_xiaoxi.png',
        name: '我的推广',
        page: 'yaoqinghaoyou'
      },
      {
        img: '../../img/center/jifen.png',
        name: '我的积分',
        page: 'wodejifen'
      },
      {
        img: '../../img/center/wode_dizhi.png',
        name: '收货地址',
        page: 'address'
      },
      {
        img: '../../img/center/wode_kefu.png',
        name: '客户服务',
        page: 'kehufuwu'
      },
      {
        img: '../../img/center/wode_guanyu.png',
        name: '关于我们',
        page: 'about'
      },
      {
        img: '../../img/center/wode_liulan.png',
        name: '商家入口',
        page: 'shangjiarukou'
      },
      {
        img: '../../img/center/wode_liulan.png',
        name: '设置',
        page: 'userMsg'
      }
    ],
    user_name:'请登录',
    avatar:'../../img/user_img.png',
  },
  onShow: function () {
    util.httpPost(app.globalUrl + app.GetUserInfoByMemberId, { member_id: app.globalData.member_id }, this.processUserlData);
  },
  processUserlData: function (res) {
    if (res.suc == 'y') {
      console.log('个人信息数据', res.data); 
      var topNav = this.data.topNav
      topNav[0].value = res.data.glance_number
      topNav[1].value = res.data.through_number
      this.setData({
        userInfo: res.data,
        topNav: topNav
      })
    }
  },
  saoyisao: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })
  },
  //页面跳转
  goPage: function (e) {
    var that = this
    var go = function(e){
      var url = e.currentTarget.dataset.page
      if (url == 'saoyisao'){
        that.saoyisao()
      } else if (url == 'userMsg'){
        url = '../' + url + '/' + url
        wx.navigateTo({
          url: url + '?params=' + JSON.stringify(that.data.userInfo)
        })
      } else {
        url = '../' + url + '/' + url
        wx.navigateTo({
          url: url
        })
      }
    }
    var data = { go, e }
    this.clickTooFast(data)
  },
  // 点击订单管理
  goOrder(e){
    var that = this
    var go = function (e) {
      var item = e.currentTarget.dataset.item
      wx.setStorageSync('nowOrderType', item.type)
      wx.switchTab({
        url: '../order/order'
      })
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