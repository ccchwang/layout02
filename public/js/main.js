
//CACHED VARIABLES
const $closeBtn = selectElement('close-btn');
const itemDetails = {};

//HELPER FUNCTIONS
function selectElements (selector) {
  let nodes = document.querySelectorAll(selector)
  return [].slice.call(nodes)
}

function selectElement(selector) {
  return document.getElementsByClassName(selector)[0]
}

function cacheNeighbors(item, tag, i) {
  //find neighbors of the item
  const itemsAbove = menuItems.slice(0, i);
  const itemsBelow = menuItems.slice(i + 1);
  const itemContent = selectElement("-" + tag);

  itemDetails[tag] = {itemsAbove, itemsBelow, itemContent}
}

function registerClick(item, tag) {
  //define helper functions
  const openItem = function() {
    item.style.top = `${(item.offsetTop * -1) - 50}px`;
    item.className += ' opened';

    //show close button
    $closeBtn.className += ' show';

    //move neighbors
    itemDetails[tag].itemsAbove.forEach(i => i.className += " move-up");
    itemDetails[tag].itemsBelow.forEach(i => i.className += " move-down");

    //bring up content into view
    itemDetails[tag].itemContent.className += ' show';
  }


  //register event handler
  item.addEventListener('click', openItem)
}

function closeItem() {
  const openedSection = selectElement('opened');
  const tag = openedSection.dataset.tag;

  //close opened section
  openedSection.style.top = 0;
  openedSection.classList.remove('opened')

  //hide close button
  $closeBtn.classList.remove("show");

  //move back neighbor
  itemDetails[tag].itemsAbove.forEach(i => i.classList.remove("move-up"))
  itemDetails[tag].itemsBelow.forEach(i => i.classList.remove("move-down"))

  //hide content
  itemDetails[tag].itemContent.classList.remove('show');

  //scroll to top of window
  window.scrollTo(0, 0);

  // //scroll to top of window
  // openedSection.scrollIntoView(true);
}


//FLOW
const menuItems = selectElements('.menu__item');
const contentCards = selectElements('.content__card');



// //***FOR SCROLLING HEADERS - add debounce, get rid of anon fn */
// window.addEventListener('scroll', function() {

// })


menuItems.forEach((item, i) => {
  //cache identifying tag
  const tag = item.dataset.tag;

  cacheNeighbors(item, tag, i)
  registerClick(item, tag)
});

//register specific event handler on close btn
$closeBtn.addEventListener('click', closeItem)


