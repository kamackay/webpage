var pixels = 0;
var stop = 0;

function makeItRain() {
    try {
        removeRain();
        storeData("loginAnim", "rain");
        stop = 0;
        pixels = 0;
        addPixel();
        while (pixels < 200)
            addPixel(-1 * Math.random() * $(window).height() / 2);
        $(window).on('resize', rainResize);
    } catch (error) { console.log(error.toString()) }
}

function rainResize() {
    removeRain();
    setTimeout(makeItRain, 20);
}

function addPixel(initTop = 0) {
    if (stop != 0) return;
    if (pixels > 1000) pixels = 0;
    try {
        $('#pixel' + pixels).remove();
    } catch (err) { }
    var id = 'pixel' + pixels;
    var pixelSize = Math.random() > .5 ? 3 : 2;
    $('body').append('<div class="rain-pixel" id="' + id + '"></div>');
    var p = $('#' + id);
    p.css('height', pixelSize).css('width', pixelSize);
    var width = $(window).width();
    var proportion = .9;
    var rand = (Math.random() * (width * proportion) + (width * (1 - proportion)));
    p.css('left', rand).css('top', initTop);
    dropPixel(p);
    pixels++;
}
/*
function dropPixel(el) {
    el.css('top', 0);
    el.animate({ top: $(window).height() }, {
        duration: (Math.random() * 5000) + 5000,
        easing: 'easeInQuint', queue: false, complete: function () {
            dropPixel(el);
        }
    });
}*/

function dropPixel(el) {
    try {
        el.animate({ top: $(window).height() - el.height() }, {
            duration: (Math.random() * 5000) + 5000,
            easing: 'easeInQuint', queue: false, complete: function () {
                addPixel();
            }
        });
    } catch (err) {
        //May not have JQuery UI
        console.log(err);
    }
}

function removeRain() {
    try {
        stop = 1;
        var drops = $('div.rain-pixel');
        $.each(drops, function (index, value) {
            $(this).remove();
        });
        $(window).off('resize', rainResize);
    } catch (err) { }
}
