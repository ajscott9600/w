var Paginator = function (paginatorHolderId, pagesTotal, pagesSpan, pageCurrent, baseUrl) {
    if (!document.getElementById(paginatorHolderId) || !pagesTotal || !pagesSpan) return false;
    this.inputData = {
        paginatorHolderId: paginatorHolderId,
        pagesTotal: pagesTotal,
        pagesSpan: pagesSpan < pagesTotal ? pagesSpan : pagesTotal,
        pageCurrent: pageCurrent,
        baseUrl: baseUrl ? baseUrl : '/pages/'
    };
    this.html = {
        holder: null,
        table: null,
        trPages: null,
        trScrollBar: null,
        tdsPages: null,
        scrollBar: null,
        scrollThumb: null,
        pageCurrentMark: null
    };
    this.prepareHtml();
    this.initScrollThumb();
    this.initPageCurrentMark();
    this.initEvents();
    this.scrollToPageCurrent();
}
Paginator.prototype.prepareHtml = function () {
    this.html.holder = document.getElementById(this.inputData.paginatorHolderId);
    this.html.holder.innerHTML = this.makePagesTableHtml();
    this.html.table = this.html.holder.getElementsByTagName('table')[0];
    var trPages = this.html.table.getElementsByTagName('tr')[0];
    this.html.tdsPages = trPages.getElementsByTagName('td');
    this.html.scrollBar = getElementsByClassName(this.html.table, 'div', 'scroll_bar')[0];
    this.html.scrollThumb = getElementsByClassName(this.html.table, 'div', 'scroll_thumb')[0];
    this.html.pageCurrentMark = getElementsByClassName(this.html.table, 'div', 'current_page_mark')[0];
    if (this.inputData.pagesSpan == this.inputData.pagesTotal) {
        addClass(this.html.holder, 'fullsize');
    }
}
Paginator.prototype.makePagesTableHtml = function () {
    var tdWidth = (100 / this.inputData.pagesSpan) + '%';
    var html = '' + '<table width="100%">' + '<tr>'
    for (var i = 1; i <= this.inputData.pagesSpan; i++) {
        html += '<td width="' + tdWidth + '"></td>';
    }
    html += '' + '</tr>' + '<tr>' + '<td colspan="' + this.inputData.pagesSpan + '">' + '<div class="scroll_bar">' + '<div class="scroll_trough"></div>' + '<div class="scroll_thumb">' + '<div class="scroll_knob"></div>' + '</div>' + '<div class="current_page_mark"></div>' + '</div>' + '</td>' + '</tr>' + '</table>';
    return html;
}
Paginator.prototype.initScrollThumb = function () {
    this.html.scrollThumb.widthMin = '8';
    this.html.scrollThumb.widthPercent = this.inputData.pagesSpan / this.inputData.pagesTotal * 100;
    this.html.scrollThumb.xPosPageCurrent = (this.inputData.pageCurrent - Math.round(this.inputData.pagesSpan / 2)) / this.inputData.pagesTotal * this.html.table.offsetWidth;
    this.html.scrollThumb.xPos = this.html.scrollThumb.xPosPageCurrent;
    this.html.scrollThumb.xPosMin = 0;
    this.html.scrollThumb.xPosMax;
    this.html.scrollThumb.widthActual;
    this.setScrollThumbWidth();
}
Paginator.prototype.setScrollThumbWidth = function () {
    this.html.scrollThumb.style.width = this.html.scrollThumb.widthPercent + "%";
    this.html.scrollThumb.widthActual = this.html.scrollThumb.offsetWidth;
    if (this.html.scrollThumb.widthActual < this.html.scrollThumb.widthMin) {
        this.html.scrollThumb.style.width = this.html.scrollThumb.widthMin + 'px';
    }
    this.html.scrollThumb.xPosMax = this.html.table.offsetWidth - this.html.scrollThumb.widthActual;
}
Paginator.prototype.moveScrollThumb = function () {
    this.html.scrollThumb.style.left = this.html.scrollThumb.xPos + "px";
}
Paginator.prototype.initPageCurrentMark = function () {
    this.html.pageCurrentMark.widthMin = '3';
    this.html.pageCurrentMark.widthPercent = 100 / this.inputData.pagesTotal;
    this.html.pageCurrentMark.widthActual;
    this.setPageCurrentPointWidth();
    this.movePageCurrentPoint();
}
Paginator.prototype.setPageCurrentPointWidth = function () {
    this.html.pageCurrentMark.style.width = this.html.pageCurrentMark.widthPercent + '%';
    this.html.pageCurrentMark.widthActual = this.html.pageCurrentMark.offsetWidth;
    if (this.html.pageCurrentMark.widthActual < this.html.pageCurrentMark.widthMin) {
        this.html.pageCurrentMark.style.width = this.html.pageCurrentMark.widthMin + 'px';
    }
}
Paginator.prototype.movePageCurrentPoint = function () {
    if (this.html.pageCurrentMark.widthActual < this.html.pageCurrentMark.offsetWidth) {
        this.html.pageCurrentMark.style.left = (this.inputData.pageCurrent - 1) / this.inputData.pagesTotal * this.html.table.offsetWidth - this.html.pageCurrentMark.offsetWidth / 2 + "px";
    } else {
        this.html.pageCurrentMark.style.left = (this.inputData.pageCurrent - 1) / this.inputData.pagesTotal * this.html.table.offsetWidth + "px";
    }
}
Paginator.prototype.initEvents = function () {
    var _this = this;
    this.html.scrollThumb.onmousedown = function (e) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        var dx = getMousePosition(e).x - this.xPos;
        document.onmousemove = function (e) {
            if (!e) var e = window.event;
            _this.html.scrollThumb.xPos = getMousePosition(e).x - dx;
            _this.moveScrollThumb();
            _this.drawPages();
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            _this.enableSelection();
        }
        _this.disableSelection();
    }
    this.html.scrollBar.onmousedown = function (e) {
        if (!e) var e = window.event;
        if (matchClass(_this.paginatorBox, 'fullsize')) return;
        _this.html.scrollThumb.xPos = getMousePosition(e).x - getPageX(_this.html.scrollBar) - _this.html.scrollThumb.offsetWidth / 2;
        _this.moveScrollThumb();
        _this.drawPages();
    }
    addEvent(window, 'resize', function () {
        Paginator.resizePaginator(_this)
    });
}
Paginator.prototype.drawPages = function () {
    var percentFromLeft = this.html.scrollThumb.xPos / (this.html.table.offsetWidth);
    var cellFirstValue = Math.round(percentFromLeft * this.inputData.pagesTotal);
    var html = "";
    if (cellFirstValue < 1) {
        cellFirstValue = 1;
        this.html.scrollThumb.xPos = 0;
        this.moveScrollThumb();
    } else if (cellFirstValue >= this.inputData.pagesTotal - this.inputData.pagesSpan) {
        cellFirstValue = this.inputData.pagesTotal - this.inputData.pagesSpan + 1;
        this.html.scrollThumb.xPos = this.html.table.offsetWidth - this.html.scrollThumb.offsetWidth;
        this.moveScrollThumb();
    }
    for (var i = 0; i < this.html.tdsPages.length; i++) {
        var cellCurrentValue = cellFirstValue + i;
        if (cellCurrentValue == this.inputData.pageCurrent) {
            html = "<span>" + "<strong>" + cellCurrentValue + "</strong>" + "</span>";
        } else {
            html = "<span>" + "<a href='#'  onclick='redirect" + jenis + "(" + cellCurrentValue + ");return false'>" + cellCurrentValue + "</a>" + "</span>";
        }
        this.html.tdsPages[i].innerHTML = html;
    }
}
Paginator.prototype.scrollToPageCurrent = function () {
    this.html.scrollThumb.xPosPageCurrent = (this.inputData.pageCurrent - Math.round(this.inputData.pagesSpan / 2)) / this.inputData.pagesTotal * this.html.table.offsetWidth;
    this.html.scrollThumb.xPos = this.html.scrollThumb.xPosPageCurrent;
    this.moveScrollThumb();
    this.drawPages();
}
Paginator.prototype.disableSelection = function () {
    document.onselectstart = function () {
        return false;
    }
    this.html.scrollThumb.focus();
}
Paginator.prototype.enableSelection = function () {
    document.onselectstart = function () {
        return true;
    }
}
Paginator.resizePaginator = function (paginatorObj) {
    paginatorObj.setPageCurrentPointWidth();
    paginatorObj.movePageCurrentPoint();
    paginatorObj.setScrollThumbWidth();
    paginatorObj.scrollToPageCurrent();
}

function getElementsByClassName(objParentNode, strNodeName, strClassName) {
    var nodes = objParentNode.getElementsByTagName(strNodeName);
    if (!strClassName) {
        return nodes;
    }
    var nodesWithClassName = [];
    for (var i = 0; i < nodes.length; i++) {
        if (matchClass(nodes[i], strClassName)) {
            nodesWithClassName[nodesWithClassName.length] = nodes[i];
        }
    }
    return nodesWithClassName;
}

function addClass(objNode, strNewClass) {
    replaceClass(objNode, strNewClass, '');
}

function removeClass(objNode, strCurrClass) {
    replaceClass(objNode, '', strCurrClass);
}

function replaceClass(objNode, strNewClass, strCurrClass) {
    var strOldClass = strNewClass;
    if (strCurrClass && strCurrClass.length) {
        strCurrClass = strCurrClass.replace(/\s+(\S)/g, '|$1');
        if (strOldClass.length) strOldClass += '|';
        strOldClass += strCurrClass;
    }
    objNode.className = objNode.className.replace(new RegExp('(^|\\s+)(' + strOldClass + ')($|\\s+)', 'g'), '$1');
    objNode.className += ((objNode.className.length) ? ' ' : '') + strNewClass;
}

function matchClass(objNode, strCurrClass) {
    return (objNode && objNode.className.length && objNode.className.match(new RegExp('(^|\\s+)(' + strCurrClass + ')($|\\s+)')));
}

function addEvent(objElement, strEventType, ptrEventFunc) {
    if (objElement.addEventListener) objElement.addEventListener(strEventType, ptrEventFunc, false);
    else if (objElement.attachEvent) objElement.attachEvent('on' + strEventType, ptrEventFunc);
}

function removeEvent(objElement, strEventType, ptrEventFunc) {
    if (objElement.removeEventListener) objElement.removeEventListener(strEventType, ptrEventFunc, false);
    else if (objElement.detachEvent) objElement.detachEvent('on' + strEventType, ptrEventFunc);
}

function getPageY(oElement) {
    var iPosY = oElement.offsetTop;
    while (oElement.offsetParent != null) {
        oElement = oElement.offsetParent;
        iPosY += oElement.offsetTop;
        if (oElement.tagName == 'BODY') break;
    }
    return iPosY;
}

function getPageX(oElement) {
    var iPosX = oElement.offsetLeft;
    while (oElement.offsetParent != null) {
        oElement = oElement.offsetParent;
        iPosX += oElement.offsetLeft;
        if (oElement.tagName == 'BODY') break;
    }
    return iPosX;
}

function getMousePosition(e) {
    if (e.pageX || e.pageY) {
        var posX = e.pageX;
        var posY = e.pageY;
    } else if (e.clientX || e.clientY) {
        var posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        var posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return {
        x: posX,
        y: posY
    }
}
var home_page = "/";
var urlactivepage = location.href;
var postperpage = 6;
var numshowpage = 15;
var nopage;
var jenis;
var nomerhal;
var lblname1;
halamanblogger();

function loophalaman(banyakdata) {
    maksimal = parseInt(banyakdata / postperpage) + 1;
    var blogPager = document.getElementById("blog-pager");
    html = '<div class="paginator" id="paginator1"></div>';
    if (blogPager) {
        blogPager.innerHTML = html
    }
    pag1 = new Paginator('paginator1', maksimal, numshowpage, nomerhal, "")
}
function hitungtotaldata(root) {
    var feed = root.feed;
    var totaldata = parseInt(feed.openSearch$totalResults.$t, 10);
    loophalaman(totaldata)
}
function halamanblogger() {
    var thisUrl = urlactivepage;
    if (thisUrl.indexOf("/search/label/") != -1) {
        if (thisUrl.indexOf("?updated-max") != -1) {
            lblname1 = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?updated-max"))
        } else {
            lblname1 = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?&max"))
        }
    }
    if (thisUrl.indexOf("?q=") == -1 && thisUrl.indexOf(".html") == -1) {
        if (thisUrl.indexOf("/search/label/") == -1) {
            jenis = "page";
            if (urlactivepage.indexOf("#PageNo=") != -1) {
                nomerhal = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
            } else {
                nomerhal = 1
            }
            document.write("<script src=\"" + home_page + "feeds/posts/summary?max-results=1&alt=json-in-script&callback=hitungtotaldata\"><\/script>")
        } else {
            jenis = "label";
            if (thisUrl.indexOf("&max-results=") == -1) {
                postperpage = 20
            }
            if (urlactivepage.indexOf("#PageNo=") != -1) {
                nomerhal = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
            } else {
                nomerhal = 1
            }
            document.write('<script src="' + home_page + 'feeds/posts/summary/-/' + lblname1 + '?alt=json-in-script&callback=hitungtotaldata&max-results=1" ><\/script>')
        }
    }
}
function redirectpage(numberpage) {
    if (numberpage != 1) {
        jsonstart = (numberpage - 1) * postperpage;
        nopage = numberpage;
        var nBody = document.getElementsByTagName('head')[0];
        var newInclude = document.createElement('script');
        newInclude.type = 'text/javascript';
        newInclude.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
        nBody.appendChild(newInclude)
    } else {
        alamat = home_page;
        location.href = alamat
    }
}
function redirectlabel(numberpage) {
    if (numberpage != 1) {
        jsonstart = (numberpage - 1) * postperpage;
        nopage = numberpage;
        var nBody = document.getElementsByTagName('head')[0];
        var newInclude = document.createElement('script');
        newInclude.type = 'text/javascript';
        newInclude.setAttribute("src", home_page + "feeds/posts/summary/-/" + lblname1 + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
        nBody.appendChild(newInclude)
    } else {
        alamat = home_page + "search/label/" + lblname1 + "?&max-results=" + postperpage;
        location.href = alamat
    }
}
function finddatepost(root) {
    post = root.feed.entry[0];
    var timestamp1 = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
    var timestamp = encodeURIComponent(timestamp1);
    if (jenis == "page") {
        var alamat = home_page + "search?updated-max=" + timestamp + "&max-results=" + postperpage + "#PageNo=" + nopage
    } else {
        var alamat = home_page + "search/label/" + lblname1 + "?updated-max=" + timestamp + "&max-results=" + postperpage + "#PageNo=" + nopage
    }
    location.href = alamat
}