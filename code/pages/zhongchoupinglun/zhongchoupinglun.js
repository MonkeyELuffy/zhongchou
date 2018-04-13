// pages/zhongchoupinglun/zhongchoupinglun.js
var util = require('../../utils/util.js');
var basic = require('../../utils/basic.js');
var app = getApp();
Page({
  data: {
  
  },
  onLoad: function (options) {
    var zhongchouInfo = JSON.parse(options.params).zhongchouInfo;
    console.log(zhongchouInfo);
    this.setData({
      zhongchouInfo: zhongchouInfo
    })
  },
  input(e) {
    var content = e.detail.value;
    this.setData({
      content: content
    })
  },
  sure(e) {
    if (basic.checkNull(this.data.content)){
      var params = {
        member_id: app.globalData.member_id,
        fund_id: this.data.zhongchouInfo.id,
        content: this.data.content,
      }
      util.httpPost(app.globalUrl + app.FundMessage, params, this.processMessageData);
    }else{
      wx.showToast({
        title: '请输入您的评论',
        duration: 600
      })
    }
  },
  processMessageData(res) {
    var zhongchouInfo = this.data.zhongchouInfo;
    if (res.suc == 'y') {
      console.log('评价成功', res.data);
      wx.hideLoading()
      wx.showToast({
        title: res.msg,
        duration: 600
      })
      setTimeout(function () {
        wx.navigateBack()
      }, 1000)
    } else {
      console.log('评价错误', res);
      wx.showToast({
        title: res.msg,
      })
    }
  },
})