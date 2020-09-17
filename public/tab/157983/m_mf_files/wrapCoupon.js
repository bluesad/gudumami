/*// 使用方法 // 分享扫码 解析url 带的参数 1 pageType ="giftShare"' 2 &pageType = "sigh" && fReceiveId = ' + _this.fReceiveId 
                                       3 &pageType ="couponShare"'
    let obj=new wrapcouponGift(2,'giftShare',fReceiveId);
    **********************************************************************************************************
*/

/*页面说明// 赠品页面  （签到页面 pageHtml1 + 签到完成页面 pageHtml2 ）
                      （消费满XX元方式分享后的领取页面 pageHtml1 + 消费满XX元方式分享后的领取后再分享页面 pageHtml2 
                        + 消费满XX元方式分享后的领取后券不够 pageHtml3 ）

// 新人礼品页面  （新客有礼券 pageHtml1 + 新客有礼券领取后 pageHtml2）
****************************************************************************************************************

*/
var token;
var util = {
    getcookie(key) {
        let str = document.cookie.replace(/;\s*/, ';');
        let cookieArr = str.split(';');
        let cookieObj = {};
        let len = cookieArr.length;
        for (let i = 0; i < len; i++) {
            let item = cookieArr[i];
            let k = item.split('=')[0].replace(/(^\s*)|(\s*$)/g, "");
            let v = item.split('=')[1];
            cookieObj[k] = v;
        }
        if (cookieObj[key]) {
            return decodeURIComponent(cookieObj[key]);
        } else {
            return false;
        }
    },
    remove(key) {
        document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        if (!util.getcookie(key)) {
            console.log('删除成功');
        } else {
            console.log('删除失败');
        }


    },
};
token = util.getcookie("token");

class wrapcouponGift {
    constructor(id,imgPath,apiPath) {
        this.id = id  //传入 id  查询id
        this.imgPath = imgPath || './img'  //传入 图片路劲
        this.apiPath = apiPath || 'http://www.zuma.com' //传入 接口路劲
        this.pageHtml1 = ''
        this.pageHtml2 = ''
        this.pageHtml3 = ''
        this.receiveId = '' //接口获取 领券id
        this.linkUrl = '' //接口获取 赠品券直接领券跳转地址
        this.btnFlag = true;
        this. _couponinit();
    }
    async getPage() {
        await this.getShareData()
    }
    // 分享信息  +  新客有礼信息 (一个接口)
    async getShareData(){
        let _this = this
        await $.ajax({
            // url: "http://www.dev-zuma.com/z-coupon/shop/show?fShopId=835&fDisplayPage=1",
            url: "/z-coupon/shop/show?fId=" + this.id,
            type: "get",
            success: function (res) {
                if(res.status === 0){
                    console.log(res, "券信息成功");
                    var data = res.coupon,
                    fBeginTime = _this.timerFormat(data.fBeginTime,'年'),
                    fEndTime = _this.timerFormat(data.fEndTime,'年');
                    let timeTxt;
                    if(fEndTime == '永久有效'){
                        timeTxt = '永远有效'
                    }else{
                        timeTxt = '请在' + fEndTime + '前使用'
                    }
                    if (data.fCouponType === 3) { //赠品券
                        var strBtn, strBtn2;
                        if(res.isReceive === 0){  
                            strBtn = '<span class="noSignBtn sighBtn">已领取</span>'
                        }else{
                            if(data.fUseRule === 3){
                                strBtn = '<span class="noSignBtn" id="couponBtn3">我要领券</span>'
                            }else if(data.fUseRule === 2){
                                strBtn = '<span class="noSignBtn" id="couponBtn2">领券并提货</span>'
                            }else if(data.fUseRule === 1){
                                strBtn = '<span class="noSignBtn" id="couponBtn1">领取并通知好友</span>'
                            }
                        }
                        if(data.fUseRule === 3){
                            strBtn2 = '<span>消费满<i>'+ data.fConsumeAmount/100 +'</i>即可领取！</span>'
                        }else if(data.fUseRule === 2){
                            strBtn2 = '<span>直接领取！</span>'
                        }else if(data.fUseRule === 1){
                            strBtn2 = '<span>征集到<i>'+ data.fForwardNum +'</i>个签到，即可领取！</span>'
                        }  
                        // <!--消费满XX元方式分享后的领取页面 -->  
                       _this.pageHtml1 = `<div class="coupon-mask">
                       <div class="coupon-main">
                       <div class="coupon-imgBody">
                           <img src="${_this.imgPath}/wrapPresent22.png" alt="优惠券">
   
                           <section class="coupon-imgBody-cont coupon-imgBody-cont2">
                               <div class="coupon-imgBody-contgoods coupon-imgBody-contgoods1">
                                   <figure>
                                       <img class="coupon-imgBody-contgoodsL" src="${data.pOrSImage ? data.pOrSImage : _this.imgPath +'/111.png'}" alt="赠品">
                                   </figure>
                                   <div class="coupon-imgBody-contgoodsR">
                                       <h3>${data.pOrSName}</h3>
                                       <span>￥0 <i>￥${data.pOrSPrice == null?'0':data.pOrSPrice}</i></span>
                                   </div>
                               </div>
   
                               <div class="coupon-imgBody-contBtn coupon-imgBody-contBtn2">
                                   ${strBtn}
                                   <span id="sharerules" class="noSignBtn shareBtn">分享转发</span>
                                   <div class="coupon-imgBody-cite coupon-imgBody-cite1">
                                           ${strBtn2}
                                       <br>有效期：${fBeginTime }~${fEndTime}</div>
                               </div>
                           </section>
   
                             </div>
                             <span class="coupon-close close-mask"><img src="${_this.imgPath}/close.png" alt=""></span>
                        </div>
                       </div>
                       `
                    //    <!-- 消费满XX元方式分享后的领取后再分享页面 -->
                        _this.pageHtml2 = `<div class="coupon-mask">
                        <div class="coupon-main">
                        <div class="coupon-imgBody coupon-imgBody2">
                            <img src="${_this.imgPath}/wrapPresent25.png" alt="优惠券">
    
                            <section class="coupon-imgBody-cont coupon-imgBody-cont3">
                                <div class="coupon-imgBody-contgoods coupon-imgBody-contgoods1">
                                    <figure>
                                        <img class="coupon-imgBody-contgoodsL" src="${data.pOrSImage ? data.pOrSImage : _this.imgPath +'/111.png'}" alt="赠品">
                                    </figure>
                                    <div class="coupon-imgBody-contgoodsR">
                                        <h3>${data.pOrSName}</h3>
                                        <span>￥0 <i>￥${data.pOrSPrice == null?'0':data.pOrSPrice}</i></span>
                                    </div>
                                </div>
    
                                <div class="coupon-imgBody-contBtn coupon-imgBody-contBtn3">
                                    <span id="sharerules2" class="noSignBtn">立即分享</span>
                                    <div class="coupon-imgBody-cite">有效期：<i>${fEndTime != '永久有效' ? '请在'+ fEndTime +'前使用':'永久有效'}</i></div>
                                </div>
                            </section>
    
                        </div>
                        <span class="coupon-close close-mask"><img src="${_this.imgPath}/close.png" alt=""></span>
                        </div>
                       </div>
                       `
                      //    <!-- 领取失败 ，券不够情况 -->
                       _this.pageHtml3 = `<div class="coupon-mask">
                       <div class="coupon-main" v-if='numLess'>
                       <div class="coupon-imgBody">
                           <img src="${_this.imgPath}/wrapnumless.png" alt="优惠券">
                           
                           <div class="numLessBtn close-mask">我知道了</div>
                           <div class="numLessClose close-mask"></div>
                       </div>
                        </div>
                       </div>
                       `
                       _this.receiveId = data.fId      //后续分享使用的id
                       if(data.fUseRule === 2) _this.linkUrl = data.pOrSUrl  //f_user_rule == 2 产品 服务 详情页   **************
                       _this.setshare(3,{name:data.pOrSName,img:data.pOrSImage})
                    } else if (data.fCouponType === 4) { //新人礼品
                        // 新客有礼券 pageHtml1
                        _this.pageHtml1 = `<div class="coupon-mask">
                        <div class="coupon-main">
                        <div class="coupon-imgBody coupon-imgBody2" >
                            <img src="${_this.imgPath}/wrap1.png" alt="优惠券">
    
                            <section class="coupon-imgBody-gift">
                                <div class="coupon-imgBody-tit">恭喜您获得${ data.fGuestAmount/100 }元新人礼金</div>
                                <div class="coupon-imgBody-money">
                                    <span>￥<i>${ data.fGuestAmount/100 }</i>元</span>
                                </div>
                                <div class="coupon-imgBody-contmoney coupon-imgBody-contmoney1">拍单即可使用</div>
    
                                <div class="coupon-imgBody-giftBtn">
                                    ${res.isReceive === 0 ? '<span class="hasGift">已领取</span>':'<span id="giftReceive">点击领取</span>'}
                                    <span class="share" id="giftShare">立即分享</span>
    
                                    <div>有效期：${fBeginTime }~${fEndTime}<br>可与其他优惠券同时使用</div>
                                </div>
                            </section>
                            
                        </div>
                        <span class="coupon-close close-mask"><img src="${_this.imgPath}/close.png" alt=""></span>
                    </div>
                        </div>
                        `
                        // 新客有礼券领取后 pageHtml2
                        _this.pageHtml2 = `<div class="coupon-mask">
                        <div class="coupon-main coupon-main2">
                        <div class="coupon-imgBody coupon-imgBody2" >
                            <img src="${_this.imgPath}/wrap2.png" alt="优惠券">
    
                            <section class="coupon-imgBody-gift coupon-imgBody-gift2">
                                <div class="coupon-imgBody-tit2">领取成功</div>                           
                                <div class="coupon-imgBody-money2">
                                    <span><i>${ data.fGuestAmount/100 }</i></span>
                                </div>
                                <div class="coupon-imgBody-giftBtn coupon-imgBody-giftBtn2">
                                    <span id="giftShare2">立即分享</span>    
                                    <div>有效期：${fBeginTime }~${fEndTime}<br>可与其他优惠券同时使用</div>
                                </div>
                            </section>
                            
                        </div>
                        <span class="coupon-close close-mask"><img src="${_this.imgPath}/close.png" alt=""></span>
                    </div>
                        </div>
                        `
                       _this.receiveId = data.fId      //后续分享使用的id
                       _this.setshare(4,{price:data.fGuestAmount/100})
                    }
                
                }else {
                    
                }
            }
        });

    }

    // 格式化时间
    timerFormat(value,num) {
        if (!value) return '永久有效'
        let date = new Date(value);
        let y = date.getFullYear();// 年
        let MM = date.getMonth() + 1; // 月
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate(); // 日
        d = d < 10 ? ('0' + d) : d;
        if(num === '年') return y + '年' + MM + '月' + d + '日'
        else return MM + '月' + d + '日'
    }
    // 关闭页面
    toClose() {
        $('html').css({"height":"","overflow":"","position":""});
        var closeDiv=document.getElementsByClassName('close-mask');   
        for(let i = 0;i < closeDiv.length; i++){
            closeDiv[i].addEventListener('click',function(e){
                document.getElementsByClassName('coupon-mask')[0].style = 'display:none'
            })
        }
    }
    // 领取券接口
    receiveFn(param, fn) {
        console.log(this,'receive里的this指向')
        if(!this.btnFlag) return;
        this.btnFlag = false;
        let id = param,
            _this = this;
            console.log(token,'token``````````````')
         // 判断登录
         $.ajax({
            url: "/z-member/member/getUserLoginStatusPhone",
            type: "get",
            async:false,
            xhrFields: {
                withCredentials: true
            },
            headers: {
                "Authorization": token
            },
            success: function (result) {
               if(result.data == 0){    //未登录
                   var url = window.location.href;
                   window.location.href = _this.apiPath + "/login?redirectUrl=" + encodeURIComponent(url);
               }else {
                    // 领取    
                    $.ajax({
                        url: "/z-coupon/shop/receive",
                        type: 'POST',
                        data: { 'fCouponId': id },
                        headers: {
                            "Authorization": token
                        },
                        success: function(res) {
                            fn.call(_this,res)    
                            _this.btnFlag = true;
                            if (res.status === 0) {
                                console.log(res, '领取成功')
            
                            }else if(res.status === 2){
                                console.log(res,'券不够了')
                            }
                            else { // 3未激活 4超过限制数量 5 过期
                                console.log(res, '领取失败')
                            }
                        }
                    })

                }
            }
        });

    }
    // 消费满分享页面 领取 ，，签到后转发分享领取，，新人礼品领取
    // 消费满分享页面 领取
    couponBtn3(param){
        var _this = this,
        btnDiv = param;
        btnDiv.addEventListener('click',function(e){
            function _fn() {
                // 1 成功 2 券不够  3未激活 4超过限制数量  5 过期
                if(arguments[0].status === 0){
                    document.getElementById('wrapCouponAndGift').innerHTML = _this.pageHtml2
                     //  页面注册分享事件
                    _this.sharerules(document.getElementById('sharerules2'))
                }else if(arguments[0].status === 2){
                    document.getElementById('wrapCouponAndGift').innerHTML = _this.pageHtml3
                }else{
                    document.getElementById('wrapCouponAndGift').innerHTML = _this.pageHtml3
                }
                // 页面注册关闭事件
                _this.toClose()              
            }
            _this.receiveFn(_this.receiveId, _fn)
        })
    }
    // 拍单即可使用时
    couponBtn2(param) {
        var _this = this,
        btnDiv = param;
        btnDiv.addEventListener('click',function(e){
            function _fn() {
                // <!-- 领取成功 -->
                (arguments[0].status === 0) && (window.location.href = _this.linkUrl); //***********???? 待修改 跳哪里
                (arguments[0].status === 2) && (document.getElementById('wrapCouponAndGift').innerHTML = _this.pageHtml3);
                (arguments[0].status !== 2 && arguments[0].status !== 0) && (document.getElementById('wrapCouponAndGift').innerHTML = _this.pageHtml3)                
            }
            _this.receiveFn(_this.receiveId, _fn)

        })
    }
    // 征集好友签到时领   
    couponBtn1(param) {
        var _this = this,
        btnDiv = param;
        var shareInitUrl 
        if( this.apiPath.indexOf('.dev-zuma.com') != -1 ) {
            shareInitUrl = `http://m.dev-zuma.com`
        }
        if( this.apiPath.indexOf('.pre-zuma.com') != -1 ) {
            shareInitUrl = `https://m.pre-zuma.com`
        }
        if( this.apiPath.indexOf('.zuma.com') != -1 ) {
            shareInitUrl = `https://m.zuma.com`
        }
        btnDiv.addEventListener('click',function(e){

            function _fn() {
                console.log('领取成功');
                // <!-- 领取成功 -->
                (arguments[0].status === 0) && (
                    window.location.href = shareInitUrl + '/getcoupon?id='+ arguments[0].fReceiveId + '&type=3' 
                );
                (arguments[0].status === 2) && (document.getElementById('wrapCouponAndGift').innerHTML = _this.pageHtml3);
                (arguments[0].status !== 2 && arguments[0].status !== 0) && (document.getElementById('wrapCouponAndGift').innerHTML = _this.pageHtml3) 
            }
            _this.receiveFn(_this.receiveId, _fn)
        })
       
    }
    // 分享
    setshare(param,obj){
        var ua = navigator.userAgent.toLowerCase();
        let isWechat = ua.match(/MicroMessenger/i) == "micromessenger";
        if( isWechat ) {
            let topUrl = window.location.href;
            let baseUrl = topUrl.indexOf('.dev-zuma.com') != -1?'http://m.dev-zuma.com':(topUrl.indexOf('.pre-zuma.com') != -1?
            'https://m.pre-zuma.com':'https://m.zuma.com')
            let title, summary, shareImg;
            if(param === 4) { //新人礼品  
                title = '我推荐你领'+ obj.price +'元新人领券！真的很实惠哦！'
                summary = '这个族蚂小站，真的很给力，有很多优惠哦，你也来领券吧！'
                // shareImg =  '??'   //显示网站头像，如果网站没有头像，就显示族蚂头像   ??????????????
            }else { //赠品券
                title = '我推荐你领取免费赠品券！真的很实惠哦！'
                summary = obj.name      //商品名称
                shareImg =  obj.img  //商品图片
            }
            this.$axios.get(`${ baseUrl }/authority-sitebackend/userPermission/getWxShareData`,{
                params:{shareurl:encodeURIComponent(topUrl)}
            }).then( res=> {
                console.log( '分享请求', res );
                // let response = res.data;
                // setShareInfo({
                //     title: title, // 分享标题
                //     summary: summary, // 分享内容
                //     pic: shareImg || 'https://image.zuma.com/image/1186512865670280456.png', // 分享图片
                //     url: topUrl, // 分享链接
                //     WXconfig: {
                //         swapTitleInWX: true, // 是否标题内容互换（仅朋友圈，因朋友圈内只显示标题）
                //         appId: response.wxuser, // 公众号的唯一标识
                //         timestamp: response.timestamp, // 生成签名的时间戳
                //         nonceStr: response.noncestr, // 生成签名的随机串
                //         signature: response.signature // 签名
                //     }
                // });
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.wxuser, // 必填，公众号的唯一标识
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.noncestr, // 必填，生成签名的随机串
                    signature: res.signature,// 必填，签名
                });
                wx.ready(function(){
                    wx.updateAppMessageShareData({
                        "imgUrl": shareImg || 'https://image.zuma.com/image/1186512865670280456.png',
                        "link": topUrl,
                        "desc": summary,
                        "title": title,
                        success: function () {
                        //alert("分享成功")
                        // 分享成功可以做相应的数据处理
                        }
                    })
                });
            })
        }
    }
    // 新人礼品领取
    giftReceive(param){
        var _this = this,
        btnDiv = param;
        btnDiv.addEventListener('click',function(e){
            function _fn() {
                if(arguments[0].status === 0){
                    document.getElementById('wrapCouponAndGift').innerHTML = _this.pageHtml2
                     //  页面注册分享事件
                    _this.sharerules(document.getElementById('giftShare2'))
                }
                // 页面注册关闭事件
                _this.toClose()              
            }
            _this.receiveFn(_this.receiveId, _fn)
        })
    }

    // 消费满分享页面 分享功能   **********
    sharerules(param){  //signshare
        // sharerules2
        var _this = this,
        btnDiv = param;
        btnDiv.addEventListener('click',function(e){
            document.getElementById('coupon_promp') && document.getElementById('wrapCouponAndGift').removeChild(document.getElementById('coupon_promp'));
            var div = document.createElement("div");
            div.setAttribute("id", 'coupon_promp');
            div.innerText='请使用浏览器内置分享帮他转发'
            document.getElementById('wrapCouponAndGift').appendChild(div);
            setTimeout(function(){
                document.getElementById('wrapCouponAndGift').removeChild(div);
            },2000);
           

        })
    }
    // 
    giftShare(param){
        var _this = this,
        btnDiv = param;
        btnDiv.addEventListener('click',function(e){
            document.getElementById('coupon_promp') && document.getElementById('wrapCouponAndGift').removeChild(document.getElementById('coupon_promp'))
            var div = document.createElement("div");
            div.setAttribute("id", 'coupon_promp');
            div.innerText='请使用浏览器内置分享帮他转发'
            document.getElementById('wrapCouponAndGift').appendChild(div);
            setTimeout(function(){
                document.getElementById('wrapCouponAndGift').removeChild(div);
            },2000);

        })
    }
  
   
    // 页面初始化
    async  _couponinit() {
        await this.getPage()
        var div = document.createElement("div");
        div.setAttribute("id", 'wrapCouponAndGift');
        document.body.appendChild(div);
        document.getElementById('wrapCouponAndGift').innerHTML = this.pageHtml1;
        // 页面注册关闭事件  
        this.toClose()
        // 给初始化页面 按钮注册事件
        document.getElementById('sharerules') && this.sharerules(document.getElementById('sharerules'))
        document.getElementById('couponBtn3') && this.couponBtn3(document.getElementById('couponBtn3'))
        document.getElementById('couponBtn2') && this.couponBtn2(document.getElementById('couponBtn2'))
        document.getElementById('couponBtn1') && this.couponBtn1(document.getElementById('couponBtn1'))
        document.getElementById('giftReceive') && this.giftReceive(document.getElementById('giftReceive'))
        document.getElementById('giftShare') && this.giftShare(document.getElementById('giftShare'))

    }
}

