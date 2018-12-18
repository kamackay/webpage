function toggleSearch() {
	const cont = $('#searchCont');
	const inpt = $('#searchInput');
	if (cont.hasClass('opened')) {
		cont.removeClass('opened');
		cont.animate({ width: '15%', backgroundColor: 'transparent' }, { queue: false })
		inpt.animate({ width: '0px', marginLeft: '0px' }, {
			queue: false, complete: function () { $('#searchInput').blur(); search(); }
		});
		inpt.val('');
		cont.find('a').first().removeClass('btn-warning');
		cont.find('a>i').first().html('search');
	} else {
		cont.addClass('opened');
		cont.animate({ width: '50%', backgroundColor: '#ffffff' }, { queue: false })
		inpt.animate({ width: '70%', marginLeft: '10px' }, {
			queue: false, complete: function () { $('#searchInput').focus(); }
		});
		cont.find('a').first().addClass('btn-warning');
		cont.find('a>i').first().html('close');
	}
}

function openSearch() {
	if (!$('#searchCont').hasClass('opened')) toggleSearch();
	else $('#searchInput').focus();
}

function search(e) {
	const search = searchIn.val().toLowerCase();
	const as = $('body').find($('#page').find('.tile'));
	//console.log("a's count", as.length);
	$.each(as, function (i, n) {
		const t = $(this);
		if (t.attr('title')) {
			const s = t.attr('title').toLowerCase();
			if (s.includes(search)) { t.css('display', 'block'); }
			else t.css('display', 'none');
		}
	});
}

(function () {
	$(document).ready(function () {
		$(document).on('keydown', function (e) {
			switch (e.which) {
				case 70: if (e.ctrlKey) { e.preventDefault(); openSearch(); }
			}
		});
		window.searchIn = $('#searchInput');
		searchIn.on('input', search);
		setTimeout(toggleSearch, 2500);
	});
})();