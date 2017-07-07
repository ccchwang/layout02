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
var FloatingHeader = function(el, itemsMap) {
  this.el = el;
  this.init();
}

FloatingHeader.prototype = {
  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    console.log(this.el)
   // this.el.addEventListener('click', this.close.bind(this));
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

module.exports = FloatingHeader;

},{}],3:[function(require,module,exports){
const MenuItem = require('./menu-item');
const CloseButton = require('./close-button');
const inViewport = require('in-viewport');
const FloatingHeader = require('./floating-header');

//HELPER FUNCTIONS
function selectElements (selector) {
  let nodes = document.querySelectorAll(selector)
  return [].slice.call(nodes)
}

//CACHED VARIABLES
const closeBtn =     document.getElementsByClassName('close-btn')[0];
const workContent = document.getElementsByClassName('work__content')[0];
const menuItems =    selectElements('.menu__item');
const itemsMap =     [];


// //***FOR SCROLLING HEADERS - add debounce, get rid of anon fn */
// window.addEventListener('scroll', function() {

// })

//
menuItems.forEach((item, i) => {
  itemsMap.push(new MenuItem(item, i, menuItems, closeBtn));
});

var top = 30;

window.addEventListener('scroll', function() {
  const objectTop = workContent.offsetTop;
  const windowTop = window.scrollY;
  const header = document.getElementsByClassName('work__lead')[0];



  if (windowTop > objectTop) {
    header.classList.add('floating');
    header.style.top = `${top}%`;

    top += 1;

    console.log(top)
  }
  else {
    header.classList.remove('floating');
  }



})

//create close button
new CloseButton(closeBtn, itemsMap);


},{"./close-button":1,"./floating-header":2,"./menu-item":4,"in-viewport":5}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
(function (global){
module.exports = inViewport;

var instances = [];
var supportsMutationObserver = typeof global.MutationObserver === 'function';

function inViewport(elt, params, cb) {
  var opts = {
    container: global.document.body,
    offset: 0,
    debounce: 15,
    failsafe: true
  };

  if (params === undefined || typeof params === 'function') {
    cb = params;
    params = {};
  }

  var container = opts.container = params.container || opts.container;
  var offset = opts.offset = params.offset || opts.offset;
  var debounceValue = opts.debounce = params.debounce || opts.debounce;
  var failsafe = opts.failsafe = params.failsafe || opts.failsafe;

  for (var i = 0; i < instances.length; i++) {
    if (
      instances[i].container === container &&
      instances[i]._debounce === debounceValue &&
      instances[i]._failsafe === failsafe
    ) {
      return instances[i].isInViewport(elt, offset, cb);
    }
  }

  return instances[
    instances.push(createInViewport(container, debounceValue, failsafe)) - 1
  ].isInViewport(elt, offset, cb);
}

function addEvent(el, type, fn) {
  if (el.attachEvent) {
    el.attachEvent('on' + type, fn);
  } else {
    el.addEventListener(type, fn, false);
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);

    function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }
  };
}

// https://github.com/jquery/sizzle/blob/3136f48b90e3edc84cbaaa6f6f7734ef03775a07/sizzle.js#L708
var contains = function() {
  if (!global.document) {
    return true;
  }
  return global.document.documentElement.compareDocumentPosition ?
    function (a, b) {
      return !!(a.compareDocumentPosition(b) & 16);
    } :
    global.document.documentElement.contains ?
      function (a, b) {
        return a !== b && ( a.contains ? a.contains(b) : false );
      } :
      function (a, b) {
        while (b = b.parentNode) {
          if (b === a) {
            return true;
          }
        }
        return false;
      };
}

function createInViewport(container, debounceValue, failsafe) {
  var watches = createWatches();

  var scrollContainer = container === global.document.body ? global : container;
  var debouncedCheck = debounce(watches.checkAll(watchInViewport), debounceValue);

  addEvent(scrollContainer, 'scroll', debouncedCheck);

  if (scrollContainer === global) {
    addEvent(global, 'resize', debouncedCheck);
  }

  if (supportsMutationObserver) {
    observeDOM(watches, container, debouncedCheck);
  }

  // failsafe check, every 200ms we check for visible images
  // usecase: a hidden parent containing eleements
  // when the parent becomes visible, we have no event that the children
  // became visible
  if (failsafe) {
    setInterval(debouncedCheck, 150);
  }

  function isInViewport(elt, offset, cb) {
    if (!cb) {
      return isVisible(elt, offset);
    }

    var remote = createRemote(elt, offset, cb);
    remote.watch();
    return remote;
  }

  function createRemote(elt, offset, cb) {
    function watch() {
      watches.add(elt, offset, cb);
    }

    function dispose() {
      watches.remove(elt);
    }

    return {
      watch: watch,
      dispose: dispose
    };
  }

  function watchInViewport(elt, offset, cb) {
    if (isVisible(elt, offset)) {
      watches.remove(elt);
      cb(elt);
    }
  }

  function isVisible(elt, offset) {
    if (!elt) {
      return false;
    }

    if (!contains(global.document.documentElement, elt) || !contains(global.document.documentElement, container)) {
      return false;
    }

    // Check if the element is visible
    // https://github.com/jquery/jquery/blob/740e190223d19a114d5373758127285d14d6b71e/src/css/hiddenVisibleSelectors.js
    if (!elt.offsetWidth || !elt.offsetHeight) {
      return false;
    }

    var eltRect = elt.getBoundingClientRect();
    var viewport = {};

    if (container === global.document.body) {
      viewport = {
        top: -offset,
        left: -offset,
        right: global.document.documentElement.clientWidth + offset,
        bottom: global.document.documentElement.clientHeight + offset
      };
    } else {
      var containerRect = container.getBoundingClientRect();
      viewport = {
        top: containerRect.top - offset,
        left: containerRect.left - offset,
        right: containerRect.right + offset,
        bottom: containerRect.bottom + offset
      };
    }

    // The element must overlap with the visible part of the viewport
    var visible =
      (
        eltRect.right >= viewport.left &&
        eltRect.left <= viewport.right &&
        eltRect.bottom >= viewport.top &&
        eltRect.top <= viewport.bottom
      );

    return visible;
  }

  return {
    container: container,
    isInViewport: isInViewport,
    _debounce: debounceValue,
    _failsafe: failsafe
  };
}

function createWatches() {
  var watches = [];

  function add(elt, offset, cb) {
    if (!isWatched(elt)) {
      watches.push([elt, offset, cb]);
    }
  }

  function remove(elt) {
    var pos = indexOf(elt);
    if (pos !== -1) {
      watches.splice(pos, 1);
    }
  }

  function indexOf(elt) {
    for (var i = watches.length - 1; i >= 0; i--) {
      if (watches[i][0] === elt) {
        return i;
      }
    }
    return -1;
  }

  function isWatched(elt) {
    return indexOf(elt) !== -1;
  }

  function checkAll(cb) {
    return function () {
      for (var i = watches.length - 1; i >= 0; i--) {
        cb.apply(this, watches[i]);
      }
    };
  }

  return {
    add: add,
    remove: remove,
    isWatched: isWatched,
    checkAll: checkAll
  };
}

function observeDOM(watches, container, cb) {
  var observer = new MutationObserver(watch);
  var filter = Array.prototype.filter;
  var concat = Array.prototype.concat;

  observer.observe(container, {
    childList: true,
    subtree: true,
    // changes like style/width/height/display will be catched
    attributes: true
  });

  function watch(mutations) {
    // some new DOM nodes where previously watched
    // we should check their positions
    if (mutations.some(knownNodes) === true) {
      setTimeout(cb, 0);
    }
  }

  function knownNodes(mutation) {
    var nodes = concat.call([],
      Array.prototype.slice.call(mutation.addedNodes),
      mutation.target
    );
    return filter.call(nodes, watches.isWatched).length > 0;
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[3]);
