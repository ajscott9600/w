$(document).ready(function () {
    selectnav("menu-main", {
        label: "Menu here ",
        nested: !0,
        autoselect: !1,
        indent: "-"
    })
}), $(function () {
    var e = window.location.href;
    $("#menu-wrapper a").each(function () {
        e == this.href && ($(this).closest("ul").parent("li").addClass("active"), $(this).closest("li").addClass("active"))
    })
}), $(document).ready(function () {
    $("div .post-body div").contents().filter(function () {
        return 3 === this.nodeType
    }).replaceWith(function () {
        var e = $(this).text(),
            t = e.split(/:\s*/),
            n = $.trim(t[0]);
        if (console.log(n), t.length > 1 && n.match(/^(Producers|Genre|Writers|Stars|Genres|Directors|Label)$/)) {
            var i = t[1].split(/\s*,\s*/);
            return n + ": " + $.map(i, function (e) {
                e = e.replace(/L$/, "");
                var t = e.replace(/\(.*?\)/g, ""),
                    t = t.replace(/\./g, ""),
                    n = '<a href="/search/?q=' + t + '">' + e + "</a>";
                return n
            }).join(", ")
        }
        return e
    })
}), $(function () {
    $(".sompret-image").hover(function () {
        $(this).find("img").animate({
            top: "260px",
            right: "200px"
        }, {
            queue: !1,
            duration: 500
        })
    }, function () {
        $(this).find("img").animate({
            top: "0px",
            right: "0px"
        }, {
            queue: !1,
            duration: 500
        })
    })
});
function imgrs01(i, e, s) {
    $(i).each(function () {
        $(this).attr({
            src: $(this).attr("src").replace("/s" + e, "/w" + s),
            width: "auto",
            height: "auto",
            style: "max-width:500px;max-height:350px;"
        })
    })
}
$(function () {
    imgrs01("div .post-body img", "1600", "225"), imgrs01("div .post-body img", "320", "225"), imgrs01("div #related-posts img", "1600", "175"), imgrs01("div #related-posts img", "320", "175")
});
function imgrs02(t, i, s) {
    $(t).each(function () {
        $(this).attr({
            src: $(this).attr("src").replace("/s" + i + "-c", "/w" + s),
            width: s,
            height: "auto"
        })
    })
}
$(function () {
    imgrs02("#PopularPosts1 img", "72", "80")
});
function imgsrc(i, s) {
    $(i).each(function () {
        $(this).attr({
            href: $(this).attr("href").replace("/s" + s, "/w1600")
        })
    })
};
$(function () {
    imgsrc("div .post-body a", "1600"), imgsrc("div .post-body a", "320")
});
window.document.getElementById("q7a0").parentNode.removeChild(window.document.getElementById("q7a0"));
    (function(f, k) {
        function g(a) {
            a && q7a0.nextFunction()
        }
        var h = f.document,
            l = ["i", "u"];
        g.prototype = {
            rand: function(a) {
                return Math.floor(Math.random() * a)
            },
            getElementBy: function(a, c) {
                return a ? h.getElementById(a) : h.getElementsByTagName(c)
            },
            getStyle: function(a) {
                var c = h.defaultView;
                return c && c.getComputedStyle ? c.getComputedStyle(a, null) : a.currentStyle
            },
            deferExecution: function(a) {
                setTimeout(a, 2E3)
            },
            insert: function(a, c) {
                var e = h.createElement("font"),
                    d = h.body,
                    b = d.childNodes.length,
                    m = d.style,
                    f = 0,
                    g = 0;
                if ("q7a0" == c) {
                    e.setAttribute("id", c);
                    m.margin = m.padding = 0;
                    m.height = "100%";
                    for (b = this.rand(b); f < b; f++) 1 == d.childNodes[f].nodeType && (g = Math.max(g, parseFloat(this.getStyle(d.childNodes[f]).zIndex) || 0));
                    g && (e.style.zIndex = g + 1);
                    b++
                }
                e.innerHTML = a;
                d.insertBefore(e, d.childNodes[b - 1])
            },
            displayMessage: function(a) {
                var c = this;
                a = "abisuq".charAt(c.rand(5));
                c.insert("<" + a + '>Please disable your ad blocker!<br />This sites supported by ad!<br /><img src="data:image/png;base64,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"/><a href="http://jeffarts.cf">[ Refresh ]</a>' + ("</" + a + ">"), "q7a0");
                h.addEventListener && c.deferExecution(function() {
                    c.getElementBy("q7a0").addEventListener("DOMNodeRemoved", function() {
                        c.displayMessage()
                    }, !1)
                })
            },
            i: function() {
                for (var a = "Ad-Top,AdSense1,adControl1,ad_layer2,adskintop,boxad2,postAd,ad,ads,adsense".split(","), c = a.length, e = "", d = this, b = 0, f = "abisuq".charAt(d.rand(5)); b < c; b++) d.getElementBy(a[b]) || (e += "<" + f + ' id="' + a[b] + '"></' + f + ">");
                d.insert(e);
                d.deferExecution(function() {
                    for (b = 0; b < c; b++) if (null == d.getElementBy(a[b]).offsetParent || "none" == d.getStyle(d.getElementBy(a[b])).display) return d.displayMessage("#" + a[b] + "(" + b + ")");
                    d.nextFunction()
                })
            },
            u: function() {
                var a = "/ad-ifr.,/ad_files/ad,/adnotice.,/ads/cube-,/ads/dfp.,/adsDynLoad/ad,/glam300.,/promo/ads/ad,/remove-ads.,.480x60/".split(","),
                    c = this,
                    e = c.getElementBy(0, "img"),
                    d, b;
                e[0] !== k && e[0].src !== k && (d = new Image, d.onload = function() {
                    b = this;
                    b.onload = null;
                    b.onerror = function() {
                        l = null;
                        c.displayMessage(b.src)
                    };
                    b.src = e[0].src + "#" + a.join("")
                }, d.src = e[0].src);
                c.deferExecution(function() {
                    c.nextFunction()
                })
            },
            nextFunction: function() {
                var a = l[0];
                a !== k && (l.shift(), this[a]())
            }
        };
        f.q7a0 = q7a0 = new g;
        h.addEventListener ? f.addEventListener("load", g, !1) : f.attachEvent("onload", g)
    })(window);
