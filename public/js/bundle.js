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
	  FloatingHeaders: __webpack_require__(4),
	  MoveButtons: __webpack_require__(5),

	  init: function init() {
	    var _this = this;

	    var workLeads = this.selectElements('[data-module=FloatingHeader]');
	    var closeBtn = this.selectElements('.close-btn');
	    var menuItems = this.selectElements('.menu__item');
	    var body = this.selectElements('body');
	    var itemsMap = [];

	    //menu items
	    menuItems.forEach(function (item, i) {
	      itemsMap.push(new _this.MenuItem(item, i, menuItems, closeBtn, body));
	    });

	    //next buttons
	    itemsMap.forEach(function (itemMap, i) {
	      return new _this.MoveButtons(itemMap, i, itemsMap);
	    });

	    //close button
	    new this.CloseButton(closeBtn, itemsMap, body);

	    //floating headers
	    new this.FloatingHeaders(workLeads);
	  },

	  selectElements: function selectElements(selector) {
	    var nodes = document.querySelectorAll(selector);
	    var arrayifiedNodes = [].slice.call(nodes);

	    return arrayifiedNodes.length === 1 ? arrayifiedNodes[0] : arrayifiedNodes;
	  }
	};

	module.exports = Modules;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	var MenuItem = function MenuItem(el, index, items, closeBtn, body) {
	  this.el = el;
	  this.tag = el.dataset.tag;
	  this.closeBtn = closeBtn;
	  this.body = body;
	  this.init(index, items);
	};

	MenuItem.prototype = {
	  init: function init(index, items) {
	    this.setVars(index, items);
	    this.bindEvents();
	  },

	  setVars: function setVars(index, items) {
	    this.aboveNeighbors = items.slice(0, index);
	    this.belowNeighbors = items.slice(index + 1);
	    this.content = document.getElementsByClassName("-" + this.tag)[0];

	    var buttons = this.content.querySelectorAll('.move-btn');
	    this.nextBtn = buttons[1];
	    this.prevBtn = buttons[0];
	  },

	  bindEvents: function bindEvents() {
	    this.el.addEventListener('click', this.open.bind(this));
	  },

	  open: function open() {
	    this.el.style.top = this.el.offsetTop * -1 - 50 + 'px';
	    this.el.className += ' opened';

	    //mark that section is opened
	    this.body.className += ' active';

	    //move neighbors
	    this.aboveNeighbors.forEach(function (i) {
	      return i.className += " move-up";
	    });
	    this.belowNeighbors.forEach(function (i) {
	      return i.className += " move-down";
	    });

	    //bring up content into view
	    this.content.className += ' show';
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
	      return i.classList.remove("move-up");
	    });
	    itemMap.belowNeighbors.forEach(function (i) {
	      return i.classList.remove("move-down");
	    });

	    //hide content
	    itemMap.content.classList.remove('show');

	    //scroll to top of window
	    window.scrollTo(0, 0);

	    // //scroll to top of window
	    // openedSection.scrollIntoView(true);
	  }
	};

	module.exports = CloseButton;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	var FloatingHeaders = function FloatingHeaders(workLeads) {
	  this.workLeads = workLeads;
	  this.map = {};
	  this.windowHeight = window.innerHeight;
	  this.init();
	};

	FloatingHeaders.prototype = {
	  init: function init() {
	    this.setMap();
	    this.bindEvents();
	  },

	  setMap: function setMap() {
	    var _this = this;

	    this.workLeads.forEach(function (lead, i) {
	      var header = lead.querySelector('.side-title');
	      var content = lead.nextElementSibling;

	      if (content) {
	        _this.map[i] = {
	          header: header,
	          content: content,
	          leadHeight: lead.offsetHeight,
	          frozenTop: 0,
	          contentHeight: 0,
	          contentTop: 0,
	          contentBottom: 0
	        };
	      }
	    });
	  },

	  bindEvents: function bindEvents() {
	    window.addEventListener('scroll', this.animateHeaders.bind(this));
	  },

	  animateHeaders: function animateHeaders() {
	    var windowTop = window.scrollY;
	    var windowBottom = windowTop + this.windowHeight;

	    for (var lead in this.map) {
	      //cache section
	      var section = this.map[lead];

	      //set height of content
	      if (!section.contentHeight) {
	        this.setSectionDetails(section);
	      }

	      //calculate progress from beginning to end of content
	      var progressPercent = this.calculateProgress(windowTop, section);

	      //if user has left section from bottom
	      if (windowBottom > section.contentBottom) {
	        if (!section.frozenTop) {
	          section.frozenTop = this.calculateFrozenTop(progressPercent, section);
	        }
	        section.header.classList.add('-frozen');
	        section.header.style.top = section.frozenTop + 'px';
	      }

	      //if user has entered section
	      else if (windowTop > section.contentTop) {
	          section.header.style.top = progressPercent + '%';
	          section.header.classList.remove('-frozen');
	          section.header.classList.add('-floating');
	        }

	        //if user has left section from top
	        else {
	            section.header.classList.remove('-floating');
	          }
	    }
	  },

	  setSectionDetails: function setSectionDetails(section) {
	    section.contentHeight = section.content.offsetHeight;
	    section.contentTop = section.content.offsetTop;
	    section.contentBottom = section.contentTop + section.contentHeight;
	  },

	  calculateProgress: function calculateProgress(windowTop, section) {
	    //get pure scroll by subtracting section's offsetTop from window's scrollY
	    var scrollY = windowTop - section.contentTop + section.leadHeight;
	    var progressPercent = scrollY / section.contentHeight * 80; //scale of 0-80%

	    return progressPercent;
	  },

	  calculateFrozenTop: function calculateFrozenTop(progressPercent, section) {
	    var progressDecimal = progressPercent / 100;

	    var progressToPixels = progressDecimal * this.windowHeight;
	    var pixelsLeftToBottom = this.windowHeight - progressToPixels;

	    return section.contentBottom - pixelsLeftToBottom;
	  }

	};

	module.exports = FloatingHeaders;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	var MoveButtons = function MoveButtons(itemMap, i, itemsMap) {
	  this.nextBtn = itemMap.nextBtn;
	  this.prevBtn = itemMap.prevBtn;
	  this.closeBtn = itemMap.closeBtn;
	  this.setVars(i, itemsMap);
	  this.bindEvents();
	};

	MoveButtons.prototype = {
	  setVars: function setVars(i, itemsMap) {
	    var length = itemsMap.length;

	    this.nextNeighbor = i + 1 === length ? itemsMap[0] : itemsMap[i + 1];
	    this.prevNeighbor = i - 1 === -1 ? itemsMap[length - 1] : itemsMap[i - 1];
	  },

	  bindEvents: function bindEvents() {
	    this.nextBtn.addEventListener('click', this.openNeighbor.bind(this, this.nextNeighbor));
	    this.prevBtn.addEventListener('click', this.openNeighbor.bind(this, this.prevNeighbor));
	  },

	  openNeighbor: function openNeighbor(neighbor) {
	    this.closeBtn.click();
	    setTimeout(this.open.bind(neighbor), 500);
	  },

	  open: function open() {
	    this.el.style.top = this.el.offsetTop * -1 - 50 + 'px';
	    this.el.className += ' opened';

	    //mark that section is opened
	    this.body.className += ' active';

	    //move neighbors
	    this.aboveNeighbors.forEach(function (i) {
	      return i.className += " move-up";
	    });
	    this.belowNeighbors.forEach(function (i) {
	      return i.className += " move-down";
	    });

	    //bring up content into view
	    this.content.className += ' show';
	  }
	};

	module.exports = MoveButtons;

/***/ })
/******/ ]);