var CloseButton = function(el, itemsMap) {
  this.el = el;
  this.itemsMap = itemsMap;
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
    openedSection.classList.remove('opened')

    //hide close button
    this.el.classList.remove("show");

    //move neighbors
    itemMap.aboveNeighbors.forEach(i => i.classList.remove("move-up"))
    itemMap.belowNeighbors.forEach(i => i.classList.remove("move-down"))

    //hide content
    itemMap.content.classList.remove('show');

    //scroll to top of window
    window.scrollTo(0, 0);

    // //scroll to top of window
    // openedSection.scrollIntoView(true);
  }
};

module.exports = CloseButton;