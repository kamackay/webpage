(function () {
    if ($)
        $(document).ready(function () {
            $(document).on('keydown', function (e) {
                try {
                    switch (e.which) {
                        case 33: //Page Up
                            e.preventDefault();
                            var a = $('.scrollElement').first();
                            if (!a.is(':animated')) {
                                var dist = 200;
                                var st = a.scrollTop();
                                a.animate({ scrollTop: st <= dist ? 0 : st - dist }, { duration: 50, queue: true });
                            }
                            break;
                        case 34: //Page Down
                            e.preventDefault();
                            var a = $('.scrollElement').first();
                            if (!a.is(':animated')) {
                                var dist = 200;
                                var st = a.scrollTop();
                                var scrollHeight = a.get(0).scrollHeight;
                                a.animate({ scrollTop: st >= scrollHeight - dist ? scrollHeight : st + dist }, { duration: 150, queue: true });
                            }
                            break;

                    }
                } catch (err) { console.log(err); }
            });
        });
})();