//index.js
var util = require('../../utils/util.js');
var paixuTemp = require('../../utils/paixuTemp.js');
var bannerTemp = require('../../utils/bannerTemp.js');
var navTemp = require('../../utils/navTemp.js'); 
var loadListData = require('../../utils/loadListData.js'); 
Date.prototype.format = function () {
  var s = '';
  var mouth = (this.getMonth() + 1) >= 10 ? (this.getMonth() + 1) : ('0' + (this.getMonth() + 1));
  // 字符串扩展，可直接补全头部的0
  // var mouth = (this.getMonth() + 1).toString().padStart(2,0);
  var day = this.getDate() >= 10 ? this.getDate() : ('0' + this.getDate());
  s += this.getFullYear() + '-'; // 获取年份。
  s += mouth + "-"; // 获取月份。
  s += day; // 获取日。
  return (s); // 返回日期。
}; 
//获取应用实例
var app = getApp()
Page({
  data: {
    scrollHeight: app.globalData.scrollHeight,
    //入住条件
    fanwei: ['我的附近', '5km以内', '10km以内', '不限'],
    jibie: ['5星级', '4星级', '3星级', '2星级', '1星级'],
    fanweiindex: 0,
    jibieindex:0,
    ruzhuTime: '', 
    lidianTime: '', 
    slider: [],
    // 排序组件所需data
    allData: app.globalData.allPaiXuData,
    default_image: '../../img/default-image.png',
    search_icon: '../../img/search.png', 
    navItems:[],
    dataList: [],
    page_no: 1,
    total_page:1,
    showNomore:false
  },
  onShow: function () {
    //数据初始化
    this.setData({
      bindDownLoad: true,
      page_no: 1,
      total_page: 1,
      dataList: [],
      showNomore: false
    })
    // 请求顶部菜单
    this.loadTopNav();
  },
  loadTopNav(){
    util.httpPost(app.globalUrl + app.TopNav, {}, this.processTopNavData);
  },
  processTopNavData(res){
    if (res.suc == 'y') {
      console.log('顶部菜单数据', res.data);
      for (var i in res.data) {
        res.data[i].checked = false;
      }
      res.data[0].checked = true;      
      this.setData({
        navItems: res.data,
        trade_id: res.data[0].trade_id
      })
      var params = {
        page_no: 1,
        page_size: 15,
        trade_id: this.data.trade_id,
        cur_fixed: app.globalData.firstLongitude + ',' + app.globalData.firstLatitude
      }
      this.loadListData(params);
    }
  },
  /* ===选择顶部菜单 */
  checked: function (e) {
    var trade_id = e.target.dataset.item.trade_id;
    //点击已选中的菜单时，直接返回
    if (trade_id === this.data.trade_id) {
      return
    } else {
      this.setData({
        bindDownLoad: true,
        page_no: 1,
        total_page: 1,
        dataList: [],
        showNomore: false,
        trade_id: trade_id,
        allData: app.globalData.allPaiXuData,
      })
      var index = e.target.dataset.index;
      var params = {
        page_no: 1,
        page_size: 15,
        trade_id: this.data.trade_id,
        cur_fixed: app.globalData.firstLongitude + ',' + app.globalData.firstLatitude
      }
      this.loadListData(params);
      this.changeStyle(index)
    }
  },
  //修改顶部菜单样式
  changeStyle: function (index) {
    var navItems = this.data.navItems
    for (var i = 0; i < navItems.length; i++) {
      navItems[i]['checked'] = false
    };
    navItems[index]['checked'] = true
    this.setData({
      navItems: navItems
    })
  },
  // 下拉加载更多购物车数据
  bindDownLoad: function (e) {
    var params = {
      page_no: this.data.page_no,
      page_size: 15,
      trade_id: this.data.trade_id,
      cur_fixed: app.globalData.firstLongitude + ',' + app.globalData.firstLatitude
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
      processData: that.processStoreData,
      API: app.STORELIST
    }
    loadListData.loadListData(allParams)
  },
  processStoreData(res) {
    if (res.suc == 'y') {
      var dataList = this.data.dataList
      console.log('获取商家list成功', res.data);
      wx.hideLoading()
      for (var i in res.data.list) {
        res.data.list[i].store_img_src = app.globalImageUrl + res.data.list[i].store_img_src
        res.data.list[i].special = res.data.list[i].special.split(",");
      }
      //获取数据之后需要改变page_no和total_page数值，保障上拉加载下一页数据的page_no值，其余没有需要修改的数据
      dataList = dataList.concat(res.data.list)
      // rest写法
      // dataList = [...dataList,...res.data.list]
      this.setData({
        page_no: this.data.page_no + 1,
        total_page: res.data.total_page,
        dataList: dataList,
      })
    } else {
      console.log('获取酒店list错误', res);
    }
  },
  // 进入酒店详情
  goDetailPage: function (e) {
    var go = function (e) {
      var seller_id = e.currentTarget.dataset.seller_id
      wx.navigateTo({
        url: '../jiudianDetail/jiudianDetail?seller_id=' + seller_id,
      })
    }
    var data = { go, e }
    this.clickTooFast(data)
  },
  // 确认搜索
  search: function (e) {
    var that = this
    var go = function (e) {
      var ruzhuTime = that.data.ruzhuTime
      var lidianTime = that.data.lidianTime
      var fanweiindex = that.data.fanweiindex
      var distance;
      switch (fanweiindex) {
        case 0:
          distance = 0;
          break;
        case 1:
          distance = 5;
          break;
        case 2:
          distance = 10;
          break;
        case 3:
          distance = null;
          break;
      }
      if (ruzhuTime > lidianTime){
        wx.showToast({
          title: '入住时间不可晚于离店时间',
        })
        return
      }else{
        // 目前只传酒店级别，之后需要加上范围值
        var params = {
          store_str: 5 - parseInt(that.data.jibieindex),
          distance: distance,
        }
        wx.navigateTo({
          url: '../jiudianList/jiudianList?params=' + JSON.stringify(params),
        })
      }
    }
    var data = { go, e }
    this.clickTooFast(data)
  },
  fanwei: function (e) {
    this.setData({
      fanweiindex: e.detail.value
    })
  },
  jibie: function (e) {
    this.setData({
      jibieindex: e.detail.value
    })
  },
  ruzhu: function (e) {
    var ruzhuTime = e.detail.value
    var ruzhuTimeArr = ruzhuTime.split("-");
    // 如果月份或者天数小于10，则取单数
    if (ruzhuTimeArr[1][0] == '0'){
      ruzhuTimeArr[1] = ruzhuTimeArr[1][1]
    }
    if (ruzhuTimeArr[2][0] == '0') {
      ruzhuTimeArr[2] = ruzhuTimeArr[2][1]
    }
    // 重新组装ruzhuTime
    ruzhuTime = ruzhuTimeArr.join('-')
    var lidianStarTime = this.getAll(ruzhuTime,'2020-12-12')
    this.setData({
      ruzhuTimeText: ruzhuTimeArr[1] + '月' + ruzhuTimeArr[2] + '日',
      ruzhuTime: ruzhuTime,
      lidianStarTime: lidianStarTime,
    })
  },
  lidian: function (e) {
    var lidianTime = e.detail.value
    var lidianTimeArr = lidianTime.split("-");
    // 如果月份或者天数小于10，则取单数
    if (lidianTimeArr[1][0] == '0') {
      lidianTimeArr[1] = lidianTimeArr[1][1]
    }
    if (lidianTimeArr[2][0] == '0') {
      lidianTimeArr[2] = lidianTimeArr[2][1]
    }
    // 重新组装lidianTime
    lidianTime = lidianTimeArr.join('-')
    this.setData({
      lidianTimeText: lidianTimeArr[1] + '月' + lidianTimeArr[2] + '日',
      lidianTime: lidianTime
    })
  },
  //根据入驻时间设置离店时间以入驻时间第二天开始
  getAll(begin, end) {
    var ab = begin.split("-");
    var ae = end.split("-");
    var db = new Date();
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
    var de = new Date();
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
    var unixDb = db.getTime();
    var unixDe = de.getTime();
    for (var k = unixDb + (1000*60*60*24); k < unixDe;) {
      return (new Date(parseInt(k))).format()
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
  //以下全是组件事件
  clickBanner: function (e) {
    var that = this
    bannerTemp.clickBanner(e, that)
  },
  clickNav: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    navTemp.clickNav(e, that, item)
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
