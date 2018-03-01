// pages/dingdanxiangqing/dingdanxiangqing.js
//导入js
var network = require("../../utils/network.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货方式
    shouhuoType:'到店取货-取货地址',
    //到店取货时，取货人信息
    userMsg: [{ name: '取货人姓名', value: '张三丰' }, { name: '取货人手机号', value: '18888888888' }],
    default_image: '../../img/default-image.png',
    imgurl: app.globalData.imgUrl + '/',  //图片地址
    // 配送方式
    peisongfangshi: '快递运输',
    // 收货地址
    address: {
      add: '湖北省武汉市邗江区天赋大道ask的解决啊速度和付款就是大收到两份222号',
      title:'小米之家'
    },
    seemore: '../../img/logo.png',
    // 优惠券
    bolang: ['', '', '', '', ''],
    youhuiquan: [
    ],
    // 优惠金额
    youhui_total: 20,
    //结算的商品
    jiesuan: [],         // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true,    // 全选状态，默认全选
    isjiesuan: false,
    count: 1,   //商品数量默认是1
    total: 0,    //总金额
    goodsCount: 0, //数量
    // 订单数据
    order_data: {
      beizhu:'包装好点包装好点包装好点，包装好点，包装好点。',
      //时间节点
      timeList: [{
        name: '下单时间',
        value: '2018-03-01  15:08:22'
      }, {
        name: '付款时间',
        value: '2018-03-01  15:08:22'
        }, {
          name: '收货时间',
          value: '2018-03-01  15:08:22'
        },],
      zhekouList: [{ name: '优惠券折扣', value: '6.00' }, { name: '活动折扣', value: '12.34' }],
      //订单状态提示语
      stateText1: '付款剩余时间',
      stateText2:'22小时21分钟',
      //实际付款
      shijifukuan:'54.32',
      yunfei:'12.00',
      totalPrice:'60.33',
      goods_id: 0,
      num: 1,
      ordersn: 'TC3425324895739047',
      goods: [{
        image: '../../img/test.png',
        num: 2,
        goods_price: '24.44',
        name: '小米小米小米小米小米小米小米小米'
      }, {
        image: '../../img/test.png',
        num: 2,
        goods_price: '24.44',
        name: '小米小米小米小米小米小米小米小米'
        }, {
          image: '../../img/test.png',
          num: 2,
          goods_price: '24.44',
          name: '小米小米小米小米小米小米小米小米'
        },],
      all_price: 0,
      btns: [{ name: '取消订单', bgColor: '#d8d8d8' }, { name: '确认收单', bgColor:'rgb(246,127,121)'}]
    }
  },

  onShow: function () {
    // this.get_order()
  },
  onReady: function () {
    // var peisong = wx.getStorageSync('peisongfangshi') || '快递运输'
    // var moreng = {add: '点击添加地址'}
    // var address = wx.getStorageSync('address') || moreng
    // console.log(address)
    // this.setData({
    //     peisongfangshi: peisong,
    //     address: address
    // })
    // var that = this;
    // // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）
    // var arr = wx.getStorageSync('jiesuan_cart') || [];
    // //优惠金额
    // var youhui_total = this.data.youhui_total
    // // 有数据的话，就遍历数据，计算总金额 和 总数量
    // var total = 0;
    // if (arr.length > 0) {
    //     for (var i in arr) {
    //         total += Number(arr[i].price) * Number(arr[i].count);
    //     }
    // }
    // total = ((total - youhui_total) > 0) ? (total - youhui_total) : 0;
    // // 更新数据
    // this.setData({
    //     isjiesuan: true,
    //     jiesuan: arr,
    //     total: total
    // });
  },
  //  获取订单信息
  get_order: function () {
    //写入参数
    let _this = this
    var params = new Object()
    params.api_name = "/interfaces/Info/order_details"
    params.ordersn = wx.getStorageSync('now_ordersn')
    console.log("params", params)
    network.GET(
      {
        params: params,
        success: function (res) {
          console.log('订单返回数据', res.data)
          _this.setData({
            'order_data.create_time': res.data.create_time,
            'order_data.goods_id': res.data.goods_id,
            'order_data.num': res.data.num,
            'order_data.ordersn': res.data.ordersn,
            'order_data.goods': res.data.goods,
            'order_data.delivery': res.data.delivery,
            'address.add': res.data.address.address,
            'address.name': res.data.address.user_name,
            'address.tel': res.data.address.mobile
          })
          //拿到解密后的数据，进行代码逻辑
          _this.data.order_data.goods.forEach((item, index) => {
            let goods_price = parseFloat(item.goods_price) * (index + 1)
            var all_price = wx.getStorageSync('now_all_price')
            _this.setData({
              'order_data.all_price': all_price
            })
          })
        },
        fail: function (res) {
          //失败后的逻辑
          console.log('错误信息')
          console.log(res)
        }
      })
  },
  // 删除订单
  del_order: function () {
    let _this = this
    var params = new Object()
    params.api_name = "/interfaces/info/del_order"
    params.ordersn = "1502178152718959"
    network.GET(
      {
        params: params,
        success: function (res) {
          console.log(res.data)
        }
      })
  },
  //再次购买
  buy: function (e) {
    var that = this
    var user_id = wx.getStorageSync('user_id')

    var go = function(e) {
      var ordersn = wx.getStorageSync('now_ordersn')
      //订单中商品
      var goods = that.data.order_data.goods
      // var goods
      // for (var i in orders) {
      //   if (orders[i].ordersn === ordersn) {
      //     // console.log('订单中的商品', orders[i].goods)
      //     goods = orders[i].goods
      //   }
      // }
      console.log('订单中的商品', goods)
      //将订单中的商品全部加入购物车

      //  var continueAdd = true
      //  for (var i in goods) {
      //    if(continueAdd){
      //      continueAdd = false
      //      var norms_id = goods[i].norms_id || ''
      //      var num = goods[i].num || 1
      //      var goods_id = goods[i].goods_id || ''

      //      let extData = wx.getExtConfigSync();
      //      let appid = extData.authorizer_appid;
      //      wx.request({
      //        header: {
      //          'data': appid
      //        },
      //        url: app.globalData.rootUrl + '/goods/insert_cart',
      //        data: {
      //          user_id: user_id,
      //          norms_id: norms_id,
      //          num: num,
      //          goods_id: goods_id,
      //          // cart_id: cart_id,
      //          // goodslist: goodslist
      //        },
      //        success: function (res) {
      //          console.log('加入购物车的返回字段', res.data)
      //          continueAdd = true

      //        }
      //      })
      //    }
      //  } 
      var goodslist = []
      for (var i in goods) {
        goodslist.push({ goods_id: 0, norms_id: 0, num: 0 })
        goodslist[i].norms_id = goods[i].norms_id || ''
        goodslist[i].num = goods[i].num || 1
        goodslist[i].goods_id = goods[i].goods_id || ''

      }

      let extData = wx.getExtConfigSync();
      let appid = extData.authorizer_appid;
      wx.request({
        header: {
          'data': appid
        },
        url: app.globalData.rootUrl + '/goods/insert_carts',
        data: {
          user_id: user_id,
          goods: goodslist
        },
        success: function (res) {
          console.log('加入购物车的返回字段', res.data)
          console.log('加入购物车的goods', goodslist)
        }
      })

      wx.switchTab({
        url: '/pages/gouwuche/gouwuche'
      })
    }

    var data = { go, e }
    this.clickTooFast(data)
  },
  //评价
  pingjia: function (e) {
    var that = this
    function go(e) {
      var pingjia_goods_id = e.target.dataset.goodsid
      var pingjia_ordersn = e.target.dataset.ordersn
      var index = e.target.dataset.index
      var pingjia_goods = that.data.order_data.goods[index]
      wx.setStorageSync('pingjia_ordersn', pingjia_ordersn)
      wx.setStorageSync('pingjia_goods_id', pingjia_goods_id)
      wx.setStorageSync('pingjia_goods', pingjia_goods)
      wx.navigateTo({
        url: "../pingjia/pingjia"
      });
    }

    var data = { go, e }
    this.clickTooFast(data)
  },
  hadpingjia:function(e) {
    wx.showToast({
      title: '已完成评价',
      content: '1000'
    })
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
  }
})