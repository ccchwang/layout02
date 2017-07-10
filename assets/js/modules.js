var Modules = function(el) {
  this.el = el;
  this.init();
};

Modules.prototype = {
  MenuItem: require('./modules/menu-item'),
  CloseButton: require('./modules/close-button'),
  FloatingHeaders: require('./modules/floating-headers'),

  init: function() {
    this.setVars();

    //menu items
    this.menuItems.forEach((item, i) => {
      this.itemsMap.push(new this.MenuItem(item, i, this.menuItems, this.closeBtn));
    });

    //close button
    new this.CloseButton(this.closeBtn, this.itemsMap);

    //floating headers
    new this.FloatingHeaders(this.headers)

  },

  setVars: function() {
    this.headers = this.selectElements('.side-title');
    this.closeBtn = this.selectElements('.close-btn');
    this.menuItems = this.selectElements('.menu__item');
    this.itemsMap = [];
  },

  selectElements: function(selector) {
    let nodes = document.querySelectorAll(selector);
    let arrayifiedNodes = [].slice.call(nodes);

    return arrayifiedNodes.length === 1 ? arrayifiedNodes[0] : arrayifiedNodes;
  }
};

module.exports = Modules;
