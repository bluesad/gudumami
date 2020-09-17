/** 
 *  @des 移动端地区选择和国家选择,依赖jquery库,移动工具类zuma-phone
 *  @author MaxTan
 *  @date 2017/11/14
 *  modified by shidongdong
 */

 
;(function(jQuery,window){
	//接口地址
	// var ajaxurl = {
	// 	firstdata : "getfirstcityDate",			//前三级城市数据
	// 	lastdata : "getlastcityDate",			//最后一级街道数据
	// 	country : "getallCountry"				//国家数据
	// };
	var ajaxurl = {
		firstdata : "/city/getAllData",			//前三级城市数据
		lastdata : "/city/getTownData",			//最后一级街道数据
		country : "./country.min.json"	    //国家数据
	};
function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod"
	];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

	$.fn.ontap = function (selector, cbback, isreturn) {
			var page = {};
			var isreturn = isreturn && true;
		
				let isflag = IsPC();
					
			if (!isflag) {

					$(this).off("touchstart", selector).on("touchstart", selector, function (e) {
						e.stopPropagation();
						//记录触摸位置
						var touches = e.originalEvent.touches[0];
						page.x = touches.pageX;
						page.y = touches.pageY;
					}).off("touchend", selector).on("touchend", selector, function (e) {
							console.log(isreturn, 'toucend', $(this));
						e.stopPropagation();
						var changedTouches = e.originalEvent.changedTouches[0];
						var endpage = {};
						endpage.x = changedTouches.pageX;
						endpage.y = changedTouches.pageY;
						// if(page.x == endpage.x && page.y == endpage.y){
						if (Math.abs(page.x - endpage.x) < 5 && Math.abs(page.y - endpage.y) < 5) {
							//是否需要回传触发选择器
							if (!isreturn) {
								var _this = e.target;
								var this_selector = $(_this).closest(selector);
								if (this_selector) {
									cbback(this_selector[0]);
								} else {
									cbback(e);
								}
							} else {
								cbback(e);
							}
						}
					})

			}else{




				

				$(this).off("click", selector).on("click", selector, function (e) {
						e.stopPropagation();
					console.log(e, 'eeeeeeeeee');
		
							if (!isreturn) {
								var _this = e.target;
								var this_selector = $(_this).closest(selector);
								if (this_selector) {
									cbback(this_selector[0]);
								} else {
									cbback(e);
								}
							} else {
								cbback(e);
							}
			
				})

		
			}
			

	}

	var utilBase = {
			/**
			 * [ajaxRequest 基于jquery的ajax请求]
			 * @param  {[type]} ajaxurl    [请求路径]
			 * @param  {[type]} datas      [请求参数]
			 * @param  {[type]} callbackFn [回调函数]
			 * @param  {[type]} async 	   [是否同步]
			 * @return {[type]}            [数据类型]
			 */
			ajaxRequest: function (ajaxurl, datas, callbackFn, anymore) {
					var datas = datas || {};
					var defaults = {
							ajaxtype: "post",
							async: true,
							dataType: "json"
					}
					var anymore = $.extend({}, defaults, anymore);
					var callbackFn = callbackFn || function (result) {
							console.log(result)
					};
					$.ajax({
							url: ajaxurl,
							type: anymore.ajaxtype,
							dataType: anymore.dataType,
							async: anymore.async,
							data: datas,
							success: function (result) {
									callbackFn.call(this, result);
							},
							error: function (e) {
									console.log(e);
							}
					});
			}
	}
	//定义国家模板(暂不依赖模板，如果技术选型需要，可直接使用)
	var countryTpl = '<div class="country-main">'+
					 '	<div class="country-head" {{titleColor}}>'+
					 '		<a href="javascript:void(0)" class="reback">'+
					 '			<i></i><span>国家地区</span>'+
					 '		</a>'+
					 '	</div>'+
					 '	<div class="country-list">'+
					 '		<ul class="country-choose clear">'+
					 '			<li class="country-item">中国大陆 +86</li>'+
					 '			{{each list value index}}'+
					 '				{{if value.length}}'+
					 '					<li class="country-item index" id={{"index_"+index}}>{{index}}</li>'+
					 '				{{/if}}'+
			 		 '				{{each value obj j}}'+		
					 '					<li class="country-item" data-abbr="{{obj.i}}" data-code="{{obj.c}}" data-name="{{obj.n}}">{{obj.n}} {{if obj.c}}+{{obj.c}}{{/if}}</li>'+
					 '				{{/each}}'+
					 '			{{/each}}'+
					 '		</ul>'+
					 '		<div class="indexbar">'+
					 '			<ul class="barlist">'+
					 '				<li class="bar-btn">*</li>'+
					 '				{{each list value i}}'+
					 '					{{if value.length}}'+
					 '						<li class="bar-btn" data-index={{i}}>{{i}}</li>'+
					 '					{{/if}}'+
					 '				{{/each}}'+
					 '			</ul>'+
					 '		</div>'+
					 '	</div>'+
					 '</div>';
	//定义城市模板(暂不依赖模板，如果技术选型需要，可直接使用)
	var cityTpl = 	'{{each list value i}}'+
					'	<div class="city-item" data-name="{{value.n}}" data-cityid="{{value.i}}" data-citycode="{{value.f_city_code}}" data-postcode="{{value.f_post_code}}">'+
					'       {{if istelnum}}'+
					'			<span class="city-name">{{value.n}} {{value.f_city_code}}</span>'+
					'           {{else}}'+
					'			<span class="city-name">{{value.n}}</span>'+
					'       {{/if}}'+
					'       {{if isend || (istelnum && value.f_city_code)}}'+
					'			<span class="right-icon end">'+
					'           {{else}}'+
					'           <span class="right-icon">'+
					'       {{/if}}'+
					'		<i></i></span>'+
					'	</div>'+
					'{{/each}}';
	//获取设备宽高度				
	var baseW = $(window).width();
	var baseH = $(window).height();
	var countrydefaults = {
		isautofull : true,			 //input输入框是否回填
		titleColor : "",		     //头部颜色
		dataCbback : function(){}			 //数据回调函数
	};
	$.fn.myCountry = function(options){
		var maxThis = this;
		var options = $.extend({},countrydefaults,options);
		var Country = {
			//初始化
			init : function(){
				Country.getCountrydata();
				Country.bindClick();
			},
			//获取国家数据
			getCountrydata : function(){
				utilBase.ajaxRequest(ajaxurl.country,{},function(result){
					var resultarr = result["0"];
					if(resultarr){
						//提取分组
						var citydata = {};
						for(var i=65;i<91;i++){
							var word = String.fromCharCode(i);
							citydata[word] = [];
						}
						//对应索引
						for(var i=0,len=resultarr.length;i<len;i++){
							var indexword = resultarr[i].s.toUpperCase();
							if(citydata[indexword]){
								citydata[indexword].push(resultarr[i]);
							}
						}
						//调用模板引擎渲染dom
						// var render = template.compile(countryTpl);
						var titleColor;
						if(options.titleColor){
							titleColor = 'style=background-color:'+options.titleColor;
						}
						// var tplhtml = render({"list":citydata,titleColor:titleColor});
						var tplhtml = Country.getCountrytext({"list":citydata,"titleColor":titleColor});
						$("body").append(tplhtml);
						Country.resetH();
					}
				},{async:false})
			},
			//事件绑定
			bindClick : function(){
				//视口变化监听
				window.addEventListener("resize",function(e){
					//重新获取设备参数
					baseW = $(window).width();
					baseH = $(window).height();
					//横屏隐藏索引
					if(baseW>baseH){
						//横屏
						$(".indexbar").addClass("hidden");
					}else{
						$(".indexbar").removeClass("hidden");
					}
					Country.resetH();
				});
				//索引定位
				$(document).ontap(".bar-btn",function(e){
					var _this = $(e);
					var indexword = _this.attr("data-index");
					var item = $("#index_"+indexword);
					// console.log(item);
					if(item){
						var top = item.offset().top - parseInt($(".country-head").height());
						var scrollH = $(".country-choose").scrollTop();
						$(".country-choose").stop(false).animate({
							scrollTop : Math.abs(scrollH+top)
						},500);
					}
				});
				//数据选择
				$(document).ontap(".country-item",function(e){
					var _this = $(e);
					if(_this.hasClass("index")){
						return;
					}else{
						var result = {
							name : _this.attr("data-name"),
							code : _this.attr("data-code"),
							abbr : _this.attr("data-abbr")
						}
						Country.closeChoose(result);
					}
				})
				//返回
				$(document).ontap(".reback",function(e){
					Country.closeChoose();
				})
			},
			//重新调整布局
			resetH : function(){
				//定义国家地区选择最大高度，实现滚动
				var dexnum = parseInt($(".country-list").css("marginTop"));
				$(".country-choose").css({
					maxHeight:(baseH-dexnum)+"px"
				})
				//索引条
				$(".indexbar").css({
					height:baseH+"px",
				});
				var barlen = $(".bar-btn").length;
				$(".bar-btn").css({
					height : baseH/barlen +"px",
					lineHeight : baseH/barlen +"px"
				})
				if(baseW>baseH){
					//横屏
					$(".indexbar").addClass("hidden");
				}else{
					$(".indexbar").removeClass("hidden");
				}
			},
			closeChoose : function(country){
				if(!country){
					// $(".country-main").remove();
					//防止页面出现穿透事件
					$(".country-main").fadeOut(310,function(){
						$(this).remove();
					});
					return;
				}
				if($(maxThis)[0].tagName.toLowerCase()=="input"){
					$(maxThis).val(country.name);
				}else{
					$(maxThis).attr("data-val",country.name);
				}
				options.dataCbback(country);
				$(".country-main").fadeOut(310,function(){
					$(this).remove();
				});
			},
			//传入参数获取国家html文本串
			getCountrytext : function(params){
				var texthtml = '<div class="country-main">';
				if(params.titleColor){
					texthtml += '<div class="country-head" '+params.titleColor+'>';
				}else{
					texthtml += '<div class="country-head">';
				}
				texthtml += '		<a href="javascript:void(0)" class="reback">'+
					 		'			<i></i><span>国家地区</span>'+
					 		'		</a>'+
				 			'	</div>'+
				 			'	<div class="country-list">'+
				 			'		<ul class="country-choose clear">'+
					 		'			<li class="country-item" data-code="86" data-name="中国大陆">中国大陆 +86</li>';
				console.log(params);
				var list = params.list;
				if(list){
					for(var i in list){
						//索引
						if(list[i].length){
							texthtml +='<li class="country-item index" id="index_'+i+'">'+i+'</li>';
							for(var j = 0; j < list[i].length; j++){
								if(list[i][j]["c"]){
									texthtml += '<li class="country-item" data-abbr="'+list[i][j]["i"]+'" data-code="'+list[i][j]["c"]+'" data-name="'+list[i][j]["n"]+'">'+list[i][j]["n"]+' +'+list[i][j]["c"]+'</li>';
								}else{
									texthtml += '<li class="country-item" data-abbr="'+list[i][j]["i"]+'" data-code="'+list[i][j]["c"]+'" data-name="'+list[i][j]["n"]+'">'+list[i][j]["n"]+'</li>';
								}
								
							}
						}
					}
					texthtml += '</ul>';
					texthtml += '<div class="indexbar">'+
					 			'	<ul class="barlist">'+
					 			'		<li class="bar-btn">*</li>';
					for(var k in list){
						if(list[k].length){
							texthtml +='<li class="bar-btn" data-index="'+k+'">'+k+'</li>';
						}
					}
					texthtml += '</ul>';
				}
				texthtml += '</div></div></div>';
				return texthtml.replace(/undefined/g,"");
			}
		}
		Country.init();
	};
	//定义城市选择参数,在只需要选择三级数据的时候传入datalevel:3,自定义查找数据的时候传入cityid
	var citydefaults = {
		isautofull : true,			 //input输入框是否回填
		datalevel : 4,               //选择数据层级，默认选到街道
		cityid : 0,				 	 //传入城市id,进行自定义查找
		ispage : true, 				 //是否查找下一组数据
		titleColor : "",			 //头部颜色
		istelnum : false,            //是否选择电话区号
		isPostNum : false,           //是否自动填充邮编
		dataCbback : function(){}	  //数函数据回调
	}
	$.fn.myCity = function(options){
		var maxThis = this;
		var options = $.extend({},citydefaults,options);
		var citydata;
		var choosedata = {};
		var City = {
			//初始化
			init : function(){
				//加载框架
				$("body").append(City.getFirsthtml());
				var citydatastr =localStorage.getItem("citydata");
				if(!citydatastr){
					utilBase.ajaxRequest(ajaxurl.firstdata,{},City.getcityDate,{async:false});
                    City.init();
                    return ;
				}else{
					citydata = JSON.parse(citydatastr);
					if(options.cityid == 0){
						City.domfirstCity(citydata["0"]);
					}else{
						var resstr = City.findnextCity(options.cityid);
						if(resstr){
							City.domfirstCity(resstr,true);
						}else{
							City.returnChoose(options.cityid);
						}
					}
				}
				City.resetH();
				City.bindClick();
			},
			getFirsthtml : function(){
				var cityinitstr = '<div class="city-main">';
				if(options.titleColor){
					//匹配有效的16进制色值，不匹配透明色
					if(/^#([a-fA-F\d]{3}|[a-fA-F\d]{6})$/.test(options.titleColor)){
						cityinitstr += '<div class="city-head" style="background-color:'+options.titleColor+'">';
					}else{
						cityinitstr += '<div class="city-head">';
					}
				}else{
					cityinitstr += '<div class="city-head">';
				}
				cityinitstr +=	'		<a href="javascript:void(0)" class="reback">';
				if(options.istelnum){
					//选择电话区号
					cityinitstr +='			<i></i><span>选择电话区号</span>';
				}else{
					cityinitstr +='			<i></i><span>选择地区</span>';
				}
				cityinitstr +=	'		</a>'+
								'	</div>'+
								'	<div class="city-list">'+
								'		<ul class="city-choose clear" data-viewnum="0">'+
								'			<li class="itme-list-1"></li>'+
								'			<li class="itme-list-2"></li>'+
								'			<li class="itme-list-3"></li>'+
								'			<li class="itme-list-4"></li>'+
								'		</ul>'+
								'	</div>'+
								'</div>';
				return cityinitstr;
			},
			//事件绑定
			bindClick : function(){
				//选择数据
				var tap = true;
				$(document).ontap(".city-item",function(e){
					if(!tap) return;
					tap = false;
					var m = $(e);
					// 获取当前的选择器
					var thisul = $(e).closest(".city-choose");
					// 获取当前页面数据
					var viewnum = parseInt(thisul.attr("data-viewnum"));
					var fid = m.attr("data-cityid");
					var name = m.attr("data-name");
					var postcode = m.attr("data-postcode");
					var citycode = m.attr("data-citycode");
					choosedata["list"+viewnum] = {
						name : name,
						fid : fid,
						postcode : postcode,
						citycode : citycode
					}
					if($(e).find(".right-icon").hasClass("end")){
						City.returnChoose(fid);
						return;
				    }
					//是否到达数据级
					if(viewnum < options.datalevel-1){
						//是否查找下一级数据
						if(options.ispage){
							var resstr = City.findnextCity(m.attr("data-cityid"));
							//数据是否存在
							if(resstr){
								//进行翻页
								// var render = template.compile(cityTpl);
								//根据数据技术判断是否结束
								var isend = false;
								if(viewnum+2==4){
									isend = true;
								}
								// var texthtml = render({"list":resstr,"isend":isend,istelnum:options.istelnum});
								var texthtml = City.getCitytext({"list":resstr,"isend":isend,istelnum:options.istelnum});
								$(".city-choose").find(".itme-list-"+(viewnum+2)).html(texthtml);
								thisul.stop(false).animate({
									"left":-(viewnum+1)*baseW+"px"
								},400,function(){
									thisul.attr("data-viewnum",viewnum+1);
                                    tap = true;
								});
							}else{
								City.returnChoose(fid);
							}
						}else{
							City.returnChoose(fid);
						}
					}else{
						City.returnChoose(fid);
					}
				});
				//返回上一级选择数据
				$(document).ontap(".reback",function(e){
					var thisul = $(".city-choose");
					// 获取当前页面数据
					var viewnum = parseInt(thisul.attr("data-viewnum"));
					var leftnum = parseInt(thisul.css("left"));
					if(leftnum>=0){
						choosedata = {};
						City.returnChoose();
					}
					thisul.stop(false).animate({
						"left":-(viewnum-1)*baseW+"px"
					},400,function(){
						thisul.attr("data-viewnum",viewnum-1);
					});
				});
				//视口变换监听
				window.addEventListener("resize",function(e){
					baseW = $(window).width();
					baseH = $(window).height();
					City.resetH();
					//强制定义滚动后的数据
					var thisul = $(".city-choose");
					var viewnum = parseInt(thisul.attr("data-viewnum"));
					thisul.css({
						"left":-(viewnum)*baseW+"px"
					});
				})
			},
			//数据初始化
			getcityDate : function(result){
				if(!result){
					return;
				}
				//将请求数据存放本地
				localStorage.setItem("citydata",JSON.stringify(result.data));
				citydata = result.data;
				// console.log(citydata);
				if(options.cityid == 0){
					City.domfirstCity(result["0"]);
				}else{
					var resstr = City.findnextCity(options.cityid);
					if(resstr){
						City.domfirstCity(resstr);
					}else{
						City.returnChoose(options.cityid);
					}
				}
			},
			//渲染一级数据
			domfirstCity : function(list,isend){
				// console.log(list);
				var list = list || {};
				// var render = template.compile(cityTpl);
				var isend = isend || false;
				// var tplhtml = render({"list":list,"isend":isend,istelnum:options.istelnum});
				var tplhtml = City.getCitytext({"list":list,"isend":isend,istelnum:options.istelnum});
				$(".itme-list-1").html(tplhtml);
			},
			//调整布局
			resetH : function(){
				//定义地区选择ul容器宽度
				$(".city-choose").css({
					width:baseW*4+"px"
				})
				//定义地区选择最大高度，实现滚动
				var value = parseInt($(".city-list").css("marginTop"));
				$(".city-choose").find("li").css({
					width:baseW+"px"
				})
			},
			//查找下一级数据
			findnextCity : function(id){
				if(citydata[id]){
					return citydata[id];
				}else{
					//请求服务器数据
					var resstr;
					utilBase.ajaxRequest(ajaxurl.lastdata,{"fParentId":+id},function(res){
						if(res && res.length){
							resstr = res;
						}
					},{async:false});
					if(resstr){
						return resstr;
					}else{
						return false;
					}
				}
			},
			//返回选择数据
			returnChoose : function(fid){
				if(fid == undefined){
                    $(".city-main").fadeOut(310,function(){
                        $(this).remove();
                    });
                    return;
				}
				var resultstr = "" , postNum = [];
				for(var i in choosedata){
					resultstr += resultstr=="" ? choosedata[i].name : "-"+choosedata[i].name;
					if(choosedata[i].postcode != ""){
                        postNum.push(choosedata[i].postcode);
					}
				}
				if(options.isautofull){
					if($(maxThis)[0].tagName.toLowerCase()=="input"){
						$(maxThis).val(resultstr);
					}
				}
				if(options.isPostNum){
                    $(maxThis).attr("postCodeId","zm_fUserPostcode");
				}else {
                    $(maxThis).attr("postCodeId","");
				}
				if($(maxThis).attr("postCodeId")){
                    $('#' + $(maxThis).attr('postCodeId')).val(postNum[postNum.length-1]);
				}
				$(maxThis).attr("data-val",resultstr);
				if(fid){
					$(maxThis).attr("data-fid",fid);
				}
				//磊哥说要这样写
				var result = {};
				var strarr = ["province","city","district","street"];
				for(var i = 0;i<4;i++){
					if(choosedata["list"+i]){
						result[strarr[i]] = choosedata["list"+i];
					}
				}
				options.dataCbback(result);
				choosedata = {};
				$(".city-main").fadeOut(310,function(){
					$(this).remove();
				});
			},
			//传入参数获取城市html文本串
			getCitytext : function(params){
				var texthtml = "";
				var list = params.list;
				if(list.length){
					for(var i = 0; i < list.length; i++){
						texthtml += '<div class="city-item" data-name="'+ list[i]["n"] +'" data-cityid="'+ list[i]["i"] +'" data-citycode="'+ list[i]["f_city_code"] +'" data-postcode="'+ list[i]["f_post_code"] +'">';
						if(params.istelnum && list[i]["f_city_code"]){
							texthtml += '<span class="city-name">'+ list[i]["n"] +' '+ list[i]["f_city_code"] +'</span>';
						}else{
							texthtml += '<span class="city-name">'+ list[i]["n"] +'</span>';
						}
						if(params.isend || (params.istelnum && list[i]["f_city_code"])){
							texthtml += '<span class="right-icon end">';
						}else{
							texthtml += '<span class="right-icon">';
						}
						texthtml += '<i></i></span></div>';
					}
				}
				return texthtml.replace(/undefined/g,"");
			}
		}
		City.init();
	}
})(jQuery,window);