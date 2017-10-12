/**
 * Created by 10587 on 2017/10/11.
 */
//获取元素
var video = document.querySelector('video');
var play = document.querySelector('.play');
var playI = document.querySelector('.play i');
var total = document.querySelector('.total');
var current = document.querySelector('.current');
var Time = document.querySelector('.currentTime')
var dura = document.querySelector('.duration');
var screen = document.querySelector('.screen');
//点击事件
//判断事件中是否有暂停属性 是的话切换成播放 否则相反
play.onclick = function () {
    if (video.paused) {
        //暂停的话执行播放
        video.play();
        //切换类名为暂停
        playI.classList.toggle('fa-pause-circle')
    }else{
        //否则暂停
        video.pause();
        //切换类名为播放
        playI.classList.toggle('fa-pause-circle')
    }
}
//当文件准备就绪开始执行时 执行该方法
video.oncanplay = function () {
//获取总时长 的时分秒 duration
    var h = Math.floor(video.duration/60/60);
    var m = Math.floor(video.duration/60%60);
    var s = Math.floor(video.duration%60);
//判断是否是两位数 如不是则+0
    h = h>9?h:'0'+h;
    m = m>9?m:'0'+m;
    s = s>9?s:'0'+s;
//拼接字符串 放入总时长
    total.innerHTML = h+':'+m+':'+s;

}
//当文件开始播放时 ontimeupdate
video.ontimeupdate = function () {
//获取当前时长 currentTime
    var h = Math.floor(video.currentTime/60/60);
    var m = Math.floor(video.currentTime/60%60);
    var s = Math.floor(video.currentTime%60);
//判断是否是两位数 如不是则+0
    h = h>9?h:'0'+h;
    m = m>9?m:'0'+m;
    s = s>9?s:'0'+s;
//拼接字符串 放入总时长
    current.innerHTML = h+':'+m+':'+s;

//设置进度条
//计算出总时长和当前时长的百分比
    Time.style.width = video.currentTime/video.duration*100+'%';
}
//跳跃播放
//给Time添加点击事件
dura.onclick = function(e){
    //获取鼠标在进度条上的X轴长度
    var x = e.offsetX;
    //alert(x);
    //获取进度条总长度
    var durax = this.offsetWidth;
    //alert(durax);
    //算出当前时长
    video.currentTime = x/durax*video.duration;
    //alert(video.currentTime);
}
//全屏
screen.onclick = function (){
    if(!video.webkitFullScreenElement){
        video.webkitRequestFullscreen()
    }
    video.webkitExitFullScreen();
}

