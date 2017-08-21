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
    var closeBtn = this.selectElements('.close-btn');
    var menuItems = this.selectElements('.menu__item');
    var body = this.selectElements('body');
    var itemsMap = [];

    //menu items
    menuItems.forEach((item, i) => {
      itemsMap.push(new this.MenuItem(item, i, menuItems, closeBtn, body, this.open));
    });

    //next buttons
    itemsMap.forEach((itemMap, i) => new this.MoveButtons(itemMap, i, itemsMap, this.open));

    //close button
    new this.CloseButton(closeBtn, itemsMap, body);

    //floating headers
    new this.ContentSections(contentSections);

  },

  selectElements: function(selector) {
    let nodes = document.querySelectorAll(selector);
    let arrayifiedNodes = [].slice.call(nodes);

    return arrayifiedNodes.length === 1 ? arrayifiedNodes[0] : arrayifiedNodes;
  },

  open: function() {
    //scroll to top of window
    window.scrollTo(0, 0);

    this.el.style.top = `${this.el.offsetTop * -1}px`;
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
