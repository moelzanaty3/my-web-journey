// Define Global Variables
const sections = document.querySelectorAll("section");
const menu = document.getElementById("navbar__list");
// End Global Variables

// Start Helper Functions
function initNavBar() {
  // nav holder
  let fragment = document.createDocumentFragment()
  for (section of sections) {
    // get section name => for example: Section 1
    sectionName = section.getAttribute("data-nav");
    // get section id => for example: section1
    sectionLink = section.getAttribute("id");
    // creat item for each one and it will be like for example: 
    // <li><a class="menu__link" href="#section1">Section 1</a></li>
    const li = document.createElement("li");
    const link = document.createElement("a")
    // add attributes to link
    link.setAttribute('class', 'menu__link')
    link.setAttribute('href', `#${sectionLink}`)
    // add the item text
    link.textContent = sectionName
    // add link to the list item 
    li.appendChild(link)
    // add list item to fragment holder to improve performance
    fragment.appendChild(li)
  }
  //add Items to the menu
  menu.appendChild(fragment)
}
// check if an element is visible in the viewport
// based on https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
// End Helper Functions

// difference appearance for the viewed sections
function toggleActiveState() {
  // Add class 'active' to section when near top of viewport
  document.addEventListener("scroll", () => {
    for (section of sections) {
      section.classList.toggle('your-active-class', isInViewport(section))
    }
  });

}
// handle scroll button up
function scrollUp() {
  // When the user scrolls down 100px from the top of the document, show the button
  const scrollBtn = document.getElementById('scroll-btn')
  document.addEventListener('scroll', () => {
    const isScrollTop = document.body.scrollTop < 500
    scrollBtn.classList.toggle('display--none', isScrollTop)
  })
  // handle click button to scroll top
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0 })
  })
}

// build the nav
initNavBar();
toggleActiveState();
scrollUp()

