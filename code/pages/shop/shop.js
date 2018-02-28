//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    // 排序背景图
    hangyepaixu: '../../img/paixu0.png',
    xiaoliangpaixu: '../../img/paixu0.png',
    julipaixu: '../../img/paixu0.png',
    paixuList: ['../../img/paixu0.png', '../../img/paixu1.png', '../../img/paixu2.png'],
    search_key:'',
    default_image: '../../img/default-image.png',
    page: 0,
    cate_id: 0,
    search_icon: '../../img/search.png',
    navItems: [{
      name: '酒店',
      id: 0,
      checked: true
    }, {
      name: '旅游',
      id: 1,
      checked: false
      }, {
        name: '民宿',
        id: 2,
        checked: false
    }, {
      name: '古镇',
      id: 3,
      checked: false
      }, {
        name: '餐厅',
        id: 4,
        checked: false
    }, {
      name: '温泉',
      id: 5,
      checked: false
    }],
    fenlei_list: [
      {
        img: '../../img/banner.png',
        id: 0,
        name: '万达公馆5星酒店',
        labels: [{ name: '满减', bgColor: '#f68076' }],
        haoping: 98,
        price: 498.00,
        dic: 1.3
      },
      {
        img: '../../img/banner.png',
        id: 1,
        name: '万达公馆5星酒店',
        labels: [{ name: '满减', bgColor: '#f68076' }],
        haoping: 98,
        price: 498.00,
        dic: 1.3
      },
      {
        img: '../../img/banner.png',
        id: 2,
        name: '万达公馆5星酒店',
        labels: [{ name: '满减', bgColor: '#f68076' }],
        haoping: 98,
        price: 498.00,
        dic: 1.3
      },
      {
        img: '../../img/banner.png',
        id: 3,
        name: '万达公馆5星酒店',
        labels: [{ name: '满减', bgColor: '#f68076' }],
        haoping: 98,
        price: 498.00,
        dic: 1.3
      }
    ],
    // 纵向商品列表 
    product_list: [],
    //返回分页数据的总页数
    total_page:1
  },
  onLoad: function () {
    var that = this;
    //数据初始化
    that.setData({
      bindDownLoad: true,
      page: 0,
      // fenlei_list: []
    })
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    // 加载分类列表
    // that.loadNavData()

  },
  onShow:function(e) {

    wx.setStorageSync('search_key', '')
    this.setData({
      search_key: ''
    })
  },
  //加载分类列表
  loadNavData: function (e) {
    var that = this
    let extData = wx.getExtConfigSync();
    let appid = extData.authorizer_appid;
    wx.request({
      header: {
        'data': appid
      },
      url: app.globalData.rootUrl + '/goods/cate',
      success: function (res) {
        console.log("分类列表的返回", res.data)
        var navItems = []
        for (var i in res.data.data) {
          var item = { name: '', checked: false, id: 1 }
          navItems.push(item)
          navItems[i].name = res.data.data[i].name
          navItems[i].id = res.data.data[i].id
          navItems[i].checked = false
        }
        navItems[0].checked = true
        that.setData({
          navItems: navItems,
          cate_id:navItems[0].id
        })

        //加载分类商品数据
        that.loadData()
      }
    })
  },
  //进入商品详情
  goDetailPage: function (e) {
    var go = function (e) {
      app.goDetailPage(e)
    }
    var data = { go, e }
    this.clickTooFast(data)
  },
  /* ===选择顶部菜单 */
  checked: function (e) {
    var that = this
    var cate_id = e.target.dataset.id;
    //点击已选中的菜单时，直接返回
    if (cate_id === that.data.cate_id) {
      return
    }else{
      that.setData({
        cate_id: cate_id,
        page: 0,
        fenlei_list: [],
        bindDownLoad: true,
        total_page:1
      })
      console.log('=====', that.data.bindDownLoad)
      that.loadData()
      var index = e.target.dataset.index;
      that.changeStyle(index)
    }

  },
  //修改顶部菜单样式
  changeStyle: function (index) {
    
    console.log('index===============', parseInt(-1/10))
    var navItems = this.data.navItems
    for (var i = 0; i < navItems.length; i++) {
      navItems[i]['checked'] = false
    };
    navItems[index]['checked'] = true
    this.setData({
      navItems: navItems
    })
  },
  // 输入搜索文字
  input: function (e) {
    var search_key = e.detail.value
    wx.setStorageSync("search_key", search_key)
    console.log(search_key)
  },
  // 确认搜索
  search: function (e) {
    var that = this
    var search_key = wx.getStorageSync('search_key')
    if (search_key.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
      wx.showToast({
        title: '请输入您要搜索的商品',
        duration: 1000
      })
    } else {
      var go = function (e) {
        wx.navigateTo({
          url: '../search2/search2'
        })
      }
      var data = { go, e }
      that.clickTooFast(data)
    }
  },
  // 下拉加载更多购物车数据
  bindDownLoad: function (e) {
    this.loadData()
  },

  /*===========
  加载数据
  ===========*/
  loadData: function (e) {
    var that = this
    console.log('parseInt(that.data.page) , parseInt(that.data.total_page)', parseInt(that.data.page), parseInt(that.data.total_page))
    if (that.data.bindDownLoad && parseInt(that.data.page) < parseInt(that.data.total_page)) {
      that.setData({
        bindDownLoad: false
      })
      //加载数据
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 600)

      let extData = wx.getExtConfigSync();
      let appid = extData.authorizer_appid;
      wx.request({
        header: {
          'data': appid
        },
        url: app.globalData.rootUrl + '/goods/cate_goods',
        data: {
          cate_id: that.data.cate_id,
          page: parseInt(that.data.page) + 1
        },
        success: function (res) {
          console.log("分类产品列表的返回", res.data)
          //返回的数据总数
          var total_goodsList = res.data.total
          //防止整除的时候最后一页一直请求，所以减1
          var total_page = parseInt((total_goodsList - 1) / res.data.per_page) + 1

          var fenlei_list = that.data.fenlei_list || []
          for (var i in res.data.data) {
            var item = {
              id: 0,
              text: '',
              subtitle: '',
              price: '',
              total: 0,
              img: '',
              biaozhi: '',
              color: "red",
              goods_id: 0
            }
            fenlei_list.push(item)
            if (res.data.data[i].image) {
              fenlei_list[fenlei_list.length - 1].img = app.globalData.imgUrl + '/' + res.data.data[i].image
            } else {
              fenlei_list[fenlei_list.length - 1].img = that.data.default_image
            }

            fenlei_list[fenlei_list.length - 1].text = res.data.data[i].name
            fenlei_list[fenlei_list.length - 1].price = res.data.data[i].goods_price
            fenlei_list[fenlei_list.length - 1].total = res.data.data[i].sales
            fenlei_list[fenlei_list.length - 1].subtitle = res.data.data[i].subtitle
            fenlei_list[fenlei_list.length - 1].id = res.data.data[i].id
            fenlei_list[fenlei_list.length - 1].goods_id = res.data.data[i].goods_id
            fenlei_list[fenlei_list.length - 1].biaozhi = res.data.data[i].labels
          }
          that.setData({
            fenlei_list: fenlei_list,
            page: res.data.current_page,
            total_page: total_page
          })
          if (fenlei_list.length > 0) {
            that.setData({
              iscart: true
            })
          } else {
            that.setData({
              iscart: false,
            });
          }
        }
      })
    }
    //2000ms之后才可以继续加载，防止加载请求过多
    setTimeout(function () {
      that.setData({
        bindDownLoad: true
      })
    }, 1000)
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
