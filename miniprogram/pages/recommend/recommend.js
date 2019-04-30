// pages/recommend/recommend.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_name: '',
    book_img: '/images/bg.jpg',
    book_author: '',
    book_press: '',
    year_publish: '',
    book_price: '',
    intro_author: '',
    intro_context: '',
    recommend_time: null,
    recommender: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  doUpload: function() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        var timestamp = Date.parse(new Date())
        timestamp = timestamp / 1000
        const cloudPath = timestamp + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            that.setData({
              book_img: res.fileID
            })
            console.log(that.data.book.book_img)
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  doSubmit: function() {
    var that = this
    var date = new Date()
    var willSubmit = true
    if (that.data.book_name == '') {
      willSubmit = false
    }
    if (that.data.book_author == '') {
      willSubmit = false
    }
    if (that.data.book_press == '') {
      willSubmit = false
    }
    if (that.data.year_publish == '') {
      willSubmit = false
    }
    if (that.data.book_price == '') {
      willSubmit = false
    }
    if (that.data.intro_author == '') {
      willSubmit = false
    }
    if (that.data.intro_context == '') {
      willSubmit = false
    }

    if (willSubmit) {
      that.setData({
        recommender: app.globalData.openid,
        recommend_time: date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate()
      })
      const db = wx.cloud.database()
      db.collection('books').add({
        data: {
          book_name: that.data.book_name,
          book_img: that.data.book_img,
          book_author: that.data.book_author,
          book_press: that.data.book_press,
          year_publish: that.data.year_publish,
          book_price: that.data.book_price,
          intro_author: that.data.intro_author,
          intro_context: that.data.intro_context,
          recommend_time: that.data.recommend_time,
          recommender: that.data.recommender
        }
      }).then(res => {
        wx.showToast({
          title: '上传成功',
        })
        that.setData({
          book_name: '',
          book_img: '/images/bg.jpg',
          book_author: '',
          book_press: '',
          year_publish: '',
          book_price: '',
          intro_author: '',
          intro_context: '',
          recommend_time: null,
          recommender: null
        })
      })
    }
    else{
      wx.showToast({
        title: '请完善信息',
      })
    }
  },
  book_name: function(e) {
    this.setData({
      book_name: e.detail.value
    })
  },
  book_author: function(e) {
    this.setData({

      book_author: e.detail.value

    })
  },
  book_press: function(e) {
    this.setData({

      book_press: e.detail.value

    })
  },
  book_price: function(e) {
    this.setData({

      book_price: e.detail.value

    })
    console.log(this.data.book_price)
  },
  year_publish: function(e) {
    this.setData({

      year_publish: e.detail.value

    })
  },
  intro_author: function(e) {
    this.setData({

      intro_author: e.detail.value

    })
  },
  intro_context: function(e) {
    this.setData({

      intro_context: e.detail.value

    })
  }
})