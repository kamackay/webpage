(function () {
	$(document).ready(function () {
		const opt = { duration: 500, queue: false };
		var aEls = $('body').find('.navbar.navbar-default>.container-fluid li');
		$.each(aEls, function (i, n) {
			const curr = $(this);
			curr.mouseenter(function () {
				$(this).animate({
					backgroundColor: 'rgba(100,100,100,1)',
					color: 'rgba(255,230,12,1)'
				}, opt);
				$(this).find('a').animate({ color: 'rgba(255,230,12,1)' }, opt);
			}).mouseleave(function () {
				$(this).animate({
					backgroundColor: 'rgba(0,0,0,0)',
					color: 'rgba(255,255,255,1)'
				}, opt);
				$(this).find('a').animate({ color: 'rgba(0,0,0,1)' }, opt);
			});
		});
	});
})();