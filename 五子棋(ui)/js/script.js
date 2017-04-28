
var chessBoard = [];
var me = true;

for (var i = 0; i < 15; i++) {
	chessBoard[i] = [];
	for(var j = 0; j < 15; j++){
		chessBoard[i][j] = 0;
	}
}

var chess = document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle = "#bfbfbf";

// 背景水印
var logo = new Image();
logo.src = "images/logo.jpg";
logo.onload = function() {
    context.drawImage(logo, 0, 0, 450, 450); //左上角坐标 0，0; 宽高各450
    drawChessBoard();
}

// 棋盘
var drawChessBoard = function() {
    for (var i = 0; i < 15; i++) {
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
    }
}

//i,j棋子在棋盘上的索引，me黑棋 白棋
var oneStep = function(i, j, me) {
        //绘制棋子
        context.beginPath();
        // arc(x,y,r,star弧度,end弧度)
        context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
        context.closePath();
        //棋子渐变
        var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
        if (me) {
            gradient.addColorStop(0, "#0a0a0a");
            gradient.addColorStop(1, "#636766");
        } else {
        	gradient.addColorStop(0, "#d1d1d1");
            gradient.addColorStop(1, "#f9f9f9");
        }
        context.fillStyle = gradient;
        context.fill();
    }

    chess.onclick = function(e){
    	var x = e.offsetX;
    	var y = e.offsetY;
    	var i = Math.floor(x / 30);
    	var j = Math.floor(y / 30);
    	if(chessBoard[i][j] == 0){
    	oneStep(i,j,me);
    	if(me){
    		chessBoard[i][j] = 1;
    	}else{
    		chessBoard[i][j] = 2;
    	}
    	me = !me;
    	}
    }
    /*context.moveTo(0,0);
    context.lineTo(450,450);	//棋盘大小
    context.stroke();             //画线*/
