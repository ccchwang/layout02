var FloatingHeaders = function(headers) {
  this.headers = headers;
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
    this.headers.forEach(header => {
      let label = header.dataset.label;
      let content = document.querySelector(`.work__content[data-label='${label}']`);

      this.map[label] = {
        header,
        content,
        frozenTop: 0,
        contentHeight: 0,
        contentTop: 0,
        contentBottom: 0
      }
    })
  },

  bindEvents: function() {
    window.addEventListener('scroll', this.animateHeaders.bind(this));
  },

  animateHeaders: function() {
    const windowTop = window.scrollY;
    const windowBottom = windowTop + this.windowHeight;


    for (var header in this.map) {
      //cache section
      let section = this.map[header];


console.log(windowTop )

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

  },

  setSectionDetails: function(section) {
    section.contentHeight = section.content.offsetHeight;
    section.contentTop = section.content.offsetTop;
    section.contentBottom = section.contentTop + section.contentHeight;
    console.log(this.map)
  },

  calculateProgress: function(windowTop, section) {
    //some go from 0-80, others from 0-60. I want them all going on same scale from 0-70. How to do that??

    //i think section.contentBottom will have something to do with it??
    let progressPercent = ((windowTop - section.contentTop) / section.contentHeight) * 80;

//1366 (windowTop) - 1366 (section.contentTop) / 1406 (height)

    return progressPercent;
  },

  calculateFrozenTop: function(progressPercent, section) {
    let progressDecimal = progressPercent / 100;

    let progressToPixels = progressDecimal * this.windowHeight;
    let pixelsLeftToBottom = this.windowHeight - progressToPixels;

    return section.contentBottom - pixelsLeftToBottom;
  }

};

module.exports = FloatingHeaders;
