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
    var simulateClick = function (elem) {
    // Create our event (with options)
    var evt = new MouseEvent('click', {
        bubbles: false,
        cancelable: true,
        view: window
    });
    // If cancelled, don't dispatch our event
    var canceled = !elem.dispatchEvent(evt);
};

    simulateClick(this.closeBtn)
    setTimeout(this.open.bind(neighbor), 650);
  },

  open: function() {
    let top = this.el.offsetTop * -1;

    this.el.style.top = `${top}px`;
    this.el.className += ' opened';

    //mark that section is opened
    this.body.className += ' active';

    //move neighbors
    setTimeout(function(){
       this.aboveNeighbors.forEach(i => i.style.top = `${top}px`);
    }.bind(this), 200)

    //bring up content into view
    this.content.className += ' show';
  }
};

module.exports = MoveButtons;
