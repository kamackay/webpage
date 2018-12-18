(function () {

})();

function readFile() {
    toast('read file');
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;
        var s = text.split(',', 2)[1];
        var imgEl = document.getElementById('page').appendChild(document.createElement('img'));
        imgEl.src = text;
        $(imgEl).css({ maxHeight: '100px' });
        var el = document.getElementById('page').appendChild(document.createElement('textarea'));
        $(el).css({ width: '100%', minHeight: '250px' });
        el.value = text;
        el.readOnly = true;
        setTimeout(function () {
            el.style.height = (el.scrollHeight + 20) + 'px';
        }, 500);
        toast('done reading');
    };
    reader.readAsDataURL(input.files[0]);
}