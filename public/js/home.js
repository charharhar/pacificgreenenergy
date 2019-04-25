
import '../css/home.css';
import { hotReload } from './util.js'
import { TweenMax, TimelineLite } from "gsap/TweenMax";
import ScrollMagic from 'scrollmagic';
import 'animation.gsap'
import 'debug.addIndicators'

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

let fullHeight = window.innerHeight
let halfHeight = (fullHeight / 2)

const sceneOptionsGenerator = (offset = 0, duration = 0, triggerElement = null) => ({
  offset,
  duration,
  triggerElement,
});

const sceneGenerator = (options, tween) => (
  new ScrollMagic.Scene(options).setTween(tween).addIndicators()
);

const fromToSceneGenerator = (target, duration, fromVar, toVar) => (
  TweenMax.fromTo(target, duration, fromVar, Object.assign({
    overwrite: false,
  }, toVar))
)

const basicTweenGenerator = (target, duration = 0, vars, delay = 0) => (
  TweenMax.to(target, duration, {
    css: vars,
    delay: delay,
  })
)

function resizeHandler() {
  fullHeight = window.innerHeight;
  halfHeight = (fullHeight / 2);
}

const pgeController = new ScrollMagic.Controller();

// TWEENS

const heroTweenOne = fromToSceneGenerator('.hero-container', 1, { opacity: 1 }, { opacity: 0 });
const heroOptionsOne = sceneOptionsGenerator(halfHeight, fullHeight, '.hero-dummy')

const cloudTweenOne = fromToSceneGenerator('.cloud-container', 1, { yPercent: -30 }, { yPercent: 0 });
const cloudOptionsOne = sceneOptionsGenerator(halfHeight, fullHeight, '.hero-dummy')

const cloudLeftTween = fromToSceneGenerator('.cloud-left', 1, { xPercent: -5 }, { xPercent: -45, ease: Power2.easeInOut });
const cloudLeftOptions = sceneOptionsGenerator(fullHeight + halfHeight, halfHeight, '.hero-dummy')

const cloudRightTween = fromToSceneGenerator('.cloud-right', 1, { xPercent: 5 }, { xPercent: 45, ease: Power2.easeInOut });
const cloudRightOptions = sceneOptionsGenerator(fullHeight + halfHeight, halfHeight, '.hero-dummy')

const logoFadeInTween = basicTweenGenerator('.logo-container', 1, { opacity: 1 });
const logoFadeInOptions = sceneOptionsGenerator(fullHeight + halfHeight, halfHeight, '.hero-dummy')

const logoFadeOutTween = basicTweenGenerator('.logo-container', 1, { opacity: 0 });
const logofadeOutOptions = sceneOptionsGenerator(0, 0, '.taiwan-intro-scene')

const taiwanFadeInTween = basicTweenGenerator('.taiwan-container', 1, { opacity: 1 });
const taiwanFadeInOptions = sceneOptionsGenerator(0, halfHeight, '.taiwan-intro-scene')

const taiwanZoomTween = fromToSceneGenerator('.taiwan-country', 1, { scale: .33 }, { scale: 1 });
const taiwanZoomOptions = sceneOptionsGenerator(0, halfHeight, '.taiwan-zoom-scene')

const cloudZoomTween = fromToSceneGenerator('.cloud-container', 1, { scale: 1, opacity: 1, yPercent: 0 }, { scale: 3, opacity: 0, yPercent: 0 });
const cloudZoomOptions = sceneOptionsGenerator(0, halfHeight, '.taiwan-zoom-scene')

pgeController.addScene([
  sceneGenerator(heroOptionsOne, heroTweenOne),
  sceneGenerator(cloudOptionsOne, cloudTweenOne),
  sceneGenerator(cloudLeftOptions, cloudLeftTween),
  sceneGenerator(cloudRightOptions, cloudRightTween),
  sceneGenerator(logoFadeInOptions, logoFadeInTween),
  sceneGenerator(logofadeOutOptions, logoFadeOutTween),
  sceneGenerator(taiwanFadeInOptions, taiwanFadeInTween),
  sceneGenerator(taiwanZoomOptions, taiwanZoomTween),
  sceneGenerator(cloudZoomOptions, cloudZoomTween),
])

/*
 * ==============================================
 *            Event Listeners
 * ==============================================
 */

window.addEventListener('load', function(e) {
  resizeHandler()
})

hotReload();

