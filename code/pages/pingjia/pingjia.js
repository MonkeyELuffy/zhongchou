// pages/valuation/valuation.js

var app = getApp();
var imgsrc = []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lock_submit: false,
    lock: false,
    pics: [],
    normalSrc: 'img/normal.png',
    selectedSrc: 'img/selected.png',
    pingjiaList: [{
      checked: false,
      name: '好评',
      img: '../../img/haoping.png'
    }, {
      checked: false,
      name: '中评',
      img: '../../img/zhongping.png'
      }, {
        checked: false,
        name: '差评',
        img: '../../img/chaping.png'
      },],

    pingjia_goods: {
      img:'../../img/test.png',
      name:'小米机器人小米机器人小米机器人小米机器人',
      goods_price:'12.34',
      num:'2'
    },
    add: '../../img/add_image.png'

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
    // var pingjia_goods = wx.getStorageSync('pingjia_goods')
    // pingjia_goods.image = app.globalData.imgUrl + '/' + pingjia_goods.image
    // this.setData({
    //   pingjia_goods: pingjia_goods
    // })
  },

  /* ===设备质量评分=== */
  selectRightOne: function (e) {
    var keyOne = e.currentTarget.dataset.keyone
    if (this.data.keyOne === e.currentTarget.dataset.keyone) {
      //点击最后一颗星星则为0
      keyOne = 0;
    }
    console.log("设备质量得" + keyOne + "分")
    this.setData({
      keyOne: keyOne
    })

  },
  /* ===配送速度评分=== */
  selectRightTwo: function (e) {
    var keyTwo = e.currentTarget.dataset.keytwo
    if (this.data.keyTwo === e.currentTarget.dataset.keytwo) {
      //点击最后一颗星星则为0
      keyTwo = 0;
    }
    console.log("配送速度得" + keyTwo + "分")
    this.setData({
      keyTwo: keyTwo
    })
  },
  /* ===服务态度评分=== */
  selectRightThree: function (e) {
    var keyThree = e.currentTarget.dataset.keythree
    if (this.data.keyThree === e.currentTarget.dataset.keythree) {
      //点击最后一颗星星则为0
      keyThree = 0;
    }
    console.log("服务态度得" + keyThree + "分")
    this.setData({
      keyThree: keyThree
    })
  },
  // 提交评价
  submit: function (e) {


    var that = this
    var go = function (e) {
      var user_id = wx.getStorageSync('user_id')
      var pics = that.data.pics;
      var goods_id = wx.getStorageSync('pingjia_goods_id')
      var ordersn = wx.getStorageSync('pingjia_ordersn')
      var now_ordersn = wx.getStorageSync('now_ordersn')
      if (that.data.keyOne === 0 || (that.data.keyTwo === 0 || that.data.keyThree === 0)) {
        wx.showToast({
          title: '请输入评分',
          content: '1000'
        })
      } else if (!that.data.content || that.data.content === '') {
        wx.showToast({
          title: '请输入评价',
          content: '1000'
        })
      } else {
        if (that.data.lock_submit) {
          console.log('已经评价了，等等吧')
          return
        } else {
          that.setData({
            lock_submit: true
          })
          let extData = wx.getExtConfigSync();
          let appid = extData.authorizer_appid;
          wx.request({
            header: {
              'data': appid
            },
            url: app.globalData.rootUrl + '/order/comment',
            data: {
              user_id: user_id,
              goods_id: goods_id,
              ordersn: ordersn,
              goods: that.data.keyOne,
              speed: that.data.keyTwo,
              service: that.data.keyThree,
              content: that.data.content,
            },
            success: function (res) {

              app.uploadimg({
                url: app.globalData.rootUrl + '/order/imageupload',//这里是你图片上传的接口
                path: pics,//这里是选取的图片的地址数组
                eva_id: res.data.id
              });

              console.log('提交评价的返回字段', res.data)
              console.log('提交评价的返回字段id', res.data.id)
              console.log('提交评价的请求字段', {
                user_id: user_id,
                goods_id: goods_id,
                ordersn: now_ordersn,
                goods: that.data.keyOne,
                speed: that.data.keyTwo,
                service: that.data.keyThree,
                content: that.data.content,
              })
              setTimeout(function () {
                wx.showToast({
                  title: '评价完成',
                  content: '1000',
                })
                that.setData({
                  pics: []
                })
              }, 5600)
              setTimeout(function () {
                wx.navigateBack()
              }, 6600)
            }
          })
        }
      }
    }


    var data = { go, e }
    this.clickTooFast(data)

  },
  //添加图片
  addImg: function (e) {//这里是选取图片的方法
    var that = this;
    var go = function (e) {
      if (that.data.pics.length < 9) {
        wx.chooseImage({
          count: 9 - that.data.pics.length, // 最多可以选择的图片张数，默认9
          sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
          success: function (res) {
            for (var i in res.tempFilePaths) {
              that.data.pics.push(res.tempFilePaths[i]);
            }
            that.setData({
              pics: that.data.pics
            });
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      } else {
        wx.showToast({
          title: '最多添加9张图片',
        })
      }
    }

    var data = { go, e }
    this.clickTooFast(data)

  },
  //图片预览
  clickImage: function (e) {
    if (this.data.lock) {
      return;
    }
    var current = e.target.dataset.src
    var that = this
    wx.previewImage({
      current: current,
      urls: that.data.pics,//内部的地址为绝对路径
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.info("点击图片了");
      },
    })
  },
  //输入评价
  changeText: function (e) {
    var that = this;
    var content = e.detail.value
    this.setData({
      content: content
    })
  },
  //选择评分
  choose: function (e) {
    var index = e.currentTarget.dataset.index
    var pingjiaList = this.data.pingjiaList
    for (var i in pingjiaList){
      pingjiaList[i].checked = false
    }
    pingjiaList[index].checked = true;
    this.setData({
      pingjiaList: pingjiaList
    })
  },
  //上传图片
  img: function (e) {
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.globalData.rootUrl + '/order/imageupload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            console.log('上传的图片是', tempFilePaths[0])
            var data = res.data
            console.log("data====", data)
          }
        })
      }
    })
  },
  // 删除图片
  deleteImag: function (e) {
    this.setData({ lock: true });
    var that = this
    var index = e.currentTarget.dataset.index
    console.log(index)
    var pics = that.data.pics
    wx.showModal({
      title: '确认删除',
      content: '是否删除选中图片？',
      success: function (res) {
        if (res.confirm) {
          pics.splice(index, 1)
          that.setData({
            pics: pics,
            lock: false
          })
        }
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