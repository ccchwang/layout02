(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const Modules = require('./modules');

new Modules(document);

},{"./modules":2}],2:[function(require,module,exports){
var Modules = function(el) {
  this.el = el;
  this.init();
};

Modules.prototype = {
  MenuItem: require('./modules/menu-item'),
  CloseButton: require('./modules/close-button'),
  FloatingHeaders: require('./modules/floating-headers'),

  init: function() {
    var workLeads = this.selectElements('[data-module=FloatingHeader]');
    var closeBtn = this.selectElements('.close-btn');
    var menuItems = this.selectElements('.menu__item');
    var itemsMap = [];

    //menu items
    menuItems.forEach((item, i) => {
      itemsMap.push(new this.MenuItem(item, i, menuItems, closeBtn));
    });

    //close button
    new this.CloseButton(closeBtn, itemsMap);

    //floating headers
    new this.FloatingHeaders(workLeads);

  },

  selectElements: function(selector) {
    let nodes = document.querySelectorAll(selector);
    let arrayifiedNodes = [].slice.call(nodes);

    return arrayifiedNodes.length === 1 ? arrayifiedNodes[0] : arrayifiedNodes;
  }
};

module.exports = Modules;

},{"./modules/close-button":3,"./modules/floating-headers":4,"./modules/menu-item":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
var FloatingHeaders = function(workLeads) {
  this.workLeads = workLeads;
  this.map = {};
  this.windowHeight = window.innerHeight;
  this.init();
}

FloatingHeaders.prototype = {
  init: function() {
    this.setMap();
    this.bindEvents();
  },

  setMap: function() {
    this.workLeads.forEach((lead, i) => {
      let header = lead.querySelector('.side-title');
      let content = lead.nextElementSibling;

      if (content) {
        this.map[i] = {
          header,
          content,
          leadHeight: lead.offsetHeight,
          frozenTop: 0,
          contentHeight: 0,
          contentTop: 0,
          contentBottom: 0
        }
      }

    })
  },

  bindEvents: function() {
    window.addEventListener('scroll', this.animateHeaders.bind(this));
  },

  animateHeaders: function() {
    const windowTop = window.scrollY;
    const windowBottom = windowTop + this.windowHeight;


    for (var lead in this.map) {
      //cache section
      let section = this.map[lead];

      //set height of content
      if (!section.contentHeight) {
        this.setSectionDetails(section)
      }

      //calculate progress from beginning to end of content
      let progressPercent = this.calculateProgress(windowTop, section);

      //if user has left section from bottom
      if (windowBottom > section.contentBottom) {
        if (!section.frozenTop) {
          section.frozenTop = this.calculateFrozenTop(progressPercent, section);
        }
        section.header.classList.add('-frozen');
        section.header.style.top = `${section.frozenTop}px`;
      }

      //if user has entered section
      else if (windowTop > section.contentTop) {
        section.header.style.top = `${progressPercent}%`;
        section.header.classList.remove('-frozen')
        section.header.classList.add('-floating');
      }

      //if user has left section from top
      else {
        section.header.classList.remove('-floating')
      }
    }

  },

  setSectionDetails: function(section) {
    section.contentHeight = section.content.offsetHeight;
    section.contentTop = section.content.offsetTop;
    section.contentBottom = section.contentTop + section.contentHeight;
  },

  calculateProgress: function(windowTop, section) {
    //get pure scroll by subtracting section's offsetTop from window's scrollY
    let scrollY = windowTop - section.contentTop + section.leadHeight;
    let progressPercent = (scrollY / section.contentHeight) * 80;  //scale of 0-80%

    return progressPercent;
  },

  calculateFrozenTop: function(progressPercent, section) {
    let progressDecimal = progressPercent / 100;

    let progressToPixels = progressDecimal * this.windowHeight;
    let pixelsLeftToBottom = this.windowHeight - progressToPixels;

    return section.contentBottom - pixelsLeftToBottom;
  }

};

module.exports = FloatingHeaders;

},{}],5:[function(require,module,exports){
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

},{}]},{},[1]);
