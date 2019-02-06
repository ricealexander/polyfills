/** CONTENTS
  *  Array.prototype.forEach()
  *  Array.prototype.find()
  *  Array.prototype.includes()
  *  NodeList.prototype.forEach()
  *  Object.entries()
  *  String.prototype.endsWith()
  *  String.prototype.padStart()
  *
  *  Event Listeners & Custom Events
  *  Promise
  *  fetch()
  **/

// Array.prototype.forEach
///  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill
if(!Array.prototype.forEach){Array.prototype.forEach=function(callback){var T,k;if(this==null){throw new TypeError('this is null or not defined')}
var O=Object(this);var len=O.length>>>0;if(typeof callback!=='function'){throw new TypeError(callback+' is not a function')}
if(arguments.length>1){T=arguments[1]}
k=0;while(k<len){var kValue;if(k in O){kValue=O[k];callback.call(T,kValue,k,O)}
k++}}}


// Array.prototype.find
///  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find#Polyfill
Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(r){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),t=e.length>>>0;if("function"!=typeof r)throw new TypeError("predicate must be a function");for(var n=arguments[1],i=0;i<t;){var o=e[i];if(r.call(n,o,i,e))return o;i++}},configurable:!0,writable:!0});


// Array.prototype.includes
///  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Polyfill
Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(r,e){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),n=t.length>>>0;if(0===n)return!1;var i,o,a=0|e,u=Math.max(a>=0?a:n-Math.abs(a),0);for(;u<n;){if((i=t[u])===(o=r)||"number"==typeof i&&"number"==typeof o&&isNaN(i)&&isNaN(o))return!0;u++}return!1}});


// NodeList.prototype.forEach
///  https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
if(window.NodeList && !NodeList.prototype.forEach){NodeList.prototype.forEach=Array.prototype.forEach}


// Object.entries
///  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#Polyfill
Object.entries||(Object.entries=function(e){for(var r=Object.keys(e),t=r.length,n=new Array(t);t--;)n[t]=[r[t],e[r[t]]];return n});


// String.prototype.endsWith
///  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith#Polyfill
if(!String.prototype.endsWith){String.prototype.endsWith=function(search,this_len){if(this_len===undefined||this_len>this.length){this_len=this.length}
return this.substring(this_len-search.length,this_len)===search}}


// String.prototype.padStart
///  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart#Polyfill
if(!String.prototype.padStart){String.prototype.padStart=function padStart(targetLength,padString){targetLength=targetLength>>0;padString=String(typeof padString!=='undefined'?padString:' ');if(this.length>=targetLength){return String(this)}else{targetLength=targetLength-this.length;if(targetLength>padString.length){padString+=padString.repeat(targetLength/padString.length)}
return padString.slice(0,targetLength)+String(this)}}}


// Event Listeners and Custom Events
///  https://github.com/jonathantneal/EventListener
this.Element&&Element.prototype.attachEvent&&!Element.prototype.addEventListener&&(function(){function addToPrototype(name,method){Window.prototype[name]=HTMLDocument.prototype[name]=Element.prototype[name]=method}
addToPrototype("addEventListener",function(type,listener){var
target=this,listeners=target.addEventListener.listeners=target.addEventListener.listeners||{},typeListeners=listeners[type]=listeners[type]||[];if(!typeListeners.length){target.attachEvent("on"+type,typeListeners.event=function(event){var documentElement=target.document&&target.document.documentElement||target.documentElement||{scrollLeft:0,scrollTop:0};event.currentTarget=target;event.pageX=event.clientX+documentElement.scrollLeft;event.pageY=event.clientY+documentElement.scrollTop;event.preventDefault=function(){event.returnValue=!1};event.relatedTarget=event.fromElement||null;event.stopImmediatePropagation=function(){immediatePropagation=!1;event.cancelBubble=!0};event.stopPropagation=function(){event.cancelBubble=!0};event.target=event.srcElement||target;event.timeStamp=+new Date;var plainEvt={};for(var i in event){plainEvt[i]=event[i]}
for(var i=0,typeListenersCache=[].concat(typeListeners),typeListenerCache,immediatePropagation=!0;immediatePropagation&&(typeListenerCache=typeListenersCache[i]);++i){for(var ii=0,typeListener;typeListener=typeListeners[ii];++ii){if(typeListener==typeListenerCache){typeListener.call(target,plainEvt);break}}}})}
typeListeners.push(listener)});addToPrototype("removeEventListener",function(type,listener){var
target=this,listeners=target.addEventListener.listeners=target.addEventListener.listeners||{},typeListeners=listeners[type]=listeners[type]||[];for(var i=typeListeners.length-1,typeListener;typeListener=typeListeners[i];--i){if(typeListener==listener){typeListeners.splice(i,1);break}}
if(!typeListeners.length&&typeListeners.event){target.detachEvent("on"+type,typeListeners.event)}});addToPrototype("dispatchEvent",function(eventObject){var
target=this,type=eventObject.type,listeners=target.addEventListener.listeners=target.addEventListener.listeners||{},typeListeners=listeners[type]=listeners[type]||[];try{return target.fireEvent("on"+type,eventObject)}catch(error){if(typeListeners.event){typeListeners.event(eventObject)}
return}});Object.defineProperty(Window.prototype,"CustomEvent",{get:function(){var self=this;return function CustomEvent(type,eventInitDict){var event=self.document.createEventObject(),key;event.type=type;for(key in eventInitDict){if(key=='cancelable'){event.returnValue=!eventInitDict.cancelable}else if(key=='bubbles'){event.cancelBubble=!eventInitDict.bubbles}else if(key=='detail'){event.detail=eventInitDict.detail}}
return event}}});function ready(event){if(ready.interval&&document.body){ready.interval=clearInterval(ready.interval);document.dispatchEvent(new CustomEvent("DOMContentLoaded"))}}
ready.interval=setInterval(ready,1);window.addEventListener("load",ready)})();(!this.CustomEvent||typeof this.CustomEvent==="object")&&(function(){this.CustomEvent=function CustomEvent(type,eventInitDict){var event;eventInitDict=eventInitDict||{bubbles:!1,cancelable:!1,detail:undefined};try{event=document.createEvent('CustomEvent');event.initCustomEvent(type,eventInitDict.bubbles,eventInitDict.cancelable,eventInitDict.detail)}catch(error){event=document.createEvent('Event');event.initEvent(type,eventInitDict.bubbles,eventInitDict.cancelable);event.detail=eventInitDict.detail}
return event}})();


// Promise
///  https://github.com/taylorhakes/promise-polyfill
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(e){var n=this.constructor;return this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){return n.reject(t)})})}function n(){}function t(e){if(!(this instanceof t))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],u(e,this)}function o(e,n){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,t._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null!==t){var o;try{o=t(e._value)}catch(f){return void i(n.promise,f)}r(n.promise,o)}else(1===e._state?r:i)(n.promise,e._value)})):e._deferreds.push(n)}function r(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var o=n.then;if(n instanceof t)return e._state=3,e._value=n,void f(e);if("function"==typeof o)return void u(function(e,n){return function(){e.apply(n,arguments)}}(o,n),e)}e._state=1,e._value=n,f(e)}catch(r){i(e,r)}}function i(e,n){e._state=2,e._value=n,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&t._immediateFn(function(){e._handled||t._unhandledRejectionFn(e._value)});for(var n=0,r=e._deferreds.length;r>n;n++)o(e,e._deferreds[n]);e._deferreds=null}function u(e,n){var t=!1;try{e(function(e){t||(t=!0,r(n,e))},function(e){t||(t=!0,i(n,e))})}catch(o){if(t)return;t=!0,i(n,o)}}var c=setTimeout;t.prototype["catch"]=function(e){return this.then(null,e)},t.prototype.then=function(e,t){var r=new this.constructor(n);return o(this,new function(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}(e,t,r)),r},t.prototype["finally"]=e,t.all=function(e){return new t(function(n,t){function o(e,f){try{if(f&&("object"==typeof f||"function"==typeof f)){var u=f.then;if("function"==typeof u)return void u.call(f,function(n){o(e,n)},t)}r[e]=f,0==--i&&n(r)}catch(c){t(c)}}if(!e||"undefined"==typeof e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return n([]);for(var i=r.length,f=0;r.length>f;f++)o(f,r[f])})},t.resolve=function(e){return e&&"object"==typeof e&&e.constructor===t?e:new t(function(n){n(e)})},t.reject=function(e){return new t(function(n,t){t(e)})},t.race=function(e){return new t(function(n,t){for(var o=0,r=e.length;r>o;o++)e[o].then(n,t)})},t._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){c(e,0)},t._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var l=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();"Promise"in l?l.Promise.prototype["finally"]||(l.Promise.prototype["finally"]=e):l.Promise=t});


// fetch
///  https://github.com/github/fetch/releases
(function(global,factory){typeof exports==='object'&&typeof module!=='undefined'?factory(exports):typeof define==='function'&&define.amd?define(['exports'],factory):(factory((global.WHATWGFetch={})))}(this,(function(exports){'use strict';var support={searchParams:'URLSearchParams' in self,iterable:'Symbol' in self&&'iterator' in Symbol,blob:'FileReader' in self&&'Blob' in self&&(function(){try{new Blob();return!0}catch(e){return!1}})(),formData:'FormData' in self,arrayBuffer:'ArrayBuffer' in self};function isDataView(obj){return obj&&DataView.prototype.isPrototypeOf(obj)}
if(support.arrayBuffer){var viewClasses=['[object Int8Array]','[object Uint8Array]','[object Uint8ClampedArray]','[object Int16Array]','[object Uint16Array]','[object Int32Array]','[object Uint32Array]','[object Float32Array]','[object Float64Array]'];var isArrayBufferView=ArrayBuffer.isView||function(obj){return obj&&viewClasses.indexOf(Object.prototype.toString.call(obj))>-1}}
function normalizeName(name){if(typeof name!=='string'){name=String(name)}
if(/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)){throw new TypeError('Invalid character in header field name')}
return name.toLowerCase()}
function normalizeValue(value){if(typeof value!=='string'){value=String(value)}
return value}
function iteratorFor(items){var iterator={next:function(){var value=items.shift();return{done:value===undefined,value:value}}};if(support.iterable){iterator[Symbol.iterator]=function(){return iterator}}
return iterator}
function Headers(headers){this.map={};if(headers instanceof Headers){headers.forEach(function(value,name){this.append(name,value)},this)}else if(Array.isArray(headers)){headers.forEach(function(header){this.append(header[0],header[1])},this)}else if(headers){Object.getOwnPropertyNames(headers).forEach(function(name){this.append(name,headers[name])},this)}}
Headers.prototype.append=function(name,value){name=normalizeName(name);value=normalizeValue(value);var oldValue=this.map[name];this.map[name]=oldValue?oldValue+', '+value:value};Headers.prototype['delete']=function(name){delete this.map[normalizeName(name)]};Headers.prototype.get=function(name){name=normalizeName(name);return this.has(name)?this.map[name]:null};Headers.prototype.has=function(name){return this.map.hasOwnProperty(normalizeName(name))};Headers.prototype.set=function(name,value){this.map[normalizeName(name)]=normalizeValue(value)};Headers.prototype.forEach=function(callback,thisArg){for(var name in this.map){if(this.map.hasOwnProperty(name)){callback.call(thisArg,this.map[name],name,this)}}};Headers.prototype.keys=function(){var items=[];this.forEach(function(value,name){items.push(name)});return iteratorFor(items)};Headers.prototype.values=function(){var items=[];this.forEach(function(value){items.push(value)});return iteratorFor(items)};Headers.prototype.entries=function(){var items=[];this.forEach(function(value,name){items.push([name,value])});return iteratorFor(items)};if(support.iterable){Headers.prototype[Symbol.iterator]=Headers.prototype.entries}
function consumed(body){if(body.bodyUsed){return Promise.reject(new TypeError('Already read'))}
body.bodyUsed=!0}
function fileReaderReady(reader){return new Promise(function(resolve,reject){reader.onload=function(){resolve(reader.result)};reader.onerror=function(){reject(reader.error)}})}
function readBlobAsArrayBuffer(blob){var reader=new FileReader();var promise=fileReaderReady(reader);reader.readAsArrayBuffer(blob);return promise}
function readBlobAsText(blob){var reader=new FileReader();var promise=fileReaderReady(reader);reader.readAsText(blob);return promise}
function readArrayBufferAsText(buf){var view=new Uint8Array(buf);var chars=new Array(view.length);for(var i=0;i<view.length;i++){chars[i]=String.fromCharCode(view[i])}
return chars.join('')}
function bufferClone(buf){if(buf.slice){return buf.slice(0)}else{var view=new Uint8Array(buf.byteLength);view.set(new Uint8Array(buf));return view.buffer}}
function Body(){this.bodyUsed=!1;this._initBody=function(body){this._bodyInit=body;if(!body){this._bodyText=''}else if(typeof body==='string'){this._bodyText=body}else if(support.blob&&Blob.prototype.isPrototypeOf(body)){this._bodyBlob=body}else if(support.formData&&FormData.prototype.isPrototypeOf(body)){this._bodyFormData=body}else if(support.searchParams&&URLSearchParams.prototype.isPrototypeOf(body)){this._bodyText=body.toString()}else if(support.arrayBuffer&&support.blob&&isDataView(body)){this._bodyArrayBuffer=bufferClone(body.buffer);this._bodyInit=new Blob([this._bodyArrayBuffer])}else if(support.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(body)||isArrayBufferView(body))){this._bodyArrayBuffer=bufferClone(body)}else{this._bodyText=body=Object.prototype.toString.call(body)}
if(!this.headers.get('content-type')){if(typeof body==='string'){this.headers.set('content-type','text/plain;charset=UTF-8')}else if(this._bodyBlob&&this._bodyBlob.type){this.headers.set('content-type',this._bodyBlob.type)}else if(support.searchParams&&URLSearchParams.prototype.isPrototypeOf(body)){this.headers.set('content-type','application/x-www-form-urlencoded;charset=UTF-8')}}};if(support.blob){this.blob=function(){var rejected=consumed(this);if(rejected){return rejected}
if(this._bodyBlob){return Promise.resolve(this._bodyBlob)}else if(this._bodyArrayBuffer){return Promise.resolve(new Blob([this._bodyArrayBuffer]))}else if(this._bodyFormData){throw new Error('could not read FormData body as blob')}else{return Promise.resolve(new Blob([this._bodyText]))}};this.arrayBuffer=function(){if(this._bodyArrayBuffer){return consumed(this)||Promise.resolve(this._bodyArrayBuffer)}else{return this.blob().then(readBlobAsArrayBuffer)}}}
this.text=function(){var rejected=consumed(this);if(rejected){return rejected}
if(this._bodyBlob){return readBlobAsText(this._bodyBlob)}else if(this._bodyArrayBuffer){return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))}else if(this._bodyFormData){throw new Error('could not read FormData body as text')}else{return Promise.resolve(this._bodyText)}};if(support.formData){this.formData=function(){return this.text().then(decode)}}
this.json=function(){return this.text().then(JSON.parse)};return this}
var methods=['DELETE','GET','HEAD','OPTIONS','POST','PUT'];function normalizeMethod(method){var upcased=method.toUpperCase();return methods.indexOf(upcased)>-1?upcased:method}
function Request(input,options){options=options||{};var body=options.body;if(input instanceof Request){if(input.bodyUsed){throw new TypeError('Already read')}
this.url=input.url;this.credentials=input.credentials;if(!options.headers){this.headers=new Headers(input.headers)}
this.method=input.method;this.mode=input.mode;this.signal=input.signal;if(!body&&input._bodyInit!=null){body=input._bodyInit;input.bodyUsed=!0}}else{this.url=String(input)}
this.credentials=options.credentials||this.credentials||'same-origin';if(options.headers||!this.headers){this.headers=new Headers(options.headers)}
this.method=normalizeMethod(options.method||this.method||'GET');this.mode=options.mode||this.mode||null;this.signal=options.signal||this.signal;this.referrer=null;if((this.method==='GET'||this.method==='HEAD')&&body){throw new TypeError('Body not allowed for GET or HEAD requests')}
this._initBody(body)}
Request.prototype.clone=function(){return new Request(this,{body:this._bodyInit})};function decode(body){var form=new FormData();body.trim().split('&').forEach(function(bytes){if(bytes){var split=bytes.split('=');var name=split.shift().replace(/\+/g,' ');var value=split.join('=').replace(/\+/g,' ');form.append(decodeURIComponent(name),decodeURIComponent(value))}});return form}
function parseHeaders(rawHeaders){var headers=new Headers();var preProcessedHeaders=rawHeaders.replace(/\r?\n[\t ]+/g,' ');preProcessedHeaders.split(/\r?\n/).forEach(function(line){var parts=line.split(':');var key=parts.shift().trim();if(key){var value=parts.join(':').trim();headers.append(key,value)}});return headers}
Body.call(Request.prototype);function Response(bodyInit,options){if(!options){options={}}
this.type='default';this.status=options.status===undefined?200:options.status;this.ok=this.status>=200&&this.status<300;this.statusText='statusText' in options?options.statusText:'OK';this.headers=new Headers(options.headers);this.url=options.url||'';this._initBody(bodyInit)}
Body.call(Response.prototype);Response.prototype.clone=function(){return new Response(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new Headers(this.headers),url:this.url})};Response.error=function(){var response=new Response(null,{status:0,statusText:''});response.type='error';return response};var redirectStatuses=[301,302,303,307,308];Response.redirect=function(url,status){if(redirectStatuses.indexOf(status)===-1){throw new RangeError('Invalid status code')}
return new Response(null,{status:status,headers:{location:url}})};exports.DOMException=self.DOMException;try{new exports.DOMException()}catch(err){exports.DOMException=function(message,name){this.message=message;this.name=name;var error=Error(message);this.stack=error.stack};exports.DOMException.prototype=Object.create(Error.prototype);exports.DOMException.prototype.constructor=exports.DOMException}
function fetch(input,init){return new Promise(function(resolve,reject){var request=new Request(input,init);if(request.signal&&request.signal.aborted){return reject(new exports.DOMException('Aborted','AbortError'))}
var xhr=new XMLHttpRequest();function abortXhr(){xhr.abort()}
xhr.onload=function(){var options={status:xhr.status,statusText:xhr.statusText,headers:parseHeaders(xhr.getAllResponseHeaders()||'')};options.url='responseURL' in xhr?xhr.responseURL:options.headers.get('X-Request-URL');var body='response' in xhr?xhr.response:xhr.responseText;resolve(new Response(body,options))};xhr.onerror=function(){reject(new TypeError('Network request failed'))};xhr.ontimeout=function(){reject(new TypeError('Network request failed'))};xhr.onabort=function(){reject(new exports.DOMException('Aborted','AbortError'))};xhr.open(request.method,request.url,!0);if(request.credentials==='include'){xhr.withCredentials=!0}else if(request.credentials==='omit'){xhr.withCredentials=!1}
if('responseType' in xhr&&support.blob){xhr.responseType='blob'}
request.headers.forEach(function(value,name){xhr.setRequestHeader(name,value)});if(request.signal){request.signal.addEventListener('abort',abortXhr);xhr.onreadystatechange=function(){if(xhr.readyState===4){request.signal.removeEventListener('abort',abortXhr)}}}
xhr.send(typeof request._bodyInit==='undefined'?null:request._bodyInit)})}
fetch.polyfill=!0;if(!self.fetch){self.fetch=fetch;self.Headers=Headers;self.Request=Request;self.Response=Response}
exports.Headers=Headers;exports.Request=Request;exports.Response=Response;exports.fetch=fetch;Object.defineProperty(exports,'__esModule',{value:!0})})))
