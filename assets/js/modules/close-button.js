var CloseButton = function(el, itemsMap, body) {
  this.el = el;
  this.itemsMap = itemsMap;
  this.body = body;
  this.bindEvents();
}

CloseButton.prototype = {
  bindEvents: function() {
    this.el.addEventListener('click', this.onClick.bind(this));
  },

  onClick: function() {
    const openedSection = document.getElementsByClassName('opened')[0];
    const tag = openedSection.dataset.tag;
    const itemMap = this.itemsMap.filter(item => item.tag === tag)[0];

    this.closeOpenSection(openedSection);
    this.hideButton();
    this.moveNeighors(itemMap);
    this.hideContent(itemMap);
  },

  closeOpenSection: function(openedSection) {
    openedSection.style.transform = 'translateY(0px)';
    openedSection.classList.remove('opened');
  },

  hideButton: function() {
    this.body.classList.remove("active");
  },

  moveNeighors: function(itemMap) {
    itemMap.aboveNeighbors.forEach(i => i.classList.remove('move-up'));
  },

  hideContent: function(itemMap) {
    itemMap.content.classList.remove('show');
  }
};

module.exports = CloseButton;
