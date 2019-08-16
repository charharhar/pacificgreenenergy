
import '../css/projects.css';;
import { sliceArray, hotReload } from './util.js'

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

const slickOne = slickHelper('#project-one')
const slickTwo = slickHelper('#project-two')
const slickThree = slickHelper('#project-three')

/**
 * Event Handlers
 */
window.addEventListener('load', function(e) {
})

hotReload();
