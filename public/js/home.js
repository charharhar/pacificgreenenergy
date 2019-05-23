
import '../css/home.css';
import { sliceArray, hotReload } from './util.js'
import { TweenMax } from "gsap/TweenMax";
import ScrollMagic from 'scrollmagic';
import 'animation.gsap'

function getHeight(element) {
  return document.querySelector(element).clientHeight;
}

/*
 * ************************************************
 *            Sticky Handlers
 * ************************************************
 */

const stickyContainer = document.querySelector('.stickyContainer');

const figureHeight = window.innerHeight / 2
const figureMarginTop = (window.innerHeight - figureHeight) / 2

stickyContainer.style.top = figureMarginTop

/*
 * ************************************************
 *            Scroll Magic
 * ************************************************
 */

let fullHeight = window.innerHeight
let halfHeight = (fullHeight / 2)

const sceneOptionsGenerator = (offset = 0, duration = 0, triggerElement = null) => ({
  offset,
  duration,
  triggerElement,
});

const sceneGenerator = (options, tween) => (
  new ScrollMagic.Scene(options).setTween(tween)
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

const sceneClassToggleGenerator = (options, target, classToggle) => (
  new ScrollMagic.Scene(options).setClassToggle(target, classToggle)
);

function resizeHandler() {
  fullHeight = window.innerHeight;
  halfHeight = (fullHeight / 2);
}

const pgeController = new ScrollMagic.Controller();


//
//           Act One Start
// ==========================================

const heroTweenOne = fromToSceneGenerator('.hero-container', 1, { autoAlpha: 1 }, { autoAlpha: 0 });
const heroOptionsOne = sceneOptionsGenerator(halfHeight, fullHeight, '.hero-dummy')

const cloudTweenOne = fromToSceneGenerator('.cloud-container', 1, { yPercent: -30 }, { yPercent: 0 });
const cloudOptionsOne = sceneOptionsGenerator(halfHeight, fullHeight, '.hero-dummy')

const cloudLeftTween = fromToSceneGenerator('.cloud-left', 1, { xPercent: -5 }, { xPercent: -45, ease: Power2.easeInOut });
const cloudLeftOptions = sceneOptionsGenerator(fullHeight + halfHeight, halfHeight, '.hero-dummy')

const cloudRightTween = fromToSceneGenerator('.cloud-right', 1, { xPercent: 5 }, { xPercent: 45, ease: Power2.easeInOut });
const cloudRightOptions = sceneOptionsGenerator(fullHeight + halfHeight, halfHeight, '.hero-dummy')

const logoFadeInTween = basicTweenGenerator('.logo-container', 1, { autoAlpha: 1 });
const logoFadeInOptions = sceneOptionsGenerator(fullHeight + halfHeight, halfHeight, '.hero-dummy')

const logoFadeOutTween = basicTweenGenerator('.logo-container', 1, { autoAlpha: 0 });
const logofadeOutOptions = sceneOptionsGenerator(0, 0, '.taiwan-intro-scene')

const taiwanFadeInTween = basicTweenGenerator('.taiwan-container', 1, { autoAlpha: 1 });
const taiwanFadeInOptions = sceneOptionsGenerator(0, halfHeight, '.taiwan-intro-scene')

const taiwanZoomTween = fromToSceneGenerator('.taiwan-country', 1, { scale: .33 }, { scale: 1 });
const taiwanZoomOptions = sceneOptionsGenerator(0, fullHeight, '.taiwan-zoom-scene')

const cloudZoomTween = fromToSceneGenerator('.cloud-container', 1, { scale: 1, autoAlpha: 1, yPercent: 0 }, { scale: 3, autoAlpha: 0, yPercent: 0 });
const cloudZoomOptions = sceneOptionsGenerator(0, fullHeight, '.taiwan-zoom-scene')

const oceanFadeInTween = basicTweenGenerator('.ocean-container', 1, { autoAlpha: 1 });
const oceanFadeInOptions = sceneOptionsGenerator(0, halfHeight, '.ocean-intro-scene')

const animalDieTween = basicTweenGenerator('.pge-animals', 1, {
  autoAlpha: 0 });
const animalDieOptions = sceneOptionsGenerator(0, halfHeight, '.pollution-scene');

const powerBuildTween = basicTweenGenerator('.pge-powerplants', 1, { autoAlpha: 1 });
const powerBuildOptions = sceneOptionsGenerator(halfHeight, halfHeight, '.pollution-scene')

//
//           City/Smog Tweens(Act 2 start)
// ==========================================

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

const textOneInTween = fromToSceneGenerator('#text-container-one', 1, { autoAlpha: 0 }, { autoAlpha: 1 });
const textOneInOptions = sceneOptionsGenerator(0, 0, '.taipei-intro-scene');

const sunRiseTween = fromToSceneGenerator('.pge-sun', 1, { yPercent: 200 }, { yPercent: 0 });
const sunRiseOptions = sceneOptionsGenerator(0, fullHeight, '.sunrise-scene');

const textOneOutTween = fromToSceneGenerator('#text-container-one', 1, { autoAlpha: 1 }, { autoAlpha: 0 });
const textOneOutOptions = sceneOptionsGenerator(0, 0, '.sunrise-scene');

// Layer 7 Furthest
const smogOneFadeTween = fromToSceneGenerator('#pge-smog1', 1, { autoAlpha: 1 }, { autoAlpha: 0 });
const smogOneFadeOptions = sceneOptionsGenerator(0, fullHeight, '.sunrise-scene')

// Layer 5
const smogTwoFadeTween = fromToSceneGenerator('#pge-smog2', 1, { autoAlpha: 1 }, { autoAlpha: 0 });
const smogTwoFadeOptions = sceneOptionsGenerator(0, fullHeight, '.sunrise-scene')

// Layer 3
const smogThreeFadeTween = fromToSceneGenerator('#pge-smog3', 1, { autoAlpha: 1 }, { autoAlpha: .2 });
const smogThreeFadeOptions = sceneOptionsGenerator(0, fullHeight, '.sunrise-scene')

// Layer 1 Closest
const smogFourFadeTween = fromToSceneGenerator('#pge-smog4', 1, { autoAlpha: 1 }, { autoAlpha: .2 });
const smogFourFadeOptions = sceneOptionsGenerator(0, fullHeight, '.sunrise-scene')

//
//           City Panels Tweens
// ==========================================

const cityPanels = sliceArray(document.querySelectorAll('.pge-city-panels'))
const cityPanelsHeight = fullHeight;
const cityDividedHeight = cityPanelsHeight / cityPanels.length;

const cityPanelsScenes = cityPanels.map((panel, index) => {
  let panelCount = index + 1;
  let duration = cityDividedHeight * index;
  const panelScene = {};

  const tween = fromToSceneGenerator(`#city-panel${panelCount}`, 1, { autoAlpha: 0, y: -70 }, { autoAlpha: 1, y: 0 })
  const options = sceneOptionsGenerator(duration, cityDividedHeight, '.city-panels-scene')

  const scene = sceneGenerator(options, tween);

  return scene;
})

//
//           Mobile Phone Tweens
// ==========================================

const handPhoneTween = fromToSceneGenerator('.hand-phone-container', 1, { xPercent: 100, yPercent: -50 }, { xPercent: 0, yPercent: -50 });
const handPhoneOptions = sceneOptionsGenerator(0, halfHeight, '.mobile-phone-scene');

const powerMobileTween = basicTweenGenerator('.pge-mobile-powerplants', 1, { autoAlpha: 0 });
const powerMobileOptions = sceneOptionsGenerator(halfHeight, halfHeight, '.mobile-phone-scene')

//
//           Mobile Panels Tweens
// ==========================================
const mobilePanels = sliceArray(document.querySelectorAll('.pge-mobile-panels'))
const mobilePanelsHeight = fullHeight;
const mobileDividedHeight = mobilePanelsHeight / mobilePanels.length;

const mobilePanelsScenes = mobilePanels.map((panel, index) => {
  let panelCount = index + 1;
  let duration = mobileDividedHeight * index;
  const panelScene = {};

  const tween = fromToSceneGenerator(`#mobile-panel${panelCount}`, 1, { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0 })
  const options = sceneOptionsGenerator(duration, mobileDividedHeight, '.mobile-panels-scene')

  const scene = sceneGenerator(options, tween);

  return scene;
})

const progressBarTween = fromToSceneGenerator('.progress-bar', 1, { xPercent: -100 }, { xPercent: 0 });
const progressBarOptions = sceneOptionsGenerator(0, fullHeight, '.mobile-panels-scene');

//
//           Scene Controller
// ==========================================
pgeController.addScene([
  // Act 1
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
  // Act 2
  sceneGenerator(textOneInOptions, textOneInTween),
  sceneGenerator(sunRiseOptions, sunRiseTween),
  sceneGenerator(textOneOutOptions, textOneOutTween),
  sceneGenerator(smogOneFadeOptions, smogOneFadeTween),
  sceneGenerator(smogTwoFadeOptions, smogTwoFadeTween),
  sceneGenerator(smogThreeFadeOptions, smogThreeFadeTween),
  sceneGenerator(smogFourFadeOptions, smogFourFadeTween),
  ...cityPanelsScenes,
  sceneGenerator(handPhoneOptions, handPhoneTween),
  sceneGenerator(powerMobileOptions, powerMobileTween),
  ...mobilePanelsScenes,
  sceneGenerator(progressBarOptions, progressBarTween),
])

/*
 * ************************************************
 *            Event Listeners
 * ************************************************
 */

window.addEventListener('load', function(e) {
  resizeHandler()
})

hotReload();

