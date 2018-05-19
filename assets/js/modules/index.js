var Modules = function(el) {
  this.el = el;
  this.init();
};

Modules.prototype = {
  MenuItem: require('./menu-item'),
  CloseButton: require('./close-button'),
  ContentSections: require('./content-sections'),
  MoveButtons: require('./move-buttons'),

  init: function() {
    var contentSections = this.selectElements('.work');
    var menuItems       = this.selectElements('.menu__item');
    this.closeBtn       = this.selectElements('.close-btn');
    this.body           = this.selectElements('body');
    this.itemsMap       = this.setItemsMap(menuItems);

    this.createMoveButtons();
    this.createCloseButton();
    this.createFloatingHeaders(contentSections);
  },

  selectElements: function(selector) {
    let nodes = document.querySelectorAll(selector);
    let arrayifiedNodes = [].slice.call(nodes);

    return arrayifiedNodes.length === 1 ? arrayifiedNodes[0] : arrayifiedNodes;
  },

  setItemsMap: function(menuItems) {
    let map = [];

    menuItems.forEach((item, i) => {
      map.push(new this.MenuItem(item, i, menuItems, this.closeBtn, this.body, this.open));
    });

    return map;
  },

  createMoveButtons: function() {
    this.itemsMap.forEach((itemMap, i) =>
      new this.MoveButtons(itemMap, i, this.itemsMap, this.open)
    );
  },

  createCloseButton: function() {
    new this.CloseButton(this.closeBtn, this.itemsMap, this.body);
  },

  createFloatingHeaders: function(contentSections) {
    new this.ContentSections(contentSections);
  },

  open: function() {
    //scroll to top of window
    window.scrollTo(0, 0);

    this.el.style.transform = `translateY(${this.el.offsetTop * -1}px)`;
    this.el.className += ' opened';

    //mark that section is opened
    this.body.className += ' active';

    //move neighbors
    this.aboveNeighbors.forEach(i => i.className += " move-up");

    //bring up content into view
    this.content.className += ' show';
  }
};

module.exports = Modules;
