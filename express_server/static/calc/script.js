const maxWidth = 700;

function copyToClipboard(text) {
    try {
        con.val(text);
        con.select();
        document.execCommand('copy');
        setTimeout(function () {
            var el = con.get(0);
            el.selectionStart = el.selectionEnd = el.value.length;
        }, 50);
    } catch (err) {
        console.log('could not copy to clipboard', err);
    }
}

const calcTypes = {
    none: 0,
    add: 1,
    minus: 2,
    multiply: 3,
    divide: 4,
    exp: 5,
    mod: 6,
    solution: 7
};

function showInOutput(str, newLn = true, tab = 0) {
    var out = $('#output');
    if (newLn) out.append('<br>');
    for (var i = 0; i < tab; i++) out.append('    ');
    out.append(str);
}
const win = $(window);

var f = function () {
    var size = win.height() / 10;
    var mobile = isMobileDevice();
    var calc = $('body').find('.calculator');
    var numbers = calc.find('.numbers');
    var buttons = calc.find('.btn:not(.btn-small)');
    if (mobile || win.height() > win.width() * 1.5) calc.css('width', '100%');
    else {
        var a = win.width() - (parseInt(calc.css('margin-left')) * 2);
        var n = Math.min(a, a / Math.cbrt(a + maxWidth) + maxWidth);
        calc.css('width', n);
    }
    var w = (numbers.width() / 4) - 1;
    $.each(buttons, function (n, o) {
        var t = $(this);
        t.css('width', w).css('font-size', Math.max(size / 2, 30));
        t.css('height', Math.max(75, size));
    });
    calc.find('.smaller > *').css('height', (numbers.height() / 5));
    calc.find('.console').css('height', size * 2).css('width', w * 4).css('font-size', w / 4);
    $('#bottomButtons').css('height', size * 3);
};

($(document).ready(function () {
    $.material.init();
    $('#output').html("Output:<br>");
    $('#numberIn').on('keydown', function (e) {
        if (e.ctrlKey && e.which === 83) {
            showSnackbar('You can\'t save me.');
            e.preventDefault();
        }
        switch (e.which) {
            case 13:
                calcButton('equal');
                break;
            case 116:
                break;
        }
    });
    var scrollHorizontal = function (event, delta) {
        this.scrollLeft -= (delta * 30);
        event.preventDefault();
    };
    $('#numberStore').mousewheel(scrollHorizontal);
    $('#bottomButtons').mousewheel(scrollHorizontal);
    f();
    $(window).resize(f);
    con = $('#numberIn');
    store = $('#numberStore');
    store.click(function () {
        copyToClipboard(store.html());
    });
    removeContextMenu();

    /**/
    if (isMobileDevice()) {
        con.removeAttr('autofocus')
        var elems = $('body').find('.calculator.well');
        $.each(elems, function (n, o) {
            $(this).removeClass('well');
        });
    } else {
        con.on('blur', function () {
            con.focus();
        });
        //showWatermark();
        //Watermark is intrusive on the right, maybe move it to the left?
    } /**/
    con.on('scrollwheel', function (e) {
        e.preventDefault();
    });
    window.setInterval(f, 1000);
}));

var con, store;

function calcButton(btn) {
    if (btn === 'clear') {
        con.val('0');
        store.html('');
        calc = calcTypes.none;
    } else if (btn === 'plus') { //-----------Addition
        con.val(con.val() + '+')
    } else if (btn === 'minus') {
        con.val(con.val() + '-')
    } else if (btn === 'equal') { //---------Equal
        parseMath();
    } else if (btn === 'divide') {
        con.val(con.val() + '/');
        calc = calcTypes.divide;
    } else if (btn === 'period') {
        con.val(con.val() + '.');
    } else if (btn === 'multiply') {
        con.val(con.val() + '*');
        calc = calcTypes.multiply;
    } else if (btn === 'back') {
        var current = con.val();
        if (current.length > 0)
            con.val(current.substr(0, current.length - 1));
    } else if (btn === 'sqrt') {
        //var num = parseFloat(con.val());
        //store.html('sqrt(' + num.toString() + ') = ' + Math.sqrt(num).toString());
        con.val('sqrt(' + con.val() + ')')
    } else if (btn === 'mod') {
        con.val(con.val() + '%');
        calc = calcTypes.mod; //--------------Modulus
    } else if (btn === 'exp') {
        con.val(con.val() + '^');
        calc = calcTypes.exp;
    } else {
        if (con.val() === '0') con.val('');
        con.val(con.val() + btn);
    }
}

function basicCalc(kind) {
    var solution;
    try {
        var n = parseFloat(con.val());
        store.append(' ' + n.toString() + " ");
        switch (kind) {
            case calcTypes.add:
                solution = last + n;
                break;
            case calcTypes.minus:
                solution = last - n;
                break;
            case calcTypes.divide:
                solution = last / n;
                break;
            case calcTypes.multiply:
                solution = last * n;
                break;
            case calcTypes.exp:
                solution = Math.pow(last, n);
                break;
            case calcTypes.mod:
                solution = last % n;
        }
        eq(solution);
        con.val(solution.toString());
    } catch (err) {
        alert(err);
    }
    scrollAnswerRight();
}

function transfer(extra = '', insertZero = true) {
    store.html(con.val() + (extra ? ' ' + extra : ''));
    last = parseFloat(con.val());
    con.val(insertZero ? '0' : '');
}

function parseMath() {
    var text = con.val();
    const mathUrl = 'http://' + window.location.hostname.split(':')[0] + ':5000/math';
    $.ajax({
        url: mathUrl,
        method: 'POST',
        data: serialize({
            type: 'math',
            query: text.replace(/\s/g, '')
        }), complete: function (data) {
            var answer = data.responseJSON.answer;
            var fc = ['+', '-', '%', '/', '*', '^'],
                fs = '\\s*';
            var ft = text;
            for (var i = 0; i < fc.length; i++) {
                ft = ft.replace(new RegExp(fs + '\\' + fc[i] + fs), ' ' + fc[i] + ' ')
            }
            store.html(ft + ' = ' + answer !== "Infinity" ? answer : "&infin;");
            scrollAnswerRight();
            $.ajax({
                url: mathUrl,
                method: 'POST',
                data: serialize({
                    type: 'formatMath',
                    str: text
                }),
                complete: function (data) {
                    var f = data.responseJSON.formatted;
                    if (f) con.val(f);
                }
            });
        }
    });
}

function scrollAnswerRight() {
    setTimeout(function () {
        store.animate({
            scrollLeft: store.width() * 2
        }, {
                duration: 200,
                queue: false
            })
    }, 100);
}

function eq(num) {
    con.val('');
    store.append('= ' + num.toString() + ' ');
}

function allPrimes() {
    var n = parseFloat(con.val());
    store.html(getAllPrimes(n));
}

function getAllPrimes(n = 50) {
    var res = 'Primes of ' + n.toString() + ' = [';
    while (n % 2 == 0) {
        res += '2, ';
        n = n / 2;
    }
    for (var i = 3; i <= Math.sqrt(n); i = i + 2) {
        while (n % i == 0) {
            res += i.toString() + ', ';
            n = n / i;
        }
    }
    if (n > 2) res += n.toString() + ', ';
    res = res.trim().replace(/,\s*$/, "") + ']';
    return res;
}

function factorial() {
    var num = parseFloat(con.val());
    if (num < 0) {
        store.html(num.toString() + '! = negative factorial?');
        resetCon();
        return;
    }
    var answer = 1,
        temp = num;
    while (temp > 0) {
        answer *= temp;
        temp--;
    }
    store.html(num.toString() + '! = ' + answer.toString());
    if (answer === Number.POSITIVE_INFINITY)
        showSnackbar('Showing as "Infinity" because Javascript\'s max int is ' + Number.MAX_VALUE.toString());
    resetCon();
}

function resetCon() {
    con.val('0')
}

function containsNonNumeric(str) {
    if (!str) return false;
    for (var i = 0; i < str.length; i++) {
        var c = str[i];
        if (c !== '0' && c !== '1' && c !== '2' && c !== '3' && c !== '4' && c !== '5' && c !== '6' && c !== '7' && c !== '8' && c !== '9') {
            console.log(c);
            return true;
        }
    }
    console.log('numbers')
    return false;
}

function funct(functName) {
    con.val(functName + '(' + con.val() + ')')
}

function formatFonts() {
    toast('This feature is still in development! Sorry!')
}

var last;

var calc = calcTypes.none;