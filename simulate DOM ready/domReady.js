function myReady(fn){
	//对于现代浏览器，对DOMContentLoaded事件的处理采用标准的事件绑定方式
	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded", fn, false);
	}else{
		IEContentLoaded(fn);
	}
	//IE模拟DOMContentLoaded(第一步)
	function IEContentLoaded(fn){
		var d = window.document;
		var done = false;

		//只执行一次用户的回调函数init()
		var init = function(){
			if (!done) {
				done = true;
				fn();
			}
		};

		//(第三步)
		(function(){
			try{
				//DOM树未创建完之前调用doScroll会抛出错误
				d.documentElement.doScroll('left');
			}catch(e){
				//延迟再试一次  arguments.callee 调用这个立即执行函数自身
				setTimeout(arguments.callee,50);
				//用return实现递归
				return;
			}
			//没有错误就表示DOM树创建完毕，然后立马执行用户回调
			init();
		})();

		//监听document的加载状态(第二步)
		d.onreadystatechange = function(){
			//如果用户是在domReady之后绑定的函数，就立马执行
			if (d.readyState == 'conmplete') {
				d.onreadystatechange = null;
				init();
			}
		}
	}
}