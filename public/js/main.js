//HELPER FUNCTIONS
const selectElements = function (selector) {
  let nodes = document.querySelectorAll(selector)
  return [].slice.call(nodes)
};

const registerClick = function(item, i) {
  //find neighbors of the item
  const upperItems = menuItems.slice(0, i);
  const lowerItems = menuItems.slice(i + 1)

  //define helper function
  const openItem = function() {
    item.style.top = `${item.offsetTop * -1}px`;
    item.className += ' opened';

    upperItems.forEach(i => i.className += " move-up")
    lowerItems.forEach(i => i.className += " move-down")
  }

  item.addEventListener('click', openItem)
}

////

const menuItems = selectElements('.menu__item');

menuItems.forEach(registerClick)
