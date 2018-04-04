// pages/search/search.js
var util = require('../../utils/util.js');
var paixuTemp = require('../../utils/paixuTemp.js');
var dataItemTemp = require('../../utils/dataItemTemp.js');
var app = getApp()
Page({
  data: {
    scrollHeight: app.globalData.scrollHeight,
    allData: app.globalData.allPaiXuData,
    search_icon: '../../img/search.png',
    dataList: [],
    search_key:'',
    page_no: 1,
    total_page: 1
  },
  onLoad: function (options) {
    var that = this
    var search_key = JSON.parse(options.search_key)
    //数据初始化
    that.setData({
      bindDownLoad: true,
      search_key: search_key,
      dataList: [],
    })
    var params = {
      page_no: 1,
      page_size: 15,
      cur_fixed: app.globalData.firstLongitude + ',' + app.globalData.firstLatitude,
      seller_name: that.data.search_key
    }
    that.loadData(params);
  },
  // 下拉加载更多购物车数据
  bindDownLoad: function (e) {
    var params = {
      page_no: this.data.page_no,
      page_size: 15,
      cur_fixed: app.globalData.firstLongitude + ',' + app.globalData.firstLatitude,
      seller_name: this.data.search_key
    }
    this.loadData(params)
  },
  /*===========
  加载数据
  ===========*/
  loadData: function (params) {
    var that = this
    console.log(that.data.page_no, '??',that.data.total_page)
    if (that.data.bindDownLoad && parseInt(that.data.page_no) <= parseInt(that.data.total_page)) {
      that.setData({
        bindDownLoad: false
      })
      //加载数据
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      //获取订单信息
      util.httpPost(app.globalUrl + app.STORELIST, params, that.processStoreData);
      //1000ms之后才可以继续加载，防止加载请求过多
      setTimeout(function () {
        that.setData({
          bindDownLoad: true
        })
      }, 1000)
    }
    if (that.data.bindDownLoad && parseInt(that.data.page_no) > parseInt(that.data.total_page)) {
      wx.showToast({
        title: '没有更多数据了',
      })
    }
  },
  processStoreData(res) {
    if (res.suc == 'y') {
      var dataList = this.data.dataList
      console.log('获取商铺list成功', res.data);
      wx.hideLoading()
      for (var i in res.data.list) {
        res.data.list[i].store_img_src = app.globalImageUrl + res.data.list[i].store_img_src
      }
      //获取数据之后需要改变page和totalPage数值，保障上拉加载下一页数据的page值，其余没有需要修改的数据
      dataList = dataList.concat(res.data.list)
      this.setData({
        page_no: this.data.page_no + 1,
        total_page: res.data.total_page,
        dataList: dataList,
      })
    } else {
      console.log('获取商铺list错误', res);
    }
  },
  // 输入搜索文字
  input: function (e) {
    var search_key = e.detail.value
    this.setData({
      search_key: search_key
    })
    wx.setStorageSync("search_key", search_key);
  },
  // 确认搜索
  search: function (e) {
    var that = this
    var search_key = this.data.search_key
    if (search_key.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
      wx.showToast({
        title: '请输入您要搜索的商品',
        duration: 1000
      })
    } else {
      var go = function (e) {
        console.log(search_key)
        //搜索需要清空dataList
        that.setData({
          dataList: [],
          page_no: 1,
          total_page:1,
        })
        var params = {
          page_no: that.data.page_no,
          page_size: 15,
          cur_fixed: app.globalData.firstLongitude + ',' + app.globalData.firstLatitude,
          seller_name: search_key
        }
        that.loadData(params)
      }
      var data = { go, e }
      that.clickTooFast(data)
    }
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
  },
  // 点击子数据
  clickItem: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    dataItemTemp.clickItem(e, that, item)
  },
  hangyepaixu: function (e) {
    var that = this
    paixuTemp.hangyepaixu(e, that)
  },
  xiaoliangpaixu: function (e) {
    var that = this
    paixuTemp.xiaoliangpaixu(e, that)
  },
  julipaixu: function (e) {
    var that = this
    paixuTemp.julipaixu(e, that)
  },
})