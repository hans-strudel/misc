// ==UserScript==
// @name        commentlink
// @namespace   cmlink
// @description Shows link to previous comment
// @include     https://www.reddit.com/r/*/comments*
// @version     1
// @grant       none
// ==/UserScript==
function init() {
  comments = document.getElementsByClassName(' entry ');
  BGcolor = '#EBEBEB';
  border = '2px solid #A4A4A4';
  for (var i = 0; i < comments.length; i++) {
    comments[i].onmouseover = function (e) {
      if (e.shiftKey) {
        prvComm = this.parentNode.parentNode.parentNode.parentNode.getElementsByClassName(' entry ') [0];
        commentData = prvComm.innerHTML;
        floatElem = document.createElement('div');
        floatElem.id = 'COMMENTLINKDIV';
        floatElem.style.position = 'absolute';
        floatElem.style.backgroundColor = BGcolor;
        floatElem.style.border = border;
        floatElem.style.zIndex = 99999;
        floatElem.innerHTML = commentData;
        prvComm.appendChild(floatElem);
        floatElem.style.top = this.offsetTop - floatElem.getBoundingClientRect().height + 'px';
      }
    }
    comments[i].onmouseout = function (e) {
      if (typeof prvComm != 'undefined') {
        prvComm.removeChild(floatElem)
      }
    }
  }
}
window.addEventListener('load', init, false);