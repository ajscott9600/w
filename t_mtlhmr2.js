!function(z){function F(a){z.fn.cycle.debug&&k(a)
}function k(){window.console&&console.log&&console.log("[cycle] "+Array.prototype.join.call(arguments," "))
}function q(e,d,g){function f(l,a,n){if(!l&&a===!0){var o=z(n).data("cycle.opts");
if(!o){return k("options not found, can not resume"),!1
}n.cycleTimeout&&(clearTimeout(n.cycleTimeout),n.cycleTimeout=0),E(o.elements,o,1,!o.backwards)
}}if(void 0==e.cycleStop&&(e.cycleStop=0),(void 0===d||null===d)&&(d={}),d.constructor==String){switch(d){case"destroy":case"stop":var h=z(e).data("cycle.opts");
return h?(e.cycleStop++,e.cycleTimeout&&clearTimeout(e.cycleTimeout),e.cycleTimeout=0,z(e).removeData("cycle.opts"),"destroy"==d&&B(h),!1):!1;
case"toggle":return e.cyclePause=1===e.cyclePause?0:1,f(e.cyclePause,g,e),!1;
case"pause":return e.cyclePause=1,!1;
case"resume":return e.cyclePause=0,f(!1,g,e),!1;
case"prev":case"next":var h=z(e).data("cycle.opts");
return h?(z.fn.cycle[d](h),!1):(k('options not found, "prev/next" ignored'),!1);
default:d={fx:d}}return d}if(d.constructor==Number){var c=d;
return(d=z(e).data("cycle.opts"))?0>c||c>=d.elements.length?(k("invalid slide index: "+c),!1):(d.nextSlide=c,e.cycleTimeout&&(clearTimeout(e.cycleTimeout),e.cycleTimeout=0),"string"==typeof g&&(d.oneTimeFx=g),E(d.elements,d,1,c>=d.currSlide),!1):(k("options not found, can not advance slide"),!1)
}return d}function b(c,d){if(!z.support.opacity&&d.cleartype&&c.style.filter){try{c.style.removeAttribute("filter")
}catch(a){}}}function B(a){a.next&&z(a.next).unbind(a.prevNextEvent),a.prev&&z(a.prev).unbind(a.prevNextEvent),(a.pager||a.pagerAnchorBuilder)&&z.each(a.pagerAnchors||[],function(){this.unbind().remove()
}),a.pagerAnchors=null,a.destroy&&a.destroy(a)
}function G(H,R,V,J,U){var M=z.extend({},z.fn.cycle.defaults,J||{},z.metadata?H.metadata():z.meta?H.data():{});
M.autostop&&(M.countdown=M.autostopCount||V.length);
var h=H[0];if(H.data("cycle.opts",M),M.$cont=H,M.stopCount=h.cycleStop,M.elements=V,M.before=M.before?[M.before]:[],M.after=M.after?[M.after]:[],!z.support.opacity&&M.cleartype&&M.after.push(function(){b(this,M)
}),M.continuous&&M.after.push(function(){E(V,M,0,!M.backwards)
}),j(M),z.support.opacity||!M.cleartype||M.cleartypeNoBg||w(R),"static"==H.css("position")&&H.css("position","relative"),M.width&&H.width(M.width),M.height&&"auto"!=M.height&&H.height(M.height),M.startingSlide?M.startingSlide=parseInt(M.startingSlide):M.backwards&&(M.startingSlide=V.length-1),M.random){M.randomMap=[];
for(var N=0;N<V.length;N++){M.randomMap.push(N)
}M.randomMap.sort(function(){return Math.random()-0.5
}),M.randomIndex=1,M.startingSlide=M.randomMap[1]
}else{M.startingSlide>=V.length&&(M.startingSlide=0)
}M.currSlide=M.startingSlide||0;
var n=M.startingSlide;R.css({position:"absolute",top:0,left:0}).hide().each(function(c){var d;
d=M.backwards?n?n>=c?V.length+(c-n):n-c:V.length-c:n?c>=n?V.length-(c-n):n-c:V.length-c,z(this).css("z-index",d)
}),z(V[n]).css("opacity",1).show(),b(V[n],M),M.fit&&M.width&&R.width(M.width),M.fit&&M.height&&"auto"!=M.height&&R.height(M.height);
var r=M.containerResize&&!H.innerHeight();
if(r){for(var e=0,W=0,o=0;o<V.length;
o++){var L=z(V[o]),a=L[0],l=L.outerWidth(),f=L.outerHeight();
l||(l=a.offsetWidth||a.width||L.attr("width")),f||(f=a.offsetHeight||a.height||L.attr("height")),e=l>e?l:e,W=f>W?f:W
}e>0&&W>0&&H.css({width:e+"px",height:W+"px"})
}if(M.pause&&H.hover(function(){this.cyclePause++
},function(){this.cyclePause--}),D(M)===!1){return !1
}var Q=!1;if(J.requeueAttempts=J.requeueAttempts||0,R.each(function(){var s=z(this);
if(this.cycleH=M.fit&&M.height?M.height:s.height()||this.offsetHeight||this.height||s.attr("height")||0,this.cycleW=M.fit&&M.width?M.width:s.width()||this.offsetWidth||this.width||s.attr("width")||0,s.is("img")){var d=z.browser.msie&&28==this.cycleW&&30==this.cycleH&&!this.complete,y=z.browser.mozilla&&34==this.cycleW&&19==this.cycleH&&!this.complete,O=z.browser.opera&&(42==this.cycleW&&19==this.cycleH||37==this.cycleW&&17==this.cycleH)&&!this.complete,I=0==this.cycleH&&0==this.cycleW&&!this.complete;
if(d||y||O||I){if(U.s&&M.requeueOnImageNotLoaded&&++J.requeueAttempts<100){return k(J.requeueAttempts," - img slide not loaded, requeuing slideshow: ",this.src,this.cycleW,this.cycleH),setTimeout(function(){z(U.s,U.c).cycle(J)
},M.requeueTimeout),Q=!0,!1}k("could not determine size of image: "+this.src,this.cycleW,this.cycleH)
}}return !0}),Q){return !1}if(M.cssBefore=M.cssBefore||{},M.cssAfter=M.cssAfter||{},M.cssFirst=M.cssFirst||{},M.animIn=M.animIn||{},M.animOut=M.animOut||{},R.not(":eq("+n+")").css(M.cssBefore),z(R[n]).css(M.cssFirst),M.timeout){M.timeout=parseInt(M.timeout),M.speed.constructor==String&&(M.speed=z.fx.speeds[M.speed]||parseInt(M.speed)),M.sync||(M.speed=M.speed/2);
for(var u="none"==M.fx?0:"shuffle"==M.fx?500:250;
M.timeout-M.speed<u;){M.timeout+=M.speed
}}if(M.easing&&(M.easeIn=M.easeOut=M.easing),M.speedIn||(M.speedIn=M.speed),M.speedOut||(M.speedOut=M.speed),M.slideCount=V.length,M.currSlide=M.lastSlide=n,M.random?(++M.randomIndex==V.length&&(M.randomIndex=0),M.nextSlide=M.randomMap[M.randomIndex]):M.nextSlide=M.backwards?0==M.startingSlide?V.length-1:M.startingSlide-1:M.startingSlide>=V.length-1?0:M.startingSlide+1,!M.multiFx){var g=z.fn.cycle.transitions[M.fx];
if(z.isFunction(g)){g(H,R,M)}else{if("custom"!=M.fx&&!M.multiFx){return k("unknown transition: "+M.fx,"; slideshow terminating"),!1
}}}var K=R[n];return M.before.length&&M.before[0].apply(K,[K,K,M,!0]),M.after.length&&M.after[0].apply(K,[K,K,M,!0]),M.next&&z(M.next).bind(M.prevNextEvent,function(){return x(M,1)
}),M.prev&&z(M.prev).bind(M.prevNextEvent,function(){return x(M,0)
}),(M.pager||M.pagerAnchorBuilder)&&v(V,M),m(M,V),M
}function j(a){a.original={before:[],after:[]},a.original.cssBefore=z.extend({},a.cssBefore),a.original.cssAfter=z.extend({},a.cssAfter),a.original.animIn=z.extend({},a.animIn),a.original.animOut=z.extend({},a.animOut),z.each(a.before,function(){a.original.before.push(this)
}),z.each(a.after,function(){a.original.after.push(this)
})}function D(f){var h,t,g=z.fn.cycle.transitions;
if(f.fx.indexOf(",")>0){for(f.multiFx=!0,f.fxs=f.fx.replace(/\s*/g,"").split(","),h=0;
h<f.fxs.length;h++){var n=f.fxs[h];
t=g[n],t&&g.hasOwnProperty(n)&&z.isFunction(t)||(k("discarding unknown transition: ",n),f.fxs.splice(h,1),h--)
}if(!f.fxs.length){return k("No valid transitions named; slideshow terminating."),!1
}}else{if("all"==f.fx){f.multiFx=!0,f.fxs=[];
for(p in g){t=g[p],g.hasOwnProperty(p)&&z.isFunction(t)&&f.fxs.push(p)
}}}if(f.multiFx&&f.randomizeEffects){var e=Math.floor(20*Math.random())+30;
for(h=0;e>h;h++){var d=Math.floor(Math.random()*f.fxs.length);
f.fxs.push(f.fxs.splice(d,1)[0])
}F("randomized fx sequence: ",f.fxs)
}return !0}function m(a,c){a.addSlide=function(d,f){var g=z(d),e=g[0];
a.autostopCount||a.countdown++,c[f?"unshift":"push"](e),a.els&&a.els[f?"unshift":"push"](e),a.slideCount=c.length,g.css("position","absolute"),g[f?"prependTo":"appendTo"](a.$cont),f&&(a.currSlide++,a.nextSlide++),z.support.opacity||!a.cleartype||a.cleartypeNoBg||w(g),a.fit&&a.width&&g.width(a.width),a.fit&&a.height&&"auto"!=a.height&&g.height(a.height),e.cycleH=a.fit&&a.height?a.height:g.height(),e.cycleW=a.fit&&a.width?a.width:g.width(),g.css(a.cssBefore),(a.pager||a.pagerAnchorBuilder)&&z.fn.cycle.createPagerAnchor(c.length-1,e,z(a.pager),c,a),z.isFunction(a.onAddSlide)?a.onAddSlide(g):g.hide()
}}function E(u,H,d,L){if(d&&H.busy&&H.manualTrump&&(F("manualTrump in go(), stopping active transition"),z(u).stop(!0,!0),H.busy=0),H.busy){return void F("transition active, ignoring new tx request")
}var N=H.$cont[0],t=u[H.currSlide],M=u[H.nextSlide];
if(N.cycleStop==H.stopCount&&(0!==N.cycleTimeout||d)){if(!d&&!N.cyclePause&&!H.bounce&&(H.autostop&&--H.countdown<=0||H.nowrap&&!H.random&&H.nextSlide<H.currSlide)){return void (H.end&&H.end(H))
}var y=!1;if((d||!N.cyclePause)&&H.nextSlide!=H.currSlide){y=!0;
var K=H.fx;t.cycleH=t.cycleH||z(t).height(),t.cycleW=t.cycleW||z(t).width(),M.cycleH=M.cycleH||z(M).height(),M.cycleW=M.cycleW||z(M).width(),H.multiFx&&((void 0==H.lastFx||++H.lastFx>=H.fxs.length)&&(H.lastFx=0),K=H.fxs[H.lastFx],H.currFx=K),H.oneTimeFx&&(K=H.oneTimeFx,H.oneTimeFx=null),z.fn.cycle.resetState(H,K),H.before.length&&z.each(H.before,function(c,a){N.cycleStop==H.stopCount&&a.apply(M,[t,M,H,L])
});var I=function(){H.busy=0,z.each(H.after,function(c,a){N.cycleStop==H.stopCount&&a.apply(M,[t,M,H,L])
})};F("tx firing("+K+"); currSlide: "+H.currSlide+"; nextSlide: "+H.nextSlide),H.busy=1,H.fxFn?H.fxFn(t,M,H,I,L,d&&H.fastOnEvent):z.isFunction(z.fn.cycle[H.fx])?z.fn.cycle[H.fx](t,M,H,I,L,d&&H.fastOnEvent):z.fn.cycle.custom(t,M,H,I,L,d&&H.fastOnEvent)
}if(y||H.nextSlide==H.currSlide){if(H.lastSlide=H.currSlide,H.random){H.currSlide=H.nextSlide,++H.randomIndex==u.length&&(H.randomIndex=0),H.nextSlide=H.randomMap[H.randomIndex],H.nextSlide==H.currSlide&&(H.nextSlide=H.currSlide==H.slideCount-1?0:H.currSlide+1)
}else{if(H.backwards){var e=H.nextSlide-1<0;
e&&H.bounce?(H.backwards=!H.backwards,H.nextSlide=1,H.currSlide=0):(H.nextSlide=e?u.length-1:H.nextSlide-1,H.currSlide=e?0:H.nextSlide+1)
}else{var e=H.nextSlide+1==u.length;
e&&H.bounce?(H.backwards=!H.backwards,H.nextSlide=u.length-2,H.currSlide=u.length-1):(H.nextSlide=e?0:H.nextSlide+1,H.currSlide=e?u.length-1:H.nextSlide-1)
}}}y&&H.pager&&H.updateActivePagerLink(H.pager,H.currSlide,H.activePagerClass);
var J=0;H.timeout&&!H.continuous?J=A(u[H.currSlide],u[H.nextSlide],H,L):H.continuous&&N.cyclePause&&(J=10),J>0&&(N.cycleTimeout=setTimeout(function(){E(u,H,0,!H.backwards)
},J))}}function A(f,h,a,d){if(a.timeoutFn){for(var g=a.timeoutFn.call(f,f,h,a,d);
"none"!=a.fx&&g-a.speed<250;){g+=a.speed
}if(F("calculated timeout: "+g+"; speed: "+a.speed),g!==!1){return g
}}return a.timeout}function x(d,l){var a=l?1:-1,f=d.elements,h=d.$cont[0],e=h.cycleTimeout;
if(e&&(clearTimeout(e),h.cycleTimeout=0),d.random&&0>a){d.randomIndex--,-2==--d.randomIndex?d.randomIndex=f.length-2:-1==d.randomIndex&&(d.randomIndex=f.length-1),d.nextSlide=d.randomMap[d.randomIndex]
}else{if(d.random){d.nextSlide=d.randomMap[d.randomIndex]
}else{if(d.nextSlide=d.currSlide+a,d.nextSlide<0){if(d.nowrap){return !1
}d.nextSlide=f.length-1}else{if(d.nextSlide>=f.length){if(d.nowrap){return !1
}d.nextSlide=0}}}}var g=d.onPrevNextEvent||d.prevNextClick;
return z.isFunction(g)&&g(a>0,d.nextSlide,f[d.nextSlide]),E(f,d,1,l),!1
}function v(c,d){var a=z(d.pager);
z.each(c,function(e,f){z.fn.cycle.createPagerAnchor(e,f,a,c,d)
}),d.updateActivePagerLink(d.pager,d.startingSlide,d.activePagerClass)
}function w(d){function a(f){return f=parseInt(f).toString(16),f.length<2?"0"+f:f
}function c(e){for(;e&&"html"!=e.nodeName.toLowerCase();
e=e.parentNode){var g=z.css(e,"background-color");
if(g&&g.indexOf("rgb")>=0){var f=g.match(/\d+/g);
return"#"+a(f[0])+a(f[1])+a(f[2])
}if(g&&"transparent"!=g){return g
}}return"#ffffff"}F("applying clearType background-color hack"),d.each(function(){z(this).css("background-color",c(this))
})}var C="2.99";void 0==z.support&&(z.support={opacity:!z.browser.msie}),z.expr[":"].paused=function(a){return a.cyclePause
},z.fn.cycle=function(a,e){var d={s:this.selector,c:this.context};
return 0===this.length&&"stop"!=a?!z.isReady&&d.s?(k("DOM not ready, queuing slideshow"),z(function(){z(d.s,d.c).cycle(a,e)
}),this):(k("terminating; zero elements found by selector"+(z.isReady?"":" (DOM not ready)")),this):this.each(function(){var i=q(this,a,e);
if(i!==!1){i.updateActivePagerLink=i.updateActivePagerLink||z.fn.cycle.updateActivePagerLink,this.cycleTimeout&&clearTimeout(this.cycleTimeout),this.cycleTimeout=this.cyclePause=0;
var c=z(this),r=i.slideExpr?z(i.slideExpr,this):c.children(),n=r.get();
if(n.length<2){return void k("terminating; too few slides: "+n.length)
}var s=G(c,r,n,i,d);if(s!==!1){var o=s.continuous?10:A(n[s.currSlide],n[s.nextSlide],s,!s.backwards);
o&&(o+=s.delay||0,10>o&&(o=10),F("first timeout: "+o),this.cycleTimeout=setTimeout(function(){E(n,s,0,!i.backwards)
},o))}}})},z.fn.cycle.resetState=function(c,d){d=d||c.fx,c.before=[],c.after=[],c.cssBefore=z.extend({},c.original.cssBefore),c.cssAfter=z.extend({},c.original.cssAfter),c.animIn=z.extend({},c.original.animIn),c.animOut=z.extend({},c.original.animOut),c.fxFn=null,z.each(c.original.before,function(){c.before.push(this)
}),z.each(c.original.after,function(){c.after.push(this)
});var a=z.fn.cycle.transitions[d];
z.isFunction(a)&&a(c.$cont,z(c.elements),c)
},z.fn.cycle.updateActivePagerLink=function(c,d,a){z(c).each(function(){z(this).children().removeClass(a).eq(d).addClass(a)
})},z.fn.cycle.next=function(a){x(a,1)
},z.fn.cycle.prev=function(a){x(a,0)
},z.fn.cycle.createPagerAnchor=function(y,f,h,u,g){var t;
if(z.isFunction(g.pagerAnchorBuilder)?(t=g.pagerAnchorBuilder(y,f),F("pagerAnchorBuilder("+y+", el) returned: "+t)):t='<a href="#">'+(y+1)+"</a>",t){var e=z(t);
if(0===e.parents("body").length){var d=[];
h.length>1?(h.each(function(){var a=e.clone(!0);
z(this).append(a),d.push(a[0])}),e=z(d)):e.appendTo(h)
}g.pagerAnchors=g.pagerAnchors||[],g.pagerAnchors.push(e),e.bind(g.pagerEvent,function(c){c.preventDefault(),g.nextSlide=y;
var a=g.$cont[0],l=a.cycleTimeout;
l&&(clearTimeout(l),a.cycleTimeout=0);
var n=g.onPagerEvent||g.pagerClick;
z.isFunction(n)&&n(g.nextSlide,u[g.nextSlide]),E(u,g,1,g.currSlide<y)
}),/^click/.test(g.pagerEvent)||g.allowPagerClickBubble||e.bind("click.cycle",function(){return !1
}),g.pauseOnPagerHover&&e.hover(function(){g.$cont[0].cyclePause++
},function(){g.$cont[0].cyclePause--
})}},z.fn.cycle.hopsFromLast=function(f,c){var g,a=f.lastSlide,d=f.currSlide;
return g=c?d>a?d-a:f.slideCount-a:a>d?a-d:a+f.slideCount-d
},z.fn.cycle.commonReset=function(d,h,a,f,g,e){z(a.elements).not(d).hide(),"undefined"==typeof a.cssBefore.opacity&&(a.cssBefore.opacity=1),a.cssBefore.display="block",a.slideResize&&f!==!1&&h.cycleW>0&&(a.cssBefore.width=h.cycleW),a.slideResize&&g!==!1&&h.cycleH>0&&(a.cssBefore.height=h.cycleH),a.cssAfter=a.cssAfter||{},a.cssAfter.display="none",z(d).css("zIndex",a.slideCount+(e===!0?1:0)),z(h).css("zIndex",a.slideCount+(e===!0?0:1))
},z.fn.cycle.custom=function(P,y,I,e,M,Q){var g=z(P),N=z(y),H=I.speedIn,O=I.speedOut,L=I.easeIn,K=I.easeOut;
N.css(I.cssBefore),Q&&(H=O="number"==typeof Q?Q:1,L=K=null);
var J=function(){N.animate(I.animIn,H,L,function(){e()
})};g.animate(I.animOut,O,K,function(){g.css(I.cssAfter),I.sync||J()
}),I.sync&&J()},z.fn.cycle.transitions={fade:function(c,d,a){d.not(":eq("+a.currSlide+")").css("opacity",0),a.before.push(function(f,g,e){z.fn.cycle.commonReset(f,g,e),e.cssBefore.opacity=0
}),a.animIn={opacity:1},a.animOut={opacity:0},a.cssBefore={top:0,left:0}
}},z.fn.cycle.ver=function(){return C
},z.fn.cycle.defaults={activePagerClass:"activeSlide",after:null,allowPagerClickBubble:!1,animIn:null,animOut:null,autostop:0,autostopCount:0,backwards:!1,before:null,cleartype:!z.support.opacity,cleartypeNoBg:!1,containerResize:1,continuous:0,cssAfter:null,cssBefore:null,delay:0,easeIn:null,easeOut:null,easing:null,end:null,fastOnEvent:0,fit:0,fx:"fade",fxFn:null,height:"auto",manualTrump:!0,next:null,nowrap:0,onPagerEvent:null,onPrevNextEvent:null,pager:null,pagerAnchorBuilder:null,pagerEvent:"click.cycle",pause:0,pauseOnPagerHover:0,prev:null,prevNextEvent:"click.cycle",random:0,randomizeEffects:1,requeueOnImageNotLoaded:!0,requeueTimeout:250,rev:0,shuffle:null,slideExpr:null,slideResize:1,speed:1000,speedIn:null,speedOut:null,startingSlide:0,sync:1,timeout:4000,timeoutFn:null,updateActivePagerLink:null}
}(jQuery);
