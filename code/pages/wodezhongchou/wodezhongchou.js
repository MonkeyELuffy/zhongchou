var util = require('../../utils/util.js');
const zhongchouItem = require('../../utils/zhongchouItem.js');
var app = getApp()
Page({
  data: {
    page: 0,
    dataList: [],
  },
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    });
  },
  onShow: function () {
    this.setData({
      page_no: 1,
      total_page: 1,
      bindDownLoad: true,
      dataList:[]
    })
    var params = {
      page_no: 1,
      page_size: 15,
      member_id: app.globalData.member_id
    }
    this.loadData(params);
  },
  // 下拉加载
  bindDownLoad: function (e) {
    var params = {
      page_no: this.data.page_no,
      page_size: 15,
      member_id: app.globalData.member_id
    }
    this.loadData(params)
  },
  /*===========
  加载数据
  ===========*/
  loadData: function (params) {
    var that = this
    console.log(params)
    console.log(that.data.page_no, '??', that.data.total_page)
    if (that.data.bindDownLoad && parseInt(that.data.page_no) <= parseInt(that.data.total_page)) {
      that.setData({
        bindDownLoad: false
      })
      //加载数据
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 600)
      util.httpPost(app.globalUrl + app.FundAttendList, params, that.processData);
    }
    //1000ms之后才可以继续加载，防止加载请求过多
    setTimeout(function () {
      that.setData({
        bindDownLoad: true
      })
    }, 1000)
  },
  processData(res) {
    if (res.suc == 'y') {
      var dataList = this.data.dataList
      console.log('获取FundAttendList成功', res.data);
      if ((res.data instanceof Array && res.data.length < 15) || (res.data == '')) {
        this.setData({
          showNomore: true
        })
      }
      for (var i in res.data) {
        res.data[i].store_img_src = app.globalImageUrl + res.data[i].store_img_src
        res.data[i].bili = (parseInt(res.data[i].amount || 0) / parseInt(res.data[i].total_amount) * 100).toFixed(2)
      }
      //获取数据之后需要改变page和totalPage数值，保障上拉加载下一页数据的page值，其余没有需要修改的数据
      dataList = dataList.concat(res.data)
      this.setData({
        page_no: this.data.page_no + 1,
        total_page: res.data.total_page,
        dataList: dataList,
      })
    } else {
      console.log('获取FundAttendList错误', res);
    }
  },
  //进入详情
  goDetail: function (e) {
    var go = function (e) {
      var item = e.currentTarget.dataset.item
      var page = '../zhongchoudetail/zhongchoudetail?id=' + item.fund_id
      var go = function (e) {
        wx.navigateTo({
          url: page
        })
      }
    }
    var data = { go, e }
    this.clickTooFast(data)
  },
  clickItem: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    zhongchouItem.clickItem(e, that, item)
  },
  /*==========
  防止快速点击
  ===========*/
  clickTooFast: function (data) {
    var lastTime = this.data.lastTime
    var curTime = data.e.timeStamp
    if (lastTime > 0) {
      if (curTime - lastTime < 500) {
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
