var ContentSections = function(sections) {
  this.sections = sections;
  this.map = {};
  this.windowHeight = window.innerHeight;
  this.lastScrollY = 0;
  this.windowBottom = 0;
  this.ticking = false;
  this.init();
}

ContentSections.prototype = {
  init: function() {
    this.setMap();
    this.bindEvents();
  },

  setMap: function() {
    let headers = [].slice.call(document.getElementsByClassName('side-title'));

    this.sections.forEach((section, i) => {
      this.map[i] = [];
      let index = i * 3;
      let sectionHeaders = headers.slice(index, index + 3);

      sectionHeaders.forEach(header => {
        this.map[i].push({
          header,
          content: header.parentElement.nextElementSibling,
        })
      })
    })
  },

  bindEvents: function() {
    window.addEventListener('scroll', this.onScroll.bind(this));
  },

  onScroll: function() {
    this.lastScrollY = window.scrollY;

    if(!this.ticking) {
      requestAnimationFrame(this.update.bind(this));
    }

    this.ticking = true;
  },

  update: function() {
    this.ticking = false;
    this.windowBottom = this.lastScrollY + this.windowHeight;
    this.sections.forEach(this.animateWhenOpen.bind(this));
  },

  animateWhenOpen: function(section, j) {
    if (section.classList.value.includes('show')) {
      let sectionBlurbs = this.map[j];

      sectionBlurbs.forEach(blurb => {
        if (!blurb.contentHeight) { this.setBlurbDetails(blurb) }
        this.animateHeader.call(this, blurb);
      });
    }
  },

  animateHeader: function(blurb) {
    //if user has left blurb from bottom
    if (this.windowBottom > blurb.contentBottom) {
      if (!blurb.frozenTop) {
        let progressPercent = this.calculateProgress(this.lastScrollY, blurb);
        blurb.frozenTop = this.calculateFrozenTop(progressPercent, blurb);
      }
      blurb.header.classList.add('-frozen');
      blurb.header.style.top = `${blurb.frozenTop}px`;
    }

    //if user has entered header
    else if (this.lastScrollY > blurb.contentTop) {
      blurb.header.style.top = `${this.calculateProgress(this.lastScrollY, blurb)}%`;
      blurb.header.classList.remove('-frozen');
      blurb.header.classList.add('-floating');
    }

    //if user has left header from top
    else {
      blurb.header.classList.remove('-floating')
    }
  },

  setBlurbDetails: function(blurb) {
    blurb.contentHeight = blurb.content.offsetHeight;
    blurb.contentTop = blurb.content.offsetTop;
    blurb.contentBottom = blurb.contentTop + blurb.contentHeight;
  },

  calculateProgress: function(lastScrollY, blurb) {
    //get pure scroll by subtracting blurb's offsetTop from window's scrollY
    let scrollY = lastScrollY - blurb.contentTop;
    let progressPercent = (scrollY / blurb.contentHeight) * 80;  //scale of 0-80%

    return progressPercent + 8.8;
  },

  calculateFrozenTop: function(progressPercent, blurb) {
    let progressDecimal = progressPercent / 100;

    let progressToPixels = progressDecimal * this.windowHeight;
    let pixelsLeftToBottom = this.windowHeight - progressToPixels;

    return blurb.contentBottom - pixelsLeftToBottom;
  }
};

module.exports = ContentSections;
