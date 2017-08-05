var MoveButtons = function(itemMap, i, itemsMap, open) {
  this.nextBtn = itemMap.nextBtn;
  this.prevBtn = itemMap.prevBtn;
  this.closeBtn = itemMap.closeBtn;
  this.setVars(i, itemsMap);
  this.bindEvents(open);
}

MoveButtons.prototype = {
  setVars: function(i, itemsMap) {
    let length = itemsMap.length;

    this.nextNeighbor = i + 1 === length ? itemsMap[0] : itemsMap[i + 1];
    this.prevNeighbor = i - 1 === -1 ? itemsMap[length - 1] : itemsMap[i-1];
  },

  bindEvents: function(open) {
    this.nextBtn.addEventListener('click', this.openNeighbor.bind(this, this.nextNeighbor, open));
    this.prevBtn.addEventListener('click', this.openNeighbor.bind(this, this.prevNeighbor, open));
  },

  openNeighbor: function(neighbor, open) {
    this.simulateClick(this.closeBtn);
    setTimeout(open.bind(neighbor), 650);
  },

  simulateClick: function(elem) {
    // Create our event (with options)
    var evt = new MouseEvent('click', {
        bubbles: false,
        cancelable: true,
        view: window
    });
    // If cancelled, don't dispatch our event
    var canceled = !elem.dispatchEvent(evt);
  }
};

module.exports = MoveButtons;
