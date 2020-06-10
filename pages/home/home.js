Page({
  data: {
    current: 0,
    tab: 0,
    playList: [
      {
        id: 2,
        title: '一点点',
        singer: '陈意涵',
        src: 'http://isure.stream.qqmusic.qq.com/C400004IQJ3g4SlxYN.m4a?guid=2350206416&vkey=BBF34FD1FF1284E1292179D803EB982FD1487FC3A56AEE341BDCA9E4961D6B1B91595D5362AA328DAFF467ECBC1F4EC984716DDC74E9B4EE&uin=3377&fromtag=66',
        coverImgUrl: '/pages/images/zly.jpeg'
      },
      {
        id: 1,
        title: '莲花',
        singer: '周延',
        src: 'http://ws.stream.qqmusic.qq.com/C400003PM62v4FyOqS.m4a?guid=2350206416&vkey=48A46C79CB55C30D65D65E3C5BE3A640C6EBE606B1346C6202E0BB1271BDC72AC6A14C4041932A7077EA0D7A04CD05CDA727A5FD513EDFF0&uin=3377&fromtag=66',
        coverImgUrl: '/pages/images/zly.jpeg'
      },
      {
        id: 3,
        title: '命中注定',
        singer: '丁当',
        src: 'http://39.130.175.145/amobile.music.tc.qq.com/C400002mMW4D0I8fI8.m4a?guid=2350206416&vkey=7BE9481D114E436756D002D996AD16624040FA907F5BF902878F7C3AB83187A3D81B7B29185D127152ECCDC79D1A7690603E006D4C4B002A&uin=3377&fromtag=66',
        coverImgUrl: '/pages/images/zly.jpeg'
      },
    ],
    state: 'paused',
    playIndex: 0,
    play: {
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      title: '莲花',
      singer: '周延',
      coverImgUrl: '/pages/images/zly.jpeg'
    },
  },
  audioCtx: null,
  changeBar(e) {
    this.setData({
      current: e.detail.currentItemId,
      tab: e.detail.currentItemId
    })
  },
  changeItem(e) {
    let indexVal = e.target.dataset.item
    this.setData({
      current: indexVal
    })
  },
  changeTab(e) {
    console.log(e)
    this.setData({
      tab: e.detail.current
    })
  },
  onReady: function () {
    console.log(this.audioCtx)
    this.audioCtx = wx.createInnerAudioContext();
    let that =this;
    this.audioCtx.onError(function(error){
      console.log('播放失败'+this.audioCtx.src)
    })
    // 播放完成自动换下一曲
    this.audioCtx.onEnded(function(){
      that.next()
    })
    // 自动更细播放进度
    this.audioCtx.onPlay(function(){})
    this.audioCtx.onTimeUpdate(function(){
      that.setData({
        'play.currentTime': formatTime(that.audioCtx.currentTime),
        'play.duration': formatTime(that.audioCtx.duration),
        'play.percent': that.audioCtx.currentTime/that.audioCtx.duration*100,
      })
    })
    // 默认选择第一曲
    this.setMusic(0)
    // 格式化时间
    function formatTime(time){
      let minute = Math.floor(time/60)%60;
      let second = Math.floor(time)%60;
      let val =(minute<10?'0'+minute:minute)+":"+(second<10?'0'+second:second)
      return val
    }
  },
  setMusic(index) {
    let music = this.data.playList[index];
    this.audioCtx.src = music.src;
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': 0,

    })
  },
  // 设置当前进度条的值
  sliderChange(e){
      let second = e.detail.value*this.audioCtx.duration/100;
      this.audioCtx.seek(second)
  },
  // 显示列表
  changePage() {

  },
  // 播放
  play() {
    console.log(this.data.state)
    this.audioCtx.play();
    this.setData({
      state: 'running'
    })
  },
  // 暂停
  pause() {
    this.audioCtx.pause();
    this.setData({
      state: 'paused'
    })
  },
  // 下一曲
  next() {
    console.log(this.data.playIndex)
   let index=this.data.playIndex>=this.data.playList.length-1?0:this.data.playIndex+1;
   console.log(index)
   this.setMusic(index)
   if(this.data.state === 'running'){
     this.play()
   }
  },
})