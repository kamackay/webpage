const anim = {
    easingType: 'easeOutExpo',
    time: 5000
};

$(document).ready(function () {
    removeContextMenu();
    $(document).on('keydown', function (e) {
        switch (e.which) {
            case 115:
                if (e.ctrlKey || e.which === 19) e.preventDefault();
                break;
            case 116:
                break;
            case 83:
                if (e.ctrlKey) {
                    e.preventDefault();
                    showSnackbar("I cannot be saved");
                }
                break;
            default:
                //console.log(e.which);
                break;
        }
    }); /**/
    $('#contents').append('<img id="page-back" class="full" style="z-index: 100;opacity:0" src="http://keithmackay.com/images/material_dark.jpg" />');
    back = $('#page-back');
    back.load(function () {
        back.animate({
            opacity: 100
        }, {
                duration: 2000,
                queue: false,
                complete: dropIn
            });
    });
    var r = function () {
        var w = back.width(),
            w2 = $(window).width();
        if (w < w2) back.css('width', w2);
    };
    $(window).resize(r);
    r();
    var projectDiv = $('#projectDiv');
    var leftProj = projectDiv.find('.right-box').first();
    var rightProj = projectDiv.find('.left-box').first();
    projectDiv.scroll(function (e) {
        if ($(window).width() > 992)
            leftProj.animate({ marginTop: Math.min(projectDiv.scrollTop(), rightProj.height() - leftProj.height()) },
                { duration: 5, queue: true });
    });
});
var back;

function dropIn() {
    var els = $('.dropIn');
    $.each(els, function (n, o) {
        var t = $(this);
        t.animate({
            top: t.attr('drop-top')
        }, {
                duration: t.attr('drop-time') || anim.time,
                queue: false,
                easing: anim.easingType
            });
    });
    setTimeout(dropUp, 0);
}

function dropUp() {
    var els = $('.dropUp');
    $.each(els, function (n, o) {
        var t = $(this);
        t.animate({
            top: t.attr('drop-top') || 0
        }, {
                duration: t.attr('drop-time') || anim.time,
                queue: false,
                easing: anim.easingType,
                complete: function () { }
            });
    });
    bounceUp();
}

function bounceUp() {
    var els = $('.bounceUp');
    $.each(els, function (n, o) {
        var t = $(this);
        t.fadeIn(anim.time);
        t.animate({
            top: t.attr('drop-top') || 0,
            opacity: 100
        }, {
                duration: t.attr('drop-time') || anim.time,
                queue: false,
                easing: anim.easingType,
                complete: function () {
                    var f = function () {
                        $.each($('.vScrollable'), function (n, o) {
                            var e = $(this);
                            var p = e.position();
                            var sizeE = function () {
                                e.css('height', $(window).height() - p.top);
                            }
                            sizeE();
                            $(window).resize(sizeE);
                        });
                    }
                    $(window).resize(f);
                    f();
                }
            });
    });
}
