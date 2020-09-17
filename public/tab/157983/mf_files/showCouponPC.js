/**
 * Created by shidongdong on 2019/10/12.
 */
var couponId = null;//领券请求的ID
var isSign = null;//用于校验是否已领取
var imgPrefix = "";//图片的前缀
var ajaxPrefix = "";//ajax请求的前缀
var fCouponType = '';
var createCoupon = function(fId,other){
        imgPrefix = other.imgPrefix ? other.imgPrefix : "./img";
        ajaxPrefix = other.ajaxPrefix ? other.ajaxPrefix : "https://www.zuma.com";
        $.ajax({
            url: ajaxPrefix+"/z-coupon/shop/show?fId="+fId,
            type: "get",
            xhrFields: {
                withCredentials: true
            },
            success: function (result) {
                if(result.status == 0){
                    var res = result.coupon;
                    // console.log(res.fCouponType,"优惠券类型");
                    // console.log(res);
                    isSign = result.isReceive;
                    couponId = res.fId;
                    fCouponType = res.fCouponType
                    $("body").couponPopPC(res.fCouponType,res);
                }else {
                    
                }
            }
        });
    }
;(function($,window){
    $.fn.couponPopPC = function (couponType,couponObj,other) {
        // console.log(couponObj);
        var fUseRule = couponObj.fUseRule
        $("div").remove(".show-coupon");
        var couponStr = '';
        couponStr +=
            '<div class="show-coupon">'+
            '    <div class="coupon-wrap">';
        if(couponType == 1){
            couponStr+=
                '        <!--抵扣券-->'+
                '        <div class="deduction my-coupons">'+
                '            <!--领券-->'+
                '            <div class="get-coupon flex">'+
                '                <div class="center-box">'+
                '                    <div class="">￥'+couponObj.fDeductAmount/100+'</div>'+
                '                    <div class="">恭喜您获得'+couponObj.fDeductAmount/100+'元抵扣券</div>'+
                '                    <div class="">'+useRule(couponObj.fUseRule,couponObj)+'</div>';
        if(couponObj.fUseRule == 1){
            couponStr+=
                '                    <div class="share-other '+(isSign == 1 ? "" : "active")+'">'+
                '                       <img src="'+(isSign == 1 ? imgPrefix+"/coupon1/pc/pc-share-btn.png" : imgPrefix+"/coupon1/pc/pc-share-over-btn.png" )+'" alt="" class="">';
        }else {
            couponStr+=
                '                    <div class="want-coupon '+(isSign == 1 ? "" : "active")+'">'+
                '                       <img src="'+(isSign == 1 ? imgPrefix+"/coupon1/pc/pc-want-btn.png" : imgPrefix+"/coupon1/pc/pc-want-over-btn.png" )+'" alt="" class="">';
        }
            couponStr+=
                '                    </div>'+
                '                    <div class="">有效期：'+
                '                        <span class="">'+getDate('yyyy年mm月dd日',couponObj.fBeginTime)+'</span>'+
                '                        <span class="">'+(couponObj.fEndTime?"~ "+getDate('yyyy年mm月dd日',couponObj.fEndTime):"起永远有效")+'</span></div>'+
                '                    <div class="">'+useLimit(couponObj.fUseLimit)+'</div>'+
                '                    <div class="">'+andUse(couponObj.fAndUse)+'</div>' +
                '                    <div class="close-coupon"></div>' +
                '                </div>'+
                '            </div>'+
                '            <!--领券成功-->'+
                '            <div class="get-coupon-succ flex hidden">'+
                '                <div class="center-box">'+
                '                    <div class="close-coupon"></div>'+
                '                    <div class="">领券成功</div>'+
                '                    <div class="">'+couponObj.fDeductAmount/100+'元抵用券</div>'+
                '                    <div class="">'+(couponObj.fEndTime?"请在"+getDate('yyyy年mm月dd日',couponObj.fEndTime)+"前使用":"永远有效")+'</div>'+
                '                    <div class="share-coupon">'+
                '                        <img src="'+imgPrefix+'/coupon1/pc/pc-succ-btn.png" alt="" class=""></div>'+
                '                </div>'+
                '            </div>'+
                '            <!--二维码-->'+
                '            <div class="get-qrCode flex hidden">'+
                '                <div class="center-box">'+
                '                    <div class="close-coupon"></div>'+
                '                    <div class="">分享给微信好友</div>'+
                '                    <div class="" id="showCouponQr"></div>'+
                '                    <div class="">打开微信，点击底部的“发现”，</div>'+
                '                    <div class="">使用“扫一扫”即可将网页分享给好友或朋友圈。</div></div>'+
                '            </div>'+
                '        </div>';
        }else {
            couponStr+=
                '        <!--折扣券-->'+
                '        <div class="discount my-coupons">'+
                '            <!--领券-->'+
                '            <div class="get-coupon flex">'+
                '                <div class="center-box">'+
                '                    <div class="close-coupon"></div>'+
                '                    <div class="">'+
                '                        <div class="">获'+
                '                            <br/>得</div>'+
                '                        <div class="">'+couponObj.fDiscountRatio/100 *10 +'</div>'+
                '                        <div class="">折优惠券</div></div>'+
                '                    <div class="">'+useRule(couponObj.fUseRule,couponObj)+'</div>';
            if(couponObj.fUseRule == 1){
                couponStr+=
                    '                    <div class="share-other '+(isSign == 1 ? "" : "active")+'">'+
                    '                       <img src="'+(isSign == 1 ? imgPrefix+"/coupon2/pc/pc-share-btn.png" : imgPrefix+"/coupon2/pc/pc-share-over-btn.png" )+'" alt="" class="">';
            }else {
                couponStr+=
                    '                    <div class="want-coupon '+(isSign == 1 ? "" : "active")+'">'+
                    '                       <img src="'+(isSign == 1 ? imgPrefix+"/coupon2/pc/pc-want-btn.png" : imgPrefix+"/coupon2/pc/pc-want-over-btn.png" )+'" alt="" class="">';
            }
            couponStr+=
                '                    </div>'+
                '                    <div class="">有效期：'+
                '                        <span class="">'+getDate('yyyy年mm月dd日',couponObj.fBeginTime)+'</span>'+
                '                        <span class="">'+(couponObj.fEndTime?"~ "+getDate('yyyy年mm月dd日',couponObj.fEndTime):"起永远有效")+'</span></div>'+
                '                    <div class="">'+andUse(couponObj.fAndUse)+'</div></div>'+
                '            </div>'+
                '            <!--领券成功-->'+
                '            <div class="get-coupon-succ flex hidden">'+
                '                <div class="center-box">'+
                '                    <div class="close-coupon"></div>'+
                '                    <div class="">'+
                '                        <div class="">'+
                '                            <div class="">'+couponObj.fDiscountRatio/100+'</div>'+
                '                            <div class="">折</div></div>'+
                '                        <div class="">'+useRule(couponObj.fUseRule,couponObj)+'</div></div>'+
                '                    <div class="share-coupon">'+
                '                        <img src="'+imgPrefix+'/coupon2/pc/pc-succ-btn.png" alt="" class=""></div>'+
                '                    <div class="">'+(couponObj.fEndTime?"请在"+getDate('yyyy年mm月dd日',couponObj.fEndTime)+"前使用":"永远有效")+'</div></div>'+
                '            </div>'+
                '            <!--二维码-->'+
                '            <div class="get-qrCode flex hidden">'+
                '                <div class="center-box">'+
                '                    <div class="close-coupon"></div>'+
                '                    <div class="">分享给微信好友</div>'+
                '                    <div class="" id="showCouponQr"></div>'+
                '                    <div class="">打开微信，点击底部的“发现”，</div>'+
                '                    <div class="">使用“扫一扫”即可将网页分享给好友或朋友圈。</div></div>'+
                '            </div>'+
                '        </div>';
        }
        couponStr+=
        '    </div>'+
        '</div>';

        $("body").append(couponStr);

        //--关闭
        $(document).on("click",".close-coupon",function(){
            $(this).parents(".show-coupon").remove();
        });

        //我要领券
        $(document).on("click",".want-coupon",function(){
            if($(this).hasClass("active")) {
                return;
            }
            var _this = $(this);
            $.ajax({
                url: ajaxPrefix+"/shop_web/memberCenterIndex/getUserLoginStatus",
                type: "post",
                async:false,
                xhrFields: {
                    withCredentials: true
                },
                success: function (result) {
                   if(result.data == 0){    //未登录
                        var url = window.location.href;
                        window.location.href = ajaxPrefix+"/login?url=" + encodeURIComponent(url);
                    }else {
                        var state = null;
                        $.ajax({
                            url: ajaxPrefix+"/z-coupon/shop/receive",
                            type: "post",
                            async:false,
                            xhrFields: {
                                withCredentials: true
                            },
                            data:{fCouponId:couponId},
                            success: function (result) {
                                state = result.status;
                                makeCode(result.fReceiveId);
                            }
                        });
                       if(state == 0){ //成功
                            _this.parents(".get-coupon").addClass("hidden").next().removeClass("hidden");
                        }
                    }
                }
            });
        });

        //领券成功--分享
        $(document).on("click",".share-coupon",function(){
            $(this).parents(".get-coupon-succ").addClass("hidden").next().removeClass("hidden");
        });

        //领取并通知好友
        $(document).on("click",".share-other",function(){
            if($(this).hasClass("active")) {
                return;
            }
            var _this = $(this);
            $.ajax({
                url: ajaxPrefix+"/shop_web/memberCenterIndex/getUserLoginStatus",
                type: "post",
                async:false,
                xhrFields: {
                    withCredentials: true
                },
                success: function (result) {
                    if(result.data == 0){    //未登录
                        var url = window.location.href;
                        window.location.href = ajaxPrefix+"/login?url=" + encodeURIComponent(url);
                    }else {
                        var state = null;
                        $.ajax({
                            url: ajaxPrefix+"/z-coupon/shop/receive",
                            type: "post",
                            async:false,
                            xhrFields: {
                                withCredentials: true
                            },
                            data:{fCouponId:couponId},
                            success: function (result) {
                                state = result.status;
                                makeCode(result.fReceiveId,result.fU);
                            }
                        });
                        if(state == 0){ //成功
                            _this.parents(".get-coupon").addClass("hidden").next().next().removeClass("hidden");
                        }
                    }
                }
            });

        });

        /**
         * 以下为展示数据所用的方法。
         * */
        //转换年月日方法
        function getDate(format,str){
            var oDate = new Date(str),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth()+1,
                oDay = oDate.getDate(),
                oHour = oDate.getHours(),
                oMin = oDate.getMinutes(),
                oSec = oDate.getSeconds();
            if(format == 'yyyy-mm-dd'){
                oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);//最后拼接时间
            }else if(format == 'yyyy/mm/dd'){
                oTime = oYear +'/'+ getzf(oMonth) +'/'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);//最后拼接时间
            }else if(format == 'yyyy年mm月dd日'){
                oTime = oYear +'年'+ getzf(oMonth) +'月'+ getzf(oDay) +'日';
                // oTime = getzf(oMonth) +'月'+ getzf(oDay) +'日';
            }
            return oTime;
        };
        //补0操作
        function getzf(num){
            if(parseInt(num) < 10){
                num = '0'+num;
            }
            return num;
        };
        //用券规则--fUseRule
        function useRule(type,num) {
            if(type == 1){
                return "征集"+num.fForwardNum+"位好友签到即可抵扣";
            }else if(type == 3){
                return "消费满"+num.fConsumeAmount/100+"元即可抵扣";
            }else {
                return "拍单即可抵扣";
            }
        };
        //用券限制--fUseLimit
        function useLimit(type) {
            if(type == 1){
                return "每单限用一张券";
            }else if(type == 2){
                return "每单限用两张券";
            }else {
                return "支持一单多券";
            }
        };
        //是否多券并用--fAndUse
        function andUse(type) {
            if(type == 0){
                return "可与其它优惠券混用";
            }else {
                return "不可与其它优惠券混用";
            }
        };
        var showCouponQr = new QRCode(document.getElementById("showCouponQr"), {
            width : 216,
            height : 216
        });
        function makeCode(x) {
            if( fUseRule == 1 ) {
                var shareInitUrl 
                if( ajaxPrefix.indexOf('.dev-zuma.com') != -1 ) {
                    shareInitUrl = `http://m.dev-zuma.com`
                }
                if( ajaxPrefix.indexOf('.pre-zuma.com') != -1 ) {
                    shareInitUrl = `https://m.pre-zuma.com`
                }
                if( ajaxPrefix.indexOf('.zuma.com') != -1 ) {
                    shareInitUrl = `https://m.zuma.com`
                }

                showCouponQr.makeCode( shareInitUrl + '/getcoupon?id='+ x + '&type='+ fCouponType );
            }else {
                showCouponQr.makeCode( window.location.href );
            }
        };

    };
})(jQuery,window);

