// pages/zhongchou/zhongchou.js
const util = require('../../utils/util.js');
const bannerTemp = require('../../utils/bannerTemp.js');
const zhongchouItem = require('../../utils/zhongchouItem.js');
const loadListData = require('../../utils/loadListData.js');
const basic = require('../../utils/basic.js'); 
const app = getApp()
Page({
  data: {
    // 排序组件所需data
    allData: app.globalData.allPaiXuData,
    scrollHeight: app.globalData.scrollHeight,
    slider:[],
    // 排序背景图
    zhongchoupaixu: '../../img/paixu0.png',
    fenhongpaixu:'../../img/paixu0.png',
    nowPaiXu:4,
    //众筹列表
    dataList: [
      {
        img: '../../img/banner.png',
        id: 0,
        status: '进行中',
        company: '广西壮族自治区三九胃泰有限公司',
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
      {
        img: '../../img/banner.png',
        id: 0,
        status: '进行中',
        company: '广西壮族自治区三九胃泰有限公司',
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
      {
        img: '../../img/banner.png',
        id: 0,
        status: '进行中',
        company: '广西壮族自治区三九胃泰有限公司',
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
      }
      ]
  },
  onLoad: function (options) {
    var that = this;
  },
  onShow: function () {
    //数据初始化
    this.setData({
      bindDownLoad: true,
      page_no: 1,
      total_page: 1,
      dataList: []
    })
    //请求banner数据
    this.loadBannerData();
    var params = {
      page_no: 1,
      page_size: 15,
    }
    this.loadListData(params);
  },
  // 顶部banner
  loadBannerData() {
    var params1 = {
      region_id: 3144,  //地区ID搜索
      loca_id: 6
    }
    util.httpPost(app.globalUrl + app.BANNER, params1, this.processBannerData);
  },
  processBannerData: function (res) {
    if (res.suc == 'y') {
      console.log('顶部banner数据', res.data);
      for (var i in res.data) {
        res.data[i].img_src = app.globalImageUrl + res.data[i].img_src
      }
      this.setData({
        slider: res.data
      })
    }
  },
  // 下拉加载更多数据
  bindDownLoad: function (e) {
    var params = {
      page_no: this.data.page_no,
      page_size: 15,
    }
    this.loadListData(params)
  },
  // 加载数据
  loadListData: function (params) {
    var that = this
    var allParams = {
      that: that,
      params: params,
      app: app,
      processData: that.processFundData,
      API: app.FundList
    }
    loadListData.loadListData(allParams)
  },
  processFundData(res) {
    if (res.suc == 'y') {
      var dataList = this.data.dataList
      console.log('获取众筹list成功', res.data);
      wx.hideLoading()
      for (var i in res.data.list) {
        res.data.list[i].logo_url = app.globalImageUrl + res.data.list[i].logo_url;
        res.data.list[i].value = parseInt(res.data.list[i].actual_amount || 0) / parseInt(res.data.list[i].amount) * 100;
        res.data.list[i].paddingLeft = (res.data.list[i].value*0.8-2)+'%'
      }
      //获取数据之后需要改变page_no和total_page数值，保障上拉加载下一页数据的page_no值，其余没有需要修改的数据
      dataList = [...dataList,...res.data.list]
      this.setData({
        page_no: this.data.page_no + 1,
        total_page: res.data.total_page,
        dataList: dataList,
      })
    } else {
      console.log('获取众筹list错误', res);
    }
  },
  // 众筹排序
  zhongchoupaixu: function () {
    console.log('切换众筹金额排序')
    var nowPaiXu = this.data.nowPaiXu;
    nowPaiXu = nowPaiXu == 0 ? 1 : 0;
    console.log(nowPaiXu);
    this.setData({
      nowPaiXu: nowPaiXu
    });
  },
  // 众筹排序
  fenhongpaixu: function () {
    console.log('切换分红比例排序')
    var nowPaiXu = this.data.nowPaiXu;
    nowPaiXu = nowPaiXu == 2 ? 3 : 2;
    console.log(nowPaiXu);
    this.setData({
      nowPaiXu: nowPaiXu
    });
  },
  // 点击众筹子数据
  clickItem: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    zhongchouItem.clickItem(e, that, item)
  },
})