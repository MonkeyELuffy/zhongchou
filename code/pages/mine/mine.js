// pages/equipmentShare/equipmentShare.js
var hasgo = true;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topNav:[{
      value:36,
      name:'浏览'
    },{
      value:44,
      name:'关注'
    },{
      img:'../../img/msg.png',
      name:'消息'
    },{
      img:'../../img/saomiao.png',
      name:'扫一扫'
    }],
    walletDetail: [{
      value: 123.34,
      name: '账户余额'
    }, {
      value: 44.43,
      name: '红包'
      }, {
        value: 4,
        name: '优惠券'
      }],
    orderNav: [{
      img: '../../img/msg.png',
      name: '待付款'
    }, {
      img: '../../img/msg.png',
      name: '待发货'
      }, {
        img: '../../img/msg.png',
        name: '待收货'
    }, {
      img: '../../img/msg.png',
      name: '待评价'
      }, {
        img: '../../img/msg.png',
        name: '退款/售后'
      },],
    user_name:'请登录',
    avatar:'../../img/user_img.png',
    level: '会员级别',
    // 用户等级icon
    level_icon: '../../img/center/huangguan.png',
    bg: '../../img/user_bg.png',
    center_nav: [{
      icon: '../../img/center/order.png',
      name: '我的众筹',
      page: 'wodezhongchou'
    },
    {
      icon: '../../img/center/youhuiquan.png',
      name: '我的推广',
      page: 'wodetuiguang'
    },
    {
      icon: '../../img/center/jifen.png',
      name: '我的积分',
      page: 'wodejifen'
    },
    {
      icon: '../../img/center/shoucang.png',
      name: '收货地址',
      page: 'address'
    },
    {
      icon: '../../img/center/suggestion.png',
      name: '客户服务',
      page: 'help'
    },
    {
      icon: '../../img/center/help.png',
      name: '关于我们',
      page: 'about'
    },
    {
      icon: '../../img/center/erji.png',
      name: '商家入口',
      page: 'shangjiarukou'
    }],
    more: '../../img/more.png'
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    // var shouquan = wx.getStorageSync('shouquan')
    // this.setData({
    //   shouquan: shouquan
    // })
    this.setData({
      shouquan: true
    })

    // if (!shouquan) {
    //   wx.showModal({
    //     title: '提醒',
    //     content: '您尚未登录，无法使用此功能，请删除小程序之后重新授权'
    //   })
    // } else {
    //   var default_user_image = wx.getStorageSync('userInfo').avatarUrl
    //   var user_id = wx.getStorageSync('user_id');
    //   // 获取用户信息
    //   let extData = wx.getExtConfigSync();
    //   let appid = extData.authorizer_appid;
    //   wx.request({
    //     header: {
    //       'data': appid
    //     },
    //     url: app.globalData.rootUrl + '/info/my_info',
    //     data: {
    //       user_id: user_id
    //     },
    //     success: function (res) {
    //       console.log('个人中心返回数据', res.data)
    //       var userInfo = wx.getStorageSync('userInfo') || ''
    //       userInfo.level = res.data.member
    //       userInfo.user_name = res.data.user_name
    //       userInfo.avatar = default_user_image
    //       userInfo.mobile = res.data.mobile || ''
    //       wx.setStorage({
    //         key: "userInfo",
    //         data: userInfo
    //       })
    //       that.setData({
    //         user_name: userInfo.user_name,
    //         level: userInfo.level,
    //         avatar: userInfo.avatar
    //       })
    //       console.log('response:', res.data.code)
    //     }
    //   })
    //   wx.getStorage({
    //     key: 'userInfo',
    //     success: function (res) {
    //       that.setData({
    //         user_name: res.data.user_name,
    //         level: res.data.level,
    //         avatar: res.data.avatar
    //       })
    //       console.log('center show')
    //     },
    //   })
    // }
    
  },


  //页面跳转
  goPage: function (e) {
    var that = this
    var go = function(e){
      var url = e.currentTarget.dataset.page
      console.log(e)
      if (url === 'kefu') {
        wx.makePhoneCall({
          phoneNumber: '13603004836' //仅为示例，并非真实的电话号码
        })
      } else {
        url = '../' + url + '/' + url
        console.log(url)
        wx.navigateTo({
          url: url
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
  // postMessage: function() {
  //   var that = this
  //       let extData = wx.getExtConfigSync();
    // let appid = extData.authorizer_appid;
    //   wx.request({
    //      header: {
    //         'data': appid
    //     },
  //     url: 'http://zhlp.test.gobrand.top.jikeyun.net/index.php/interfaces/home/test', 
  //     method: 'POST',
  //     data: {
  //       name:'lin',
  //       sex:'male'
  //     },
  //     success: function (res) {
  //       console.log(res.data)
  //       var newName = res.data.message
  //     },
  //     fail: function() {
  //       console.log('fail')
  //     }
  //   })
  // }
})