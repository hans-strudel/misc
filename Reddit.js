// ==UserScript==
// @name        Reddit
// @namespace   redd
// @description Modify Reddit
// @include     https://www.reddit.com*
// @include     http://www.reddit.com*
// @version     1
// @grant       none
// ==/UserScript==
function init() {
  console.log('Modifying Reddit');
  var rmElems = [
    'sr-header-area',
    'header-bottom-right',
    'login_login-main'
  ];
  for (var i = 0; i < rmElems.length; i++) {
    //document.getElementById('sr-header-area').parentNode.removeChild(document.getElementById('sr-header-area'));
    document.getElementById(rmElems[i]).parentNode.removeChild(document.getElementById(rmElems[i]));
    console.log(rmElems[i] + ' removed');
  }
  var votes = document.getElementsByClassName('midcol');
  console.log(votes);
  for (var i = 0; i < votes.length; i++) {
    votes[i].parentNode.removeChild(votes[i]);
    console.log(i);
  }
}
window.addEventListener('load', init, false);
