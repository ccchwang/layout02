var MenuItem = function(el, index, items, closeBtn, body, open) {
  this.el = el;
  this.tag = el.dataset.tag;
  this.closeBtn = closeBtn;
  this.body = body;
  this.setVars(index, items);
  this.bindEvents(open);
}

MenuItem.prototype = {
  setVars: function(index, items) {
    this.aboveNeighbors = items.slice(0, index);
    this.belowNeighbors = items.slice(index + 1);
    this.content        = document.getElementsByClassName("-" + this.tag)[0];

    let buttons  = this.content.getElementsByClassName('move-btn')
    this.nextBtn = buttons[1];
    this.prevBtn = buttons[0];
  },

  bindEvents: function(open) {
    this.el.addEventListener('click', open.bind(this));
  }
};

module.exports = MenuItem;
