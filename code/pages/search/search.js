// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_icon: '../../img/search.png',
    dataList: [
      {
        img: '../../img/test.png',
        name: '深圳市三九胃泰有限公司',
        labels: [{ name: '铝制品', bgColor: '#fff' }, { name: '满减', bgColor: '#f68076' }],
        haoping: '98',
        sale: 1234,
        dic: 12.3
      },
      {
        img: '../../img/test.png',
        name: '深圳市三九胃泰有限公司',
        labels: [{ name: '铝制品', bgColor: '#fff' }, { name: '满减', bgColor: '#f68076' }],
        haoping: '98',
        sale: 1234,
        dic: 12.3
      },
      {
        img: '../../img/test.png',
        name: '深圳市三九胃泰有限公司',
        labels: [{ name: '铝制品', bgColor: '#fff' }, { name: '满减', bgColor: '#f68076' }],
        haoping: '98',
        sale: 1234,
        dic: 12.3
      },
      {
        img: '../../img/test.png',
        name: '深圳市三九胃泰有限公司',
        labels: [{ name: '铝制品', bgColor: '#fff' }, { name: '满减', bgColor: '#f68076' }],
        haoping: '98',
        sale: 1234,
        dic: 12.3
      },
      {
        img: '../../img/test.png',
        name: '深圳市三九胃泰有限公司',
        labels: [{ name: '铝制品', bgColor: '#fff' }, { name: '满减', bgColor: '#f68076' }],
        haoping: '98',
        sale: 1234,
        dic: 12.3
      },
      {
        img: '../../img/test.png',
        name: '深圳市三九胃泰有限公司',
        labels: [{ name: '铝制品', bgColor: '#fff' }, { name: '满减', bgColor: '#f68076' }],
        haoping: '98',
        sale: 1234,
        dic: 12.3
      },
      {
        img: '../../img/test.png',
        name: '深圳市三九胃泰有限公司',
        labels: [{ name: '铝制品', bgColor: '#fff' }, { name: '满减', bgColor: '#f68076' }],
        haoping: '98',
        sale: 1234,
        dic: 12.3
      }
    ],
    // 排序背景图
    hangyepaixu: '../../img/paixu0.png',
    xiaoliangpaixu: '../../img/paixu0.png',
    julipaixu: '../../img/paixu0.png',
    paixuList: ['../../img/paixu0.png', '../../img/paixu1.png', '../../img/paixu2.png'],
    // 排序规则：0代表众筹金额升序、1降序，2代表分红比例升序、3降序,4代表一开始不排序。
    nowPaiXu: 4,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //数据初始化
    that.setData({
      bindDownLoad: true,
      page: 0,
    })
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})