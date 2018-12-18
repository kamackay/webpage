function toggleSearch() {
  const cont = $('#searchCont');
  const inpt = $('#searchInput');
  if (cont.hasClass('opened')) {
    cont.removeClass('opened');
    cont.animate({ width: '15%', backgroundColor: 'transparent' }, { queue: false })
    inpt.animate({ width: '0px', marginLeft: '0px' }, {
      queue: false, complete: function () { $('#searchInput').blur(); }
    });
    search(); 
    inpt.val('');
    cont.find('a').first().removeClass('btn-warning');
    cont.find('a>i').first().html('search');
  } else {
    cont.addClass('opened');
    cont.animate({ width: '40%', backgroundColor: '#ffffff' }, { queue: false })
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

(function (){
  $(document).ready(function (){
    $(document).on('keydown', function (e){
      if (e.which === 70 && e.ctrlKey) {e.preventDefault(); openSearch();}
    });
  });
})();

