(function () {
	$(document).ready(function () {
		setSizes();
		if (isMobileDevice()) {
			$('#resumeiFrame').hide();
			$('#keithImg').hide();
			$('#ncsuLogo').hide();
		}
		//scrollToTop();
		const a = ['Keith MacKay', 'Keith'];
		const f = function (s) { return '<strong>' + s + '</strong>' }
		const list = $('#feedbackList');
		['"Keith MacKay is just a better person than me, plain and simple" - Scott LaChapelle', '"I\'m constantly amazed at how much smarter than me Keith MacKay is." - Stephen Hawking'].forEach(function (text) {
			a.forEach(function (i){text=text.replace(new RegExp('[^>]('+i+')'), f);});
			text = text.replace(/[-].*/g, function(i){return '<span>'+i+'</span>'})
			list.append('<li class="mg-lg animated fadeInUp animDelay04">' + text + '</li>');
		});
	});

	$(window).resize(function () {
		setSizes();
	});

	function scrollToTop() {
		$('html, body').animate({ scrollTop: 0 }, 'fast');
	}

	function setSizes() {
		var jumbo = $('#top');
		jumbo.css('height', $(window).height()).css('top', 0);
	}

	function noInfo() {
		showSnackbar('Sorry, NC State doesn\'t seem to have any information on this course online');
	}
})();