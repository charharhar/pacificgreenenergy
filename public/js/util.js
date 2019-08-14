
/**
 * Utility Functions
 */

export function hotReload() {
  return (process.env.NODE_ENV === 'development') && module.hot && module.hot.accept();
}

export function removeAllChildren(parent) {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
  }
}

export function findParent(node, className) {
  let tempNode = node;

  while (!tempNode.classList.contains(className)) {
    tempNode = tempNode.parentNode;
  }

  return tempNode
}

export function sliceArray(nodeArray) {
  return Array.prototype.slice.call(nodeArray)
}

export function mobileNavHandler(toggle, mobileNav) {
  toggle.addEventListener('click', function(e) {
    e.preventDefault();

    if (this.classList.contains('mobile-active') === true) {
      this.classList.remove('mobile-active')
      mobileNav.classList.remove('mobile-active')
    } else {
      this.classList.add('mobile-active');
      mobileNav.classList.add('mobile-active');
    }

  });
}

export function scrollTop() {
  return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

export function scrollTo(e, elem) {
  e.preventDefault();

  const target = `.${elem.getAttribute('scrollTo')}`

  $('html, body').animate({
    scrollTop: $(target).offset().top
  }, 1000);
}
