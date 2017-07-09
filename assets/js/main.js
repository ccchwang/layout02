const MenuItem = require('./menu-item');
const CloseButton = require('./close-button');


//HELPER FUNCTIONS
function selectElements (selector) {
  let nodes = document.querySelectorAll(selector)
  return [].slice.call(nodes)
}

//CACHED VARIABLES
const closeBtn =     document.getElementsByClassName('close-btn')[0];
const menuItems =    selectElements('.menu__item');
const contentCards = selectElements('.content__card');
const itemsMap =     [];


// //***FOR SCROLLING HEADERS - add debounce, get rid of anon fn */
// window.addEventListener('scroll', function() {

// })

//
menuItems.forEach((item, i) => {
  itemsMap.push(new MenuItem(item, i, menuItems, closeBtn));
});

//create close button
new CloseButton(closeBtn, itemsMap);



const header = document.getElementsByClassName('side-title')[0];
const content = document.getElementsByClassName('work__content')[0];


const windowHeight = window.innerHeight;
let contentHeight = 0;
const contentTop = content.offsetTop;
let contentBottom;

let frozenTop = 0;



window.addEventListener('scroll', function(){
  const windowTop = window.scrollY;
  const windowBottom = windowTop + windowHeight;

  let progressPercent = (windowTop / contentHeight) * 100;

  if (!contentHeight) {
    contentHeight = content.offsetHeight;
    contentBottom = contentTop + contentHeight;
  }

  if (windowBottom > contentBottom) {
    if (!frozenTop) {
      let progressDecimal = progressPercent > 70 ? 0.65 : progressPercent / 100;

      let progressToPixels = progressDecimal * windowHeight;
      let pixelsLeftToBottom = windowHeight - progressToPixels;

      frozenTop = contentBottom - pixelsLeftToBottom;
    }
    header.classList.add('-frozen');
    header.style.top = `${frozenTop}px`;
  }

  else if (windowTop > contentTop) {
    header.style.top = `${progressPercent}%`;
    header.classList.remove('-frozen')
    header.classList.add('-floating');
  }

  else {
    header.classList.remove('-floating')
  }
})
