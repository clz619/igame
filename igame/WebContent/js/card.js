var matchingGame = {};
// 卡牌集
matchingGame.deck = [ "cardAK", "cardAK", "cardAQ", "cardAQ", "cardBK",
		"cardBK", "cardBQ", "cardBQ", "cardCK", "cardCK", "cardCQ", "cardCQ" ];

$(function() {
	// 洗牌
	matchingGame.deck.sort(shuffle);
	for ( var i = 0; i < 11; i++) {
		$(".card:first-child").clone().appendTo("#cards");
	}

	$("#cards").children().each(function(index) {
		$(this).css({
			"left" : ($(this).width() + 12) * (index % 4),
			"top" : ($(this).height() + 10) * Math.floor(index / 4)
		});

		var pattern = matchingGame.deck.pop();
		$(this).find(".back").addClass(pattern);
		// 把图案数据嵌入DOM元素
		$(this).attr("data-pattern", pattern);
		// 监听每张纸牌DIV元素的单击事件
		$(this).click(selectCard);
	});

	// $("#cards").children().each(function(index) {
	// $(this).click(function() {
	// $(this).toggleClass("card-flipped");
	// });
	// });

});

/**
 * 打乱
 * 
 * @returns {Number}
 */
function shuffle() {
	return 0.5 - Math.random();
}

/**
 * 单击纸牌时，需要翻转纸牌并调用检测函数
 */
function selectCard() {
	// 如果翻开了2张牌，则前面的判断还未执行完成
	if ($(".card-flipped").size() > 1) {
		return;
	}
	$(this).addClass("card-flipped");
	// 1秒后检查两张已翻开的牌的图案
	if ($(".card-flipped").size() == 2) {
		setTimeout(checkPattern, 1000);
	}
}

/**
 * 检查翻开的牌
 */
function checkPattern() {
	if (isMatchPattern()) {
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
		// 对于Transition，我们也可以在变换结束之后触发webkitTransitionEnd事件，我们可以如此给一个元素绑定：dom.addEventListener("webkitTransitionEnd",func);
		$(".card-removed").bind("webkitTransitionEnd", removeTookCards);
	} else {
		$(".card-flipped").removeClass("card-flipped");
	}
}

/**
 * 比较是否为相同图案
 */
function isMatchPattern() {
	var cards = $(".card-flipped");
	var pattern1 = $(cards[0]).data("pattern");
	var pattern2 = $(cards[1]).data("pattern");
	return pattern1 == pattern2;
}

/**
 * 删除纸牌
 */
function removeTookCards() {
	$(".card-removed").remove();
	checkFinish();
}

function checkFinish() {
	if ($(".card").size() == 0) {
		alert("恭喜通关！");
	}
}