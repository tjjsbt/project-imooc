var Beverage = function(){};

Beverage.prototype.boilWater = function(){
	console.log("把水煮沸");
};
Beverage.prototype.brew = function(){
	//强制重写子类
	throw new Error("子类必须重写该方法");
};
Beverage.prototype.pourInCup = function(){
	throw new Error("子类必须重写该方法");
};
Beverage.prototype.addCondiments = function(){
	throw new Error("子类必须重写该方法");	
};
//钩子方法 确认子类需不需要调料
Beverage.prototype.customerWantsCondiments = function(){
	return true;
};

Beverage.prototype.init = function(){
	this.boilWater();
	this.brew();
	this.pourInCup();
	//如果返回的是真就加调料
	if (this.customerWantsCondiments()) {
		this.addCondiments();
	}	
};

var Coffee = function(){};

Coffee.prototype.brew = function(){
	console.log("用沸水冲泡咖啡");
};
Coffee.prototype.pourInCup = function(){
	console.log("把咖啡倒进杯子");
};
Coffee.prototype.addCondiments = function(){
	console.log("加糖和牛奶");
};

var Tea = function(){};

Tea.prototype.brew = function(){
	console.log("用沸水冲泡茶叶");
};
Tea.prototype.pourInCup = function(){
	console.log("把茶水倒进杯子");
};
Tea.prototype.pourInCup = function(){
	console.log("加柠檬");
};
Tea.prototype.customerWantsCondiments = function(){
	return window.confirm("请问需要加调料么？")
};

Coffee.prototype = new Beverage();
coffee.init();
Tea.prototype = new Beverage();
tea.init();

LightHalf.prototype.bindEvent = function(){
            //这里的this不太明白 再看一遍
            var self = this,
                itemLength = self.$item.length;
            self.$el.on("mouseover", ".rating-item", function() {
                var num = $(this).index() + 1;

                self.lightOn(num);

                (typeof self.opts.select === 'function') && self.opts.select.call(this,num, itemLength);
                self.$el.trigger('select', [num, itemLength]);
            })
            .on("click", ".rating-item", function() {
                self.opts.num = $(this).index() + 1;
                (typeof self.opts.chosen === 'function') && self.opts.chosen.call(this, self.opts.num, itemLength);
                self.$el.trigger('chosen', [self.opts.num, itemLength]);
            })
            .on("mouseout", function() {
                self.lightOn(self.opts.num);
            });
        };