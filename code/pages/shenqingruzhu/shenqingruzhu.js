// pages/shenqingruzhu/shenqingruzhu.js
var util = require('../../utils/util.js');
var basic = require('../../utils/basic.js');
var app = getApp()
Page({
  data: {
    nowType: { trade_id: null},
    ident_img: '../../img/banner.png',
    license_img: '../../img/banner.png',
    store_img: '../../img/banner.png',
    more: '../../img/more.png',
    icon1: '../../img/xingming.png',
    icon2: '../../img/yanzheng.png', 
    icon3: '../../img/dengdai.png', 
    icon4: '../../img/phone.png', 
    hiddenSuccess:true,
    seller_name: '',
    linkman: '',
    ident_card:'',
    telNum:'027-32442522',
  },
  onLoad() {
    // 地址数据可以提前获取
    this.setData({
      longitude: app.globalData.firstLongitude,
      latitude: app.globalData.firstLatitude,
      address: app.globalData.firstAddress,
      store_fixed: app.globalData.firstLongitude + ',' + app.globalData.firstLatitude
    })
  },
  onShow() {
    var that = this
    // onShow的时候获取nowType,销毁页面之后清除nowType
    var nowType = wx.getStorage({
      key: 'nowType',
      success: function(res) {
        console.log('nowType',res)
        that.setData({
          nowType:res.data
        })
      },
    })
  },
  input: function (e) {
    var val = e.detail.value
    switch (e.currentTarget.dataset.inputname) {
      // 店铺名称
      case 'seller_name':
        this.setData({
          seller_name: val
        });
        break;
      // 管理员姓名
      case 'linkman':
        this.setData({
          linkman: val
        });
        break;
      // 手机号
      case 'mobile':
        this.setData({
          mobile: val
        });
        break;
      // 管理员身份证
      case 'ident_card':
        this.setData({
          ident_card: val
        });
        break;
    }
  },
  // 选择行业
  chooseType(e){
    var that = this
    basic.goPage('chooseType',that,e)
  },
  // 点击提交时的表单验证
  submit(e) {
    var that = this
    var params = {
      seller_name: that.data.seller_name,
      trade_id: that.data.nowType.trade_id,
      linkman: that.data.linkman,
      ident_card: that.data.ident_card,
      mobile: that.data.mobile,
      address: that.data.address,
      store_fixed: that.data.store_fixed,
      ident_img: that.data.ident_img,
      license_img: that.data.license_img,
      store_img: that.data.store_img,
      member_id: app.globalData.member_id
    }
    console.log('params',params)
    var go = function (e) { 
      if (!basic.checkNull(params.seller_name)) {
        wx.showToast({
          title: '请输入店铺名称',
          content: '600',
        })
      } else if (params.trade_id == null || !(params.trade_id.length > 0)) {
        wx.showToast({
          title: '请选择行业',
          content: '600',
        })
      } else if (!basic.checkNull(params.linkman)) {
        wx.showToast({
          title: '请输入管理员姓名',
          content: '600',
        })
      } else if (!basic.checkedPhone(params.mobile)) {
        wx.showToast({
          title: '请输入正确的手机号',
          content: '600',
        })
      } else if (!basic.checkCard(params.ident_card)) {
        wx.showToast({
          title: '请输入正确的身份证号',
          content: '600',
        })
      } else if (!params.ident_img.includes('http') || !params.license_img.includes('http') || !params.store_img.includes('http')) {
        wx.showToast({
          title: '请选择图片',
          content: '600',
        })
      } else {
        // 一切数据都准备好之后，提交数据
        that.submitAllData(params)
      }
    }
    var data = { go, e }
    this.clickTooFast(data)
  },
  submitAllData(params){
    var that = this
    wx.showLoading({
      title: '正在提交',
      mask: true
    })
    // 需要上传的图片数据
    var imgData = [
      {
        url: app.globalUrl + app.UploadImg,
        path: params.ident_img
      },
      {
        url: app.globalUrl + app.UploadImg,
        path: params.license_img
      },
      {
        url: app.globalUrl + app.UploadImg,
        path: params.store_img
      }
    ]
    util.UpLoadImgs(imgData)
      .then(function (res) {
        console.log('图片全都上传完了', res)
        that.submitAfterUploadImg(res, params)
      })
  },
  // 图片上传之后再提交表单
  submitAfterUploadImg(res, params){
    // 重组三个需要上传的图片数据
    params.ident_img = JSON.parse(res[0]).data.file.image_id
    params.license_img = JSON.parse(res[1]).data.file.image_id
    params.store_img = JSON.parse(res[2]).data.file.image_id
    util.httpPost(app.globalUrl + app.Apply, params, this.processData);
  },
  processData(res) {
    if (res.suc == 'y') {
      wx.hideLoading()
      this.setData({
        hiddenSuccess: false
      })
    } else {
      wx.showToast({
        title: res.msg,
      })
    }
  },
  // 返回上一页
  onUnload(){
    // 清除缓存的nowType数据
    wx.removeStorage({
      key: 'nowType',
    })
  },
  // 选择图片
  chooseImg(e) {
    //这里是选取图片的方法
    var that = this;
    var go = function (e) {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          switch (e.currentTarget.dataset.imgname) {
            //身份证图片
            case 'ident_img':
              that.setData({
                ident_img: res.tempFilePaths[0]
              });
              break;
            //执照图片
            case 'license_img':
              that.setData({
                license_img: res.tempFilePaths[0]
              });
              break;
            //商铺图片
            case 'store_img':
              that.setData({
                store_img: res.tempFilePaths[0]
              });
              break;
          }
        },
      })
    }
    var data = { go, e }
    this.clickTooFast(data)
  },
  // 选择地址
  chooseAddress(e){
    var that = this
    wx.chooseLocation({
      success: function(res) {
        console.log('address',res)
        that.setData({
          store_fixed: res.longitude + ',' + res.latitude,
          address: res.address,
          longitude: res.longitude,
          latitude: res.latitude,
        })
      },
    })
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