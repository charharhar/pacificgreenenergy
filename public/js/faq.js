
import '../css/faq.css';
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
 * Scroll Magic Handlers
 */

const timelineMaster = {
  timelineA: function() {
    const timeline = new TimelineMax();

    const faq = sliceArray(document.querySelectorAll('.faq-content'))
    const faqTweens = faq.map((node, index) => {
      const nodeId = node.getAttribute('id');

      return TweenMax.fromTo(`#${nodeId}`, .25, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1 })
    })

    timeline.add(faqTweens, 0, 'sequence');

    return timeline;
  },
}

const controller = new ScrollMagic.Controller();

/**
 * Event Handlers
 */

window.addEventListener('load', function(e) {
  timelineMaster.timelineA();

  controller.addScene([
    new ScrollMagic.Scene({
      triggerElement: '.section-footer',
      triggerHook: 1,
    }).setClassToggle('.cta-wrapper', 'stick-footer'),
  ])

  $('.backtop-wrapper').click(function() {
    $('html, body').animate({
      scrollTop: $('body').offset().top
    }, 500);
  });
})

hotReload();
