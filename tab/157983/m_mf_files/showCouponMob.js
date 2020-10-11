/**
 * Created by shidongdong on 2019/10/12.
 */
var couponId = null;//领券请求的ID
var isSign = null;//用于校验是否已领取
var imgPrefix = "";//图片的前缀
var ajaxPrefix = "";//ajax请求的前缀
var fCouponType = '';
var token;
var createCoupon = function(fId,other){
    
    var util = {
        getcookie(key) {
            let str = document.cookie.replace(/;\s*/, ';');
            let cookieArr = str.split(';');
            let cookieObj = {};
            let len = cookieArr.length;
            let query = location.search
            for (let i = 0; i < len; i++) {
                let item = cookieArr[i];
                let k = item.split('=')[0].replace(/(^\s*)|(\s*$)/g, "");
                let v = item.split('=')[1];
                cookieObj[k] = v;
            }
            if (cookieObj[key]) {
                return decodeURIComponent(cookieObj[key]);
            } else 
            if ( /token/.test(query) ) {
                let token = /token=([^&]+)/.exec(query)[1]
                if(token) document.cookie = `token=${token}`
                return token
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
    imgPrefix = other.imgPrefix ? other.imgPrefix : "./img";
    ajaxPrefix = other.ajaxPrefix ? other.ajaxPrefix : "https://www.zuma.com";
    //直接领券的接口
    $.ajax({
        // url: ajaxPrefix+"/z-coupon/shop/show?fId="+fId,
        // url: "http://dev-zuma.com/z-coupon/shop/show",
        url: "/z-coupon/shop/show",
        data:{
            fId: fId
        },
        type: "get",
        success: function (result) {
            if(result.status == 0){
                var res = result.coupon;
                console.log(res.fCouponType,"抵扣？--折扣？");
                fCouponType = res.fCouponType
                isSign = result.isReceive;
                couponId = res.fId;
                $("body").couponPopMob1(res.fCouponType,res);
            }else {
                alert("请求出错了。")
            }
        }
    });
}
;(function($,window){
    $.fn.couponPopMob1 = function (couponType,couponObj,other) {
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
        $("div").remove(".show-coupon");
        var couponStr = '';
        couponStr +=
            '<div class="show-coupon">'+
            '    <div class="coupon-wrap">';
        if(couponType == 1){
            couponStr+=
                '<!--抵扣券-->'+
                '<div class="deduction my-coupons">'+
                '    <!--领券-->'+
                '    <div class="get-coupon flex">'+
                '        <div class="center-box">'+
                '            <div class="">￥<span>'+couponObj.fDeductAmount/100+'</span></div>'+
                '            <div class="">恭喜您获得'+
                '                <span class="">'+couponObj.fDeductAmount/100+'</span>元抵扣券</div>'+
                '            <div class="">'+useRule(couponObj.fUseRule,couponObj)+'</div>';

                if(couponObj.fUseRule == 1){
                    couponStr+=
                        '                    <div class="share-other '+(isSign == 1 ? "" : "active")+'">'+
                        '                       <img src="'+(isSign == 1 ? imgPrefix+"/coupon1/mob/m-share-btn.png" : imgPrefix+"/coupon1/mob/m-share-over-btn.png" )+'" alt="" class="">';
                }else {
                    couponStr+=
                        '                    <div class="want-coupon '+(isSign == 1 ? "" : "active")+'">'+
                        '                       <img src="'+(isSign == 1 ? imgPrefix+"/coupon1/mob/m-want-btn.png" : imgPrefix+"/coupon1/mob/m-want-over-btn.png" )+'" alt="" class="">';
                }
                // '            <div class="want-coupon '+(isSign == 1 ? "" : "active")+'">'+
                // '                <img src="'+(isSign == 1 ? imgPrefix+"/coupon1/mob/m-want-btn.png" : imgPrefix+"/coupon1/mob/m-want-over-btn.png" )+'" alt="" class="">'+
                couponStr+=
                '</div>'+
                '            <div class="forward-share">'+
                '                <img src="'+imgPrefix+'/coupon1/mob/m-want-share-btn.png" alt="" class=""></div>'+
                '            <div class="fs-10">有效期：'+
                '                <span class="">'+getDate('yyyy年mm月dd日',couponObj.fBeginTime)+'</span>'+
                '                <span class="">'+(couponObj.fEndTime?"~ "+getDate('yyyy年mm月dd日',couponObj.fEndTime):"起永远有效")+'</span></div>'+
                '            <div class="fs-10">'+useLimit(couponObj.fUseLimit)+'</div>'+
                '            <div class="fs-10">'+andUse(couponObj.fAndUse)+'</div>'+
                '            <div class="close-coupon"></div>'+
                '        </div>'+
                '    </div>'+
                '    <!--领券成功-->'+
                '    <div class="get-coupon-succ flex hidden">'+
                '        <div class="center-box">'+
                '            <div class="close-coupon"></div>'+
                '            <div class="">领券成功</div>'+
                '            <div class="">'+couponObj.fDeductAmount/100+'元抵用券</div>'+
                '            <div class="">'+(couponObj.fEndTime?"请在"+getDate('yyyy年mm月dd日',couponObj.fEndTime)+"前使用":"永远有效")+'</div>'+
                '            <div class="forward-share">'+
                '                <img src="'+imgPrefix+'/coupon1/mob/m-succ-btn.png" alt="" class=""></div>'+
                '        </div>'+
                '    </div>'+
                '    <!--领券失败-->'+
                '    <div class="get-coupon-error flex hidden">'+
                '        <div class="close-coupon"></div>'+
                '        <div class="close-coupon"></div>'+
                '    </div>'+
                '</div>';
        }else {
            couponStr+=
                '<!--折扣券-->'+
                '<div class="discount my-coupons">'+
                '    <!--领券-->'+
                '    <div class="get-coupon flex">'+
                '        <div class="center-box">'+
                '            <div class="close-coupon"></div>'+
                '            <div class="">'+
                '                <div class="">获'+
                '                    <br/>得</div>'+
                '                <div class="">'+couponObj.fDiscountRatio/100 * 10+'</div>'+
                '                <div class="">折优惠券</div></div>'+
                '            <div class="">'+useRule(couponObj.fUseRule,couponObj)+'</div>';

                if(couponObj.fUseRule == 1){
                    couponStr+=
                        '                    <div class="share-other '+(isSign == 1 ? "" : "active")+'">'+
                        '                       <img src="'+(isSign == 1 ? imgPrefix+"/coupon2/mob/m-share-btn-1.png" : imgPrefix+"/coupon2/mob/m-share-over-btn.png" )+'" alt="" class="">';
                }else {
                    couponStr+=
                        '                    <div class="want-coupon '+(isSign == 1 ? "" : "active")+'">'+
                        '                       <img src="'+(isSign == 1 ? imgPrefix+"/coupon2/mob/m-want-btn.png" : imgPrefix+"/coupon2/mob/m-want-over-btn.png" )+'" alt="" class="">';
                }
                couponStr+=
                // '            <div class="want-coupon '+(isSign == 1 ? "" : "active")+'">'+
                // '                <img src="'+(isSign == 1 ? imgPrefix+"/coupon2/mob/m-want-btn.png" : imgPrefix+"/coupon2/mob/m-want-over-btn.png" )+'" alt="" class="">'+
                '</div>'+
                '            <div class="forward-share">'+
                '                <img src="'+imgPrefix+'/coupon2/mob/m-share-btn.png" alt="" class=""></div>'+
                '            <div class="fs-10">有效期：'+
                '                <span class="">'+getDate('yyyy年mm月dd日',couponObj.fBeginTime)+'</span>'+
                '                <span class="">'+(couponObj.fEndTime?"~ "+getDate('yyyy年mm月dd日',couponObj.fEndTime):"起永远有效")+'</span></div>'+
                '            <div class="fs-10">'+andUse(couponObj.fAndUse)+'</div></div>'+
                '    </div>'+
                '    <!--领券成功-->'+
                '    <div class="get-coupon-succ flex hidden">'+
                '        <div class="center-box">'+
                '            <div class="close-coupon"></div>'+
                '            <div class="">'+
                '                <div class="">'+
                '                    <div class="">'+couponObj.fDiscountRatio/100 *10+'</div>'+
                '                    <div class="">折</div></div>'+
                '                <div class="">'+useRule(couponObj.fUseRule,couponObj)+'</div></div>'+
                '            <div class="forward-share">'+
                '                <img src="'+imgPrefix+'/coupon2/mob/m-share-now-btn.png" alt="" class=""></div>'+
                '            <div class="">'+(couponObj.fEndTime?"请在"+getDate('yyyy年mm月dd日',couponObj.fEndTime)+"前使用":"永远有效")+'</div></div>'+
                '    </div>'+
                '    <!--领券失败-->'+
                '    <div class="get-coupon-error flex hidden">'+
                '        <div class="close-coupon"></div>'+
                '        <div class="close-coupon"></div>'+
                '    </div>'+
                '</div>';
        }
        couponStr+=
        '    </div>'+
        '</div>';
        $("body").append(couponStr);

        //判断是直接获取还是分享签到
        // if(couponObj.fUseRule != 1){    //分享签到
        //     $(".sign-share-coupon").removeClass("hidden");
        // }else {     //直接获取
        //     $(".get-coupon").removeClass("hidden");
        // }

        //--关闭
        $(document).on("click",".close-coupon",function(){
            $(this).parents(".show-coupon").remove();
            $('html').css({"height":"","overflow":"","position":""});
        });
        //--转发分享
        $(document).on("click",".forward-share",function(){
            $("#forward-share").remove();
            $("body").append("<div id='forward-share'>请使用浏览器内置分享帮他转发</div>");
            setTimeout(function(){
                $("#forward-share").remove();
            },2000);
        });
        //我要领券
        $(document).on("click",".want-coupon",function(){
            if($(this).hasClass("active")) {
                return;
            }
            var _this = $(this);
            $.ajax({
                // url:ajaxPrefix+"/z-member/member/getUserLoginStatusPhone",
                url: "/z-member/member/getUserLoginStatusPhone",
                // url: "http://dev-zuma.com/z-member/member/getUserLoginStatusPhone",
                type:"get",
                async:false,
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "Authorization": token
                },
                success:function(result){
                    if(result.data == 0){    //未登录
                        var callBackUrl = window.location.href.replace(/token=[^&]+/,"");
                        var origin = window.location.origin;
                        window.location.href = shareInitUrl+'/login?redirectUrl='+ encodeURIComponent(callBackUrl);
                    }else {
                        var state = null;
                        $.ajax({
                            url: "/z-coupon/shop/receive",
                            type: "post",
                            async:false,
                            headers: {
                                "Authorization": token
                            },
                            data:{fCouponId:couponId},
                            success: function (result) {
                                state = result.status;
                            }
                        });
                        if(state == 0){ //成功
                            _this.parents(".get-coupon").addClass("hidden").next().removeClass("hidden");
                        }else { //失败
                            _this.parents(".get-coupon").addClass("hidden").next().next().removeClass("hidden");
                        }
                    }
                }
            });
        });
        //领取并通知好友
        $(document).on("click",".share-other",function(){
            if($(this).hasClass("active")) {
                return;
            }
            var _this = $(this);
            $.ajax({
                url: "/z-member/member/getUserLoginStatusPhone1",
                // url: "http://www.dev-zuma.com/shop_web/memberCenterIndex/getUserLoginStatus",
                type: "GET",
                async:false,
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "Authorization": token
                },
                success: function (result) {
                    if( window && window.stopSend ) return 
                    if(result.data == 0){    //未登录
                        var url = window.location.href.replace(/token=[^&]+/,"");
                        window.location.href = ajaxPrefix+"/login?redirectUrl=" + encodeURIComponent(url);
                    }else {
                        var state = null;
                        $.ajax({
                            url: "/z-coupon/shop/receive",
                            type: "post",
                            async:false,
                            headers: {
                                "Authorization": token
                            },
                            xhrFields: {
                                withCredentials: true
                            },
                            data:{fCouponId:couponId},
                            success: function (result) {
                                state = result.status;
                                if(state == 0){//成功
                                    window.location.href = shareInitUrl + '/getcoupon?id='+ result.fReceiveId + '&type='+ fCouponType 
                                }
                            }
                        });
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
    };


})(jQuery,window);

