// pages/youhuimaidan/youhuimaidan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     info:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var info = JSON.parse(options.params)
    console.log(info);
    this.setData({
      info: info
    })
  },
  pay() {
    var seller_id =this.data.info.seller_id;
    var seller_name =this.data.info.name;
    var page = '../zhifu/zhifu?seller_id=' + seller_id+'&&seller_name='+seller_name;
    console.log(page);
      wx.navigateTo({
        url: page
      })
  },
  
})