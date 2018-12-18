/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function ($) {

	/*----------------------------------------------------*/
	/* FitText Settings
	------------------------------------------------------ */

	setTimeout(function () {
		$('h1.responsive-headline').fitText(1, {
			maxFontSize: '90px',
			minFontSize: '40px',
		});
	}, 100);


	/*----------------------------------------------------*/
	/* Smooth Scrolling
	------------------------------------------------------ */

	$('.smoothscroll').on('click', function (e) {
		e.preventDefault();

		var target = this.hash;
		let $target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 800, 'swing', function () {
			window.location.hash = target;
		});
	});


	/*----------------------------------------------------*/
	/* Highlight the current section in the navigation bar
	------------------------------------------------------*/

	var sections = $("section");
	var navigationLinks = $("#nav-wrap a");

	sections.waypoint({

		handler: function (event, direction) {

			let activeSection = $(this);
			if (direction === "up") {
				activeSection = activeSection.prev();
			}

			var activeLink = $('#nav-wrap a[href="#' + activeSection.attr("id") + '"]');

			navigation_links.parent().removeClass("current");
			activeLink.parent().addClass("current");

		},
		offset: '35%'

	});


	/*----------------------------------------------------*/
	/*	Make sure that #header-background-image height is
	/* equal to the browser height.
	------------------------------------------------------ */

	$('header').css({
		'height': $(window).height()
	});
	$(window).on('resize', function () {
		$('header').css({
			'height': $(window).height()
		});
		$('body').css({
			'width': $(window).width()
		})
	});


	/*----------------------------------------------------*/
	/*	Fade In/Out Primary Navigation
	------------------------------------------------------*/

	$(window).on('scroll', function () {

		var h = $('header').height();
		var y = $(window).scrollTop();
		var nav = $('#nav-wrap');

		if ((y > h * .20) && (y < h) && ($(window).outerWidth() > 768)) {
			nav.fadeOut('fast');
		} else {
			if (y < h * .20) {
				nav.removeClass('opaque').fadeIn('fast');
			} else {
				nav.addClass('opaque').fadeIn('fast');
			}
		}

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/

	$('.item-wrap a').magnificPopup({
		fixedContentPos: false,
		mainClass: 'mfp-fade',
		removalDelay: 200,
		showCloseBtn: false,
		type: 'inline',
	});

	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});


	/*----------------------------------------------------*/
	/*	Flexslider
	/*----------------------------------------------------*/
	$('.flexslider').flexslider({
		animation: 'slide',
		animationSpeed: 600,
		controlNav: true,
		controlsContainer: ".flex-container",
		directionNav: false,
		namespace: "flex-",
		randomize: false,
		slideshowSpeed: 7000,
		smoothHeight: true,
	});

	/*----------------------------------------------------*/
	/*	contact form
	------------------------------------------------------*/

	$('form#contactForm button.submit').click(function () {

		$('#image-loader').fadeIn();

		var contactName = $('#contactForm #contactName').val();
		var contactEmail = $('#contactForm #contactEmail').val();
		var contactSubject = $('#contactForm #contactSubject').val();
		var contactMessage = $('#contactForm #contactMessage').val();

		var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
			'&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

		$.ajax({
			data: data,
			success: function (msg) {

				// Message was sent
				if (msg === 'OK') {
					$('#image-loader').fadeOut();
					$('#message-warning').hide();
					$('#contactForm').fadeOut();
					$('#message-success').fadeIn();
				}
				// There was an error
				else {
					$('#image-loader').fadeOut();
					$('#message-warning').html(msg);
					$('#message-warning').fadeIn();
				}

			},
			type: "POST",
			url: "inc/sendEmail.php",
		});
		return false;
	});


});