// pages/canyuzhongchou/canyuzhongchou.js
var util = require('../../utils/util.js');
var basic = require('../../utils/basic.js');
var app = getApp();
Page({
  data: {
    zhongchouInfo: {
      img: ['../../img/banner.png', '../../img/banner.png', '../../img/banner.png'],
      name: '广西三生铝制品有限公司',
      state: '进行中',
      desc: '项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍',
      value: 80,
      //百分百位置
      paddingLeft: '61%',
      detail: [
        {
          name: '众筹金额',
          value: '20w'
        },
        {
          name: '参与人数',
          value: '290'
        },
        {
          name: '结束时间',
          value: '2018-03-03'
        },
      ]
    },
  },
  onLoad: function (options) {
    var zhongchouInfo = JSON.parse(options.params).zhongchouInfo;
    console.log(zhongchouInfo);
    this.setData({
      zhongchouInfo: zhongchouInfo
    })
  },
  input(e){
    var amount = e.detail.value;
    this.setData({
      amount: amount
    })
  },
  sure(e){
    if (this.data.amount>0){
      var params = {
        member_id: app.globalData.member_id,
        fund_id: this.data.zhongchouInfo.id,
        amount: this.data.amount,
      }
      util.httpPost(app.globalUrl + app.FundAttend, params, this.processAttendData);
    }else{
      wx.showToast({
        title: '请输入众筹金额',
        duration: 600
      })
    }
  },
  processAttendData(res) {
    var zhongchouInfo = this.data.zhongchouInfo;
    if (res.suc == 'y') {
      console.log('参与众筹成功', res.data);
      wx.hideLoading()
      wx.showToast({
        title: res.msg,
        duration: 600
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../zhongchoupinglun/zhongchoupinglun?params=' + JSON.stringify(zhongchouInfo)
        })
      }, 1000)
    } else {
      console.log('参与众筹错误', res);
      wx.showToast({
        title: res.msg,
      })
    }
  },
  //如果直接返回上一页面，刷新上一页数据
  onUnload: function () {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    prevPage.onLoad({ fund_id: this.data.zhongchouInfo.id })
  }
})