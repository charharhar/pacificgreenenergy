
import '../css/home.css';
import 'animation.gsap';
import { TweenMax, TimelineMax } from "gsap/TweenMax";
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

    const smog = TweenMax.fromTo('.about-smog', 1, { yPercent: 100 }, { yPercent: 0 });
    const powerOne = TweenMax.fromTo('#pge-power1 .powerplant-on', .4, { autoAlpha: 0 }, { autoAlpha: 1 })
    const powerTwo = TweenMax.fromTo('#pge-power2 .powerplant-on', .4, { autoAlpha: 0 }, { autoAlpha: 1 })
    const powerThree = TweenMax.fromTo('#pge-power3 .powerplant-on', .4, { autoAlpha: 0 }, { autoAlpha: 1 })

    timeline.add([
      powerOne,
      powerTwo,
      powerThree,
      smog,
    ], 0, 'sequence');

    return timeline;
  },
  timelineB: function() {
    const timeline = new TimelineMax();

    const animals = sliceArray(document.querySelectorAll('.pge-animals'))
    const animalTweens = animals.map((node, index) => {
      const nodeId = node.getAttribute('id');

      return TweenMax.fromTo(`#${nodeId}`, .4, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1 })
    })

    timeline.add(animalTweens, 0, 'sequence')

    return timeline
  },
}

const controller = new ScrollMagic.Controller();

/**
 * Event Handlers
 */

window.addEventListener('load', function(e) {
  $('.backtop-wrapper').click(function() {
    $('html, body').animate({
      scrollTop: $('body').offset().top
    }, 500);
  });

  controller.addScene([
    new ScrollMagic.Scene({ triggerElement: '#powerplants-trigger' }).setTween(timelineMaster.timelineA()),
    new ScrollMagic.Scene({ triggerElement: '.about-section-two' }).setTween(timelineMaster.timelineB()),
    new ScrollMagic.Scene({
      triggerElement: '.section-footer',
      triggerHook: 1,
    }).setClassToggle('.cta-wrapper', 'stick-footer'),
  ])
})

hotReload();
