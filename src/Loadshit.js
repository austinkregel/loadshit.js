/** 
 * @site https://github.com/austinkregel/loadshit.js
 * @author austinkregel
 * @license MIT 
 */
(function (window, Object, document, undefined) {
    window.Loadshit = {
        scripts: [],
        scriptsCount: 0,
        styles: [],
        stylesCount: 0,
        called: false,
        ready: function () {
        }
    }
    Loadshit.addScript = function (src, callback) {
        var tag = document.createElement('script');
        tag.src = src;
        var c = src.split('/');
        tag.id = c[c.length - 1].replace(/[^a-zA-Z ]/g, "");
        tag.onload = callback || function () {
                Loadshit.scriptsCount++;
            }
        document.body.appendChild(tag)
    },
        Loadshit.addStyle = function (src, callback) {
            var tag = document.createElement('link');
            tag.href = src;
            tag.rel = 'stylesheet';
            tag.type = 'text/css'
            var c = src.split('/');
            tag.id = c[c.length - 1].replace(/[^a-zA-Z ]/g, "");
            tag.onload = callback || function () {
                    Loadshit.stylesCount++;
                }
            document.head.appendChild(tag)
        }
    window.Load = {
        scripts: function (val) {
            Loadshit.scripts = val;
        },
        styles: function (val) {
            Loadshit.styles = val;
        },
        process: function () {
            if (Loadshit.scripts.length > 1) {
                var i = 0, loadMore;
                Loadshit.addScript(Loadshit.scripts[i], loadMore = function () {
                    i++
                    Loadshit.scriptsCount++
                    if (Loadshit.styles.length === Loadshit.stylesCount &&
                        Loadshit.scripts.length === Loadshit.scriptsCount && !Loadshit.called) {
                        Loadshit.ready();
                        Loadshit.called = true;
                    }

                    if (Loadshit.scripts[i] === undefined)
                        return null;
                    Loadshit.addScript(Loadshit.scripts[i], loadMore)
                });
            } else {
                Loadshit.addScript(Loadshit.scripts);
            }
            Loadshit.styles.forEach(function (style) {
                Loadshit.addStyle(style, function () {
                    Loadshit.stylesCount++;
                    if (Loadshit.styles.length === Loadshit.stylesCount &&
                        Loadshit.scripts.length === Loadshit.scriptsCount && !Loadshit.called) {
                        Loadshit.ready();
                        Loadshit.called = true;
                    }

                });
            })
        },
        ready: function (ready) {
            Loadshit.ready = ready;
        }
    };
})(window, Object, document)
