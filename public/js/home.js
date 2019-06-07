
import '../css/home.css';
import { sliceArray, hotReload } from './util.js'
import { TweenMax } from "gsap/TweenMax";
import ScrollMagic from 'scrollmagic';
import 'animation.gsap'

/*
 * ************************************************
 *            Event Listeners
 * ************************************************
 */

window.addEventListener('load', function(e) {
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

  function getHeight(element) {
    return document.querySelector(element).clientHeight;
  }

  const multiSceneCreate = function(sceneClassName, nodesArray, nodeId, tweens) {
    const sceneHeight = document.querySelector(sceneClassName).clientHeight;
    const dividedHeight = sceneHeight / nodesArray.length;

    const scenes = nodesArray.map((node, index) => {
      let nodeCount = index + 1;
      let duration = dividedHeight * index;
      const scene = {};

      const tween = fromToSceneGenerator(`${nodeId}${nodeCount}`, 1, tweens.from, tweens.to)
      const options = sceneOptionsGenerator(duration, dividedHeight, sceneClassName)

      return sceneGenerator(options, tween);
    })

    return scenes;
  }

  const pgeController = new ScrollMagic.Controller();


  //
  //           Act One
  //
  // ==========================================

  const heroTweenOne = fromToSceneGenerator('.hero-container', 1, { autoAlpha: 1 }, { autoAlpha: 0 });
  const heroOptionsOne = sceneOptionsGenerator(halfHeight, fullHeight, '.scene-one-start')

  const cloudTweenOne = fromToSceneGenerator('.cloud-container', 1, { yPercent: -30 }, { yPercent: 0 });
  const cloudOptionsOne = sceneOptionsGenerator(halfHeight, fullHeight, '.scene-one-start')

  //
  //           Cloud Split Scene
  // ==========================================

  const cloudSplitHeight = getHeight('.cloud-split-scene');

  const cloudLeftTween = fromToSceneGenerator('.cloud-left', 1, { xPercent: -5 }, { xPercent: -45, ease: Power2.easeInOut });
  const cloudLeftOptions = sceneOptionsGenerator(0, cloudSplitHeight, '.cloud-split-scene')

  const cloudRightTween = fromToSceneGenerator('.cloud-right', 1, { xPercent: 5 }, { xPercent: 45, ease: Power2.easeInOut });
  const cloudRightOptions = sceneOptionsGenerator(0, cloudSplitHeight, '.cloud-split-scene')

  //
  //           Logo Fade in/out Scene
  // ==========================================

  const logoFadeInHeight = getHeight('.logo-fade-in-scene');
  const logoFadeOutHeight = getHeight('.logo-fade-out-scene');

  const logoFadeInTween = basicTweenGenerator('.logo-container', 1, { autoAlpha: 1 });
  const logoFadeInOptions = sceneOptionsGenerator(0, logoFadeInHeight, '.logo-fade-in-scene')

  const logoFadeOutTween = basicTweenGenerator('.logo-container', 1, { autoAlpha: 0 });
  const logofadeOutOptions = sceneOptionsGenerator(0, logoFadeOutHeight, '.logo-fade-out-scene')

  //
  //           Taiwan Fade In Scene
  // ==========================================

  const taiwanFadeHeight = getHeight('.taiwan-intro-scene');

  const taiwanFadeInTween = basicTweenGenerator('.taiwan-container', 1, { autoAlpha: 1 });
  const taiwanFadeInOptions = sceneOptionsGenerator(0, taiwanFadeHeight, '.taiwan-intro-scene')

  //
  //           Taiwan Zoom Scene
  // ==========================================
  const taiwanZoomHeight = getHeight('.taiwan-zoom-scene')

  const taiwanZoomTween = fromToSceneGenerator('.taiwan-country', 1, { scale: .33 }, { scale: 1 });
  const taiwanZoomOptions = sceneOptionsGenerator(0, taiwanZoomHeight, '.taiwan-zoom-scene')

  const cloudZoomTween = fromToSceneGenerator('.cloud-container', 1, { scale: 1, autoAlpha: 1, yPercent: 0 }, { scale: 3, autoAlpha: 0, yPercent: 0 });
  const cloudZoomOptions = sceneOptionsGenerator(0, taiwanZoomHeight, '.taiwan-zoom-scene')

  //
  //           Ocean Fade Scene
  // ==========================================

  const oceanSceneHeight = getHeight('.ocean-intro-scene')

  const oceanFadeInTween = basicTweenGenerator('.ocean-container', 1, { autoAlpha: 1 });
  const oceanFadeInOptions = sceneOptionsGenerator(0, oceanSceneHeight, '.ocean-intro-scene')

  //
  //           Animal Die Tweens
  // ==========================================
  const animalNodes = sliceArray(document.querySelectorAll('.pge-animals'))
  const animalDieTweens = {
    from: { autoAlpha: 1 },
    to: { autoAlpha: 0 },
  }

  const animalDieScenes = multiSceneCreate('.animal-die-scene', animalNodes, '#pge-animal', animalDieTweens)

  //
  //           Powerplant Scene
  // ==========================================
  const powerplantNodes = sliceArray(document.querySelectorAll('.pge-powerplants'))
  const powerBuildTweens = {
    from: { scaleY: 0 },
    to: { scaleY: 1, transformOrigin: '50% 100%', },
  }

  const powerBuildScenes = multiSceneCreate('.powerplant-scene', powerplantNodes, '#pge-power', powerBuildTweens)

  //
  //           ACT 2
  //
  //           Taipei Night Skyline Tweens
  // ==========================================

  const nightSkylineOneTween = fromToSceneGenerator('#pge-night-sky1', 1, { yPercent: -20 }, { yPercent: 0 });
  const nightSkylineOneOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start');

  const nightSkylineTwoTween = fromToSceneGenerator('#pge-night-sky2', 1, { yPercent: -10 }, { yPercent: 0 });
  const nightSkylineTwoOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start');

  const nightSkylineThreeTween = fromToSceneGenerator('#pge-night-sky3', 1, { yPercent: 0 }, { yPercent: 0 });
  const nightSkylineThreeOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start');

  const nightSkylineFourTween = fromToSceneGenerator('#pge-night-sky4', 1, { yPercent: 10 }, { yPercent: 0 });
  const nightSkylineFourOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start');

  const nightSkylineFiveTween = fromToSceneGenerator('#pge-night-sky5', 1, { yPercent: 20 }, { yPercent: 0 });
  const nightSkylineFiveOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start');

  const nightSkylineSixTween = fromToSceneGenerator('#pge-night-sky6', 1, { yPercent: 30 }, { yPercent: 0 });
  const nightSkylineSixOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start');

  const nightSkylineSevenTween = fromToSceneGenerator('#pge-night-sky7', 1, { yPercent: 40 }, { yPercent: 0 });
  const nightSkylineSevenOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start');

  const nightSkylineEightTween = fromToSceneGenerator('#pge-night-sky8', 1, { yPercent: 50 }, { yPercent: 0 });
  const nightSkylineEightOptions = sceneOptionsGenerator(0, fullHeight, '.scene-two-start');

  const moonRiseTween = fromToSceneGenerator('.pge-moon', 1, { yPercent: 0, autoAlpha: 1 }, { yPercent: 200, autoAlpha: 0 });
  const moonRiseOptions = sceneOptionsGenerator(0, fullHeight, '.night-skyline-scene');

  const textOneInTween = fromToSceneGenerator('#text-container-one', 1, { autoAlpha: 0 }, { autoAlpha: 1 });
  const textOneInOptions = sceneOptionsGenerator(halfHeight, halfHeight, '.night-skyline-scene');

  const textOneOutTween = fromToSceneGenerator('#text-container-one', 1, { autoAlpha: 1 }, { autoAlpha: 0 });
  const textOneOutOptions = sceneOptionsGenerator(0, halfHeight, '.day-skyline-scene');

  //
  //           Taipei Day Skyline Tweens
  // ==========================================

  const daySkylineFadeInTween = fromToSceneGenerator('.taipei-day-skyline', 1, { autoAlpha: 0 }, { autoAlpha: 1 });
  const daySkylineFadeInOptions = sceneOptionsGenerator(0, fullHeight, '.day-skyline-scene');

  const nightCloudsFadeOutTween = fromToSceneGenerator('.taipei-night-clouds', 1, { autoAlpha: 1 }, { autoAlpha: 0 });
  const nightCloudsFadeOutOptions = sceneOptionsGenerator(0, fullHeight, '.day-skyline-scene');

  const dayCloudsFadeInTween = fromToSceneGenerator('.taipei-day-clouds', 1, { autoAlpha: 0 }, { autoAlpha: 1 });
  const dayCloudsFadeInOptions = sceneOptionsGenerator(0, fullHeight, '.day-skyline-scene');

  //
  //           Night Fade Out
  // ==========================================

  const nightSkylineFadeOutTween = fromToSceneGenerator('.taipei-night-skyline', 1, { autoAlpha: 1 }, { autoAlpha: 0 });
  const nightSkylineFadeOutOptions = sceneOptionsGenerator(0, fullHeight, '.day-skyline-scene');

  const changeSkyTween = fromToSceneGenerator('.act-two-container', 1, { background: 'linear-gradient(#005D5A, #257A77)' } , { background: 'linear-gradient(#00B7B2, #A1E2DE)'})
  const changeSkyOptions = sceneOptionsGenerator(0, fullHeight, '.day-skyline-scene');

  const sunRiseTween = fromToSceneGenerator('.pge-sun', 1, { yPercent: 200 }, { yPercent: 0 });
  const sunRiseOptions = sceneOptionsGenerator(0, fullHeight, '.day-skyline-scene');

  //
  //           City Panels Tweens
  // ==========================================

  const cityPanelsNodes = sliceArray(document.querySelectorAll('.pge-city-panels'))
  const cityPanelTweens = {
    from: { autoAlpha: 0, y: -70 },
    to: { autoAlpha: 1, y: 0 },
  }

  const cityPanelsScenes = multiSceneCreate('.city-panels-scene', cityPanelsNodes, '#city-panel', cityPanelTweens)

  //
  //           Mobile Phone Tweens
  // ==========================================

  const handPhoneTween = fromToSceneGenerator('.hand-phone-container', 1, { xPercent: 100 }, { xPercent: 0 });
  const handPhoneOptions = sceneOptionsGenerator(0, halfHeight, '.mobile-phone-scene');

  //
  //           Powerplant Scene
  // ==========================================
  const mobilePowerplantNodes = sliceArray(document.querySelectorAll('.pge-mobile-powerplants'))
  const mobilePowerBuildTweens = {
    from: { scaleY: 1 },
    to: { scaleY: 0, transformOrigin: '50% 100%', },
  }

  const mobilePowerBuildScenes = multiSceneCreate('.mobile-power-scene', mobilePowerplantNodes, '#pge-mobile-power', mobilePowerBuildTweens)

  //
  //           Mobile Panels Tweens
  // ==========================================
  const mobilePanelsNodes = sliceArray(document.querySelectorAll('.pge-mobile-panels'))
  const mobilePanelTweens = {
    from: { autoAlpha: 0, y: -20 },
    to: { autoAlpha: 1, y: 0 },
  }

  const mobilePanelsScenes = multiSceneCreate('.mobile-panels-scene', mobilePanelsNodes, '#mobile-panel', mobilePanelTweens)

  //
  //           Mobile Progress Bar Tweens
  // ==========================================
  const progressBarTween = fromToSceneGenerator('.progress-bar', 1, { xPercent: -100 }, { xPercent: 0 });
  const progressBarOptions = sceneOptionsGenerator(0, fullHeight, '.mobile-panels-scene');

  //
  //           Scene Controller
  // ==========================================
  TweenMax.set('#text-container-one', { autoAlpha: 0 })

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
    ...animalDieScenes,
    ...powerBuildScenes,
    // Act 2
    // Night Skyline
    sceneGenerator(nightSkylineOneOptions, nightSkylineOneTween),
    sceneGenerator(nightSkylineTwoOptions, nightSkylineTwoTween),
    sceneGenerator(nightSkylineThreeOptions, nightSkylineThreeTween),
    sceneGenerator(nightSkylineFourOptions, nightSkylineFourTween),
    sceneGenerator(nightSkylineFiveOptions, nightSkylineFiveTween),
    sceneGenerator(nightSkylineSixOptions, nightSkylineSixTween),
    sceneGenerator(nightSkylineSevenOptions, nightSkylineSevenTween),
    sceneGenerator(nightSkylineEightOptions, nightSkylineEightTween),
    sceneGenerator(moonRiseOptions, moonRiseTween),
    // Night to Day
    sceneGenerator(daySkylineFadeInOptions, daySkylineFadeInTween),
    sceneGenerator(nightSkylineFadeOutOptions, nightSkylineFadeOutTween),
    sceneGenerator(changeSkyOptions, changeSkyTween),
    sceneGenerator(nightCloudsFadeOutOptions, nightCloudsFadeOutTween),
    sceneGenerator(dayCloudsFadeInOptions, dayCloudsFadeInTween),
    //
    sceneGenerator(textOneInOptions, textOneInTween),
    sceneGenerator(sunRiseOptions, sunRiseTween),
    sceneGenerator(textOneOutOptions, textOneOutTween),
    ...cityPanelsScenes,
    sceneGenerator(handPhoneOptions, handPhoneTween),
    ...mobilePowerBuildScenes,
    ...mobilePanelsScenes,
    sceneGenerator(progressBarOptions, progressBarTween),
  ])

  resizeHandler()
})

hotReload();

