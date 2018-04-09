// pages/sign/sign.js
var app = getApp()
var t
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interviewName: '周杰伦',
    signType: [
      {
        name: '用户注册',
        checked: true
      },
      {
        name: '商户注册',
        checked: false
      }
    ],
    slider: [
      {
        img_src: '../../img/banner.png'
      },
      {
        img_src: '../../img/banner.png'
      },
      {
        img_src: '../../img/banner.png'
      },
    ],
    icon1: '../../img/shoujihao.png',
    icon2:'../../img/yanzhengma.png',
    Countdown:'获取验证码'
  },
  checkedType(e){
    var signType = this.data.signType
    var index = e.currentTarget.dataset.index
    for (var i in signType){
      signType[i].checked = false
    }
    signType[index].checked = true
    this.setData({
      signType: signType
    })
  },
  inputPhoneNum: function (e) {
    var phoneNum = e.detail.value
    this.setData({
      phoneNum: phoneNum
    })
  },
  inputCheckNum: function (e) {
    var checkNum = e.detail.value
    console.log('checkNum', checkNum)
    this.setData({
      checkNum: checkNum
    })
  },
  getCheckNum: function (e) {
    var that = this
    var phoneNum = that.data.phoneNum
    var go = function (e) {
      if (that.data.checkNumLock) {
        wx.showToast({
          title: '请稍后',
          content: '1000',
          mask: true
        })
      } else {
        var reg = /^1[3|5|7|8]\d{9}$/;
        console.log('/////', phoneNum)
        if (!phoneNum || !reg.test(phoneNum)) {
          wx.showToast({
            title: '请输入正确的手机号',
            content: '1000',
            mask: true
          })
        } else {
          that.data.checkNumLock = true
          var phone = that.data.phoneNum
          // 请求验证码

          var Countdown = '获取验证码'
          var c = 90
          console.log('c=====', c)
          var timedCount = function () {
            if (c > 0) {
              c--
              that.setData({
                Countdown: c + 's'
              })
              if (c === 0) {
                that.setData({
                  Countdown: Countdown
                })
              }
            } else {
              that.setData({
                Countdown: Countdown
              })
            }
            t = setTimeout(function () { timedCount() }, 1000)
          }
          setTimeout(function () {
            clearTimeout(t);
            that.data.checkNumLock = false;
            that.setData({
              checkNumLock: that.data.checkNumLock
            })
          }, 90000)
          timedCount()
        }
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
  },
})