
import '../css/projects.css';;
import {
  sliceArray,
  hotReload,
  mobileNavHandler,
} from './util.js'

/**
 * Moible Nav Handler
 */
const hamburger = document.querySelector('.hamburger');
const mobileNavList = document.querySelector('.mobile-nav-list');

mobileNavHandler(hamburger, mobileNavList);

/**
 * Slick carousel Handlers
 */

function slickHelper(target) {
  const slider = $(target).slick({
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '15%',
    arrows: true,
    fade: false,
    prevArrow: "<button type='button' class='slick-prev pull-left'><div class='chevron-border black'><span class='chevron left'></span></div></button>",
    nextArrow: "<button type='button' class='slick-next pull-right'><div class='chevron-border black'><span class='chevron right'></span></div></button>",
  })

  return slider;
}

const projectCarousel = sliceArray(document.querySelectorAll('.project-carousel'))

projectCarousel.forEach(carousel => {
  slickHelper(carousel)
})

/**
 * Odometer Options
 */

const totalKW = document.querySelector('#total-kw');
const od = new Odometer({
  el: totalKW,
});

od.update(555)


/**
 * Event Handlers
 */
window.addEventListener('load', function(e) {
})

hotReload();
