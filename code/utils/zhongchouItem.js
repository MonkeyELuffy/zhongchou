/*==========
防止快速点击
===========*/
function clickTooFast(data, that) {
  var lastTime = that.data.lastTime
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
  that.setData({
    lastTime: curTime
  })
}

function clickItem(e, that, item) {
  console.log(item)
  // var page = '../zhongchoudetail/zhongchoudetail?seller_id=' + item.seller_id
  var page = '../zhongchoudetail/zhongchoudetail'
  var go = function (e) {
    wx.navigateTo({
      url: page
    })
  }
  var data = { go, e }
  clickTooFast(data, that)
}

module.exports = {
  clickItem: clickItem,
}