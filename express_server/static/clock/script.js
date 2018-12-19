const dataName = 'clocktype';
var clockType = '';
var showDate = false;

function getType() {
    return getData(dataName);
}

function setType(str) {
    clockType = str;
    storeData(dataName, str);
    $('#' + str + 'Tab').addClass('active');
    var cont = $('#clock-contents');
    if (cont.html() !== "") {
        $.each(cont.find("*"), function (o, n) {
            $(this).animate({
                left: $(window).width() * 1.5
            }, {
                    duration: 800,
                    easing: 'swing',
                    queue: false,
                    complete: function () {
                        cont.html('');
                        setTimeout(function () {
                            showType(str);
                        }, 200);
                    }
                });
        });
    } else showType(str);
}

$(window).resize(setSizes);

function showType(str = 'both') {
    str = str || 'both';
    $('#' + str + 'Tab').addClass('active');
    if (str == 'analog') {
        showAnalog();
        $('#showDate').fadeOut('slow');
    } else {
        $('#showDate').fadeIn('slow');
        if (str == 'digital') showDigital();
        else showBoth();
    }
}

$(document).ready(function () {
    $('#contents').css('height', $(window).height());
    setSizes();
    clockType = getType();
    var data = getData('showDate');
    showDate = (data == true || data == 'true');
    if (!showDate) {
        $('#showDateIn').prop('checked', false);
    }
    if (clockType === 'analog') $('#showDate').fadeOut(0);
    showType(clockType);
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
        }
    });/**/
});

function setSizes() {
    var types = $('#clocktypes').find('div');
    $.each(types, function (x, o) {
        $(this).css('width', ($(window).width() / types.length)).css('font-size', $(this).height() / 3 + 'px');
    });
}

function tabClick(e) {
    $.each($('body').find('div.keithapps-tabs div'), function (n, o) {
        $(this).removeClass('active');
    });
    setTimeout(function () {
        setType(e.target.innerHTML.toLowerCase());
    }, 20);
}

function clearClock() {
    $('#clock-contents').html('');
}

function showAnalog(both = false) {
    try {
        $('#clock-contents').html('<div id="keithapps-clock" style="position: fixed;">' +
            '<img id="keithapps-clockImg" style="position: absolute; height: 100%;" src="../images/clock-circle2N.png" />' + '</div>');
        var clockEl = $("#keithapps-clock");
        clockEl.fadeOut(0);
        if ($('#keithapps-secondParent')) $('#keithapps-secondParent').remove();
        clockEl.append('<div id="keithapps-secondParent" style="height: 100%; width: 100%; position: absolute;">' + '<img id="keithapps-clockSecond" src="../images/clock-hand2.png" style="position: absolute; height: 50%; top: 5px;" />' + '</div>');
        clockEl.append('<div id="keithapps-minuteParent" style="height: 100%; width: 100%; position: absolute; ">' + '<img id="keithapps-clockMinute" src="../images/clock-hand2.png" style="position: absolute; height: 50%; padding-top: 10%; top: 5px; z-index: 0;" />' + '</div>');
        clockEl.append('<div id="keithapps-hourParent" style="height: 100%; width: 100%; position: absolute; z-index: 100">' + '<img id="keithapps-clockHour" src="../images/clock-handRed2.png" style="position: absolute; height: 50%; padding-top: 18%; top: 5px; " />' + '</div>');
        var secondHand = $('#keithapps-clockSecond');
        var minuteHand = $('#keithapps-clockMinute');
        var hourHand = $('#keithapps-clockHour');
        var l = (clockEl.width() - secondHand.width()) / 2;
        secondHand.load(function () {
            secondHand.css('left', l - secondHand.width() / 2);
        });
        minuteHand.load(function () {
            minuteHand.css('left', l - minuteHand.width() / 2);
        });
        hourHand.load(function () {
            hourHand.css('left', l - hourHand.width() / 2);
        });
        var onSize = function () {
            var size = Math.min($(window).width(), ($(window).height() - 50)) * .85;
            if (both) size /= 1.5;
            clockEl.css('width', size);
            clockEl.css('height', size);
            clockEl.css('top', (($(window).width() < ($(window).height() / 1.5)) ? $(window).height() * .2 : 75));
            clockEl.css('left', ($(window).width() - size) / 2);
            var l = (clockEl.width()) / 2;
            var secondF = function () {
                secondHand.css('left', l - secondHand.width() / 2);
            },
                minuteF = function () {
                    minuteHand.css('left', l - minuteHand.width() / 2);
                },
                hourF = function () {
                    hourHand.css('left', l - hourHand.width() / 2);
                };
            secondHand.load(secondF);
            minuteHand.load(minuteF);
            hourHand.load(hourF);
            secondF();
            minuteF();
            hourF();
        }
        onSize();
        $(window).resize(onSize);
        var minuteParent = $("#keithapps-minuteParent");
        var hourParent = $("#keithapps-hourParent");
        var secondParent = $("#keithapps-secondParent");
        var rotFunc = function () {
            try {
                var date = new Date();
                secondParent.css({
                    transform: 'rotate(' + ((date.getSeconds()/* Make seconds 'tick' */ + (date.getMilliseconds()) / 1000/**/) * 6).toString() + 'deg)'
                });
                minuteParent.css({
                    transform: 'rotate(' + ((date.getMinutes() + date.getSeconds() / 60 + date.getMilliseconds() / 60000) * 6).toString() + 'deg)'
                });
                hourParent.css({
                    transform: 'rotate(' + (((date.getHours() % 12) + date.getMinutes() / 60 + date.getSeconds() / 3600) * 30).toString() + 'deg)'
                });
                setTimeout(rotFunc, 1000 / 60); /* 60 FPS Seems good enough */
            } catch (err) { console.log(err); }
        };
        rotFunc();
        clockEl.fadeIn(2000);
    } catch (err) {
        alert(err);
    }
}

function showDigital(both = false) {
    try {
        if ($('#keithapps-digitalClock').length == 0)
            $('#clock-contents').append('<div id="keithapps-digitalClock" style="position: fixed; width: 100%;color:black;"></div>');
        var contents = $('#keithapps-digitalClock');
        window.setInterval(function () {
            var time = new Date();
            var text = ((time.getHours() - 1) % 12) + 1 + ':' + padInt(time.getMinutes(), 2) + ':' + padInt(time.getSeconds(), 2) + ' ' + (time.getHours() > 12 ? 'PM' : 'AM');
            if (showDate) text += '<br>' + getDayOfWeek(time) + ', ' + getMonthName(time) + ' ' + getDayOfMonth(time) + ', ' + time.getFullYear();
            contents.html(text);
        }, 1);
        resizeDigital();
        $(window).resize(resizeDigital);
    } catch (err) {
        alert(err);
    }
}

function resizeDigital() {
    var contents = $('#keithapps-digitalClock');
    contents.css('font-size', ((showDate) ? $(window).width() / 16 : $(window).width() / 7) + 'px');
    if (clockType !== 'both') contents.css('top', '35%');
    else contents.css('padding-bottom', '25px');
};

function smallSize() {
    return Math.min($(window).height(), $(window).width());
}

function padInt(num, len) {
    var int = num + "";
    while (int.length < len) int = '0' + int;
    return int;
}

function showBoth() {
    try {
        showAnalog(true);
        showDigital(true);
        var digitHeight = function () {
            var digit = $('#keithapps-digitalClock');
            digit.css('top', $(window).height() - (digit.height() * 1.1));
        };
        $(window).resize(digitHeight);
        setTimeout(digitHeight, 10);
    } catch (err) { }
}

function showDateToggle(e) {
    var showDateEl = $('#showDate');
    if (showDateEl.find('input').first().is(':checked')) {
        showDate = true;
        storeData('showDate', true);
        resizeDigital();
    } else {
        showDate = false;
        storeData('showDate', false);
        resizeDigital();
    }
}
