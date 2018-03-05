// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 充值类型
    rechargeType:[{name:'微信',id:0,img:'../../img/weixin.png'}],
    //充值金额选项
    rechargeItem: [{num: '50000元',
      selected: true
    }, {
      num: '100元',
      selected: false
      }, {
        num: '500元',
        selected: false
    }, {
      num: '1000元',
      selected: false
      }, {
        num: '50000元',
        selected: false
    }, {
      num: '10000元',
      selected: false
    }],
    // 充值明细
    rechargeDetailItem: [{
      time: '2017-05-20 13:01',
      num: 10
    }, {
      time: '2017-05-20 13:01',
      num: 10
      }, {
        time: '2017-05-20 13:01',
        num: 10
    }, {
      time: '2017-05-20 13:01',
      num: 10
      }, {
        time: '2017-05-20 13:01',
        num: 10
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  /* 选择充值金额 */
  chooseNum: function(e) {
    var index = e.target.dataset.index
    var rechargeItem = this.data.rechargeItem
    for (var i = 0; i < rechargeItem.length; i++ ) {
      rechargeItem[i]["selected"] = false;
    }
    rechargeItem[index]["selected"] = true
    console.log('用户选择了', rechargeItem[index]["num"],'的充值金额')
    this.setData({
      rechargeItem: rechargeItem
    })
  }
})