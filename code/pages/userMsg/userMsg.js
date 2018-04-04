// pages/personCenter/personCenter.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [{
      key: '更换头像',
      value: '',
      image: 'img/about.png',
      can_change: true
    }, {
      key: '修改昵称',
      value: '张三',
      can_change: false
    }, {
      key: '绑定手机号',
      value: '18200298897',
      can_change: false
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户头像
    var that = this
    var userImg
    var userInfo = this.data.userInfo;

    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        userInfo[0]["image"] = res.data.avatar
        userInfo[1]["value"] = res.data.user_name
        userInfo[2]["value"] = res.data.mobile
        userInfo[3]["value"] = res.data.level
        that.setData({
          userInfo: userInfo
        })
      }
    })
  },


  // 修改手机号和昵称
  changeNameAndMobil: function (e) {
    var that = this;
    var index = e.target.dataset.index
    var userInfo = this.data.userInfo
    userInfo[index].value = e.detail.value
  },
  //点击确认，返回上界面
  sure: function (e) {
    var that = this
    var go = function (e) {
      var user_id = wx.getStorageSync('user_id');
      var user_name = that.data.userInfo[1].value
      var mobile = that.data.userInfo[2].value
      var avatar = that.data.userInfo[0].image
      var reg = /^1[3|5|7|8]\d{9}$/;
      if (!mobile || !reg.test(mobile)) {
        wx.showToast({
          title: '请输入正确的手机号',
          content: '1000',
        })

      } else {
        var userInfo = wx.getStorage({
          key: 'userInfo',
          success: function (res) {
            res.data.avatar = avatar
            res.data.user_name = user_name
            res.data.mobile = mobile
            console.log(user_name, mobile, avatar)
            var new_userInfo = res.data
            wx.setStorage({
              key: 'userInfo',
              data: new_userInfo,
            })
            wx.navigateBack();
          },
        })
        let extData = wx.getExtConfigSync();
        let appid = extData.authorizer_appid;
        wx.request({
          header: {
            'data': appid
          },
          url: app.globalData.rootUrl + '/info/update_info',
          data: {
            user_id: user_id,
            user_name: user_name,
            mobile: mobile,
            // avatar: avatar,
          },
          success: function (res) {
            console.log('response:', res.data.code)
            console.log('response:', res.data.message)
          }
        })
      }
    }

    var data = { go, e }
    this.clickTooFast(data)
  },
  //修改头像
  changeImg: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          'userInfo[0].image': tempFilePaths
        })
        // wx.uploadFile({
        //   url: app.globalData.rootUrl + '/info/update_name',
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success: function (res) {
        //     var data = res.data
        //     console.log('修改头像之后的res：', tempFilePaths[0])
        //     that.setData({
        //       'userInfo[0].image': tempFilePaths[0]
        //     })

        //     var userInfo = wx.getStorageSync("userInfo")
        //     userInfo.avatar = tempFilePaths[0]
        //     wx.setStorage({
        //       key: "userInfo",
        //       data: userInfo
        //     })
        //     //do something
        //   }
        // })
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