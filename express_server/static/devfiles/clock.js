var minRun = 0;

function showClock() {
    removeClock();
    storeData("loginAnim", "clock");
    $(window).on('resize', clockResize);
    $('body').append('<div id="keithapps-clock" style="position: fixed; opacity: .5;">' +
        '<img style="position: absolute; height: 100%; opacity: .5; z-index: 0;" src="https://googledrive.com/host/0B6vDuBGkfv-HSjhIcnJEUF9yc0k/clock-circle.png" />'
        + '</div>');
    var clockEl = $("#keithapps-clock");
    var size = $(window).height() / 2;
    clockEl.css('width', size);
    clockEl.fadeTo(0, 0);
    clockEl.css('height', size);
    clockEl.css('top', $(window).height() - size - 20);
    clockEl.css('left', $(window).width() - size - 20);
    clockEl.append('<div id="keithapps-secondParent" style="height: 100%; width: 100%; position: absolute; opacity: .5;">'
        + '<img id="keithapps-clockSecond" src="https://googledrive.com/host/0B6vDuBGkfv-HSjhIcnJEUF9yc0k/clock-hand.png" style="position: absolute; height: 50%; top: 5px; opacity: .5; z-index: 0;" />'
        + '</div>');
    clockEl.append('<div id="keithapps-minuteParent" style="height: 100%; width: 100%; position: absolute; opacity: .5;">'
        + '<img id="keithapps-clockMinute" src="https://googledrive.com/host/0B6vDuBGkfv-HSjhIcnJEUF9yc0k/clock-hand.png" style="position: absolute; height: 50%; padding-top: 10%; top: 5px; opacity: .5; z-index: 0;" />'
        + '</div>');
    clockEl.append('<div id="keithapps-hourParent" style="height: 100%; width: 100%; position: absolute; opacity: .5;">'
        + '<img id="keithapps-clockHour" src="https://googledrive.com/host/0B6vDuBGkfv-HSjhIcnJEUF9yc0k/clock-handRed.png" style="position: absolute; height: 50%; padding-top: 18%; top: 5px; opacity: .5; z-index: 0;" />'
        + '</div>');
    var minuteHand = $("#keithapps-clockMinute");
    var hourHand = $("#keithapps-clockHour");
    var secondHand = $("#keithapps-clockSecond");
    minuteHand.css('left', (clockEl.width() - minuteHand.width()) / 2);
    hourHand.css('left', (clockEl.width() - hourHand.width()) / 2);
    secondHand.css('left', (clockEl.width() - secondHand.width()) / 2);
    var minParent = $("#keithapps-minuteParent");
    var hourParent = $("#keithapps-hourParent");
    var secondParent = $("#keithapps-secondParent");
    var hours = new Date().getHours();
    var mins = new Date().getMinutes();
    var secs = new Date().getSeconds();
    $({ deg: mins * 6 + secs / 10 }).animate({ deg: 360 }, {
        duration: 3600000 - (mins * 60000) - (secs * 1000),
        easing: 'linear',
        step: function (now) {
            minParent.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }, complete: spinMinute
    });
    $({ deg: secs * 6 }).animate({ deg: 360 }, {
        duration: 60000 - (secs * 1000),
        easing: 'linear',
        step: function (now) {
            secondParent.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }, complete: spinSecond
    });
    setHourPosition();
    clockEl.fadeTo(2000, 1);
}

function spinSecond() {
    setHourPosition();
    var secondParent = $("#keithapps-secondParent");
    $({ deg: 0 }).animate({ deg: 360 }, {
        duration: 60000,
        easing: 'linear',
        step: function (now) {
            secondParent.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }, complete: spinSecond
    });
}


function spinMinute() {
    setHourPosition();
    var minuteParent = $("#keithapps-minuteParent");
    var date = new Date();
    var currMin = date.getMinutes() * 6 + date.getSeconds() / 10;
    $({ deg: currMin }).animate({ deg: 360 }, {
        duration: 3600000,
        easing: 'linear',
        step: function (now) {
            minuteParent.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }, complete: spinMinute
    });
}

function setHourPosition() {
    var hour = new Date().getHours();
    var hourParent = $("#keithapps-hourParent");
    var angle = (hour % 12) * 30 + (new Date().getMinutes() / 2);
    hourParent.css({
        transform: 'rotate(' + angle + 'deg)'
    });
}

function removeClock() {
    try {
        $('#keithapps-clock').remove();
        $(window).off('resize', clockResize);
    } catch (err) { writeToLog(err); }
}

function clockResize() {
    removeClock();
    setTimeout(showClock, 20);
}