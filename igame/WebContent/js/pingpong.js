var KEY = {
	UP : 38,
	DOWN : 40,
	W : 87,
	S : 83
};

$(function() {
	 $("#paddleB").css("top", "20px");
	$("#paddleA").css("top", "60px");

	$(document).keydown(function(e) {
		switch (e.which) {
		case KEY.UP:
			var top = parseInt($("#paddleB").css("top"));
			$("#paddleB").css("top", top - 5);
			break;
		case KEY.DOWN:
			var top = parseInt($("#paddleB").css("top"));
			$("#paddleB").css("top", top + 5);
			break;
		case KEY.W:
			var top = parseInt($("#paddleA").css("top"));
			$("#paddleA").css("top", top - 5);
			break;
		case KEY.S:
			var top = parseInt($("#paddleA").css("top"));
			$("#paddleA").css("top", top + 5);
			break;
		}
	});

//	var pingpong = {};
//	pingpong.pressedKeys = [];
//	$(document).keydown(function(e) {
//		pingpong.pressedKeys[e.which] = true;
//	});
//	$(document).keyup(function(e) {
//		pingpong.pressedKeys[e.which] = false;
//	});
});