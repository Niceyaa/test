<template>
    <div class="wrap-box">
        <div id="wrapp">
            <audio ref="audio"  id="wrap_aud" preload="auto" @ended="stop">
                <!--<source :src="audioSrc+content" type="audio/mp3">-->
                <source :src="audioSrc" type="audio/mp3">
            </audio>
            <span class="video-area-name">{{title}}</span>
        </div>
        <div class="video-container">
            <div class="text" id="controller"><span class="iconfont icon-_xiaoshipin_zanting" id="icon" @click="toggle"></span></div>
            <div class="common" :class="{'circle': classFlag}"></div>
            <div class="common" :class="{'change-out': classFlag}"></div>
            <div class="common" :class="{'change-in': classFlag}"></div>
        </div>
        <div class="repeatGetLoc">
            <button :class="{'red': redFlag}" @click="repeatGetLoc" :disabled="!canGet">重新获取</button>
        </div>
        <div class="goToList">
            语音列表&nbsp;&nbsp;
            <a href="http://dlty.china-tillage.com/test/dist/index.html#/voiceNavig">去这里</a>
        </div>
    </div>
</template>

<script>
    const v1 = require('@/assets/voice/1.mp3');
    const v2 = require('@/assets/voice/2.mp3');
    const v3 = require('@/assets/voice/3.mp3');
    const v4 = require('@/assets/voice/4.mp3');
    const v5 = require('@/assets/voice/5.mp3');
    const v6 = require('@/assets/voice/6.mp3');
    const v7 = require('@/assets/voice/7.mp3');
    const v8 = require('@/assets/voice/8.mp3');
    const v9 = require('@/assets/voice/9.mp3');
    const v10 = require('@/assets/voice/10.mp3');
    const v11 = require('@/assets/voice/11.mp3');
    export default {
        data() {
            return {
                canGet: true,
                redFlag: false,
                totalSrc: "",
                voiceID: -1,
                title: "",
                // audioSrc: "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text=",
                audioSrc: "",
                classFlag: false,
                toggleFlag: true,
                addressArr: ["桃文化林盘","红石文化林盘","贾家协议旧址","红色文化体验区","桑蚕文化林盘","星空营地","状元文化林盘","桃花仙子","国风学堂"],
                readyFlag: false
            };
        },
        methods: {
            // 初始化语音资料
            init:function(){
                this.voiceID = parseInt(this.voiceID)
                switch (this.voiceID) {
                    case 1:
                        this.title = "桃文化林盘";
                        this.audioSrc = v3;
                        break;
                    case 2:
                        this.title = "红石文化林盘";
                        this.audioSrc = v4;
                        break;
                    case 3:
                        this.title = "贾家协议旧址";
                        this.audioSrc = v5;
                        break;
                    case 4:
                        this.title = "红色文化体验区";
                        this.audioSrc = v6;
                    case 5:
                        this.title = "桑蚕文化林盘";
                        this.audioSrc = v7;
                        break;
                    case 6:
                        this.title = "星空营地";
                        this.audioSrc = v8;
                        break;
                    case 7:
                        this.title = "状元文化林盘";
                        this.audioSrc = v9;
                        break;
                    case 8:
                        this.title = "桃花仙子";
                        this.audioSrc = v10;
                        break;
                    case 9:
                        this.title = "国风学堂";
                        this.audioSrc = v11;
                        break;
                }
            },
            // 切换播放状态
            toggle(){
                // 如果直接为false  则点击播放按钮没用
                if (this.readyFlag === false) {
                    alert("音频还在准备中哦");
                    return
                }
                if (this.toggleFlag === true){
                    this.doTTS();
                }else{
                    this.stop();
                }
            },
            // 点击播放
            doTTS() {
                let audio = document.getElementById('wrap_aud');
                audio.play();
                this.classFlag = true;
                let controller = document.getElementById('icon');
                controller.className = "iconfont icon-zantingtingzhi";
                this.toggleFlag = false;
            },
            // 点击暂停
            stop(){
                var audio = document.getElementById('wrap_aud');
                audio.pause();
                var controller = document.getElementById('icon');
                controller.className = "iconfont icon-_xiaoshipin_zanting";
                this.classFlag = false;
                this.toggleFlag = true;
            },
            // 兼容ios，加载音频资料
            loadSrc(){
                var audio = document.getElementById("wrap_aud");
                audio.load();
            },
            // 获取地理位置
            getLocation() {
                this.title = "加载中...";
                let _this = this;
                AMap.plugin('AMap.Geolocation', function () {
                    var geolocation = new AMap.Geolocation({
                        // 是否使用高精度定位，默认：true
                        enableHighAccuracy: true,
                        // 设置定位超时时间，默认：无穷大
                        timeout: 10000,
                        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                        buttonOffset: new AMap.Pixel(10, 20),
                        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                        zoomToAccuracy: true,
                        //  定位按钮的排放位置,  RB表示右下
                        buttonPosition: 'RB'
                    });
                    geolocation.getCurrentPosition()
                    AMap.event.addListener(geolocation, 'complete', onComplete)
                    AMap.event.addListener(geolocation, 'error', onError)
                    function onComplete (obj) {
                        let address = obj.formattedAddress;
                        for (let i = 0; i < _this.addressArr.length; i++) {
                            // 通过判断 search 的值是否大于 -1，当if的判断条件为 -1 时，也会走 true
                            if ( address.search(_this.addressArr[i]) >= 0 ){
                                _this.readyFlag = true;
                                _this.voiceID = i+1;
                                break;
                            }
                        }
                        var res = '经纬度：' + obj.position +
                            '\n精度范围：' + obj.accuracy +
                            '米\n定位结果的来源：' + obj.location_type +
                            '\n状态信息：' + obj.info +
                            '\n地址：' + obj.formattedAddress +
                            '\n地址信息：' + JSON.stringify(obj.addressComponent, null, 4);
                        alert(res);
                        if (_this.voiceID === -1) {
                            alert("您当前位置不在景区范围内哦");
                            _this.title = "不在景区范围内";
                            return;
                        }

                        _this.canGet = true;
                        _this.title = _this.addressArr[_this.voiceID]
                        _this.init();
                        _this.loadSrc();
                    }
                    function onError (data) {
                        _this.canGet = true;
                        this.title = "定位失败";
                        alert("您当前位置不在景区导游范围内哦！");
                        // 定位出错
                    }
                })

            },
            repeatGetLoc(){
                this.canGet = false;
                this.redFlag = !this.redFlag;
                this.getLocation();
            }
        },
        created() {
            alert("温馨提示：" +"\n"+
                "为保证能够精确的定位到您当前的位置，请打开手机定位功能，谢谢！");
            this.getLocation();

        },
    };
</script>
<style>
    @import '../assets/css/iconfont.css';
    html,body{
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }
    #app{
        width: 100%;
        height: 100%;
    }
    .wrap-box{
        width: 100%;
        height: 100%;
    }
    .video-container{
        width: 100%;
        height: 100%;
        background: black;
    }
    .text, .common{
        position: absolute;
        width: 3rem;
        height: 3rem;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        border: 0.08rem solid #FF7D00;
        margin-top: -1.5rem;
        margin-left: -1.5rem;
    }
    .video-container .iconfont{
        line-height: 3rem;
        top: 0;
        font-size: 30px;
    }
    .text{
        border-color: rgba(0,0,0,0);
        color: #8b008b;
        text-align: center;
        z-index: 999;
        display: flex;
        justify-content: center;

    }
    .repeatGetLoc{
        position: absolute;
        bottom: 60px;
        left: 0;
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .repeatGetLoc > button {
        border: none;
        background: lightgoldenrodyellow;
        font-size: 20px;
        padding: 10px 15px;
        font-weight: bold;
        -webkit-border-radius: 27px;
        -moz-border-radius: 27px;
        border-radius: 27px;
    }
    .red{
        color: red;
    }

    .goToList{
        position: absolute;
        left: 0;
        bottom: 30px;
        display: flex;
        justify-content: center;
        width: 100%;
        font-size: 14px;
        color: #fff;
    }
    .goToList a{
        text-underline: none;
    }
    .goToList > a:active{
        color: gold;
    }
    .goToList > a:visited{
        color: gold;
    }
    .goToList > a:link{
        color: gold;
    }

    .video-area-name{
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.5rem;
        color: white;
        /*background:-webkit-linear-gradient(top,#ff0000,#ffff00 50%, #F8F8FF 51%,#4B0082);*/
        /*-webkit-background-clip:text;*/
        /*-webkit-text-fill-color:transparent;*/
    }
    .circle{
        border-top-color: gold;
        animation: cool-change 1s linear infinite;
    }
    .change-out{
        animation: change 2s linear infinite;
    }
    .change-in{
        animation: change 2s linear 1s infinite;
    }

    .showText{
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 100%;
        height: 200px;
        color: #FFF;
        font-size: 16px;
        padding: 5px 50px;
        overflow: scroll;
        text-align: center;

    }
    .showText::-webkit-scrollbar{
        width: 0 !important;
    }

    @keyframes change {
        0%{ transform: scale(1); border: 1px solid #864b12; }
        100%{ transform: scale(2); border: 1px solid #864b12; }
    }
    @keyframes cool-change {
        0%{ transform: rotate(0deg); }
        100%{ transform: rotate(360deg); }
    }

    @media (min-width: 320px) and (min-width: 340px) {
        html {
            font-size: 45.33333333px;
        }
    }
    @media (min-width: 320px) and (min-width: 340px) and (min-width: 360px) {
        html {
            font-size: 48px;
        }
    }
    @media (min-width: 320px) and (min-width: 340px) and (min-width: 360px) and (min-width: 400px) {
        html {
            font-size: 53.33333333px;
        }
    }
    @media (min-width: 320px) and (min-width: 340px) and (min-width: 360px) and (min-width: 400px) and (min-width: 414px) {
        html {
            font-size: 55.2px;
        }
    }
    @media (min-width: 320px) and (min-width: 340px) and (min-width: 360px) and (min-width: 400px) and (min-width: 414px) and (min-width: 424px) {
        html {
            font-size: 56.53333333px;
        }
    }
    @media (min-width: 320px) and (min-width: 340px) and (min-width: 360px) and (min-width: 400px) and (min-width: 414px) and (min-width: 424px) and (min-width: 480px) {
        html {
            font-size: 64px;
        }
    }
    @media (min-width: 320px) and (min-width: 340px) and (min-width: 360px) and (min-width: 400px) and (min-width: 414px) and (min-width: 424px) and (min-width: 480px) and (min-width: 530px) {
        html {
            font-size: 70.66666667px;
        }
    }
    @media (min-width: 320px) and (min-width: 340px) and (min-width: 360px) and (min-width: 400px) and (min-width: 414px) and (min-width: 424px) and (min-width: 480px) and (min-width: 530px) and (min-width: 640px) {
        html {
            font-size: 85.33333333px;
        }
    }
    @media (min-width: 320px) and (min-width: 340px) and (min-width: 360px) and (min-width: 400px) and (min-width: 414px) and (min-width: 424px) and (min-width: 480px) and (min-width: 530px) and (min-width: 640px) and (min-width: 720px) {
        html {
            font-size: 96px;
        }
    }
    @media (min-width: 320px) and (min-width: 340px) and (min-width: 360px) and (min-width: 400px) and (min-width: 414px) and (min-width: 424px) and (min-width: 480px) and (min-width: 530px) and (min-width: 640px) and (min-width: 720px) and (min-width: 750px) {
        html {
            font-size: 100px;
        }
    }
</style>
