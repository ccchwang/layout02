var Modules = function(el) {
  this.el = el;
  this.init();
};

Modules.prototype = {
  MenuItem: require('./menu-item'),
  CloseButton: require('./close-button'),
  FloatingHeaders: require('./floating-headers'),
  MoveButtons: require('./move-buttons'),

  init: function() {
    var workLeads = this.selectElements('[data-module=FloatingHeader]');
    var closeBtn = this.selectElements('.close-btn');
    var menuItems = this.selectElements('.menu__item');
    var body = this.selectElements('body');
    var itemsMap = [];

    //menu items
    menuItems.forEach((item, i) => {
      itemsMap.push(new this.MenuItem(item, i, menuItems, closeBtn, body));
    });

    //next buttons
    itemsMap.forEach((itemMap, i) => new this.MoveButtons(itemMap, i, itemsMap));

    //close button
    new this.CloseButton(closeBtn, itemsMap, body);

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
