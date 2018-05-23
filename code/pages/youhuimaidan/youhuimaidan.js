// pages/youhuimaidan/youhuimaidan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var info = JSON.parse(options.params)
    this.setData({
      info: info
    })
  },
  pay() {

  },
})