$(document).ready(function(){
	var limit     = $(window).height()/3,
		backToTop = $('#back-to-top');

	$(window).scroll(function () {
		if ( $(this).scrollTop() > limit ) {
			backToTop.fadeIn();
		} else {
			backToTop.fadeOut();
		}
	});
	
	// scroll body to 0px on click
	backToTop.click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 1500);
		return false;
	});



	// $("#ex1 .post").hover(function(){
	// 	$(this).toggleClass('animated pulse');
	// });
	// var h = $(window).height();
	// $(window).scroll(function(){

	// 	if ( ($(this).scrollTop()+h) >= $("#ex2").offset().top) {
	// 		$("#ex2 .post").css({visibility:"visible"});
	// 		$("#ex2 .post").eq(0).addClass('animated bounceInLeft');
	// 		$("#ex2 .post").eq(1).addClass('animated bounceInRight');
	// 	} 
	// 	if ( ($(this).scrollTop()+h) >= $("#ex3").offset().top) {
	// 		$("#ex3 .post").css({visibility:"visible"});
	// 		$("#ex3 .post").eq(0).addClass('animated bounceInLeft');
	// 		$("#ex3 .post").eq(1).addClass('animated bounceInRight');
	// 	} 
	// 	if ( ($(this).scrollTop()+h) >= $("#ex4").offset().top) {
	// 		$("#ex4 .post").css({visibility:"visible"});
	// 		$("#ex4 .post").eq(0).addClass('animated bounceInLeft');
	// 		$("#ex4 .post").eq(1).addClass('animated bounceInRight');
	// 	} 
	// 	if ( $(this).scrollTop() == 0 ) {
	// 		$("#ex2 .post, #ex3 .post, #ex4 .post").removeClass('animated bounceInLeft bounceInRight');
	// 		$("#ex2 .post, #ex3 .post, #ex4 .post").css({visibility:"hidden"});
	// 	}
	// });
});