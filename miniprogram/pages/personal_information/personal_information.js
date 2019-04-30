// miniprogram/pages/personal_information/personal_information.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      _id:'',
      _openid:'',
      name:'',
      age:'',
      sex:'',
      birthday:'',
      hobby:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db=wx.cloud.database()
    db.collection('users').where({
      _openid:app.globalData.openid
    }).get().then(res=>{
      if(res.data.length==0){
        db.collection('users').add({
          data:{
            _openid:app.globalData.openid,
            name:app.globalData.userInfo.nickName,
            age:0,
            sex:'不显示',
            birthday:'1900/01/01',
            hobby:''
          }
        }).then(res2=>{
        }).catch(console.error)
      }
      else{
        var u=res.data
        this.setData({
            _id:u[0]._id,
            _openid: u[0]._openid,
            name: u[0].name,
            age: u[0].age,
            sex: u[0].sex,
            birthday: u[0].birthday,
            hobby: u[0].hobby
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  name:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  age: function (e) {
    this.setData({
      age: e.detail.value
    })
  },
  sex: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  birthday: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  hobby: function (e) {
    this.setData({
      hobby: e.detail.value
    })
  },

  changeinfo:function(){
    var that = this
    const db=wx.cloud.database()
    db.collection('users').doc(that.data._id)
    .update({
      data:{
        name: that.data.name,
        age: that.data.age,
        sex: that.data.sex,
        birthday: that.data.birthday,
        hobby: that.data.hobby,
      }
    }).then(res=>{
      console.log(that.data)
    })
  }
})