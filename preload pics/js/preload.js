//图片预加载
(function($){

	function PreLoad(imgs, options){
		//一般imgs是作为数组传递进来
		this.imgs = (typeof imgs === "string") ? [imgs] : imgs;
		//如果传递了options变量则使用，没有传递则使用默认值
		//options覆盖PreLoad.DEFAULTS生成一个新对象返回
		this.opts = $.extend({}, PreLoad.DEFAULTS, options);

		if (this.opts.order === "ordered") {
			//加下划线表示这个方法只在内部使用,不提供外部调用
			this._ordered();
		}else {
			this._unordered();
		}
	}
	PreLoad.DEFAULTS = {//默认值，如果没有传参数
		order: "unordered",	//无序预加载
		each: null,		//每一张图片加载完毕后执行
		all: null		//所有图片加载完毕后执行
	};

	PreLoad.prototype._ordered = function(){//有序加载
		var opts = this.opts,
			imgs = this.imgs,
			len = imgs.length,
			count = 0;

		orderlyLoad();
		function orderlyLoad(){
			//1.创建image对象
			var imgObj = new Image();
			//2.绑定事件
			$(imgObj).on("load error", function(){
				opts.each && opts.each(count);

				if (count >= len) {
					//所有图片加载完毕
					opts.all && opts.all();
				}else {
					//还有图片没有加载完成
					orderlyLoad();
				}

				count++;
			});

			//3.复制路径
			imgObj.src = imgs[count];
		}
	};

	PreLoad.prototype._unordered = function(){ //无序加载
		var imgs = this.imgs,
			opts = this.opts,
			count = 0,
			len = imgs.length;

		$.each(imgs, function(i, src){
			if (typeof src != "string") return;

			var imgObj = new Image();

			$(imgObj).on("load error", function(){
				//如果没有option参数,each方法是null，不能调用,所以做判断
				//如果opts.each就执行opts.each(count)
				opts.each && opts.each(count);

				if (count >= len - 1) {
					opts.all && opts.all();
				}
				count++;
			});
			imgObj.src = src;
		});
	};

	//变成插件jquery两种方法
	// 1.	$.fn.extend -> $("#img").preload()
	// 2.	$.extend -> $.preload();    (工具方法)
	$.extend({
		preload: function (imgs, opts){
			new PreLoad(imgs, opts);
		}
	});

})(jQuery);