// pages/components/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {


  },
  // 自定义函数
  scroll(e) {
    console.log(e)
  },
  sliderChanging(e){
    console.log(e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
        // 创建InnerAudioContext实例
        let audioXtc = wx.createInnerAudioContext()
        // 设置音频资源地址
         audioXtc.src ='http://isure.stream.qqmusic.qq.com/C400004IQJ3g4SlxYN.m4a?guid=2350206416&vkey=BBF34FD1FF1284E1292179D803EB982FD1487FC3A56AEE341BDCA9E4961D6B1B91595D5362AA328DAFF467ECBC1F4EC984716DDC74E9B4EE&uin=3377&fromtag=66'
        //  当播放时，输出调试信息
        audioXtc.onPlay(()=>{
          console.log('开始播放')
        })
        // 当发生错误时，输出调试信息
        audioXtc.onError((res)=>{
          console.log(res.errMsg)  //错误信息
          console.log(res.errCode) //错误码
        })
        audioXtc.play()
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

  }
})