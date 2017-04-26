// Based on https://github.com/toddself/genius-blocker/ 
// a bit on https://github.com/marlabrizel/genius-blocker/
/* Please see http://samiam.org/blog/2014-07-04.html#WhySideWikisucked and
https://ellacydawson.wordpress.com/2016/03/25/how-news-genius-silences-writers/
Please also see http://archive.is/wTTEF
Licenses are at the bottom 
*/

var annotated = window.location.href.indexOf("genius.it/");
if (annotated !== -1) {
       location.href = window.location.href.replace("genius.it/", "")
}
var vh = ('a2 = window.loc' + 'ation.href.indexOf("via.hypothes.is/");' +
'if (a2 !== -1) {' +
'loca' + 'tion.href = window.location.href.replace("via.hypothes.is/", "")}');
eval(vh);

// Ancient IE check
var msie = navigator.userAgent.indexOf("MSIE");
var ie = "";
iev = 83;
if(msie && msie > 0) {
	ie=navigator.userAgent.substr(msie + 5);
	var iea = ie.indexOf(";");
	ie = ie.substr(0,iea);	
	iev = parseInt(ie);
}	
	
if(iev > 8) {
  // prevent the bookmarklet
  var setAttribute = window.HTMLElement.prototype.setAttribute;
  window.HTMLElement.prototype.setAttribute = function (attr, val) {
    if (attr === 'src' && /genius\.com/.test(val)) {
      return console.log('x');
    } else if(attr === 'src' && /hypothes\.is/.test(val)){
      return console.log('x');
    } else {
      setAttribute.call(this, attr, val);
    }
  }

  if(iev > 10) {
  // prevent the extension
  var observer = new window.MutationObserver(function (mutations) {
    for (var i = 0, len = mutations.length; i < len; i++) {
      var mutation = mutations[i];
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        for (var j = 0, jlen = mutation.addedNodes.length; j < jlen; j++) {
          var node = mutation.addedNodes[j];
          if (/genius/i.test(node.nodeName) || 
	      /annotator/i.test(node.className)) {
            node.remove();
          }
        }
      }
    }
  })

  observer.observe(document.body, {childList: true});
  }

}

/*

toddself/genius-blocker license:

WTFPL (c) 2016 Todd Kennedy

do What The Fuck you want to Public License

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.

Ok, the purpose of this license is simple and you just

DO WHAT THE FUCK YOU WANT TO.

----

marlabrizel/genius-blocker license: 

The MIT License (MIT)

Copyright (c) 2016 Marla Brizel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
