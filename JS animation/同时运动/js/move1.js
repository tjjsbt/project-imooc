function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr]; //currentStyle 针对 IE浏览器
    } else {
        return getComputedStyle(obj, false)[attr]; //getComputedStyle 针对firefox浏览器
    }
}

//startMove(obj,{attr1:iTarget1, attr2:iTarget2},fn)
function startMove(obj, json, fn) {
    var flag = true; //假设所有运动都达到了目标值
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        for (var attr in json) {
            //1.取当前的值
            var icur = 0;
            if (attr == 'opacity') {
                icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                icur = parseInt(getStyle(obj, attr));
            }
            //2.算速度             
            var speed = (json[attr] - icur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //3.检测停止
            if (icur != json[attr]) {
                flag = false;
            }
            if (attr == 'opacity') {
                //针对ie
                obj.style.filter = 'alpha(opacity:' + (icur + speed) + ')';
                // 针对firefox/chrome浏览器
                obj.style.opacity = (icur + speed) / 100;
            } else {
                obj.style[attr] = icur + speed + 'px';
            }
        }
        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    }, 30)
}
