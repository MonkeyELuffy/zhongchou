// pages/chooseType/chooseType.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: '../../img/checked.png',
    unchecked:'../../img/unchecked.png',
    typeList: [],
    nowType:null
  },
  onLoad(){
    this.loadTypeList()
  },
  sure(e){
    var nowType = this.data.nowType
    if (nowType != null){
      wx.setStorage({
        key: 'nowType',
        data: nowType,
      })
      setTimeout(function () {
        wx.navigateBack()
      }, 300)
    }else{
      wx.showToast({
        title: '请选择分类',
        mask: true
      })
    }
  },
  // 最多3个
  // chooseType(e) {
  //   var item = e.currentTarget.dataset.item
  //   var index = e.currentTarget.dataset.index
  //   var typeList = this.data.typeList
  //   var checkedNum = 0
  //   for (var i in typeList){
  //     if (typeList[i].checked){
  //       checkedNum +=1
  //     }
  //   }
  //   if (checkedNum < 3){
  //     typeList[index].checked = !typeList[index].checked
  //   }else{
  //     if (typeList[index].checked){
  //       typeList[index].checked = !typeList[index].checked
  //     }else{
  //       wx.showToast({
  //         title: '最多选择三个分类',
  //         mask:true
  //       })
  //     }
  //   }
  //   this.setData({
  //     typeList: typeList
  //   })
  // },
  // 选择一个
  chooseType(e) {
    var index = e.currentTarget.dataset.index
    var typeList = this.data.typeList
    for (var i in typeList){
      typeList[i].checked = false
    }
    typeList[index].checked = true
    this.setData({
      typeList: typeList,
      nowType: typeList[index]
    })
  },
  // 请求typeList
  loadTypeList() {
    util.httpPost(app.globalUrl + app.TopNav, {}, this.processTypeListData);
  },
  processTypeListData(res) {
    var that = this
    if (res.suc == 'y') {
      console.log('顶部菜单数据', res.data);
      for (var i in res.data) {
        res.data[i].checked = false;
      }
      this.setData({
        typeList: res.data,
      })
      var nowType = wx.getStorage({
        key: 'nowType',
        success: function (res) {
          for (var i in that.data.typeList) {
            if (that.data.typeList[i].trade_id == res.data.trade_id) {
              that.data.typeList[i].checked = true
              break
            }
          }
          that.setData({
            typeList: that.data.typeList,
            nowType: res.data
          })
        },
      })
    }
  },
})