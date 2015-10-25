$(document).ready(function() {

	//Check
	console.log('Done!');

	//Цели для Яндекс.Метрики и Google Analytics
	$(".count_element").on("click", (function() {
		ga("send", "event", "goal", "goal");
		yaCounterXXXXXXXX.reachGoal("goal");
		return true;
	}));
	
	//Carousel: http://owlgraphic.com/owlcarousel/
	function carousel_1() {
		var owl = $(".carousel");
		owl.owlCarousel({
			items : 1,
			loop : true,
			autoHeight : true,
			dots : true,
			singleItem : true
		});
	};

	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("form").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("form").serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});
	
});