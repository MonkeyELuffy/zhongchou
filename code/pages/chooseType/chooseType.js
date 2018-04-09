// pages/chooseType/chooseType.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: '../../img/checked.png',
    unchecked:'../../img/unchecked.png',
    typeList: [
      {
        name: '农林牧渔',
        id: 0,
        checked: false
      },
      {
        name: '农林牧渔',
        id: 1,
        checked: false
      },
      {
        name: '农林牧渔',
        id: 2,
        checked: false
      },
      {
        name: '农林牧渔',
        id: 3,
        checked: false
      },
      {
        name: '农林牧渔',
        id: 4,
        checked: false
      },
      {
        name: '农林牧渔',
        id: 5,
        checked: false
      },
      {
        name: '农林牧渔',
        id: 6,
        checked: false
      },
    ]
  },
  chooseType(e) {
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    var typeList = this.data.typeList
    var checkedNum = 0
    for (var i in typeList){
      if (typeList[i].checked){
        checkedNum +=1
      }
    }
    if (checkedNum < 3){
      typeList[index].checked = !typeList[index].checked
    }else{
      if (typeList[index].checked){
        typeList[index].checked = !typeList[index].checked
      }else{
        wx.showToast({
          title: '最多选择三个分类',
          mask:true
        })
      }
    }
    this.setData({
      typeList: typeList
    })
  },
})