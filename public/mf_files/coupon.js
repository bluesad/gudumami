/*页面说明// 赠品页面  （赠品券pageHtml1 + 消费满XX元方式领券成功后pageHtml2 ）

// 新人礼品页面  （新客有礼券  pageHtml1 + 新客有礼券领取后  pageHtml2）

// 二维码页面 pageHtml3 （征集好友签到时领 + 消费满XX元方式领券成功后分享 + 新客有礼分享）  ++ 券不够了
*/

class couponGift {
    constructor(id,imgPath,apiPath) {
        // console.log( 'id,imgPath,apiPath', id,imgPath,apiPath );
        
        this.id = id; //传入 id
        this.imgPath = imgPath || './img'  //传入 图片路劲
        this.apiPath = apiPath || 'https://www.zuma.com' //传入 接口路劲
        // console.log( 'id,imgPath,apiPath', id,this.imgPath,this.apiPath );
        this. _couponinit();
        this.pageHtml1 = ''
        this.pageHtml2 = ''
        this.pageHtml3 = ''
        this.receiveId = ''  //接口获取 领券id
        this.shareId = '' //二维码分享 id
        this.linkUrl = '' //接口获取 赠品券直接领券跳转地址
        // this.btnFun = null  //
    }
    //展示pc券页面接口
    async getPage() {
        var _this = this;
        await $.ajax({
            // url: "http://www.dev-zuma.com/z-coupon/shop/show?fShopId=702&fDisplayPage=1",
            url:  "/z-coupon/shop/show?fId=" + this.id,
            type: "get",
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                if (res.status === 0) {
                    // console.log(res, "券信息成功");
                    var data = res.coupon,
                    fBeginTime = _this.timerFormat(data.fBeginTime),
                    fEndTime = _this.timerFormat(data.fEndTime);
                    let timeTxt;
                    if(fEndTime == '永久有效'){
                        timeTxt = fBeginTime +'起永远有效'
                    }else{
                        timeTxt = fBeginTime + '~' + fEndTime
                    }
                    if (data.fCouponType === 3) { //赠品券
                        //  <!-- 赠品 券 -->
                        var strBtn;
                        if(res.isReceive === 0){  
                            strBtn = '<span class="sighBtn">已领取</span>'
                        }else{
                            if(data.fUseRule === 3){
                                strBtn = '<span class="noSignBtn" id="couponBtn3" >我要领券</span>'
                            }else if(data.fUseRule === 2){
                                strBtn = '<span class="noSignBtn" id="couponBtn2" >领券并提货</span>'
                            }else if(data.fUseRule === 1){
                                strBtn = '<span class="noSignBtn" id="couponBtn1" >领取并通知好友</span>'
                            }
                        }
                        _this.pageHtml1 = `<div class="coupon-mask">
                            <div class="coupon-main">
                                <div class="coupon-imgBody">
                                    <img src="${_this.imgPath}/present3.png" alt="优惠券" />
                                    <section class="coupon-imgBody-cont">
                                        <div class="coupon-imgBody-contgoods">
                                            <figure>
                                                <img class="coupon-imgBody-contgoodsL" src="${data.pOrSImage ? data.pOrSImage : _this.imgPath +'/111.png'}" alt="赠品" />
                                            </figure>
                                            <div class="coupon-imgBody-contgoodsR">
                                                <h3>${data.pOrSName}</h3>
                                                <span>￥0 <i>￥${data.pOrSPrice == null?'0':data.pOrSPrice}</i></span>
                                            </div>
                                        </div>
                                        ${data.fUseRule === 3 ? '<div class="coupon-imgBody-contmoney">消费满'+ data.fConsumeAmount/100+'，即可领取</div>'
                                            :(data.fUseRule === 2 ? '<div class="coupon-imgBody-contmoney">直接领取</div>'
                                            :'<div class="coupon-imgBody-contmoney">征集'+ data.fForwardNum + '位好友签到即可领取</div>')  
                                        }
                                        <div class="coupon-imgBody-contBtn coupon-imgBody-contBtn1">
                                            ${strBtn}
                                            
                                            <span>有效期：${timeTxt}</span>
                                        </div>
                                    </section>
                                </div>
                                <span class="coupon-close close-mask" ><img src="${_this.imgPath}/close.png" alt="" /></span>
                            </div>
                        </div>
                        `;
                        //<!-- 消费满XX元时 领取成功阶段 -->
                        _this.pageHtml2 = `
                        <div class="coupon-mask">
                        <div class="coupon-main coupon-main2" v-if="couponRules3Status">
                        <div class="coupon-imgBody coupon-imgBody2">
                            <img src="${_this.imgPath}/present2.png" alt="优惠券" />
    
                            <section class="coupon-imgBody-cont coupon-imgBody-cont2">
                                <div class="coupon-imgBody-contgoods coupon-imgBody-contgoods2">
                                    <figure>
                                        <img class="coupon-imgBody-contgoodsL" src="${data.pOrSImage ? data.pOrSImage : _this.imgPath +'/111.png'}" alt="礼品" />
                                    </figure>
                                    <div class="coupon-imgBody-contgoodsR">
                                        <h3>${data.pOrSName}</h3>
                                        <span>￥0 <i>￥${data.pOrSPrice}</i></span>
                                    </div>
                                </div>
                                <div class="coupon-imgBody-contBtn coupon-imgBody-contBtn2">
                                    <span id="couponShare">立即分享</span>
                                </div>
                            </section>
                        </div>
                        <span class="coupon-close close-mask" ><img src="${_this.imgPath}/close.png" alt="" /></span>
                        </div>
                        </div>
                        `
                        // 券不够了
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
                        _this.receiveId = data.fId //id 领券id
                        if(data.fUseRule === 2) _this.linkUrl = data.pOrSUrl  //f_user_rule == 2 产品 服务 详情页   **************     
                        
                    } else if (data.fCouponType === 4) { //新人礼品
                        // 新客有礼 券
                        _this.pageHtml1 = `
                        <div class="coupon-mask">
                        <div class="coupon-main coupon-main4">
                        <div class="coupon-imgBody coupon-imgBody2">
                            <img src="${_this.imgPath}/gift1.png" alt="优惠券" />
    
                            <section class="coupon-imgBody-gift">
                                <div class="coupon-imgBody-tit">
                                    恭喜您获得${ data.fGuestAmount/100 }元新人礼金
                                </div>
                                <div class="coupon-imgBody-money">
                                    <span>￥<i>${ data.fGuestAmount/100 }</i>元</span>
                                </div>
                                <div class="coupon-imgBody-contmoney coupon-imgBody-contmoney1">
                                    拍单即可使用
                                </div>
    
                                <div class="coupon-imgBody-giftBtn">
                                    <span id="giftReceive">立即领取</span>
                                    <div>
                                        有效期：${ fBeginTime }~${ fEndTime }<br />可与其他优惠券同时使用
                                    </div>
                                </div>
                            </section>
                        </div>
                        <span class="coupon-close coupon-close2 close-mask" ><img src="${_this.imgPath}/close.png" alt="" /></span>
                        </div>
                        </div>
                        `;
                        // 新客有礼 领取成功
                        _this.pageHtml2 = `<div class="coupon-mask" >
                        <div class="coupon-main coupon-main4">
                        <div class="coupon-imgBody coupon-imgBody2">
                            <img src="${_this.imgPath}/gift2.png" alt="优惠券" />
        
                            <section class="coupon-imgBody-gift coupon-imgBody-gift2">
                                <div class="coupon-imgBody-tit2">领取成功</div>
                                <div class="coupon-imgBody-money2">
                                    <span><i>${ data.fGuestAmount/100 }</i></span>
                                </div>
                                <div class="coupon-imgBody-giftBtn coupon-imgBody-giftBtn2">
                                    <span id="giftShare" >立即分享</span>
                                    <div>
                                        有效期：${ fBeginTime }~${ fEndTime }<br />可与其他优惠券同时使用
                                    </div>
                                </div>
                            </section>
                        </div>
                        <span class="coupon-close coupon-close2 close-mask" ><img src="${_this.imgPath}/close.png" alt="" /></span>
                    </div>
                        </div>`
                        _this.receiveId = data.fId //id
                    }


                } else {
                    // alert("请求出错了。")
                    // console.log(res, "券信息失败");
                }
            }
        });

        var obj = {pageHtml1:_this.pageHtml1, pageHtml2:_this.pageHtml2 }
        // console.log( obj, 'pageHtml````````````')
        return obj
    }
    // 二维码
    openQRcode(param) { //param == giftShare 新人礼金分享 , couponShare  消费满XX元方式领券成功后分享,  signShare 征集好友签到分享
        let str = '';
        var _this=this;
        str = param === 'signShare' ? '征集好友签到' : '分享给微信好友'
        this.pageHtml3 = `
        <div class="coupon-mask">
            <div class="coupon-main coupon-main3" >
                <div>
                    <div class="qrcodeBox">
                        <h3>${str}</h3>
                        <span class="close-mask" >+</span>
                        <!-- <img :src="qrcode" alt="" /> -->
                        <div id='coupon_qrcode3'></div>
                        <div>
                            打开微信，点击底部的“发现”，
                            <br />使用“扫一扫”即可将网页分享给好友或朋友圈。
                        </div>
                    </div>
                </div>
            </div></div>
        `
        document.getElementById('couponAndGift').innerHTML = this.pageHtml3
        // 页面注册关闭事件  
        _this.toClose()

        var qrcode = new QRCode(document.getElementById("coupon_qrcode3"), {
            width: 216,
            height: 216
        });
        // **********?????????????? 待修改
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
        if (param === 'giftShare') {
            qrcode.makeCode(window.location.protocol+'//'+window.location.host); //需要获取该网站首页地址 去生成二维码  window.location.host
        } else if (param === 'signShare') {
            // qrcode.makeCode(window.location.href + '?&pageType = "sigh" && fReceiveId = ' + _this.fReceiveId); //需要获取该页面地址 手机签到页 去生成二维码  
            qrcode.makeCode(`${ shareInitUrl }/getcoupon?id=${ _this.shareId }&type=3`); //需要获取该页面地址 手机签到页 去生成二维码   _this.receiveId  _this.shareId 不知道用哪个
        } else if (param === 'couponShare') {
            qrcode.makeCode(window.location.href); //需要获取该页面地址 去生成二维码  
        }

    }
    // 消费满XX元方式领券成功后 分享
    couponShare(param){
        var _this = this,
        btnDiv = param;
        btnDiv.addEventListener('click',function(e){
            function _fn(params) {
                // console.log('fenxiang');
                // 页面注册打开二维码事件
                _this.openQRcode("couponShare")
            }
            _this.receiveFn(_this.receiveId, _fn)

        })
    }
    // 格式化时间
    timerFormat(value) {
        if (!value) return '永久有效';
        let date = new Date(value);
        let y = date.getFullYear();// 年
        let MM = date.getMonth() + 1; // 月
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate(); // 日
        d = d < 10 ? ('0' + d) : d;
        return y + '年' + MM + '月' + d + '日'
    }
    // 关闭页面
    toClose() {
        var closeDiv=document.getElementsByClassName('close-mask');
        for(let i = 0;i < closeDiv.length; i++){
            closeDiv[i].addEventListener('click',function(e){
                document.getElementsByClassName('coupon-mask')[0].style = 'display:none'
            })
        }
    }

    // 领取券接口
    receiveFn(param, fn) {
        let id = param,
            _this = this;
            // 判断登录
            $.ajax({
                url: _this.apiPath + "/shop_web/memberCenterIndex/getUserLoginStatus",
                type: "post",
                async:false,
                xhrFields: {
                    withCredentials: true
                },
                success: function (result) {
                    if(result.data == 0){    //未登录
                        var url = window.location.href;
                        window.location.href = _this.apiPath + "/login?url=" + encodeURIComponent(url);
                    }else {
                        // 领取    
                        $.ajax({
                            data: { 'fCouponId': id },
                            url: "/z-coupon/shop/receive",
                            type: 'POST',
                            async:false,
                            xhrFields: {
                                withCredentials: true
                            },
                            success: function(res) {
                                fn.call(_this,res)    

                                if (res.status === 0) {
                                    // _this.shareId = res.fReceiveId
                                    // console.log(res, _this.shareId,'领取成功')
                                }else if(res.status === 2){
                                    // console.log(res,'券不够了')
                                }
                                else { // 3未激活 4超过限制数量 5 过期
                                    // console.log(res, '领取失败')
                                }
                            }
                        })

                    }
                }
            });



        

    }
    // 赠品券领取 couponBtn3 couponBtn2 couponBtn1
    // 消费满XX元时领券
    couponBtn3(param) {
        var _this = this,
        btnDiv = param;
        btnDiv.addEventListener('click',function(e){
            function _fn() {
                // if(arguments[0].status !== 0) return;
                if(arguments[0].status === 0){
                    // console.log('领取成功');
                    // <!-- 领取成功 -->
                    document.getElementById('couponAndGift').innerHTML = _this.pageHtml2
                    // 页面注册打开二维码事件
                    _this.couponShare(document.getElementById('couponShare'))
                }else if(arguments[0].status === 2){
                    document.getElementById('couponAndGift').innerHTML = _this.pageHtml3
                }else{
                    document.getElementById('couponAndGift').innerHTML = _this.pageHtml3
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
                // if(arguments[0].status !== 0) return;
                if(arguments[0].status === 0){
                    // console.log('领取成功');
                    // <!-- 领取成功 -->
                    window.location.href = _this.linkUrl; //***********???? 待修改 跳哪里
                }
                else if(arguments[0].status === 2){
                    document.getElementById('couponAndGift').innerHTML = _this.pageHtml3
                }else{
                    document.getElementById('couponAndGift').innerHTML = _this.pageHtml3
                }
               
            }
            _this.receiveFn(_this.receiveId, _fn)

        })
    }
    // 征集好友签到时领
    couponBtn1(param) {
        var _this = this,
        btnDiv = param;
        btnDiv.addEventListener('click',function(e){
            function _fn() {
                // if(arguments[0].status !== 0) return;
                if(arguments[0].status === 0){
                    _this.shareId = arguments[0].fReceiveId;
                    // console.log('领取成功',' _this.shareId',_this.shareId,arguments[0].fReceiveId);
                    // <!-- 领取成功 -->
                    _this.openQRcode('signShare') //打开二维码弹窗
                }
                else if(arguments[0].status === 2){
                    document.getElementById('couponAndGift').innerHTML = _this.pageHtml3
                }else{
                    document.getElementById('couponAndGift').innerHTML = _this.pageHtml3
                }
                
            }
            _this.receiveFn(_this.receiveId, _fn)
        })
       
    }

    // 新人礼金领取
    giftReceive(param) {
        // console.log(param)
        var _this = this,
        btnDiv = param;
        btnDiv.addEventListener('click',function(e){
            function _fn(params) {
                if(arguments[0].status === 0){
                    document.getElementById('couponAndGift').innerHTML = _this.pageHtml2
                }else{

                }
                //
               
                // 页面注册关闭事件  
                _this.toClose()
                // 注册二维码事件
                var giftShare=document.getElementById('giftShare');
                giftShare.addEventListener('click',function(e){
                    document.getElementsByClassName('coupon-mask')[0].style = 'display:none'
                    _this.openQRcode('giftShare')
                })
                // document.getElementById('couponAndGift').innerHTML = pageHtml2
            }
            _this.receiveFn(_this.receiveId, _fn)

            
        })
    }

    // 页面初始化
    async  _couponinit() {
        let obj
        obj = await this.getPage()
        var div = document.createElement("div");
        div.setAttribute("id", 'couponAndGift');
        document.body.appendChild(div);
        document.getElementById('couponAndGift').innerHTML = obj.pageHtml1;
        
        if(!obj.pageHtml1) return
        // 页面注册关闭事件  
        this.toClose()
        // 给初始化页面 按钮注册事件
        document.getElementById('giftReceive') && this.giftReceive(document.getElementById('giftReceive'))
        document.getElementById('couponBtn3') && this.couponBtn3(document.getElementById('couponBtn3'))
        document.getElementById('couponBtn2') && this.couponBtn2(document.getElementById('couponBtn2'))
        document.getElementById('couponBtn1') && this.couponBtn1(document.getElementById('couponBtn1'))

    }

}


