var FloatingHeaders = function(workLeads) {
  this.workLeads = workLeads;
  this.map = {};
  this.windowHeight = window.innerHeight;
  this.init();
}

FloatingHeaders.prototype = {
  init: function() {
    this.setMap();
    this.bindEvents();
  },

  setMap: function() {
    this.workLeads.forEach((lead, i) => {
      let header = lead.querySelector('.side-title');
      let content = lead.nextElementSibling;

      if (content) {
        this.map[i] = {
          header,
          content,
          lead,
          leadHeight: lead.offsetHeight,
          frozenTop: 0,
          contentHeight: 0,
          contentTop: 0,
          contentBottom: 0
        }
      }

    })
  },

  bindEvents: function() {
    window.addEventListener('scroll', this.animateHeaders.bind(this));
  },

  animateHeaders: function() {
    const windowTop = window.scrollY;
    const windowBottom = windowTop + this.windowHeight;


    for (var lead in this.map) {
      //if (this.map[lead].content.offsetParent == document.getElementsByClassName('-mekanism')[0]) {
//console.log(this.map[lead].parent)

      //cache section
      let section = this.map[lead];

      if (section.lead.parentElement.classList.value.includes('show')) {
        //set height of content
        if (!section.contentHeight) {
          this.setSectionDetails(section)
        }

        //calculate progress from beginning to end of content
        let progressPercent = this.calculateProgress(windowTop, section);

        //if user has left section from bottom
        if (windowBottom > section.contentBottom) {
          if (!section.frozenTop) {
            section.frozenTop = this.calculateFrozenTop(progressPercent, section);
          }
          section.header.classList.add('-frozen');
          section.header.style.top = `${section.frozenTop}px`;
        }

        //if user has entered section
        else if (windowTop > section.contentTop) {
          section.header.style.top = `${progressPercent}%`;
          section.header.classList.remove('-frozen')
          section.header.classList.add('-floating');
        }

        //if user has left section from top
        else {
          section.header.classList.remove('-floating')
        }
      }
    }

  },

  setSectionDetails: function(section) {
    section.paddingTop = window.getComputedStyle(section.content.querySelector('.wrapper')).paddingTop.match(/[0-9]+/g)[0];
    section.contentHeight = section.content.offsetHeight;
    section.contentTop = section.content.offsetTop;
    section.contentBottom = section.contentTop + section.contentHeight;
  },

  calculateProgress: function(windowTop, section) {
    //get pure scroll by subtracting section's offsetTop from window's scrollY
    let scrollY = windowTop - section.contentTop;
    let progressPercent = (scrollY / section.contentHeight) * 80;  //scale of 0-80%

   let paddingTop = (section.paddingTop / this.windowHeight) * 100;

    return progressPercent + paddingTop;
  },

  calculateFrozenTop: function(progressPercent, section) {
    let progressDecimal = progressPercent / 100;

    let progressToPixels = progressDecimal * this.windowHeight;
    let pixelsLeftToBottom = this.windowHeight - progressToPixels;

    return section.contentBottom - pixelsLeftToBottom;
  }

};

module.exports = FloatingHeaders;
