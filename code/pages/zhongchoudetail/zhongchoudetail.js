// pages/zhongchoudetail/zhongchoudetail.js
const util = require('../../utils/util.js');
const bannerTemp = require('../../utils/bannerTemp.js');
const zhongchouItem = require('../../utils/zhongchouItem.js');
const loadListData = require('../../utils/loadListData.js');
const basic = require('../../utils/basic.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jinzhanList:[{
      img_url: "../../img/car.png",
      nickname: "张学友",
      num:666
    }],
    pingjiaList: [{
      content: "好好吃的样子呢",
      ctime_str: "2018-04-01 20:26",
      img_url: "../../img/car.png",
      nickname: "张学友"
    }],
    carIcon: '../../img/car.png',
    slider: [{
      img_src: '../../img/banner.png',
      id: 0
    }, {
        img_src: '../../img/banner1.png',
      id: 1
    }],
    zhongchouInfo:{
      img: ['../../img/banner.png', '../../img/banner.png', '../../img/banner.png'],
      name:'广西三生铝制品有限公司',
      state:'进行中',
      desc:'项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍',
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
    navItems: [
      {
        name: '详情',
        id: 0,
        checked: true,
      },
      {
        name: '进展',
        id: 1,
        checked: false,
      },
      {
        name: '留言',
        id: 2,
        checked: false,
      }],
      
  },
  onLoad(options){
    var that = this
    var fund_id = options.id
    console.log(fund_id)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight - 100 * res.screenWidth / 750
        })
      }
    });
    // 众筹详情
    util.httpPost(app.globalUrl + app.FundDetail, { fund_id: fund_id }, this.processDetailData);
    // 参与列表
    util.httpPost(app.globalUrl + app.FundAttendList, { fund_id: fund_id }, this.processAttendListData);
    // 留言列表
    util.httpPost(app.globalUrl + app.FundMessageList, { member_id: app.globalData.member_id, fund_id: fund_id }, this.processMessageListData);
  },
  processDetailData: function (res) {
    if (res.suc == 'y') {
      console.log('获取众筹详情成功', res.data);
        res.data.logo_url = app.globalImageUrl + res.data.logo_url;
        res.data.value = parseInt(res.data.actual_amount || 0) / parseInt(res.data.amount) * 100;
        res.data.paddingLeft = (res.data.value * 0.8 - 2) + '%';
        // res.data.btn = res.data.flag == 1 ? '我要众筹' : (res.data.flag == 2 ?'我要留言' : '已完成')
      this.setData({
        zhongchouInfo: res.data,
      })
    } else {
      console.log('获取众筹详情错误', res);
    }
  },
  processAttendListData: function (res) {
    if (res.suc == 'y') {
      console.log('获取参与列表成功', res.data);
      this.setData({
        jinzhanList: res.data,
      })
    } else {
      console.log('获取参与列表错误', res);
    }
  },
  processMessageListData: function (res) {
    if (res.suc == 'y') {
      console.log('获取留言列表成功', res.data);
      this.setData({
        pingjiaList: res.data,
      })
    } else {
      console.log('获取留言列表错误', res);
    }
  },
  clickBtn(e){
    var that = this;
    var params = {
      zhongchouInfo: this.data.zhongchouInfo
    }
    var btn = this.data.zhongchouInfo.btn
    if(btn == '已完成'){
      return
    }else if(btn == '我要留言'){
      basic.goPage('zhongchoupinglun', that, e, params)
    }else{
      basic.goPage('canyuzhongchou', that, e, params)
    }
  },
  kefu() {
    wx.makePhoneCall({
      phoneNumber: '13067998666',
    })
  },
  /* ===选择顶部菜单 */
  checked: function (e) {
    var that = this
    var article_type = e.target.dataset.id;
    //点击已选中的菜单时，直接返回
    if (article_type === that.data.article_type) {
      return
    } else {
      var index = e.target.dataset.index;
      console.log(index)
      var name = e.target.dataset.name;
      that.setData({
        // article_type: article_type,
        // page: 0,
        // youhuiquan_list: [],
        // bindDownLoad: true,
        // total_page: 1,
        index: index,
        // name: name
      })
      // that.loadData(index)
      that.changeStyle(index)
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
})