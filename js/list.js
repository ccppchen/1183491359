
(function($){
	$.fn.movebg=function(options){
		var defaults={
		width:125,/*移动块的大小*/
		extra:50,/*反弹的距离*/
		speed:300,/*块移动的速度*/
		rebound_speed:300/*块反弹的速度*/
		};
	var defaultser=$.extend(defaults,options);
	return this.each(function(){
		var _this=$(this);
		var _item=_this.children("ul").children("li").children("a");/*找到触发滑块滑动的元素	*/
		var origin=_this.children("ul").children("li.cur").index();/*获得当前导航的索引*/
		var _mover=_this.find(".move-bg");/*找到滑块*/
		var hidden;/*设置一个变量当html中没有规定cur时在鼠标移出导航后消失*/
		if (origin==-1){origin=0;hidden="1"} else{_mover.show()};/*如果没有定义cur,则默认从第一个滑动出来*/
		var cur=prev=origin;/*初始化当前的索引值等于上一个及初始值;*/
		var extra=defaultser.extra;/*声明一个变量表示额外滑动的距离*/
		_mover.css({left:""+defaultser.width*origin+"px"});/*设置滑块当前显示的位置*/
		
		//设置鼠标经过事件
		_item.each(function(index,it){
			$(it).mouseover(function(){
				cur=index;/*对当前滑块值进行赋值*/
				move();
				prev=cur;/*滑动完成对上个滑块值进行赋值*/
			});
		});
		_this.mouseleave(function(){
			cur=origin;/*鼠标离开导航时当前滑动值等于最初滑块值*/
			move();
			if(hidden==1){_mover.stop().fadeOut();}/*当html中没有规定cur时在鼠标移出导航后消失*/
		});
		
		//滑动方法
		function move(){
			_mover.clearQueue();
			if(cur<prev){extra=-Math.abs(defaultser.extra);} /*当当前值小于上个滑块值时，额外滑动值为负数*/
			else{extra=Math.abs(defaultser.extra)};/*当当前值大于上个滑块值时，滑动值为正数*/
			_mover.queue(
				function(){
					$(this).show().stop(true,true).animate({left:""+Number(cur*defaultser.width+extra)+""},defaultser.speed),
					function(){$(this).dequeue()}
				}
			);
			_mover.queue(
				function(){
					$(this).stop(true,true).animate({left:""+cur*defaultser.width+""},defaultser.rebound_speed),
					function(){$(this).dequeue()}
				}
			);
		};
	})
	}
})(jQuery);

	//图片轮播
	var num = 0;//全局变量 这个是灵魂
	//自定义函数
	function myFn(){
		var numZhi = num * -420;//  '+numZhi+'
		$('.demo01 .slides').stop().animate({'left':''+numZhi+'px'},500);
		$('.oslides li').eq(num).addClass('current').siblings().removeClass('current');
	}
	
	$('.oslides li').click(function(e) {
        $(this).addClass('current').siblings().removeClass('current');
		var thzhi = $(this).index();
		var numZhi = thzhi * -420;//  '+numZhi+'
		$('.demo01 .slides').stop().animate({'left':''+numZhi+'px'},500);
    });
	//点击右按钮
	$('.rightBtn').click(function(e) {
		//2件事情 1：控制ol的li向下一个移动
		num++;
		//如果num等于6了 就代表到了最后一个  我们让num变回0即可
		if(num == 5){
			num = 0;
		}
		myFn();
	});
	//左按钮点击
	$('.leftBtn').click(function(e) {
		num--;
		if(num == -1){//如果变成-1 就超过了极值 那么我们要让num变成 5
			num = 4;
		}
		myFn();
	});


