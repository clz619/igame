var KEY = {
	UP : 38,
	DOWN : 40,
	W : 87,
	S : 83
};

var pingpong = {};
pingpong.pressedKeys = [];

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
}

function movePaddles() {
	var bh = parseInt($("#playground").css("height"));

	if (pingpong.pressedKeys[KEY.UP]) {
		var top = parseInt($("#paddleB").css("top"));
		if (checkTopBound(top)) {
			$("#paddleB").css("top", top - 5);
		}
	}
	if (pingpong.pressedKeys[KEY.DOWN]) {
		var top = parseInt($("#paddleB").css("top"));
		var oh = parseInt($("#paddleB").css("height"));
		if (checkBottomBound(bh, oh, top)) {
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
		if (checkBottomBound(bh, oh, top)) {
			$("#paddleA").css("top", top + 5);
		}
	}
}

/**
 * 游戏区域上边界检验
 */
function checkTopBound(objtop) {
	return objtop > 0;
}
/**
 * 游戏区域下边界检验
 */
function checkBottomBound(backheight, objheight, objtop) {
	return backheight > objheight + objtop;
}