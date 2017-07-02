//HELPER FUNCTIONS
const selectElements = function (selector) {
  let nodes = document.querySelectorAll(selector)
  return [].slice.call(nodes)
};

const selectElement = function (selector) {
  return document.getElementsByClassName(selector)[0]
};

const registerClick = function(item, i) {
  //find neighbors of the item
  const upperItems = menuItems.slice(0, i);
  const lowerItems = menuItems.slice(i + 1)

  //define helper function
  const openItem = function() {
    item.style.top = `${item.offsetTop * -1}px`;
    item.className += ' opened';

    //show close button
    $closeBtn.className += ' show';

    upperItems.forEach(i => i.className += " move-up")
    lowerItems.forEach(i => i.className += " move-down")
  }

  const closeItem = function() {
    item.style.top = 0;
    item.classList.remove("opened");

    //hiden close button
    $closeBtn.classList.remove("show");

    upperItems.forEach(i => i.classList.remove("move-up"))
    lowerItems.forEach(i => i.classList.remove("move-down"))
  }
  ///

  item.addEventListener('click', openItem)
  $closeBtn.addEventListener('click', closeItem)
}

//CACHED VARIABLES
const $closeBtn = selectElement('close-btn');

//FLOW

const menuItems = selectElements('.menu__item');

menuItems.forEach(registerClick);
