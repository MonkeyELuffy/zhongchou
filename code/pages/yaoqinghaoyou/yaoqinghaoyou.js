// pages/yaoqinghaoyou/yaoqinghaoyou.js
var util = require('../../utils/util.js');
var loadListData = require('../../utils/loadListData.js'); 
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sellerImg:'../../img/nav3-4.png',
    InviteType: [
      {
        name: '邀请会员',
        checked: true
      },
      {
        name: '邀请店铺',
        checked: false
      }
    ],
    showList:[],
    bindDownLoad: true,
    page_no: 1,
    total_page: 1,
    nowType: 1,
  },
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    // 获取用户邀请数据
    util.httpPost(app.globalUrl + app.Invite, { member_id: app.globalData.member_id }, this.processInviteData); 
    // 获取用户邀请list
    var params = {
      member_id: app.globalData.member_id,
      type: this.data.nowType,
      page_no: 1,
      page_size: 15,
    }
    this.loadListData(params)
  },
  processInviteListData(res) {
    if (res.suc == 'y') {
      var showList = this.data.showList
      showList = showList.concat(res.data.list)
      console.log('获取showList成功', res.data);
      if ((res.data.list instanceof Array && res.data.list.length < 15) || (res.data.list == '')) {
        this.setData({
          showNomore: true
        })
      }
      wx.hideLoading()
      this.setData({
        page_no: this.data.page_no + 1,
        total_page: res.data.total_page,
        showList: showList
      })
    } else {
      console.log('获取获取showList成功错误', res);
    }
  },
  processInviteData(res) {
    if (res.suc == 'y') {
      console.log('获取Invite成功', res.data);
      var InviteType = this.data.InviteType
      var slider = []
      slider.push({
        img_src: app.globalImageUrl + res.data.banner
      })
      InviteType[0].name += '(' + res.data.member_num + ')'
      InviteType[1].name += '(' + res.data.seller_num + ')'
      this.setData({
        InviteInfo: res.data,
        InviteType: InviteType,
        slider: slider,
      })
    } else {
      console.log('获取Invite错误', res);
    }
  },
  bindDownLoad: function (e) {
    var params = {
      member_id: app.globalData.member_id,
      type: this.data.nowType,
      page_no: this.data.page_no,
      page_size: 15,
    }
    this.loadListData(params)
  },
  loadListData: function (params) {
    var that = this
    var allParams = {
      that: that,
      params: params,
      app: app,
      processData: that.processInviteListData,
      API: app.InviteList
    }
    loadListData.loadListData(allParams)
  },
  /* ===选择顶部菜单 */
  checked: function (e) {
    var index = e.target.dataset.index;
    var InviteType = this.data.InviteType
    var nowType = this.data.nowType
    if (nowType == index + 1){
      return
    }else{
      for (var i in InviteType) {
        InviteType[i]['checked'] = false
      };
      InviteType[index]['checked'] = true
      this.setData({
        InviteType: InviteType,
        showList: [],
        nowType: index + 1,
        bindDownLoad: true,
        page_no: 1,
      })
      var params = {
        member_id: app.globalData.member_id,
        type: index + 1,
        page_no: 1,
        page_size: 15,
      }
      this.loadListData(params)
    }
  },
})