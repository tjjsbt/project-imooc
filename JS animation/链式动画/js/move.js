function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr]; //currentStyle 针对 IE浏览器
    } else {
        return getComputedStyle(obj, false)[attr]; //getComputedStyle 针对firefox浏览器
    }
}
// var timer = null;
var alpha = 30;

function startMove(obj, attr, iTarget, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {        
        //1.取当前的值
        var icur = 0;
        if (attr == 'opacity') {
            icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
        } else {
            icur = parseInt(getStyle(obj, attr));
        }
        //2.算速度				
        var speed = (iTarget - icur) / 8;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        //3.检测停止
        if (icur == iTarget) {
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        } else {
            if (attr == 'opacity') {
                //针对ie
                obj.style.filter = 'alpha(opacity:' + (icur + speed) + ')';
                // 针对firefox/chrome浏览器
                obj.style.opacity = (icur + speed) / 100;
            } else {
                obj.style[attr] = icur + speed + 'px';
            }
        }
    }, 30)
}
