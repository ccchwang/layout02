//HELPER FUNCTIONS
const selectElements = function (selector) {
  let nodes = document.querySelectorAll(selector)
  return [].slice.call(nodes)
};

const registerClick = function(item) {
  item.addEventListener('click', function() {
    item.className += ' opened';

    selectElements('.try').forEach(i => i.className += " try2")

    selectElements('.try3').forEach(i => i.className += " try4")
  })
}

////

const menuItem = selectElements('.menu__item');

menuItem.forEach(item => {registerClick(item)})
