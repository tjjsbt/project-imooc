window.onload = function() {
    waterfall('main', 'box');
    //模拟后台过来的JSON数据
    var dataInt = {"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'}]}
    window.onscroll = function() {
        if (checkScrollSlide){
        	var oParent = document.getElementById('main');
        	//将数据块渲染到当前页面的尾部
        	for (var i = 0; i < dataInt.data.length; i++) {
        		var oBox = document.createElement('div');
        		oBox.className = 'box';
        		oParent.appendChild(oBox);
        		var oPic = document.createElement('div');
        		oPic.className = 'pic';
        		oBox.appendChild(oPic);
        		var oImg = document.createElement('img');
        		oImg.src = "images/" + dataInt.data[i].src;
        		oPic.appendChild(oImg);
        	}
        	//再将新数据排列
        	waterfall('main', 'box');
        }
    }
}

function waterfall(parent, box) {
    //将main下的所有class为box的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);
    //计算页面显示的列数(页面宽/box的宽)
    var oBoxW = oBoxs[0].offsetWidth;
    //document.documentElement.clientWidth获取用户页面宽度
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW);    
    //动态设置main div的宽度和居中
    oParent.style.cssText = 'width:' + oBoxW * cols + 'px;margin:0 auto';
    var hArr = [];
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < cols) {
            hArr.push(oBoxs[i].offsetHeight);
        } else {
            var minH = Math.min.apply(null, hArr);
            var index = getMinhIndex(hArr, minH);
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            //oBoxs[i].style.left = oBoxW*index + 'px';
            oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
            //添加图片后最小值加上他下面那张图片的高度
            hArr[index] += oBoxs[i].offsetHeight;
        }
    }    
}

//根据class获取元素
function getByClass(parent, clsName) {
    var boxArr = new Array(), //用来存储获取到的所有class为box 的元素
        oElements = parent.getElementsByTagName('*');
    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == clsName) {
            boxArr.push(oElements[i]);
        }
    }    
    return boxArr;
}

function getMinhIndex(arr, val) {
    for (var i in arr) {
        if (arr[i] == val) {
            return i;
        }
    }
}

//检测是否具备加载数据块的条件
function checkScrollSlide(argument) {
    var oParent = document.getElementById('main');
    var oBoxs = getByClass(oParent, 'box');
    //oBoxs[oBoxs.length-1].offsetTop最后一个盒子距离整个页面顶部的距离
    // lastBoxH 最后一个盒子一半到整个页面顶部的距离
    var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
    //混杂模式document.body.scrollTop 标准模式document.documentElement.scrollTo 获取滚动的高度
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;    
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxH<scrollTop+height)?true:false;
}
