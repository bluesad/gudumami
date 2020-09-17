/**********************************播放器相关**************************************************/
/**
 * 全局播放器对象(为不同域名提供)
 * @type {null}
 */
var playerObj = null;
/** 引入弹框样式***/
$(function(){
    $("head").append("<link>");
    css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        type: "text/css",
        href: zumaURL+"/audio_web/audio/css/addSong.css"
    });
})
var frameTag = null;
if(document.getElementById("iframeInner")){

}else{

    frameTag = document.createElement("iframe");
    frameTag.src=zumaURL+"/audio_web/audio/dataframe.html";

    frameTag.id="iframeInner";
    frameTag.style.height="0px";
    frameTag.style.width="0px";
    frameTag.style.display="none";
// frameTag.sandbox='allow-same-origin allow-scripts';
    document.getElementsByTagName("body")[0].appendChild(frameTag );
    var openTimer = null;
    var flag = 0;
    window.addEventListener("message",function(event){
        // alert(event);
        if(event.origin.indexOf("zuma.com")>-1){
            if(event.data=="audio1"){
                // window.open(zumaURL +"/audio_web/audioPlay/player","zumaMusicPlayer");
                window.open(zumaURL +"/player","zumaMusicPlayer");
            }else if(event.data=="audio0"){
                // 点击音频播放小弹窗
                $("body").append('<div class="addToplayer" style="display: block;z-index:6001;"><div class="addimg"><i class="addS-icon"></i></div><p class="font-14">已添加至播放器！</p></div>');
                setTimeout(function() {
                    $(".addToplayer").remove();
                }, 1000);
            }else{
                return ;
            }
        }
    });
}
/**
 * 跳转播放页公共方法(musicIds:(要播放的音频ID字符串,多个音频ID以英文逗号“,”分割),isMV:(要播放的是否是MV,0:否,1:是),isPlay:(是否立即播放,0:否,1:是))
 * dbSource : member 会员库 employee 员工库
 * listType:0-临时列表 1-播放历史 3-我喜欢的
 */
function toMusicPlayer(musicIdStr, isMV, isPlay, dbSource,nowlistType) {
    console.log("------------------------要播放的音频数据----------------------------");
    console.log("要播放的音频ID:" + musicIds);
    console.log("是否是MV(0:否,1:是):" + isMV);
    console.log("是否立即播放(0:否,1:是):" + isPlay);
    if(nowlistType){
        playerAddMusic(null, isMV, isPlay,nowlistType);// 向播放器添加音频
        return ;
    }
    var url = zumaURL+"/audio_web/audioPlay/playMusicList";// 获取要播放的音频
    var musicListArr = [];
    var musicIdArr = musicIdStr.toString().split(",");
    var musicIds = [];
    for (var i = 0; i < musicIdArr.length; i++) {
        // musicIdArr.push(musicIdArr[i]);
        if(musicIdArr[i]!=""){
            var temp = {};
            musicIds.push(parseInt(musicIdArr[i]))
            temp.fId = parseInt(musicIdArr[i]);
            temp.fDbsource = dbSource;
            musicListArr.push(temp);
        }
    }
    var obj = {};
    obj.fMusicIds = musicIds;
    obj.playBeanList = musicListArr;
    // var obj;// AJAX请求返回的数据
    $.ajax({ // AJAX请求数据
        url : url,
        type : "post",
        async : false,
        data : JSON.stringify(obj),
        dataType : "json",
        contentType : "application/json",
        success : function(result) {
            if (result.status == 0) {// 请求数据是否成功
                console.log("请求数据成功:");
                console.log(result);
                if (result.data != null) {
                    var musicList = result.data.musicList;// 音频集合
                    if (musicList != null && musicList.length > 0) {
                        var dataObj = {
                            musicList:musicList,
                            isMV:isMV,
                            isPlay:isPlay,
                            nowlistType:0,
                        }
                        frameTag.contentWindow.postMessage(dataObj,"*");
                        // playerAddMusic(musicList, isMV, isPlay,0);// 向播放器添加音频
                    } else {
                        return;
                    }
                } else {
                    return;
                }
            } else {
                console.log("请求数据失败:");
                console.log(result);
                return;
            }
        }
    });
    console.log("-------------------------------------------------------------------");
}
/**
 * 检测是否支持WebSocket
 * @returns {boolean}
 */
function check_support_websocket() {
    return typeof WebSocket != 'undefined';
}

/**
 * 数据更新WebSocket
 * @type {null}
 */
var initStatus = false;
var ws = null;
var wsSetInterval=null;
var linkType = 0; //连接类型，0:播放器

var listType = cookie.get("zm_play_list_type")||0;// 当前播放器播放列表类型

/*function initPlayerWebSocket(){
    if(check_support_websocket()){
        ws = new WebSocket("ws://192.168.0.126:8070/audio_web/webSocketServer?type="+linkType);
    }else{
        var sockjsScript = document.createElement('script');
        sockjsScript.src='https://cdn.bootcss.com/sockjs-client/1.1.4/sockjs.min.js';
        sockjsScript.type='text/javascript';
        document.body.append(sockjsScript);
        ws  = new SockJS("http://192.168.0.126:8070/audio_web/sockjs/webSocketServer?type="+linkType);
    }
    ws.onopen = function() { /!* 连接成功时 *!/
        ws.send("initSuccess");
        wsSetInterval = setInterval(function(){
            if(ws&&ws.readyState==1){
                ws.send("播放器WebSocket连接还活着！");
            }
        },899000);
        /!*wsSetInterval = setInterval(function(){
            if(ws&&ws.readyState==1){
                ws.send("播放器WebSocket连接还活着！");
            }
        },9000);*!/

    };
    ws.onmessage = function (evt){ /!* 收到消息时 *!/
        initStatus = true;
        var received_msg = evt.data;
        if(received_msg&&received_msg!=""){
            var res = JSON.parse(received_msg);
            if(res.status==0&&res.message=="0"){
                console.log(res.data);
            }else if(res.status==0&&res.message=="1"){

             }else if(res.status==0&&res.message=="2"){
                var dataStr = res.data;
                if(dataStr.startsWith("{")){
                    var data = JSON.parse(dataStr);
                    var isMV = data.isMV;
                    var isPlay = data.isPlay;
                    var nowlistType = data.listType;
                    var audioList = data.audioList;
                    // cookie.set("zm_player_open",1);
                    playerAddMusic(audioList,isMV,isPlay,nowlistType);
                }
            }else if(res.status==0&&res.message=="3"){

            }else if(res.status==0&&res.message=="4"){

            }else if(res.status==0&&res.message=="5"){
                 console.log("播放器"+res.data);
            }
        }
        console.info("Message is received... " + received_msg);
    };
    ws.onclose = function() { /!* 连接断开时 *!/
        clearInterval(wsSetInterval);
        console.warn("Connection is closed...");
    };
    ws.onerror = function(e) { /!* 出现错误时 *!/
        console.error(e);
    }
}
initPlayerWebSocket();*/
/**
 * 向播放器添加音频(musicList:(要播放的音频信息集合),
 * isMV:(要播放的是否是MV,0:否,1:是),
 * isPlay:(是否立即播放,0:否,1:是))
 * nowlistType:0-临时列表 1-播放历史 3-我喜欢的
 */
function playerAddMusic(musicList, isMV, isPlay,nowlistType) {
    console.log(musicList);
    /**
     * 跳转播放页公共方法toMusicPlayer(musicIds:(要播放的音频ID,多个音频ID以“,”分割),isMV:(要播放的是否是MV,0:否,1:是),isPlay:(是否立即播放,0:否,1:是))
     *
     * 存入Cookie的值说明;
     * zm_player_open:判断播放器是否打开(打开:zm_player_open=1;关闭:zm_player_open=0)
     * zm_play_isMV:判断要播放的是否是MV(是:zm_play_isMV=1;否:zm_play_isMV=0)
     * zm_play_list_type:当前播放器播放列表类型(正在播放=-1,播放历史=-2,我的收藏=-3,全部音频=0,歌单=歌单的ID)
     * zm_play_index:当前播放器播放的音频下标(从0开始) zm_play_order:页面播放顺序(默认0:顺序播放)
     * zm_player_set:播放器设置(两个值用“|”分割(例:“0|1”),第一个值:是否保留播放历史(0:不保留,1:保留),第二个值:新增播放设置(0:立即播放,1:添加到播放列队末尾,2:下一首播放),)
     * 播放器设置默认值(1|0),保留播放历史,立即播放;
     *
     * 存入localStorage的值说明; zm_player_update:数据更新时间戳;
     * zm_player_music_list:当前播放器音频列表集合(JSON格式存储);
     * zm_player_music_history:当前播放器音频历史列表集合(JSON格式存储);
     * zm_player_mv_list:当前播放器MV播放列表集合(JSON格式存储);
     * zm_player_addMusic:要添加到播放器的音频(JSON格式存储)(addPlayList:添加到播放列表(musicList:要添加到播放列表的音频
     * ,isPlay:是否立即播放(0:否，1:是)))
     *
     */

    var playerUrl = zumaURL+"/player";
    var playerIsOpen = parseInt(cookie.get("zm_player_open"));// 获取Cookie值判断播放器是否打开
    var isSaveHistory = 1;// 是否保留播放历史标识(0:不保留,1:保留)
    var newPlaySet = 0;// 新增播放设置标识(0:立即播放,1:添加到播放列队末尾,2:下一首播放)
    var playerSet = cookie.get("zm_player_set");// 读取保存在Cookie的播放器设置项
    if (playerSet) {// 判断Cookie是否存有设置项,如果没有则添加默认设置
        var t = playerSet.split("|");
        isSaveHistory = t[0];
        newPlaySet = t[1];
        if(newPlaySet!=0){
            isPlay=0;
        }
    } else {// 播放器设置默认值
        cookie.set("zm_player_set", "1|0");
    }

    console.log("播放器设置:" + playerSet);
    cookie.set("zm_play_isMV", isMV);// 要播放的是否是MV,isMV:(0:否，1:是)
    listType = nowlistType;
    cookie.set("zm_play_list_type", nowlistType);//要播放列表类型
    if(musicList){
        var timestamp = new Date().getTime();// 获取当前系统时间戳
        localStorage.setItem("zm_player_update", timestamp); // 向本地存入时间戳
        var addPlayList = {
            "addPlayList" : {
                "musicList" : musicList,
                "isPlay" : isPlay
            }
        };// 要添加到播放列表数据
        // 判断播放器是否打开
        if (playerIsOpen != 1) {// 播放器未打开
            console.log("播放器未打开:" + playerIsOpen);
            // 判断zm_play_index的值
            if ((cookie.get("zm_play_index") == '') || (cookie.get("zm_play_index") == 0)) {
                if (cookie.get("zm_play_index") == '') {// 判断zm_play_index的值是否是空
                    localStorage.removeItem("zm_player_music_list")// 清除zm_player_music_list
                    localStorage.removeItem("zm_player_mv_list")// 清除zm_player_mv_list
                    // 清空当前播放器音频历史列表集合
                    localStorage.setItem("zm_player_music_history", JSON.stringify({
                        "musicPlayHistory" : {
                            "musicList" : null
                        }
                    }));
                    if (isMV == 0) {
                        //音频临时列表
                        localStorage.setItem("zm_player_music_list", JSON.stringify({
                            "musicPlayList" : {
                                "musicList" : musicList
                            }
                        }));// 播放器正在播放列表的音频
                    } else {
                        //MV播放历史列表
                        localStorage.setItem("zm_player_mv_history",JSON.stringify({
                            "mvPlayHistory" :{
                                "mvList" : musicList
                            }
                        }));// 播放器mv播放历史列表
                    }
                }
                if (cookie.get("zm_play_index") == 0) {// 判断zm_play_index的值是否是0
                    if (isMV == 0) {
                        var list = localStorage.getItem("zm_player_music_list"); // 获得要正在播放的音频
                        // 列表
                        if (list != null) {
                            var playList = JSON.parse(list).musicPlayList.musicList;// JSON转换JSON对象
                            if (playList.length > 0) {
                                // 保存要添加到播放列表的音频
                                localStorage.setItem("zm_player_addMusic", JSON.stringify(addPlayList));
                            } else {
                                // 播放器正在播放列表的音频
                                localStorage.setItem("zm_player_music_list", JSON.stringify({
                                    "musicPlayList" : {
                                        "musicList" : musicList
                                    }
                                }));
                            }
                        } else {
                            // 播放器正在播放列表的音频
                            localStorage.setItem("zm_player_music_list", JSON.stringify({
                                "musicPlayList" : {
                                    "musicList" : musicList
                                }
                            }));
                        }
                    } else {
                        // var list = localStorage.getItem("zm_player_mv_list"); // 获得要正在播放的音频
                        var list = localStorage.getItem("zm_player_mv_history"); // 获得要播放历史音频
                        //var playList = JSON.parse(list).mvPlayList.mvList;// JSON转换JSON对象
                        localStorage.setItem("zm_player_addMusic", JSON.stringify(addPlayList));
                        localStorage.setItem("zm_player_mv_history",JSON.stringify({
                            "mvPlayHistory" :{
                                "mvList" : musicList
                            }
                        }));// 播放器mv播放历史列表
                    }
                }
            } else {
                localStorage.setItem("zm_player_addMusic", JSON.stringify(addPlayList));// 保存要添加到播放列表的音频
            }
            cookie.set("zm_play_index", 0);// 保存播放的音频下标
            // 设置当前播放器播放列表类型
            playerObj = window.open(playerUrl, "zumaMusicPlayer");// 打开播放器
/*            if(isMV==0&&playerObj){
                setTimeout(function(){
                    playerObj.$(".audio-play .play-icon").click();
                },4000);
            }*/
        } else {// 播放器已打开
            console.log("播放器已打开:" + playerIsOpen);
            var mateUrl=window.location.href;
            if(mateUrl.indexOf("audioPlay")=="-1"){
                // 点击音频播放小弹窗
                $("body").append('<div class="addToplayer" style="display: block;z-index:6001;"><div class="addimg"><i class="addS-icon"></i></div><p class="font-14">已添加至播放器！</p></div>');
                setTimeout(function() {
                    $(".addToplayer").remove();
                }, 1000);
            }

            // 新增播放设置标识
            if ((newPlaySet == 0) || (isPlay == 1)) {
                // 设置当前播放器播放列表类型
                cookie.set("zm_play_list_type", 0);
            } else if (newPlaySet == 1) {

            } else if (newPlaySet == 2) {

            }
            localStorage.setItem("zm_player_addMusic", JSON.stringify(addPlayList));// 保存要添加到播放列表的音频
        }
    }else{
        cookie.set("zm_play_index", 0);// 保存播放的音频下标
        // getPlayList(isMV);
        playerObj = window.open(playerUrl, "zumaMusicPlayer");// 打开播放器
/*        if(isMV==0&&playerObj){
            setTimeout(function(){
                playerObj.$(".audio-play .play-icon").click();
            },4000);
        }*/
    }
}
