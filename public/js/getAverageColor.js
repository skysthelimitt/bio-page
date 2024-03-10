/*! Fast Average Color | © 2023 Denis Seleznev | MIT License | https://github.com/fast-average-color/fast-average-color */
!function(){"use strict";function t(t){var r=t.toString(16);return 1===r.length?"0"+r:r}function r(r){return"#"+r.map(t).join("")}function e(t){return t?(r=t,Array.isArray(r[0])?t:[t]):[];var r}function n(t,r,e){for(var n=0;n<e.length;n++)if(i(t,r,e[n]))return!0;return!1}function i(t,r,e){switch(e.length){case 3:if(function(t,r,e){if(255!==t[r+3])return!0;if(t[r]===e[0]&&t[r+1]===e[1]&&t[r+2]===e[2])return!0;return!1}(t,r,e))return!0;break;case 4:if(function(t,r,e){if(t[r+3]&&e[3])return t[r]===e[0]&&t[r+1]===e[1]&&t[r+2]===e[2]&&t[r+3]===e[3];return t[r+3]===e[3]}(t,r,e))return!0;break;case 5:if(function(t,r,e){var n=e[0],i=e[1],a=e[2],s=e[3],u=e[4],c=t[r+3],d=o(c,s,u);if(!s)return d;if(!c&&d)return!0;if(o(t[r],n,u)&&o(t[r+1],i,u)&&o(t[r+2],a,u)&&d)return!0;return!1}(t,r,e))return!0;break;default:return!1}}function o(t,r,e){return t>=r-e&&t<=r+e}function a(t,r,e){for(var i={},o=e.dominantDivider||24,a=e.ignoredColor,s=e.step,u=[0,0,0,0,0],c=0;c<r;c+=s){var d=t[c],h=t[c+1],f=t[c+2],l=t[c+3];if(!a||!n(t,c,a)){var v=Math.round(d/o)+","+Math.round(h/o)+","+Math.round(f/o);i[v]?i[v]=[i[v][0]+d*l,i[v][1]+h*l,i[v][2]+f*l,i[v][3]+l,i[v][4]+1]:i[v]=[d*l,h*l,f*l,l,1],u[4]<i[v][4]&&(u=i[v])}}var g=u[0],p=u[1],m=u[2],C=u[3],w=u[4];return C?[Math.round(g/C),Math.round(p/C),Math.round(m/C),Math.round(C/w)]:e.defaultColor}function s(t,r,e){for(var i=0,o=0,a=0,s=0,u=0,c=e.ignoredColor,d=e.step,h=0;h<r;h+=d){var f=t[h+3],l=t[h]*f,v=t[h+1]*f,g=t[h+2]*f;c&&n(t,h,c)||(i+=l,o+=v,a+=g,s+=f,u++)}return s?[Math.round(i/s),Math.round(o/s),Math.round(a/s),Math.round(s/u)]:e.defaultColor}function u(t,r,e){for(var i=0,o=0,a=0,s=0,u=0,c=e.ignoredColor,d=e.step,h=0;h<r;h+=d){var f=t[h],l=t[h+1],v=t[h+2],g=t[h+3];c&&n(t,h,c)||(i+=f*f*g,o+=l*l*g,a+=v*v*g,s+=g,u++)}return s?[Math.round(Math.sqrt(i/s)),Math.round(Math.sqrt(o/s)),Math.round(Math.sqrt(a/s)),Math.round(s/u)]:e.defaultColor}function c(t){return d(t,"defaultColor",[0,0,0,0])}function d(t,r,e){return void 0===t[r]?e:t[r]}function h(t){if(l(t)){var r=t.naturalWidth,e=t.naturalHeight;return t.naturalWidth||-1===t.src.search(/\.svg(\?|$)/i)||(r=e=100),{width:r,height:e}}return function(t){return"undefined"!=typeof HTMLVideoElement&&t instanceof HTMLVideoElement}(t)?{width:t.videoWidth,height:t.videoHeight}:{width:t.width,height:t.height}}function f(t){return function(t){return"undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement}(t)?"canvas":function(t){return v&&t instanceof OffscreenCanvas}(t)?"offscreencanvas":function(t){return"undefined"!=typeof ImageBitmap&&t instanceof ImageBitmap}(t)?"imagebitmap":t.src}function l(t){return"undefined"!=typeof HTMLImageElement&&t instanceof HTMLImageElement}var v="undefined"!=typeof OffscreenCanvas;var g="undefined"==typeof window;function p(t){return Error("FastAverageColor: "+t)}function m(t,r){r||console.error(t)}var C=function(){function t(){this.canvas=null,this.ctx=null}return t.prototype.getColorAsync=function(t,r){if(!t)return Promise.reject(p("call .getColorAsync() without resource"));if("string"==typeof t){if("undefined"==typeof Image)return Promise.reject(p("resource as string is not supported in this environment"));var e=new Image;return e.crossOrigin=r&&r.crossOrigin||"",e.src=t,this.bindImageEvents(e,r)}if(l(t)&&!t.complete)return this.bindImageEvents(t,r);var n=this.getColor(t,r);return n.error?Promise.reject(n.error):Promise.resolve(n)},t.prototype.getColor=function(t,r){var e=c(r=r||{});if(!t)return m(o=p("call .getColor() without resource"),r.silent),this.prepareResult(e,o);var n=function(t,r){var e,n=d(r,"left",0),i=d(r,"top",0),o=d(r,"width",t.width),a=d(r,"height",t.height),s=o,u=a;return"precision"===r.mode||(o>a?(e=o/a,s=100,u=Math.round(s/e)):(e=a/o,u=100,s=Math.round(u/e)),(s>o||u>a||s<10||u<10)&&(s=o,u=a)),{srcLeft:n,srcTop:i,srcWidth:o,srcHeight:a,destWidth:s,destHeight:u}}(h(t),r);if(!(n.srcWidth&&n.srcHeight&&n.destWidth&&n.destHeight))return m(o=p('incorrect sizes for resource "'.concat(f(t),'"')),r.silent),this.prepareResult(e,o);if(!this.canvas&&(this.canvas=g?v?new OffscreenCanvas(1,1):null:document.createElement("canvas"),!this.canvas))return m(o=p("OffscreenCanvas is not supported in this browser"),r.silent),this.prepareResult(e,o);if(!this.ctx){if(this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),!this.ctx)return m(o=p("Canvas Context 2D is not supported in this browser"),r.silent),this.prepareResult(e);this.ctx.imageSmoothingEnabled=!1}this.canvas.width=n.destWidth,this.canvas.height=n.destHeight;try{this.ctx.clearRect(0,0,n.destWidth,n.destHeight),this.ctx.drawImage(t,n.srcLeft,n.srcTop,n.srcWidth,n.srcHeight,0,0,n.destWidth,n.destHeight);var i=this.ctx.getImageData(0,0,n.destWidth,n.destHeight).data;return this.prepareResult(this.getColorFromArray4(i,r))}catch(n){var o;return m(o=p("security error (CORS) for resource ".concat(f(t),".\nDetails: https://developer.mozilla.org/en/docs/Web/HTML/CORS_enabled_image")),r.silent),!r.silent&&console.error(n),this.prepareResult(e,o)}},t.prototype.getColorFromArray4=function(t,r){r=r||{};var n=t.length,i=c(r);if(n<4)return i;var o,d=n-n%4,h=4*(r.step||1);switch(r.algorithm||"sqrt"){case"simple":o=s;break;case"sqrt":o=u;break;case"dominant":o=a;break;default:throw p("".concat(r.algorithm," is unknown algorithm"))}return o(t,d,{defaultColor:i,ignoredColor:e(r.ignoredColor),step:h,dominantDivider:r.dominantDivider})},t.prototype.prepareResult=function(t,e){var n,i=t.slice(0,3),o=[t[0],t[1],t[2],t[3]/255],a=(299*(n=t)[0]+587*n[1]+114*n[2])/1e3<128;return{value:[t[0],t[1],t[2],t[3]],rgb:"rgb("+i.join(",")+")",rgba:"rgba("+o.join(",")+")",hex:r(i),hexa:r(t),isDark:a,isLight:!a,error:e}},t.prototype.destroy=function(){this.canvas&&(this.canvas.width=1,this.canvas.height=1,this.canvas=null),this.ctx=null},t.prototype.bindImageEvents=function(t,r){var e=this;return new Promise((function(n,i){var o=function(){u();var o=e.getColor(t,r);o.error?i(o.error):n(o)},a=function(){u(),i(p('Error loading image "'.concat(t.src,'"')))},s=function(){u(),i(p('Image "'.concat(t.src,'" loading aborted')))},u=function(){t.removeEventListener("load",o),t.removeEventListener("error",a),t.removeEventListener("abort",s)};t.addEventListener("load",o),t.addEventListener("error",a),t.addEventListener("abort",s)}))},t}();("undefined"!=typeof window?window:self).FastAverageColor=C}();