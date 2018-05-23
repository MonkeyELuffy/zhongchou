// pages/saoyisao/saoyisao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  saoyisao: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })
  }, 

})