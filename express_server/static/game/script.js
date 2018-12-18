var started = false;
var curs;
var game = {
    score: 0,
    shotsTaken: 0,
    addToScore: function (num) {
        game.score += num;
        $('#score').html('SCORE: ' + game.score.toString());
    },
    shoot: function () {
        contents.append('<img class="unselectable" src="' + getBulletImage() + '" style="position:fixed;top:' + mousePos.y + 'px;left:' + mousePos.x + 'px;"/>')
        game.addToScore(randInt(5, 15))
        $('#shotsTaken').html('SHOTS: ' + (++game.shotsTaken));
    },
    begin: function () {
        if (!started) {
            started = true;
            $.each($('.for-game'), function (n, o) {
                $(this).fadeIn();
            });
            toast('This page is not ready yet, please feel free to return to http://keithmackay.com');
            $('#pressToBegin').fadeOut();
        } else game.shoot()
    }
}
var mousePos = {
    x: 0,
    y: 0
}
var contents;
$(document).ready(function () {
    collapseSettings('fast');
    removeContextMenu();
    curs = $('#cursorImg')
    $.each($('body').find('*'), function (n, o) {
        $(this).addClass('unselectable');
    });
    contents = $('#contents');
    $(document).on('mousedown', game.begin);
    //$(document).on('keydown', begin);
    $('*').mousemove(function (e) {
        curs.css('top', e.pageY).css('left', e.pageX);
        mousePos.x = e.pageX;
        mousePos.y = e.pageY;
    });
    $('*').on('dragstart', function (e) {
        e.preventDefault();
    })
    game.addToScore(0)
});

function getBulletImage() {
    return 'bullet' + randInt(1, 2).toString() + '.png';
}
