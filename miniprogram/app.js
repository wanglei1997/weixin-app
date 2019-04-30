//app.js
App({
  globalData:{
    userInfo:null,
    openid:null
  },
  onLaunch: function () {
    wx.cloud.init()
  }
})
