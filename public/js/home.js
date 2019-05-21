
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

// TWEEN
//
// Act One
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
const taiwanZoomOptions = sceneOptionsGenerator(0, fullHeight, '.taiwan-zoom-scene')

const cloudZoomTween = fromToSceneGenerator('.cloud-container', 1, { scale: 1, opacity: 1, yPercent: 0 }, { scale: 3, opacity: 0, yPercent: 0 });
const cloudZoomOptions = sceneOptionsGenerator(0, fullHeight, '.taiwan-zoom-scene')

const oceanFadeInTween = basicTweenGenerator('.ocean-container', 1, { opacity: 1 });
const oceanFadeInOptions = sceneOptionsGenerator(0, halfHeight, '.ocean-intro-scene')

const animalDieTween = basicTweenGenerator('.pge-animals', 1, {
  opacity: 0 });
const animalDieOptions = sceneOptionsGenerator(0, halfHeight, '.pollution-scene');

const powerBuildTween = basicTweenGenerator('.pge-powerplants', 1, { opacity: 1 });
const powerBuildOptions = sceneOptionsGenerator(halfHeight, halfHeight, '.pollution-scene')

//
// Act Two
// Layer 6
const cityOneTween = fromToSceneGenerator('#pge-city1', 1, { yPercent: 20 }, { yPercent: 0 });
const cityOneOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start')

// Layer 4
const cityTwoTween = fromToSceneGenerator('#pge-city2', 1, { yPercent: 40 }, { yPercent: 0 });
const cityTwoOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start')

// Layer 2
const cityThreeTween = fromToSceneGenerator('#pge-city3', 1, { yPercent: 60 }, { yPercent: 0 });
const cityThreeOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start')

// Layer 7 Furthest
const smogOneTween = fromToSceneGenerator('#pge-smog1', 1, { yPercent: 10 }, { yPercent: 0 });
const smogOneOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start')

// Layer 5
const smogTwoTween = fromToSceneGenerator('#pge-smog2', 1, { yPercent: 30 }, { yPercent: 0 });
const smogTwoOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start')

// Layer 3
const smogThreeTween = fromToSceneGenerator('#pge-smog3', 1, { yPercent: 50 }, { yPercent: 0 });
const smogThreeOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start')

// Layer 1 Closest
const smogFourTween = fromToSceneGenerator('#pge-smog4', 1, { yPercent: 70 }, { yPercent: 0 });
const smogFourOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start')

const skylineTween = fromToSceneGenerator('.taipei-skyline', 1, { yPercent: -35 }, { yPercent: 0 })
const skylineOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start')

const textOneTween = fromToSceneGenerator('#text-container-one', 1, { opacity: 0 }, { opacity: 1 });
const textOneOptions = sceneOptionsGenerator(0, 0, '.taipei-intro-scene');

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
  sceneGenerator(oceanFadeInOptions, oceanFadeInTween),
  sceneGenerator(animalDieOptions, animalDieTween),
  sceneGenerator(powerBuildOptions, powerBuildTween),
  sceneGenerator(cityOneOptions, cityOneTween),
  sceneGenerator(cityTwoOptions, cityTwoTween),
  sceneGenerator(cityThreeOptions, cityThreeTween),
  sceneGenerator(smogOneOptions, smogOneTween),
  sceneGenerator(smogTwoOptions, smogTwoTween),
  sceneGenerator(smogThreeOptions, smogThreeTween),
  sceneGenerator(smogFourOptions, smogFourTween),
  sceneGenerator(skylineOptions, skylineTween),
  sceneGenerator(textOneOptions, textOneTween),
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

