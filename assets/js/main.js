const MenuItem = require('./menu-item');
const CloseButton = require('./close-button');
const inViewport = require('in-viewport');
const FloatingHeader = require('./floating-header');

//HELPER FUNCTIONS
function selectElements (selector) {
  let nodes = document.querySelectorAll(selector)
  return [].slice.call(nodes)
}

//CACHED VARIABLES
const closeBtn =     document.getElementsByClassName('close-btn')[0];
const workContent = document.getElementsByClassName('work__content')[0];
const menuItems =    selectElements('.menu__item');
const itemsMap =     [];


// //***FOR SCROLLING HEADERS - add debounce, get rid of anon fn */
// window.addEventListener('scroll', function() {

// })

//
menuItems.forEach((item, i) => {
  itemsMap.push(new MenuItem(item, i, menuItems, closeBtn));
});

var top = 30;

window.addEventListener('scroll', function() {
  const objectTop = workContent.offsetTop;
  const windowTop = window.scrollY;
  const header = document.getElementsByClassName('work__lead')[0];



  if (windowTop > objectTop) {
    header.classList.add('floating');
    header.style.top = `${top}%`;

    top += 1;

    console.log(top)
  }
  else {
    header.classList.remove('floating');
  }



})

//create close button
new CloseButton(closeBtn, itemsMap);

