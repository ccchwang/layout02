var MoveButtons = function(itemMap, i, itemsMap) {
  this.nextBtn = itemMap.nextBtn;
  this.prevBtn = itemMap.prevBtn;
  this.closeBtn = itemMap.closeBtn;
  this.setVars(i, itemsMap);
  this.bindEvents();
}

MoveButtons.prototype = {
  setVars: function(i, itemsMap) {
    let length = itemsMap.length;

    this.nextNeighbor = i + 1 === length ? itemsMap[0] : itemsMap[i + 1];
    this.prevNeighbor = i - 1 === -1 ? itemsMap[length - 1] : itemsMap[i-1];
  },

  bindEvents: function() {
    this.nextBtn.addEventListener('click', this.openNeighbor.bind(this, this.nextNeighbor));
    this.prevBtn.addEventListener('click', this.openNeighbor.bind(this, this.prevNeighbor));
  },

  openNeighbor: function(neighbor) {
    this.closeBtn.click();
    setTimeout(this.open.bind(neighbor), 500);
  },

  open: function() {
    this.el.style.top = `${(this.el.offsetTop * -1) - 50}px`;
    this.el.className += ' opened';

    //mark that section is opened
    this.body.className += ' active';

    //move neighbors
    this.aboveNeighbors.forEach(i => i.className += " move-up");
    this.belowNeighbors.forEach(i => i.className += " move-down");

    //bring up content into view
    this.content.className += ' show';
  }
};

module.exports = MoveButtons;
