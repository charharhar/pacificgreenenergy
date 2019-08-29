
import '../css/projects.css';;
import 'animation.gsap';
import ScrollMagic from 'scrollmagic';
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
    responsive: [
      {
        breakpoint: 576,
        settings: {
          centerPadding: 0
        }
      },
    ],
  })

  return slider;
}

/**
 * Odometer Options
 */

const totalKW = document.querySelector('#total-kw');
const od = new Odometer({
  el: totalKW,
});

od.update(555)

/**
 * Scroll Magic Handlers
 */

const timelineMaster = {
  timelineA: function() {
    const timeline = new TimelineMax();

    const carouselTween = TweenMax.fromTo('#project-carousel-one', 1, { autoAlpha: 0 }, { autoAlpha: 1 });
    const mapTween = TweenMax.fromTo('#project-map-one', .4, { autoAlpha: 0 }, { autoAlpha: 1 })

    timeline.add([
      carouselTween,
      mapTween,
    ], 0, 'sequence');

    return timeline;
  },
}

const controller = new ScrollMagic.Controller({
  globalSceneOptions: { reverse: false }
});

/**
 * Event Handlers
 */
window.addEventListener('load', function(e) {
  const halfHeight = window.innerHeight/2;
  const projectCarousel = sliceArray(document.querySelectorAll('.project-carousel'))

  projectCarousel.forEach(carousel => {
    slickHelper(carousel)
  })

  controller.addScene([
    new ScrollMagic.Scene({ triggerElement: '#project-details-one' }).setTween(timelineMaster.timelineA()),
    new ScrollMagic.Scene({
      triggerElement: '.section-footer',
      offset: -halfHeight,
    }).setClassToggle('.call-to-action', 'stick-footer'),
  ])
})

hotReload();
