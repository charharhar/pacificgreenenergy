
import '../css/home.css';
import { hotReload } from './util.js'
import { TweenMax, TimelineLite } from "gsap/TweenMax";
import ScrollMagic from 'scrollmagic';
import 'animation.gsap'
import 'debug.addIndicators'


window.addEventListener('load', function(e) {
  console.log('--> Application started  |  Current route: /')
})

/*
 * ==============================================
 *            Sticky Handlers
 * ==============================================
 */

const stickyContainer = document.querySelector('.stickyContainer');

const figureHeight = window.innerHeight / 2
const figureMarginTop = (window.innerHeight - figureHeight) / 2

stickyContainer.style.top = figureMarginTop

/*
 * ==============================================
 *            Scroll Magic
 * ==============================================
 */

const sceneOptionsGenerator = (offset = 0, duration = 0, triggerElement = null) => ({
  offset,
  duration,
  triggerElement,
});

const sceneGenerator = (options, tween) => (
  new ScrollMagic.Scene(options).setTween(tween)
);

const pgeController = new ScrollMagic.Controller();

const heroTweenOne = TweenMax.fromTo('.hero-container', 1, { opacity: 1 }, { opacity: 0 });
const heroOptionsOne = sceneOptionsGenerator((window.innerHeight/2), window.innerHeight, '.hero-dummy')

const cloudTweenOne = TweenMax.fromTo('.cloud-container', 1, { yPercent: -15 }, { yPercent: 0 });
const cloudOptionsOne = sceneOptionsGenerator((window.innerHeight/2), window.innerHeight, '.hero-dummy')

const cloudLeftTween = TweenMax.fromTo('.cloud-left', 1, { xPercent: -5 }, { xPercent: -45, ease: Power2.easeIn });
const cloudLeftOptions = sceneOptionsGenerator(window.innerHeight + (window.innerHeight/2), window.innerHeight, '.hero-dummy')

const cloudRightTween = TweenMax.fromTo('.cloud-right', 1, { xPercent: 5 }, { xPercent: 45, ease: Power2.easeIn });
const cloudRightOptions = sceneOptionsGenerator(window.innerHeight + (window.innerHeight/2), window.innerHeight, '.hero-dummy')

pgeController.addScene([
  sceneGenerator(heroOptionsOne, heroTweenOne),
  sceneGenerator(cloudOptionsOne, cloudTweenOne),
  sceneGenerator(cloudLeftOptions, cloudLeftTween),
  sceneGenerator(cloudRightOptions, cloudRightTween),
])
/*
 * ==============================================
 *            Hot Reload
 * ==============================================
 */
hotReload();

