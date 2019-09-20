
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
const mobileNavList = document.querySelector('.main-navigation');

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
    dots: true,
    fade: false,
    prevArrow: "<button type='button' class='slick-prev pull-left'><div class='chevron-container black'><span class='chevron left'></span></div></button>",
    nextArrow: "<button type='button' class='slick-next pull-right'><div class='chevron-container black'><span class='chevron right'></span></div></button>",
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

const controller = new ScrollMagic.Controller();

/**
 * Event Handlers
 */
window.addEventListener('load', function(e) {
  // Location hash handlers
  const hash = window.location.hash;
  if (hash) {
    document.querySelector(`${hash} input[type="checkbox"]`).checked = true

    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 0);
  }

  $('#project-tab-1').click(function() {
    const checkInput = document.querySelector('#project-1');
    if (!checkInput.checked) {
      $('html, body').animate({
        scrollTop: $('#kaohsiung').offset().top
      }, 500);
    }
  });

  $('#project-tab-2').click(function() {
    const checkInput = document.querySelector('#project-2');
    if (!checkInput.checked) {
      $('html, body').animate({
        scrollTop: $('#taoyuan').offset().top
      }, 500);
    }
  });

  $('.backtop-wrapper').click(function() {
    $('html, body').animate({
      scrollTop: $('body').offset().top
    }, 500);
  });

  const projectCarousel = sliceArray(document.querySelectorAll('.project-carousel'))

  projectCarousel.forEach(carousel => {
    slickHelper(carousel)
  })

  controller.addScene([
    new ScrollMagic.Scene({
      triggerElement: '.section-footer',
      triggerHook: 1,
    }).setClassToggle('.cta-wrapper', 'stick-footer'),
  ])
})

hotReload();
