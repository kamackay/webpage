function runCode() {
    var codeElement = $('#jsCode');
    var codeText = codeElement.val();
    eval(codeText);
    //console.log(codeText);
}

const Keys = {
    codeStore: 'codeStore',
    formatOnSave: 'formatOnSave',
    minComments: 'minComments',
    autoSave: 'autoSave',
    autoSaveTime: 'autoSaveTime'
}

settings.prettyPrintOnSave = false;
settings.keepCommentsOnMin = false;
settings.autoSave = false;
settings.autoSaveTime = 500;

$(document).ready(function () {
    settings.prettyPrintOnSave = getStoredBool(Keys.formatOnSave, true);
    settings.keepCommentsOnMin = getStoredBool(Keys.minComments, false);
    settings.autoSave = getStoredBool(Keys.autoSave, true);
    if (!settings.prettyPrintOnSave) $('#formatWhenSave').prop('checked', false);
    if (!settings.keepCommentsOnMin) $('#commentsOnMin').prop('checked', false);
    if (!settings.autoSave) {
        $('#autoSaveToggle').prop('checked', false);
        $('#autoSaveSpan').fadeOut()
    } else autoSave();
    settings.autoSaveTime = parseFloat(getData(Keys.autoSaveTime) || '1000');
    collapseSettings();
    $(document).on('keydown', function (event) {
        switch (event.which) {
            case 83:
                if (event.ctrlKey) {
                    event.preventDefault();
                    //showSnackbar('You can\'t save me.');
                    saveCode(true);
                    if (settings.prettyPrintOnSave) formatCode();
                }
                break;
            case 116:
                break;
            default:
                break;
        }
        // $('#jsCode').focus();
    });
    //showWatermark();
    usingMaterialLoading()
    $.each($('*:not(textarea)'), function (n, o) {
        $(this).addClass('unselectable');
    }); /**/
    setTimeout(function () {
        loadJSAsync('../devfiles/beautify.js', 'beautifyScript');
    }, 100);
    var codeElement = $('#jsCode');
    codeElement.on('keydown', function (e) {
        switch (e.which) {
            case 9:
                e.preventDefault();
                if (e.shiftKey) {
                    var start = codeElement.get(0).selectionStart;
                    var end = codeElement.get(0).selectionEnd;
                } else {
                    var start = codeElement.get(0).selectionStart;
                    var end = codeElement.get(0).selectionEnd;
                    codeElement.val(codeElement.val().substring(0, start) + "    " + codeElement.val().substring(end));
                    codeElement.get(0).selectionStart =
                        codeElement.get(0).selectionEnd = start + 4;
                }
                break;
            case 13:
                if (e.ctrlKey) runCode();
                break;
            case 88: 
            	if (e.ctrlKey) {
            		// Delete the current line of code
            		var el = codeElement.get(0);
            		if (el.selectionStart === el.selectionEnd){
            			e.preventDefault();
            			const sInd = el.selectionStart;
            			var lines = codeElement.val().split('\n');
            			var count = 0;
            			for (var i = 0; i < lines.length; i++){
            				count += lines[i].length + 1;
            				if (count > sInd){
            					lines.splice(i, 1);
            					codeElement.val(lines.join('\n'));
            					el.selectionStart = el.selectionEnd = sInd;
            					break;
            				}
            			}            			
            		} 
            	}
            	break;
            //default: console.log(e.which); break;
        }
    });
    $('#jsCode').focus();
    var casheData = getData(Keys.codeStore);
    if (casheData && casheData.length) codeElement.val(casheData);
    var autoSaveEl = $('#autoSaveTime');
    var r5 = function (e) {
        updateAutoSaveTime();
    };
    autoSaveEl.on('blur', r5).on('focusout', r5);
    autoSaveEl.val((settings.autoSaveTime / 1000).toString())
    $.material.init();
});

function updateAutoSaveTime(num) {
    var autoSaveEl = $('#autoSaveTime');
    var num = num || parseFloat(autoSaveEl.val()) * 1000;
    settings.autoSaveTime = num;
    storeData(Keys.autoSaveTime, num.toString())
}

function saveCode(alertAfter = false, style = true) {
    var codeElement = $('#jsCode');
    if (settings.prettyPrintOnSave && style) formatCode();
    var newCode = codeElement.val();
    if (newCode !== code) {
        storeData(Keys.codeStore, newCode);
        code = newCode;
    }
    if (alertAfter) toast('Saved Code Successfully!')
}

function autoSave() {
    if (!settings.autoSave) return;
    saveCode(false, false);
    setTimeout(autoSave, settings.autoSaveTime)
}

var code = "";

function beautifyAvailable() {
    return $('#beautifyScript').length;
}

function xRegXAvailable() {
    return $('#xregxScript').length
}

function refreshElements() {
    redirectTo('./');
}

function formatCode() {
    if (beautifyAvailable()) {
        var prettyCode = js_beautify($('#jsCode').val());
        $('#jsCode').val(prettyCode);
    } else toast('Still Loading, please wait one moment');
}

function minifyCode() {
    console.log(settings);
    var minCode = js_minify($('#jsCode').val(), settings.keepCommentsOnMin);
    $('#jsCode').val(minCode);
}

function formatOnSave() {
    settings.prettyPrintOnSave = !settings.prettyPrintOnSave;
    storeData(Keys.formatOnSave, settings.prettyPrintOnSave.toString());
}

function toggleAutoSave() {
    settings.autoSave = !settings.autoSave;
    storeData(Keys.autoSave, settings.autoSave.toString());
    if (settings.autoSave) {
        $('#autoSaveSpan').fadeIn()
        autoSave();
    } else $('#autoSaveSpan').fadeOut()
}

function commentsOnMin() {
    settings.keepCommentsOnMin = !settings.keepCommentsOnMin;
    storeData(Keys.minComments, settings.keepCommentsOnMin.toString());
}

function downloadCode() {
    download('script.js', '//This code was generated on http://keithmackay.com/js/ \n\n' + js_beautify($('#jsCode').val()));
}

function showAvailableFrameworks() {
    $.get('./frameworks.html', function (data) {
        popupForm(data);
    });
}

function help() {
    $.get('./help.html', function (data) {
        // popupForm(data);
    });
    popupForm('<div><h1>This feature is still being developed, please check back later to see if it has been completed. Sorry!</h1><div class="materialLoad"></div></div>')
}

(function () {
    var oldLog = console.log;
    console.log = function () {
        var altCons = $('#altConsole');
        for (i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            var s;
            switch (typeof arg) {
                case 'array':
                case 'object':
                    s = JSON.stringify(arg, null, 3);
                    break;
                case 'undefined':
                    s = 'undefined';
                    break;
                default:
                    s = arg.toString();
                    break;
            }
            altCons.val(altCons.val() + s);
        }
        altCons.val(altCons.val() + '\n');
        oldLog.apply(this, arguments);
    };
    var oldClear = console.clear;
    console.clear = function (){
    	$('#altConsole').val('');	
    	if (typeof oldClear === 'function') oldClear.apply(this, arguments);
    };
})();