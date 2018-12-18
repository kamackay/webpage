var Types = {
    help: 0,
    windows10: 1,
    error: 2,
    code: 3
}

var bar, num, txt, maxTime = 100000,
    type = Types.help;

$(document).ready(function () {
    opt.allowedErrorWindows = 4000;
    removeContextMenu();
    var search = window.location.search.substr(1);
    var params = search.split('&');
    try {
        var t = params[0].split('=')[1];
        if (t === 'win10') {
            type = Types.windows10;
        } else if (t === 'error') {
            type = Types.error;
        } else if (t === 'code') {
            type = Types.code;
        } else if (t === 'help') {
            type = Types.help;
        }
    } catch (ex) {
        type = Types.help;
    }
    if (isMobileDevice()) showSnackbar('This webpage is not meant for a mobile device, so it may not look correct');
    $(document).on('keydown', function (e) {
        switch (e.which) {
            case 83:
                if (e.ctrlKey) {
                    e.preventDefault();
                    // Save Event here
                }
                break;
            case 116:
                e.preventDefault();
                switch (type) {
                    case Types.windows10:
                        window.location.search = "type=error";
                        break;
                    case Types.error:
                        $('#cursors').html('');
                        break;
                }
                break;
        }
    });
    switch (type) {
        case Types.windows10:
            $('#win10').removeClass('hidden');
            bar = new ProgressBar.Circle('#progress', {
                strokeWidth: 2,
                easing: 'linear',
                duration: 1400,
                color: '#0b9dd5',
                trailColor: '#eee',
                trailWidth: 2,
                svgStyle: null
            });
            txt = $('#text');
            var f = function () {
                var h = $('#progress').height();
                txt.css('top', h * -1).css('height', h);
                txt.css('padding-top', (h - parseFloat(txt.css('font-size')) * 2) / 2);
                var height = $(window).height();
                $.each($('body').find('.dynamic-font'), function (n, o) {
                    var t = $(this);
                    t.css('font-size', parseFloat(t.attr('dyn-font-size')) / 100 * height);
                });

            };
            $(window).resize(f);
            f();
            num = 0;
            setTimeout(increment, Math.random(Math.random() * (maxTime - 5000 + 1)) + 5000);
            showSnackbar('Press F11 to go full screen. It\'s more convincing');
            break;
        case Types.error:
            $('#error').removeClass('hidden');
            var curs = $('#cursors');
            curs.mousemove(function (e) {
                curs.append('<img src="./img/stopped.png" style="display:block;height:200px;position:fixed;top:' + e.pageY.toString() + 'px;left:' + (e.pageX - 100).toString() + 'px;"/>');
                var ch = curs.children();
                if (ch.length > opt.allowedErrorWindows) ch.first().remove();
            });
            curs.mousedown(function (e) {
                e.preventDefault();
            });
            var currentdate = new Date();
            var min = currentdate.getMinutes().toString();
            $('#errTime').html((((currentdate.getHours() - 1) % 12) + 1).toString() + ':' + ((min.length == 1) ? '0' + min : min) + ' ' + (currentdate.getHours() > 12 ? 'PM' : 'AM'));
            break;
        case Types.code:
            $('#code').removeClass('hidden');
            $.get("./random.txt", function (data) {
                $('#randomCode').typeOut(data);
            });
            $('#uploadingPass').flash(500);
            $(window).unload(function () {
                const s = "Don't leave yet, we still need to upload all your personal data";
                alert(s);
                return s;
            });
            $('#uploadingPass').iterateThrough(['Now Uploading All Saved Passwords', 'Using your computer to store illegal content', 'Reporting you to the FBI']);
            break;
        case Types.help:
            $('#help').removeClass('hidden');
            break;
    }
});

$.fn.iterateThrough = function (strings, time = 10000) {
    var el = $(this);
    var i = el.data('stringIndex');
    if (i === undefined || i == strings.length - 1) i = 0;
    else i++;
    el.html(strings[i]);
    el.data('stringIndex', i);
    setTimeout(function () {
        el.iterateThrough(strings, time)
    }, time);
}

function increment() {
    if (num > .99) {
        num = 0;
        try {
            for (var i = 1; i <= 4; i++) {
                var el = $('#winText' + i.toString());
                if (!el.hasClass('selected')) {
                    el.addClass('selected');
                    break;
                }
            }
        } catch (err) {}
    }
    num += rand(.01, .04);
    bar.animate(num);
    txt.html((Math.floor(num * 100)).toString() + '%');
    setTimeout(increment, rand(7500, 4000));
}
