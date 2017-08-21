/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Modules = __webpack_require__(1);

	new Modules(document);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Modules = function Modules(el) {
	  this.el = el;
	  this.init();
	};

	Modules.prototype = {
	  MenuItem: __webpack_require__(2),
	  CloseButton: __webpack_require__(3),
	  ContentSections: __webpack_require__(4),
	  MoveButtons: __webpack_require__(5),

	  init: function init() {
	    var _this = this;

	    var contentSections = this.selectElements('.work');
	    var closeBtn = this.selectElements('.close-btn');
	    var menuItems = this.selectElements('.menu__item');
	    var body = this.selectElements('body');
	    var itemsMap = [];

	    //menu items
	    menuItems.forEach(function (item, i) {
	      itemsMap.push(new _this.MenuItem(item, i, menuItems, closeBtn, body, _this.open));
	    });

	    //next buttons
	    itemsMap.forEach(function (itemMap, i) {
	      return new _this.MoveButtons(itemMap, i, itemsMap, _this.open);
	    });

	    //close button
	    new this.CloseButton(closeBtn, itemsMap, body);

	    //floating headers
	    new this.ContentSections(contentSections);
	  },

	  selectElements: function selectElements(selector) {
	    var nodes = document.querySelectorAll(selector);
	    var arrayifiedNodes = [].slice.call(nodes);

	    return arrayifiedNodes.length === 1 ? arrayifiedNodes[0] : arrayifiedNodes;
	  },

	  open: function open() {
	    //scroll to top of window
	    window.scrollTo(0, 0);

	    this.el.style.top = this.el.offsetTop * -1 + 'px';
	    this.el.className += ' opened';

	    //mark that section is opened
	    this.body.className += ' active';

	    //move neighbors
	    this.aboveNeighbors.forEach(function (i) {
	      return i.className += " move-up";
	    });

	    //bring up content into view
	    this.content.className += ' show';
	  }
	};

	module.exports = Modules;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	var MenuItem = function MenuItem(el, index, items, closeBtn, body, open) {
	  this.el = el;
	  this.tag = el.dataset.tag;
	  this.closeBtn = closeBtn;
	  this.body = body;
	  this.setVars(index, items);
	  this.bindEvents(open);
	};

	MenuItem.prototype = {

	  setVars: function setVars(index, items) {
	    this.aboveNeighbors = items.slice(0, index);
	    this.belowNeighbors = items.slice(index + 1);
	    this.content = document.getElementsByClassName("-" + this.tag)[0];

	    var buttons = this.content.querySelectorAll('.move-btn');
	    this.nextBtn = buttons[1];
	    this.prevBtn = buttons[0];
	  },

	  bindEvents: function bindEvents(open) {
	    this.el.addEventListener('click', open.bind(this));
	  }
	};

	module.exports = MenuItem;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	var CloseButton = function CloseButton(el, itemsMap, body) {
	  this.el = el;
	  this.itemsMap = itemsMap;
	  this.body = body;
	  this.init();
	};

	CloseButton.prototype = {
	  init: function init() {
	    this.bindEvents();
	  },

	  bindEvents: function bindEvents() {
	    this.el.addEventListener('click', this.close.bind(this));
	  },

	  close: function close() {
	    var openedSection = document.getElementsByClassName('opened')[0];
	    var tag = openedSection.dataset.tag;

	    //find opened section
	    var itemMap = this.itemsMap.filter(function (item) {
	      return item.tag === tag;
	    })[0];

	    //close opened section
	    openedSection.style.top = 0;
	    openedSection.classList.remove('opened');

	    //hide close button
	    this.body.classList.remove("active");

	    //move neighbors
	    itemMap.aboveNeighbors.forEach(function (i) {
	      return i.classList.remove('move-up');
	    });

	    //hide content
	    itemMap.content.classList.remove('show');
	  }
	};

	module.exports = CloseButton;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	var ContentSections = function ContentSections(sections) {
	  this.sections = sections;
	  this.map = {};
	  this.windowHeight = window.innerHeight;
	  this.lastScrollY = 0;
	  this.windowBottom = 0;
	  this.ticking = false;
	  this.init();
	};

	ContentSections.prototype = {
	  init: function init() {
	    this.setMap();
	    this.bindEvents();
	  },

	  setMap: function setMap() {
	    var _this = this;

	    var headers = [].slice.call(document.getElementsByClassName('side-title'));

	    this.sections.forEach(function (section, i) {
	      _this.map[i] = [];
	      var index = i * 3;
	      var sectionHeaders = headers.slice(index, index + 3);

	      sectionHeaders.forEach(function (header) {
	        _this.map[i].push({
	          header: header,
	          content: header.parentElement.nextElementSibling
	        });
	      });
	    });
	  },

	  bindEvents: function bindEvents() {
	    window.addEventListener('scroll', this.onScroll.bind(this));
	  },

	  onScroll: function onScroll() {
	    this.lastScrollY = window.scrollY;

	    if (!this.ticking) {
	      requestAnimationFrame(this.update.bind(this));
	    }

	    this.ticking = true;
	  },

	  update: function update() {
	    this.ticking = false;
	    this.windowBottom = this.lastScrollY + this.windowHeight;
	    this.sections.forEach(this.animateWhenOpen.bind(this));
	  },

	  animateWhenOpen: function animateWhenOpen(section, j) {
	    var _this2 = this;

	    if (section.classList.value.includes('show')) {
	      var sectionBlurbs = this.map[j];

	      sectionBlurbs.forEach(function (blurb) {
	        if (!blurb.contentHeight) {
	          _this2.setBlurbDetails(blurb);
	        }
	        _this2.animateHeader.call(_this2, blurb);
	      });
	    }
	  },

	  animateHeader: function animateHeader(blurb) {
	    //if user has left blurb from bottom
	    if (this.windowBottom > blurb.contentBottom) {
	      if (!blurb.frozenTop) {
	        var progressPercent = this.calculateProgress(this.lastScrollY, blurb);
	        blurb.frozenTop = this.calculateFrozenTop(progressPercent, blurb);
	      }
	      blurb.header.classList.add('-frozen');
	      blurb.header.style.top = blurb.frozenTop + 'px';
	    }

	    //if user has entered header
	    else if (this.lastScrollY > blurb.contentTop) {
	        blurb.header.style.top = this.calculateProgress(this.lastScrollY, blurb) + '%';
	        blurb.header.classList.remove('-frozen');
	        blurb.header.classList.add('-floating');
	      }

	      //if user has left header from top
	      else {
	          blurb.header.classList.remove('-floating');
	        }
	  },

	  setBlurbDetails: function setBlurbDetails(blurb) {
	    blurb.contentHeight = blurb.content.offsetHeight;
	    blurb.contentTop = blurb.content.offsetTop;
	    blurb.contentBottom = blurb.contentTop + blurb.contentHeight;
	  },

	  calculateProgress: function calculateProgress(lastScrollY, blurb) {
	    //get pure scroll by subtracting blurb's offsetTop from window's scrollY
	    var scrollY = lastScrollY - blurb.contentTop;
	    var progressPercent = scrollY / blurb.contentHeight * 80; //scale of 0-80%

	    return progressPercent + 8.8;
	  },

	  calculateFrozenTop: function calculateFrozenTop(progressPercent, blurb) {
	    var progressDecimal = progressPercent / 100;

	    var progressToPixels = progressDecimal * this.windowHeight;
	    var pixelsLeftToBottom = this.windowHeight - progressToPixels;

	    return blurb.contentBottom - pixelsLeftToBottom;
	  }
	};

	module.exports = ContentSections;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	var MoveButtons = function MoveButtons(itemMap, i, itemsMap, open) {
	  this.nextBtn = itemMap.nextBtn;
	  this.prevBtn = itemMap.prevBtn;
	  this.closeBtn = itemMap.closeBtn;
	  this.setVars(i, itemsMap);
	  this.bindEvents(open);
	};

	MoveButtons.prototype = {
	  setVars: function setVars(i, itemsMap) {
	    var length = itemsMap.length;

	    this.nextNeighbor = i + 1 === length ? itemsMap[0] : itemsMap[i + 1];
	    this.prevNeighbor = i - 1 === -1 ? itemsMap[length - 1] : itemsMap[i - 1];
	  },

	  bindEvents: function bindEvents(open) {
	    this.nextBtn.addEventListener('click', this.openNeighbor.bind(this, this.nextNeighbor, open));
	    this.prevBtn.addEventListener('click', this.openNeighbor.bind(this, this.prevNeighbor, open));
	  },

	  openNeighbor: function openNeighbor(neighbor, open) {
	    this.simulateClick(this.closeBtn);
	    setTimeout(open.bind(neighbor), 650);
	  },

	  simulateClick: function simulateClick(elem) {
	    // Create our event (with options)
	    var evt = new MouseEvent('click', {
	      bubbles: false,
	      cancelable: true,
	      view: window
	    });
	    // If cancelled, don't dispatch our event
	    var canceled = !elem.dispatchEvent(evt);
	  }
	};

	module.exports = MoveButtons;

/***/ })
/******/ ]);