//index.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slider1: [{
      img: '../../img/banner.png',
      id: 0
    }, {
      img: '../../img/banner1.png',
      id: 1
      }],
    slider2: [{
      img: '../../img/banner.png',
      id: 2
    }, {
      img: '../../img/banner1.png',
      id: 3
    }],
    saomiao:'../../img/saomiao.png',
    positionValue:'乌鲁木齐',
    positionImg:'../../img/position.png',
    search_icon:'../../img/search.png',
    nav_3List: [
      {
        id: 0,
        img: '../../img/nav3-0.png',
        text: '申请入驻',
      },
      {
        id: 1,
        img: '../../img/nav3-1.png',
        text: '优惠券',
      },
      {
        id: 2,
        img: '../../img/nav3-2.png',
        text: '邀请好友',
      },
      {
        id: 3,
        img: '../../img/nav3-3.png',
        text: '活动',
      },
      {
        id: 4,
        img: '../../img/nav3-4.png',
        text: '行业1',
      },
      {
        id: 5,
        img: '../../img/nav3-5.png',
        text: '行业2',
      },
      {
        id: 6,
        img: '../../img/nav3-6.png',
        text: '行业3',
      },
      {
        id: 7,
        img: '../../img/nav3-7.png',
        text: '行业4',
      },
    ],
    // 排序背景图
    hangyepaixu: '../../img/paixu0.png',
    xiaoliangpaixu: '../../img/paixu0.png',
    julipaixu: '../../img/paixu0.png',
    paixuList: ['../../img/paixu0.png', '../../img/paixu1.png', '../../img/paixu2.png'],
    // 排序规则：0代表众筹金额升序、1降序，2代表分红比例升序、3降序,4代表一开始不排序。
    nowPaiXu: 4,
    // 底部数据列表
    dataList: [
      {
        img: '../../img/test.png',
        name: '深圳市三九胃泰有限公司',
        labels: [{ name: '铝制品', bgColor: '#fff' }, { name: '满减', bgColor: '#f68076' }],
        haoping: '98',
        sale: 1234,
        dic: 12.3
      },
      {
        img: '../../img/test.png',
        name: '深圳市三九胃泰有限公司',
        labels: [{ name: '铝制品', bgColor: '#fff' }, { name: '满减', bgColor: '#f68076' }],
        haoping: '98',
        sale: 1234,
        dic: 12.3
      },
      {
        img: '../../img/test.png',
        name: '深圳市三九胃泰有限公司',
        labels: [{ name: '铝制品', bgColor: '#fff' }, { name: '满减', bgColor: '#f68076' }],
        haoping: '98',
        sale: 1234,
        dic: 12.3
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  clickSwiper: function (e) {
    console.log(e.target.dataset.id)
  },
})