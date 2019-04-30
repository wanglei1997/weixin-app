// miniprogram/pages/book_info/book_info.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    newcomment: '',
    username: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var book_id = options.book_id
    const db = wx.cloud.database()
    db.collection('books').where({
      _id: book_id
    }).get().then(res => {
      that.setData({
        book: res.data[0]
      })
    })
    db.collection('comments').where({
      book_id: book_id
    }).get().then(res => {
      that.setData({
        comments: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getComment: function(e) {
    this.setData({
      newcomment: e.detail.value
    })
  },
  doComment: function() {
    if (this.data.newcomment == '') {
      wx.showToast({
        title: '请输入你的评论',
      })
    } else {
      var that = this
      const db = wx.cloud.database()
      db.collection('users').where({
        _openid: app.globalData.openid
      }).get().then(res => {
        that.setData({
          username: res.data[0].name
        })
        var date = new Date()
        var review_date = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
        db.collection('comments').add({
          data: {
            book_id: that.data.book._id,
            book_img:that.data.book.book_img,
            book_name:that.data.book.book_name,
            comment: that.data.newcomment,
            reviewer: app.globalData.openid,
            reviewer_name: that.data.username,
            review_date: review_date
          }
        }).then(res=>{
          that.setData({
            newcomment:''
          })
        })
        that.data.comments.push({
          book_id: that.data.book._id,
          book_img: that.data.book.book_img,
          book_name: that.data.book.book_name,
          comment: that.data.newcomment,
          reviewer: app.globalData.openid,
          reviewer_name: that.data.username,
          review_date: review_date
        })
        that.setData({
          comments: that.data.comments
        })
      })
    }
  }
})