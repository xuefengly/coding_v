$(function(){
	//搜索切换
	(function(){
		var aLi = $('#menu li');
		var oText = $('.form').find('.text');
		var arrText = [
			'例如：荷棠鱼坊 或 樱花日本料理',
			'例如：昌平区育新站龙旗广场2号楼609室',
			'例如：万达影院双人情侣卷',
			'例如：东莞出事了，大老虎是谁',
			'例如：北京初春降雪，天气变换莫测',
		];
		var iNow = 0;
		oText.val(arrText[iNow]);
		aLi.each(function(index){
			$(this).click(function(){
				aLi.attr('class','gradient');
				$(this).attr('class','active');
				iNow = index;
				oText.val(arrText[iNow]);
			});
		});
		oText.focus(function(){
			if($(this).val() == arrText[iNow]){
				$(this).val('');
			}
		});
		oText.blur(function(){
			if($(this).val() == ''){
				oText.val(arrText[iNow]);
			}
		});
	})();
	//update文字滚动
	(function(){
		var oUl = $(".update ul");
		var oDiv = $('.update');
		var arrData = [
			{'name':'萱萱','time':'2','title':'那些灿烂美好的瞬间','url':'http://www.miaov.com/2013/'},
			{'name':'花花','time':'5','title':'广东3天抓获嫌疑犯','url':'http://www.miaov.com/2013/'},
			{'name':'常常','time':'6','title':'国台办回应xxx','url':'http://www.miaov.com/2013/'},
			{'name':'等等','time':'7','title':'广东3天抓获嫌疑犯','url':'http://www.miaov.com/2013/'},
			{'name':'萱萱','time':'8','title':'国台办回应xxx','url':'http://www.miaov.com/2013/'},
			{'name':'花花','time':'9','title':'那些灿烂美好的瞬间','url':'http://www.miaov.com/2013/'},
			{'name':'等等','time':'10','title':'那些灿烂美好的瞬间','url':'http://www.miaov.com/2013/'},
			{'name':'萱萱','time':'11','title':'国台办回应xxx','url':'http://www.miaov.com/2013/'},
			{'name':'常常','time':'12','title':'那些灿烂美好的瞬间','url':'http://www.miaov.com/2013/'}
		]
		var str = '';
		var oBtnUp = $('#BtnUp');
		var oBtnDown = $('#BtnDown');
		var iNow = 0;
		var timer = null;

		for(var i=0;i<arrData.length;i++){
			str += '<li><a href="'+arrData[i].url+'"><strong>'+arrData[i].name+'</strong> <span>'+arrData[i].time+'分钟前</span> 写了一篇新文章：'+arrData[i].title+'...</a></li>'
		};
		oUl.html(str);
		// console.log(str);
		var iH = oUl.find('li').height();
		// console.log(iH);
		oBtnUp.click(function(){
			doMove(-1);
		});
		oBtnDown.click(function(){
			doMove(1);
		});
		function doMove(num){
			iNow += num;
			if(Math.abs(iNow)> arrData.length-1){
				iNow = 0;
			}
			// console.log(arrData.length);
			if(iNow > 0){
				iNow = -(arrData.length-1);
			}
			oUl.stop().animate({'top':iH*iNow},1000);
		}
		function autoPlay(){
			timer = setInterval(function(){
				doMove(-1);
			},2000);
		}
		autoPlay();
		oDiv.hover(function(){
			clearInterval(timer);
		},autoPlay);
		// oUl.animate({'top':iH*-1},3000);
	})();
	//选项卡切换
	(function(){
		fnTab($('.tabNav1'),$('.tabCon1'));
		fnTab($('.tabNav2'),$('.tabCon2'));
		fnTab($('.tabNav3'),$('.tabCon3'));
		fnTab($('.tabNav4'),$('.tabCon4'));
		function fnTab(aNav,aCon){
			var aElem = aNav.children();
			aCon.hide().eq(0).show();
			aElem.each(function(index){
				$(this).hover(function(){
					aElem.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					aElem.find('a').attr('class','triangle_down_gray');
					$(this).find('a').attr('class','triangle_down_red');
					aCon.hide().eq(index).show();
				});
			})
		}
	})();
	//自动播放焦点图
	(function(){
		var oDiv = $('#fade');
		var aUlLi = oDiv.find('ul li');
		var aOlLi = oDiv.find('ol li');
		var oP = oDiv.find('p');
		var arr = ['爸爸去哪里啦~','人像摄影中的光影感','美艳大方'];
		var iNow = 0;
		var timer = null;
		fnFade();

		aOlLi.click(function(){
			iNow = $(this).index();
			fnFade();
		});
		oDiv.hover(function(){clearInterval(timer);},autoPlay);

		function autoPlay(){
			timer = setInterval(function(){
				iNow++;
				iNow %= arr.length;
				fnFade();
			},2000);
		}
		autoPlay();
		function fnFade(){
			aUlLi.each(function(i){
				if(i != iNow){
					aUlLi.eq(i).fadeOut().css('zindex','1');
					aOlLi.eq(i).removeClass('active');
				}else{
					aUlLi.eq(i).fadeIn().css('zindex','2');
					aOlLi.eq(i).addClass('active');
				}
			oP.text(arr[iNow]);
			});
		}
	})();
	//日历提示
	(function(){
		var Calendar = $('.calendar');
		var aSpan = Calendar.find("h3 span");
		var aImg = Calendar.find('.img');
		// console.log(aImg);
		var aInfo = $('.today_info');
		var oImg = aInfo.find('img');
		var aStrong = aInfo.find('.text strong');
		var aP = aInfo.find('.text p');
		aImg.hover(function(){
			var iTop = $(this).parent().position().top-30;
			var iLeft = $(this).parent().position().left+55;
			var index = $(this).parent().index()%aSpan.length;
			
			aInfo.show().css({'top':iTop,'left':iLeft});
			aP.text($(this).attr('info'));
			oImg.attr('src',$(this).attr('src'));
			aStrong.text(aSpan.eq(index).text());
			// console.log($(this).parent().index()%aSpan.size());未知错误:无size方法。。。可用length
			// console.log($(this).parent().index());
			// console.log(iTop);
			// console.log($(this).attr('info'));
		},function(){
			aInfo.hide();
		})
	})();
	//BBS高亮显示
	(function(){
		var BBS = $('.bbs');
		BBS.find('ol li').mouseover(function(){
			BBS.find('ol li').removeClass('active').eq($(this).index()).addClass('active');
		})
	})();
	//HOT鼠标提示
	(function(){
		var arr = [
			'',
			'用户1<br/>人气1',
			'用户名：性感宝贝<br/>区域：朝阳CBD<br/>人气:124987',
			'用户3<br/>人气3',
			'用户4<br/>人气4',
			'用户5<br/>人气5',
			'用户6<br/>人气6',
			'用户7<br/>人气7',
			'用户8<br/>人气8',
			'用户9<br/>人气9',
			'用户10<br/>人气10'
		];
		$('.hot_area li').mouseover(function(){
			if($(this).index() == 0) return;
			$('.hot_area li p').remove();
			$(this).append('<p style="width:'+($(this).width()-12)+'px;height:'+($(this).height()-12)+'px;">'+arr[$(this).index()]+'</p>');
		});
		// $('.hot_area').mouseout(function(){
		// 	$('.hot_area li p').remove();
		// })
		// 那么怎么删除最后的p??
		// $('hot_area li').hover(function(){
		// 	if($(this).index() == 0) return;
		// 	$('.hot_area li p').remove();
		// 	$(this).append('<p style="width:'+($(this).width()-12)+'px;height:'+($(this).height()-12)+'px;">'+arr[$(this).index()]+'</p>');
		// },function(){
		// 	$('.hot_area p').remove();
		// });
		//hover()为什么没用
	})();
})