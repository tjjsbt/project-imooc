/*//下面代码弹性不足 条件增多则越来越臃肿
var performanceS = function(salary){
	return salary * 4;
};
var performanceA = function(salary){
	return salary * 3;
};
var performanceB = function(salary){
	return salary * 2;
};

var calculateBonus = function(level, salary){
	if (level === 'S') {
		performanceS(salary);
	}

	if (level === 'A') {
		performanceA(salary);
	}

	if (level === 'B') {
		performanceB(salary);
	}

};
calculateBonus('S', 2000);*/


//策略模式
//定义一系列算法，一个个封装起来，并且可以互相替换
var strategies = {
	S: function(){
		return salary * 4;
	},
	A: function(){
		return salary * 3;
	},
	B: function(){
		return salary * 2;
	},
	C: function(){
		return salary * 1.5;
	}
};
//增加时核心逻辑calculateBonus 不用修改
var calculateBonus = function(level, salary){
	return strategies[level](salary);
};
calculateBonus('S', 2000)