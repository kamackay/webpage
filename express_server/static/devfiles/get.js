(function () {
   window._get = function (p) {
      try {
         var req = new XMLHttpRequest()
         req.open('GET', p.url, true)
         req.responseType = 'text'
         req.onreadystatechange = function () {
            if (req.readyState == XMLHttpRequest.DONE) {
               switch (req.status) {
                  case 200:
                     var data;
                     try {
                        data = JSON.parse(req.responseText);
                     } catch (err) {
                        data = req.responseText;
                     }
                     if (typeof p.done === 'function') p.done(data);
                     break
                  default:
                     if (typeof p.fail === 'function') p.fail(req.status)
                     else throw new Error('error ' + req.status + ' from server');
               }
            }
         }
         req.send();
      } catch (err) {
         console.log(err)
      }
   };
})();