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

