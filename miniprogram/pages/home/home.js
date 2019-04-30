const app = getApp()

Page({
  data: {
    imgUrls: [
      '/images/b1.jpg',
      '/images/b2.jpg',
      '/images/b3.jpg'
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 800, //滑动动画时长
    indicatorColor: "white", //未选中点颜色
    indicatorActiveColor: "black", //选中点颜色
    newbook: [],
    everydaybook: [],
    jingpin: []
  },
  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database()
    db.collection('everyday').get().then(res => {
      var booklist=[]
      for (var i = 0; i < res.data.length; i++) {
        var book_id = res.data[i].book_id
        db.collection('books').where({
          _id: book_id
        }).get().then(res => {
            var book_id = res.data[0]._id
            var book_img = res.data[0].book_img
            var book_name = res.data[0].book_name
            booklist.push({
              'book_id': book_id,
              'book_img': book_img,
              'book_name': book_name
            })
            that.setData({
              everydaybook: booklist,
            })
        })
      }
    })
    db.collection('newbooks').get().then(res => {
      var booklist=[]
      for (var i = 0; i < res.data.length; i++) {
        var book_id = res.data[i].book_id
        db.collection('books').where({
          _id: book_id
        }).get().then(res => {
          var book_id = res.data[0]._id
          var book_img = res.data[0].book_img
          var book_name = res.data[0].book_name
          booklist.push({
            'book_id': book_id,
            'book_img': book_img,
            'book_name': book_name
          })
          that.setData({
            newbook: booklist
          })

        })
      }
    })
    db.collection('jingpin').get().then(res => {
      var booklist=[]
      for (var i = 0; i < res.data.length; i++) {
        var book_id = res.data[i].book_id
        db.collection('books').where({
          _id: book_id
        }).get().then(res => {
          var book_id = res.data[0]._id
          var book_img = res.data[0].book_img
          var book_name = res.data[0].book_name
          booklist.push({
            'book_id': book_id,
            'book_img': book_img,
            'book_name': book_name
          })
          that.setData({
            jingpin: booklist
          })
        })
      }
    })
  }
})