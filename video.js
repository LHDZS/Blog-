/**
 * Created by 10587 on 2017/10/11.
 */
//��ȡԪ��
var video = document.querySelector('video');
var play = document.querySelector('.play');
var playI = document.querySelector('.play i');
var total = document.querySelector('.total');
var current = document.querySelector('.current');
var Time = document.querySelector('.currentTime')
var dura = document.querySelector('.duration');
var screen = document.querySelector('.screen');
//����¼�
//�ж��¼����Ƿ�����ͣ���� �ǵĻ��л��ɲ��� �����෴
play.onclick = function () {
    if (video.paused) {
        //��ͣ�Ļ�ִ�в���
        video.play();
        //�л�����Ϊ��ͣ
        playI.classList.toggle('fa-pause-circle')
    }else{
        //������ͣ
        video.pause();
        //�л�����Ϊ����
        playI.classList.toggle('fa-pause-circle')
    }
}
//���ļ�׼��������ʼִ��ʱ ִ�и÷���
video.oncanplay = function () {
//��ȡ��ʱ�� ��ʱ���� duration
    var h = Math.floor(video.duration/60/60);
    var m = Math.floor(video.duration/60%60);
    var s = Math.floor(video.duration%60);
//�ж��Ƿ�����λ�� �粻����+0
    h = h>9?h:'0'+h;
    m = m>9?m:'0'+m;
    s = s>9?s:'0'+s;
//ƴ���ַ��� ������ʱ��
    total.innerHTML = h+':'+m+':'+s;

}
//���ļ���ʼ����ʱ ontimeupdate
video.ontimeupdate = function () {
//��ȡ��ǰʱ�� currentTime
    var h = Math.floor(video.currentTime/60/60);
    var m = Math.floor(video.currentTime/60%60);
    var s = Math.floor(video.currentTime%60);
//�ж��Ƿ�����λ�� �粻����+0
    h = h>9?h:'0'+h;
    m = m>9?m:'0'+m;
    s = s>9?s:'0'+s;
//ƴ���ַ��� ������ʱ��
    current.innerHTML = h+':'+m+':'+s;

//���ý�����
//�������ʱ���͵�ǰʱ���İٷֱ�
    Time.style.width = video.currentTime/video.duration*100+'%';
}
//��Ծ����
//��Time��ӵ���¼�
dura.onclick = function(e){
    //��ȡ����ڽ������ϵ�X�᳤��
    var x = e.offsetX;
    //alert(x);
    //��ȡ�������ܳ���
    var durax = this.offsetWidth;
    //alert(durax);
    //�����ǰʱ��
    video.currentTime = x/durax*video.duration;
    //alert(video.currentTime);
}
//ȫ��
screen.onclick = function (){
    if(!video.webkitFullScreenElement){
        video.webkitRequestFullscreen()
    }
    video.webkitExitFullScreen();
}

