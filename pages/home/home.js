let app =getApp()
let {singerData,playValue} =require('../../data/dataList')
Page({
  data: {
    current: 0,
    tab: 0,
    playList: singerData,
    state: 'paused',
    playIndex: 0,
    play: playValue,
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
    this.audioCtx = wx.createInnerAudioContext();
    let that =this;
    this.audioCtx.onError(function(error){
      console.log('播放失败',error)
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
  // 播放列表换曲功能
  change(e){
    console.log(e)
    this.setMusic(e.currentTarget.dataset.index)
  }
})