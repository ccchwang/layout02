var CloseButton = function(el, itemsMap, body) {
  this.el = el;
  this.itemsMap = itemsMap;
  this.body = body;
  this.init();
}

CloseButton.prototype = {
  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    this.el.addEventListener('click', this.close.bind(this));
  },

  close: function() {
    const openedSection = document.getElementsByClassName('opened')[0];
    const tag = openedSection.dataset.tag;

    //find opened section
    const itemMap = this.itemsMap.filter(item => item.tag === tag)[0];

    //close opened section
    openedSection.style.top = 0;
    openedSection.classList.remove('opened');

    //hide close button
    this.body.classList.remove("active");

    //move neighbors
    itemMap.aboveNeighbors.forEach(i => i.classList.remove('move-up'));

    //hide content
    itemMap.content.classList.remove('show');
  }
};

module.exports = CloseButton;
