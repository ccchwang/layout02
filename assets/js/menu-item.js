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
