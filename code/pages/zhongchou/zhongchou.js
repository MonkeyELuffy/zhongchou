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
    slider:[{
      img_src: '../../img/banner.png',
      id: 0
    }, {
        img_src: '../../img/banner1.png',
      id: 1
    }],
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
  clickSwiper: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)
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