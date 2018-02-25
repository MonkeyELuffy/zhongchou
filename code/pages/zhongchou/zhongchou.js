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
    // 排序规则：0代表众筹金额升序、1降序，2代表分红比例升序、3降序
    nowPaiXu:0
  },
  onLoad: function (options) {
  
  },
  clickSwiper: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)
  },
  // 众筹排序
  zhongchoupaixu:function(){
    console.log('切换众筹金额排序')
  }
})