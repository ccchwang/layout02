var ContentSections = function(sections) {
  this.sections = sections;
  this.map = {};
  this.tags = {};
  this.windowHeight = window.innerHeight;
  this.init();
}

ContentSections.prototype = {
  init: function() {
    this.setMap();
    this.bindEvents();
  },

  setMap: function() {
    let leads = [].slice.call(document.querySelectorAll('[data-module=FloatingHeader]'));

    this.sections.forEach((section, i) => {
      let sectionLeads = leads.slice(i, i + 3);
      let tag = section.classList[1];
      this.tags[tag] = section;
      this.map[tag] = [];

      sectionLeads.forEach(lead => {
        let content = lead.nextElementSibling;

        this.map[tag].push({
          header: lead.querySelector('.side-title'),
          content,
          wrapper: content.querySelector('.wrapper'),
          leadHeight: lead.offsetHeight,
          frozenTop: 0,
          contentHeight: 0,
          contentTop: 0,
          contentBottom: 0
        })
      })
    })
  },

  bindEvents: function() {
    window.addEventListener('scroll', this.animateHeaders.bind(this));
  },

  animateHeaders: function() {
    const windowTop = window.scrollY;
    const windowBottom = windowTop + this.windowHeight;

    for (var tag in this.tags) {
      //cache section
      let section = this.tags[tag];

      if (section.classList.value.includes('show')) {
        let floatingLeads = this.map[tag];

        floatingLeads.forEach(lead => {
          //set height of content
          if (!lead.contentHeight) {
            this.setLeadDetails(lead)
          }

          //calculate progress from beginning to end of content
          let progressPercent = this.calculateProgress(windowTop, lead);

          //if user has left lead from bottom
          if (windowBottom > lead.contentBottom) {
            if (!lead.frozenTop) {
              lead.frozenTop = this.calculateFrozenTop(progressPercent, lead);
            }
            lead.header.classList.add('-frozen');
            lead.header.style.top = `${lead.frozenTop}px`;
          }

          //if user has entered lead
          else if (windowTop > lead.contentTop) {
            lead.header.style.top = `${progressPercent}%`;
            lead.header.classList.remove('-frozen')
            lead.header.classList.add('-floating');
          }

          //if user has left lead from top
          else {
            lead.header.classList.remove('-floating')
          }
        })
      }
    }

  },

  setLeadDetails: function(lead) {
    lead.paddingTop = ((window.getComputedStyle(lead.wrapper).paddingTop.match(/[0-9]+/g)[0]) / this.windowHeight) * 100;
    lead.contentHeight = lead.content.offsetHeight;
    lead.contentTop = lead.content.offsetTop;
    lead.contentBottom = lead.contentTop + lead.contentHeight;
  },

  calculateProgress: function(windowTop, lead) {
    //get pure scroll by subtracting lead's offsetTop from window's scrollY
    let scrollY = windowTop - lead.contentTop;
    let progressPercent = (scrollY / lead.contentHeight) * 80;  //scale of 0-80%

    return progressPercent + lead.paddingTop;
  },

  calculateFrozenTop: function(progressPercent, lead) {
    let progressDecimal = progressPercent / 100;

    let progressToPixels = progressDecimal * this.windowHeight;
    let pixelsLeftToBottom = this.windowHeight - progressToPixels;

    return lead.contentBottom - pixelsLeftToBottom;
  }

};

module.exports = ContentSections;
