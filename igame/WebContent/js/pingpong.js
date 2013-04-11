var KEY = {
	UP : 38,
	DOWN : 40,
	W : 87,
	S : 83
};

/**
 * 创建乒乓游戏对象
 */
var pingpong = {};
/**
 * 加入按键情况
 */
pingpong.pressedKeys = [];
/**
 * 加入一个乒乓球
 */
pingpong.ball = {
	speed : 3,
	x : 150,
	y : 100,
	directionX : 1,
	directionY : 1
};

$(function() {
	// 将键盘监听事件更顺畅并且支持同时多个输入
	// 循环变化按键事件状态
	pingpong.timer = setInterval(gameloop, 30);

	$(document).keydown(function(e) {
		pingpong.pressedKeys[e.which] = true;
	});
	$(document).keyup(function(e) {
		pingpong.pressedKeys[e.which] = false;
	});

});

/**
 * 循环移动
 */
function gameloop() {
	movePaddles();
	moveBall();
}
/**
 * 移动球拍
 */
function movePaddles() {
	var playgroudHeight = parseInt($("#playground").css("height"));

	if (pingpong.pressedKeys[KEY.UP]) {
		var top = parseInt($("#paddleB").css("top"));
		if (checkTopBound(top)) {
			$("#paddleB").css("top", top - 5);
		}
	}
	if (pingpong.pressedKeys[KEY.DOWN]) {
		var top = parseInt($("#paddleB").css("top"));
		var oh = parseInt($("#paddleB").css("height"));
		if (checkBottomBound(playgroudHeight, oh, top)) {
			$("#paddleB").css("top", top + 5);
		}
	}
	if (pingpong.pressedKeys[KEY.W]) {
		var top = parseInt($("#paddleA").css("top"));
		if (checkTopBound(top)) {
			$("#paddleA").css("top", top - 5);
		}
	}
	if (pingpong.pressedKeys[KEY.S]) {
		var top = parseInt($("#paddleA").css("top"));
		var oh = parseInt($("#paddleA").css("height"));
		if (checkBottomBound(playgroudHeight, oh, top)) {
			$("#paddleA").css("top", top + 5);
		}
	}
}

/**
 * 球拍游戏区域上边界检验 objtop为球拍top
 */
function checkTopBound(objtop) {
	return objtop > 0;
}
/**
 * 球拍游戏区域下边界检验 backheight为游戏区高度 objheight为球拍高度 objtop为球拍top
 */
function checkBottomBound(backheight, objheight, objtop) {
	return backheight > objheight + objtop;
}

function moveBall() {
	// 获取球台和球信息
	var playgroundHeight = parseInt($("#playground").height());
	var playgroundWidth = parseInt($("#playground").width());
	var ballLength = parseInt($("#ball").width());
	var ball = pingpong.ball;

	// 检测球台边缘
	// 检测底部
	if (ball.y + ball.speed * ball.directionY + ballLength > playgroundHeight) {
		ball.directionY = -1;
	}
	// 检测顶部
	if (ball.y + ball.speed * ball.directionY < 0) {
		ball.directionY = 1;
	}
	// 检测右边
	if (ball.x + ball.speed * ball.directionX + ballLength > playgroundWidth) {
		ball.directionX = -1;
		var score = parseInt($("#leftboard").text());
		$("#leftboard").text(score + 1);
	}
	// 检测左边
	if (ball.x + ball.speed * ball.directionX < 0) {
		ball.directionX = 1;
		var score = parseInt($("#rightboard").text());
		$("#rightboard").text(score + 1);
	}
	// 检测球拍
	// 检测左边球拍
	var paddleALeft = parseInt($("#paddleA").css("left"));
	var paddleARight = parseInt($("#paddleA").css("left"))
			+ parseInt($("#paddleA").width());
	var paddleATop = parseInt($("#paddleA").css("top"));
	var paddleABottom = paddleATop + parseInt($("#paddleA").height());

	if (ball.x + ball.speed * ball.directionX > paddleALeft
			&& ball.x + ball.speed * ball.directionX < paddleARight) {
		if (ball.y + ball.speed * ball.directionY >= paddleATop
				&& ball.y + ball.speed * ball.directionY <= paddleABottom) {
			ball.directionX = 1;
		}
	}
	// 检测右边球拍
	var paddleBLeft = parseInt($("#paddleB").css("left"));
	var paddleBRight = parseInt($("#paddleB").css("left"))
			+ parseInt($("#paddleB").width());
	var paddleBTop = parseInt($("#paddleB").css("top"));
	var paddleBBottom = paddleBTop + parseInt($("#paddleB").height());
	if (ball.x + ball.speed * ball.directionX + ballLength > paddleBLeft
			&& ball.x + ball.speed * ball.directionX + ballLength < paddleBRight) {
		if (ball.y + ball.speed * ball.directionY >= paddleBTop
				&& ball.y + ball.speed * ball.directionY <= paddleBBottom) {
			ball.directionX = -1;
		}
	}

	// 开始移动
	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;
	$("#ball").css({
		"left" : ball.x,
		"top" : ball.y
	});

}