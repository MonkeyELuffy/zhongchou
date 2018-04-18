
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

function clickSuperNav(e, that, item) {
  console.log(item)
  var go = function (e) {
    var page = item.page
    // 点击nav去到商家列表，需要trade_id
    var params = { trade_id: item.trade_id }
    page = '../' + page + '/' + page + '?params=' + JSON.stringify(params)
    wx.navigateTo({
      url: page
    })
  }
  var data = { go, e }
  clickTooFast(data, that)
}


module.exports = {
  clickSuperNav: clickSuperNav,
}