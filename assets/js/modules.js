var Modules = function(el) {
  this.el = el;
  this.init();
};

Modules.prototype = {
  MenuItem: require('./modules/menu-item'),
  CloseButton: require('./modules/close-button'),
  FloatingHeaders: require('./modules/floating-headers'),

  init: function() {
    var headers = this.selectElements('.side-title');
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
    new this.FloatingHeaders(headers);

  },

  selectElements: function(selector) {
    let nodes = document.querySelectorAll(selector);
    let arrayifiedNodes = [].slice.call(nodes);

    return arrayifiedNodes.length === 1 ? arrayifiedNodes[0] : arrayifiedNodes;
  }
};

module.exports = Modules;
