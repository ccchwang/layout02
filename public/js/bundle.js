(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CloseButton = function(el, itemsMap) {
  this.el = el;
  this.itemsMap = itemsMap;
  this.init();
}

CloseButton.prototype = {
  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    this.el.addEventListener('click', this.close.bind(this));
  },

  close: function() {
    const openedSection = document.getElementsByClassName('opened')[0];
    const tag = openedSection.dataset.tag;

    //find opened section
    const itemMap = this.itemsMap.filter(item => item.tag === tag)[0];

    //close opened section
    openedSection.style.top = 0;
    openedSection.classList.remove('opened')

    //hide close button
    this.el.classList.remove("show");

    //move neighbors
    itemMap.aboveNeighbors.forEach(i => i.classList.remove("move-up"))
    itemMap.belowNeighbors.forEach(i => i.classList.remove("move-down"))

    //hide content
    itemMap.content.classList.remove('show');

    //scroll to top of window
    window.scrollTo(0, 0);

    // //scroll to top of window
    // openedSection.scrollIntoView(true);
  }
};

module.exports = CloseButton;

},{}],2:[function(require,module,exports){
const MenuItem = require('./menu-item');
const CloseButton = require('./close-button');

//HELPER FUNCTIONS
function selectElements (selector) {
  let nodes = document.querySelectorAll(selector)
  return [].slice.call(nodes)
}

//CACHED VARIABLES
const closeBtn = document.getElementsByClassName('close-btn')[0];
const menuItems = selectElements('.menu__item');
const contentCards = selectElements('.content__card');
const itemsMap = [];


// //***FOR SCROLLING HEADERS - add debounce, get rid of anon fn */
// window.addEventListener('scroll', function() {

// })

//
menuItems.forEach((item, i) => {
  itemsMap.push(new MenuItem(item, i, menuItems, closeBtn));
});

//create close button
new CloseButton(closeBtn, itemsMap);


},{"./close-button":1,"./menu-item":3}],3:[function(require,module,exports){
var MenuItem = function(el, index, items, closeBtn) {
  this.el = el;
  this.tag = el.dataset.tag;
  this.closeBtn = closeBtn;
  this.init(index, items);
}

MenuItem.prototype = {
  init: function(index, items) {
    this.setVars(index, items);
    this.bindEvents();
  },

  setVars: function(index, items) {
    this.aboveNeighbors = items.slice(0, index);
    this.belowNeighbors = items.slice(index + 1);
    this.content = document.getElementsByClassName("-" + this.tag)[0];
  },

  bindEvents: function() {
    this.el.addEventListener('click', this.open.bind(this));
  },

  open: function() {
    this.el.style.top = `${(this.el.offsetTop * -1) - 50}px`;
    this.el.className += ' opened';

    //show close button
    this.closeBtn.className += ' show';

    //move neighbors
    this.aboveNeighbors.forEach(i => i.className += " move-up");
    this.belowNeighbors.forEach(i => i.className += " move-down");

    //bring up content into view
    this.content.className += ' show';
  }
};

module.exports = MenuItem;

},{}]},{},[2]);
