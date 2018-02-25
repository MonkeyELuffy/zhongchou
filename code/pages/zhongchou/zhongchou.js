// pages/zhongchou/zhongchou.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slider:[{
      img: '../../img/banner.png',
      id: 0
    }, {
      img: '../../img/banner1.png',
      id: 1
    }],
    // 排序背景图
    zhongchoupaixu: '../../img/zhongchoupaixu0.png',
    fenhongpaixu:'../../img/fenhongpaixu0.png',
    // 排序规则：0代表众筹金额升序、1降序，2代表分红比例升序、3降序,4代表一开始不排序。
    nowPaiXu:4,
    //众筹列表
    list:[{
      img:'../../img/banner.png',
      id:0,
      status:'进行中',
      company:'广西壮族自治区三九胃泰有限公司',
      value:80,
      //百分百位置
      paddingLeft:'61%',
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
    }, {
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
      }, {
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
      }]
  },
  onLoad: function (options) {
    var that = this;
    var windowHeight = wx.getStorageSync('windowHeight')
    that.setData({
      windowHeight: windowHeight
    })
    console.log('asd')
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
  }
})