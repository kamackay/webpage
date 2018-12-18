const Modes = {
    month: 0,
    week: 1
};

const Keys = {
    dateKey: 'CalMonth',
    animKey: 'animations',
    holidaysKey: 'holidays'
};

function storeMonth(month = displayDate) {
    storeData(Keys.dateKey, month.getFullYear() + '::' + month.getMonth());
}

function getStoredMonth() {
    try {
        var data = getData(Keys.dateKey);
        if (!data) return data;
        var arr = data.split('::');
        return new Date(parseInt(arr[0]), parseInt(arr[1]), 1);
    } catch (err) {
        console.log(err);
        return null;
    }
}

settings.holidays = true;

var displayDate = new Date();

var mode = Modes.month;
var allowMonthChange = true;

function holidaysSH() {
    if (settings.holidays) {
        $.each($('body').find('.holiday'), function (n, o) {
            $(this).css('display', 'block');
        });
    } else {
        $.each($('body').find('.holiday'), function (n, o) {
            $(this).css('display', 'none');
        });
    }
}

function init() {
    if (!settings.anim) $('#showAnim').prop('checked', false);
    if (!settings.holidays) $('#showHolidays').prop('checked', false);
    $('#selectDate').hide();
    $('#today').show();
    storeMonth();
    var todayEl = $('#today');
    var text = getMonthName(displayDate) + ', ' + displayDate.getFullYear().toString();
    if (settings.anim) {
        allowMonthChange = false;
        todayEl.typeOut(text, function () {
            allowMonthChange = true
        });
    } else todayEl.html(text);
    $('#selectedMonth').html(getMonthName(displayDate));
    $('#selectedYear').val(displayDate.getFullYear().toString())
    switch (mode) {
        case Modes.month:
            var monthEl = $('#month');
            monthEl.html('');
            var count = 0;
            while (count++ < 7) monthEl.append('<div class="month-head" style="cursor:default;"></div>');
            count = 0;
            while (count++ < 42) monthEl.append('<div class="month-day">&nbsp;</div>');
            var sizeFunc = function (anim = false) {
                var w = monthEl.width() / 7;
                var h = monthEl.height() / 6;
                var timeToShow = 500;
                $.each(monthEl.find('.month-day'), function (n, o) {
                    var elem = $(this);
                    elem.css({
                        'width': w,
                        'max-width': w,
                        'height': h,
                        'max-height': h,
                        'font-size': h / 5
                    }).addClass('unselectable');
                    if (anim) {
                        elem.css('display', 'none');
                        setTimeout(function () {
                            elem.fadeIn(1000);
                        }, timeToShow);
                        timeToShow += 50;
                    }
                    elem.hover(function () {
                        if (!settings.anim || !elem.hasClass('used')) return;
                        elem.animate({
                            backgroundColor: colors.materialWarning,
                            color: colors.black
                        }, {
                                duration: 500,
                                queue: false
                            });
                    }, function () {
                        var isT = elem.hasClass('today')
                        if (!settings.anim || !elem.hasClass('used')) return;
                        elem.animate({
                            backgroundColor: (isT) ? '#1D62AC' : colors.white,
                            color: isT ? colors.white : colors.black
                        }, {
                                duration: 500,
                                queue: false
                            });
                    });
                });
                var index = 0,
                    arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                $.each(monthEl.find('.month-head'), function (n, o) {
                    var elem = $(this);
                    elem.css({
                        'width': w,
                        'font-size': h / 7.5
                    }).html(arr[index++]).addClass('unselectable');
                    if (anim) {
                        elem.css('display', 'none');
                        setTimeout(function () {
                            elem.fadeIn();
                        }, 750);
                    }
                });
                collapseSettings();
            }
            $(window).resize(function () {
                sizeFunc(false);
            });
            var today = new Date();
            var first = firstOfMonth(displayDate);
            var els = monthEl.find('.month-day');
            var f = first.getDay(),
                x = 1;
            var days = daysInMonth(displayDate);
            for (var i = f + 1; x <= days; i++ , x++) {
                var elem = $(els.get(i));
                elem.html(x.toString());
                elem.addClass('used');
                if (x == today.getDate() && displayDate.getMonth() == today.getMonth() && displayDate.getFullYear() == today.getFullYear())
                    elem.addClass('today');
            }
            sizeFunc(settings.anim);
            var usedEls = $('.month-day.used');
            var reqUrl = 'http://' + getDomain() + ":5000/holidays/" + displayDate.getMonth() + '/' + displayDate.getFullYear();
            var start = new Date().getTime();
            $.get(reqUrl, function (data) {
                console.log('took', new Date().getTime() - start);
                for (var i = 0; i < data.length; i++) {
                    var holiday = data[i];
                    var holidate = holiday.date;
                    var dayOfHoliday;
                    if (holiday.date.day !== undefined) {
                        dayOfHoliday = $(usedEls.get(holiday.date.day));
                    } else if (holiday.date.week !== undefined) {
                        if (holiday.date.week === 'last') {
                            //The last week of the month
                            var dayNum = holiday.date.dayOfWeek;
                            var potential = $(els.get(dayNum));
                            while (!potential.hasClass('used')) {
                                dayNum -= 7;
                                potential = $(els.get(dayNum));
                            }
                            dayOfHoliday = potential;
                        } else {
                            var dayNum = holiday.date.dayOfWeek;
                            var potential = $(els.get(dayNum));
                            while (!potential.hasClass('used')) {
                                dayNum += 7;
                                potential = $(els.get(dayNum));
                            }
                            dayNum += (holiday.date.week * 7);
                            potential = $(els.get(dayNum));
                            dayOfHoliday = potential;
                        }
                    }
                    if (!dayOfHoliday) {
                        console.log('Couldn\'t find day for ' + holiday.name);
                        console.log(holiday);
                        continue;
                    }
                    if (dayOfHoliday.find('.holiday').length == 0) { //Only allow one holiday per date, for now
                        dayOfHoliday.append('<div class="holiday">&nbsp;<br><a href="#" onclick="' + ((holiday.link == undefined) ? '' : 'openInNewTab(\'' + holiday.link + '\')') + '">' + holiday.name + '</a></div');
                        dayOfHoliday.addClass('hasHoliday');
                        dayOfHoliday.setupHorizontalScroll();
                    }
                }
                holidaysSH();
            });
            break;
    }
}

function nextMonth() {
    if (!allowMonthChange) return;
    displayDate = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1);
    storeMonth();
    init();
}

function lastMonth() {
    if (!allowMonthChange) return;
    displayDate = new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1);
    storeMonth();
    init();
}

function todaysMonth() {
    if (!allowMonthChange) return;
    displayDate = new Date();
    storeMonth();
    init();
}

function scrollDown() {
    $('body').animate({
        scrollTop: $('body').height() * 2
    }, {
            duration: 1000,
            queue: false
        });
}

$(document).ready(function () {
    settings.anim = (getData(Keys.animKey) !== 'false');
    settings.holidays = (getData(Keys.holidaysKey) !== 'false');
    var cookieDate = getStoredMonth();
    if (cookieDate) displayDate = cookieDate;
    init();
    //if (!isMobileDevice()) showWatermark(settings.anim);
    removeContextMenu();
    $(document).on('keydown', function (event) {
        switch (event.which) {
            case 83:
                if (event.ctrlKey) {
                    event.preventDefault();
                    showSnackbar('You can\'t save me.');
                }
                break;
            case 116:
                //event.preventDefault();
                break;
            case 39: nextMonth(); break;
            case 37: lastMonth(); break;
            default:
            //console.log(event.which);
        }
    });
    $('#today').click(function (e) {
        $('#selectDate').show();
        $('#today').hide();
    });
    var selectedYear = $('#selectedYear');
    selectedYear.bind('keypress', function (event) {
        var regex = new RegExp("^[0-9]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (event.which == 13) init();
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
        if (selectedYear.val().length == 3) {
            setTimeout(function () {
                displayDate = new Date(parseInt(selectedYear.val()), displayDate.getMonth(), 1);
            }, 10);
        } /**/
    });
    loadBackgroundAsync('http://keithmackay.com/images/material_white.png')
});

function firstOfMonth(d = new Date()) {
    return new Date(d.getFullYear(), d.getMonth(), 0);
}

function setMonth(month) {
    displayDate = new Date(displayDate.getFullYear(), month, 1);
    $('#selectedMonth').html(getMonthName(displayDate));
}

function toggleAnimations() {
    settings.anim = !settings.anim;
    storeData(Keys.animKey, settings.anim.toString());
}

function toggleHolidays() {
    settings.holidays = !settings.holidays;
    storeData(Keys.holidaysKey, settings.holidays.toString());
    holidaysSH();
}
