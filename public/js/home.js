
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

  /*
   * ************************************************
   *            Scroll Magic
   * ************************************************
   */

  let fullHeight = window.innerHeight
  let halfHeight = (fullHeight / 2)

  function resizeHandler() {
  }

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
  function getHeight(element) {
    return document.querySelector(element).clientHeight;
  }

  const multiSceneCreate = function(sceneClassName, nodesArray, nodeId, tweens) {
    const sceneHeight = document.querySelector(sceneClassName).clientHeight;
    const dividedHeight = sceneHeight / nodesArray.length;

    const scenes = nodesArray.map((node, index) => {
      let nodeCount = index + 1;
      let offset = dividedHeight * index;
      const scene = {};

      const tween = fromToSceneGenerator(`${nodeId}${nodeCount}`, 1, tweens.from, tweens.to)
      const options = sceneOptionsGenerator(offset, dividedHeight, sceneClassName)

      return sceneGenerator(options, tween);
    })

    return scenes;
  }

  const pgeController = new ScrollMagic.Controller();


  //
  //           Act One
  //
  // ==========================================
  const sceneOneStartHeight = getHeight('.hero-dummy')

  const heroTweenOne = fromToSceneGenerator('.hero-main', 1, { autoAlpha: 1 }, { autoAlpha: 0 });
  const heroOptionsOne = sceneOptionsGenerator(halfHeight, sceneOneStartHeight, '.scene-one-start')


  const cloudTweenOne = fromToSceneGenerator('.cloud-container', 1, { yPercent: -30 }, { yPercent: 0 });
  const cloudOptionsOne = sceneOptionsGenerator(halfHeight, sceneOneStartHeight, '.scene-one-start')

  const chevronExitTween = basicTweenGenerator('.chevron-container', 1, { autoAlpha: 0 });
  const chevronExitOptions = sceneOptionsGenerator(halfHeight, sceneOneStartHeight, '.scene-one-start');

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

  const logoEnterHeight = getHeight('.logo-fade-in-scene');
  const logoExitHeight = getHeight('.logo-fade-out-scene');

  const logoEnterTween = basicTweenGenerator('.logo-container', 1, { autoAlpha: 1 });
  const logoEnterOptions = sceneOptionsGenerator(0, logoEnterHeight, '.logo-fade-in-scene')

  const logoExitTween = basicTweenGenerator('.logo-container', 1, { autoAlpha: 0 });
  const logoExitOptions = sceneOptionsGenerator(0, logoExitHeight, '.logo-fade-out-scene')

  //
  //           Taiwan Fade In Scene
  // ==========================================

  const taiwanFadeHeight = getHeight('.taiwan-intro-scene');

  const taiwanEnterTween = basicTweenGenerator('.taiwan-container', 1, { autoAlpha: 1 });
  const taiwanEnterOptions = sceneOptionsGenerator(0, taiwanFadeHeight, '.taiwan-intro-scene')

  const supportTextEnterTween = fromToSceneGenerator('.support-container', 1, { autoAlpha: 0 }, { autoAlpha: 1 });
  const supportTextEnterOptions =  sceneOptionsGenerator(0, taiwanFadeHeight, '.taiwan-intro-scene')

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

  const taiwanTextExitTween = basicTweenGenerator('.taiwan-text', 1, { autoAlpha: 0 });
  const taiwanTextExitOptions = sceneOptionsGenerator(0, oceanSceneHeight, '.ocean-intro-scene');

  const oceanEnterTween = basicTweenGenerator('.ocean-container', 1, { autoAlpha: 1 });
  const oceanEnterOptions = sceneOptionsGenerator(0, oceanSceneHeight, '.ocean-intro-scene')

  //
  //           Pollution Scene
  // ==========================================
  const pollutionSceneHeight = document.querySelector('.pollution-scene').clientHeight;

  const polluteNodes = sliceArray(document.querySelectorAll('.pge-pollute'))
  const polluteDividedHeight = pollutionSceneHeight / polluteNodes.length;

  const polluteScenes = polluteNodes.sort((a, b) => {
    return parseInt(a.getAttribute('data-order')) - parseInt(b.getAttribute('data-order'))
  }).map((node, index) => {
    const nodeCount = index + 1;
    const offset = polluteDividedHeight * index;
    const nodeId = node.getAttribute('id')
    const type = node.getAttribute('data-type')
    const animalDieTweens = {
      from: { autoAlpha: 1 },
      to: { autoAlpha: 0 },
    }

    const powerBuildTweens = {
      from: { scaleY: 0 },
      to: { scaleY: 1, transformOrigin: '50% 100%', },
    }

    const variableTween = type === 'animal' ? animalDieTweens : powerBuildTweens

    const tween = fromToSceneGenerator(`#${nodeId}`, 1, variableTween.from, variableTween.to)
    const options = sceneOptionsGenerator(offset, polluteDividedHeight, '.pollution-scene')

    return sceneGenerator(options, tween);
  })

  // Pollute Sky
  const oceanPolluteTweens = fromToSceneGenerator('.scene-one-background', 1, { background: 'radial-gradient(#fff, #00B8CE)' }, { background: 'radial-gradient(#fff, #257A77)' })
  const oceanPolluteOptions = sceneOptionsGenerator(0, pollutionSceneHeight, '.pollution-scene');

  // Kill Clouds
  const killCloudsOptions = sceneOptionsGenerator(0, 0, '.kill-clouds-scene')
  const killCloudsScene = sceneClassToggleGenerator(killCloudsOptions, '.cloud-container', 'kill-clouds')

  //
  //           ACT 2
  // ==========================================
  const smogEnterSceneHeight = getHeight('.smog-enter-scene');
  const nightCloudIntroSceneHeight = getHeight('.night-cloud-intro-scene');

  const smogEnterSceneTween = fromToSceneGenerator('#pge-night-sky1', 1, { autoAlpha: 0,  yPercent: 100 }, { autoAlpha: 1, yPercent: 0 });
  const smogEnterSceneOptions = sceneOptionsGenerator(0, smogEnterSceneHeight, '.smog-enter-scene');

  const backgroundFadeTween = fromToSceneGenerator('.scene-two-background', 1, { autoAlpha: 0 }, { autoAlpha: 1 })
  const backgroundFadeOptions = sceneOptionsGenerator(0, smogEnterSceneHeight, '.smog-enter-scene');

  // Night Sky Enter
  const nightSkyEnterTween = fromToSceneGenerator('#taipei-night-clouds', 1, { autoAlpha: 0, xPercent: -30 }, { autoAlpha: 1, xPercent: 0 });
  const nightSkyEnterOptions = sceneOptionsGenerator(0, nightCloudIntroSceneHeight, '.night-cloud-intro-scene');

  const nightMoonEnterTween = fromToSceneGenerator('.pge-moon', 1, { autoAlpha: 0 }, { autoAlpha: 1 })
  const nightMoonEnterOptions = sceneOptionsGenerator(0, nightCloudIntroSceneHeight, '.night-cloud-intro-scene');

  //
  //           Taipei Night Skyline Tweens
  // ==========================================
  const skylineEnterSceneHeight = getHeight('.skyline-enter-scene');
  const skylineDividedHeight = skylineEnterSceneHeight / 7

  const nightSkylineTwoTween = fromToSceneGenerator('#pge-night-sky2', 1, { yPercent: 170 }, { yPercent: 0 });
  const nightSkylineTwoOptions = sceneOptionsGenerator(0, skylineEnterSceneHeight, '.skyline-enter-scene');

  const nightSkylineThreeTween = fromToSceneGenerator('#pge-night-sky3', 1, { yPercent: 160 }, { yPercent: 0 });
  const nightSkylineThreeOptions = sceneOptionsGenerator(0, skylineEnterSceneHeight, '.skyline-enter-scene');

  const nightSkylineFourTween = fromToSceneGenerator('#pge-night-sky4', 1, { yPercent: 150 }, { yPercent: 0 });
  const nightSkylineFourOptions = sceneOptionsGenerator(0, skylineEnterSceneHeight, '.skyline-enter-scene');

  const nightSkylineFiveTween = fromToSceneGenerator('#pge-night-sky5', 1, { yPercent: 140 }, { yPercent: 0 });
  const nightSkylineFiveOptions = sceneOptionsGenerator(0, skylineEnterSceneHeight, '.skyline-enter-scene');

  const nightSkylineSixTween = fromToSceneGenerator('#pge-night-sky6', 1, { yPercent: 130 }, { yPercent: 0 });
  const nightSkylineSixOptions = sceneOptionsGenerator(0, skylineEnterSceneHeight, '.skyline-enter-scene');

  const nightSkylineSevenTween = fromToSceneGenerator('#pge-night-sky7', 1, { yPercent: 120 }, { yPercent: 0 });
  const nightSkylineSevenOptions = sceneOptionsGenerator(0, skylineEnterSceneHeight, '.skyline-enter-scene');

  const nightSkylineEightTween = fromToSceneGenerator('#pge-night-sky8', 1, { yPercent: 110 }, { yPercent: 0 });
  const nightSkylineEightOptions = sceneOptionsGenerator(0, skylineEnterSceneHeight, '.skyline-enter-scene');

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
  //           Night Skyline Scene
  // ==========================================
  const nightSkylineSceneHeight = getHeight('.night-skyline-scene')

  const moonExitTween = fromToSceneGenerator('.pge-moon', 1, { yPercent: 0, autoAlpha: 1 }, { yPercent: 200, autoAlpha: 0 });
  const moonExitOptions = sceneOptionsGenerator(0, nightSkylineSceneHeight, '.night-skyline-scene');

  const textOneEnterTween = fromToSceneGenerator('#text-container-one', 1, { autoAlpha: 0 }, { autoAlpha: 1 });
  const textOneEnterOptions = sceneOptionsGenerator(halfHeight, halfHeight, '.night-skyline-scene');

  //
  //           Taipei Day Skyline Tweens
  // ==========================================
  const daySkylineSceneHeight = getHeight('.day-skyline-scene');

  const skylineTextEnterTween = fromToSceneGenerator('.skyline-text-container', 1, { autoAlpha: 0 }, { autoAlpha: 1 });
  const skylineTextEnterOptions = sceneOptionsGenerator(0, halfHeight, '.day-skyline-scene');

  const textOneExitTween = fromToSceneGenerator('#text-container-one', 1, { autoAlpha: 1 }, { autoAlpha: 0 });
  const textOneExitOptions = sceneOptionsGenerator(0, halfHeight, '.day-skyline-scene');

  const daySkylineEnterTween = fromToSceneGenerator('.taipei-day-skyline', 1, { autoAlpha: 0 }, { autoAlpha: 1 });
  const daySkylineEnterOptions = sceneOptionsGenerator(0, daySkylineSceneHeight, '.day-skyline-scene');

  const nightCloudsExitTween = fromToSceneGenerator('.taipei-night-clouds', 1, { autoAlpha: 1 }, { autoAlpha: 0 });
  const nightCloudsExitOptions = sceneOptionsGenerator(0, daySkylineSceneHeight, '.day-skyline-scene');

  const dayCloudsEnterTween = fromToSceneGenerator('.taipei-day-clouds', 1, { autoAlpha: 0 }, { autoAlpha: 1 });
  const dayCloudsEnterOptions = sceneOptionsGenerator(0, daySkylineSceneHeight, '.day-skyline-scene');

  //
  //           Night Fade Out
  // ==========================================

  const nightSkylineExitTween = fromToSceneGenerator('.taipei-night-skyline', 1, { autoAlpha: 1 }, { autoAlpha: 0 });
  const nightSkylineExitOptions = sceneOptionsGenerator(0, daySkylineSceneHeight, '.day-skyline-scene');

  const changeSkyTween = fromToSceneGenerator('.scene-two-background', 1, { background: 'linear-gradient(#005D5A, #257A77)' } , { background: 'linear-gradient(#00B8CE, #A1E2DE)'})
  const changeSkyOptions = sceneOptionsGenerator(0, daySkylineSceneHeight, '.day-skyline-scene');

  const sunRiseTween = fromToSceneGenerator('.pge-sun', 1, { yPercent: 200, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1 });
  const sunRiseOptions = sceneOptionsGenerator(0, daySkylineSceneHeight, '.day-skyline-scene');

  //
  //           Mobile Phone Scene
  // ==========================================

  const mobilePhoneSceneHeight = getHeight('.mobile-phone-scene');

  const handPhoneTween = fromToSceneGenerator('.hand-phone-container', 1, { xPercent: 100 }, { xPercent: 0 });
  const handPhoneOptions = sceneOptionsGenerator(0, mobilePhoneSceneHeight, '.mobile-phone-scene');

  const handPhoneOverlayTween = fromToSceneGenerator('.mobile-phone-overlay', 1, { autoAlpha: 0 }, { autoAlpha: 1 });
  const handPhoneOverlayOptions = sceneOptionsGenerator(0, mobilePhoneSceneHeight, '.mobile-phone-scene');

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
  //           Mobile Panels Scene
  // ==========================================
  const mobilePanelsNodes = sliceArray(document.querySelectorAll('.pge-mobile-panels'))
  const mobilePanelsTweens = {
    from: { autoAlpha: 0, y: -20 },
    to: { autoAlpha: 1, y: 0 },
  }

  const mobilePanelsScenes = multiSceneCreate('.mobile-panels-scene', mobilePanelsNodes, '#mobile-panel', mobilePanelsTweens)

  //
  //           Mobile Progress Bar Scene
  // ==========================================
  const mobilePanelsSceneHeight = getHeight('.mobile-panels-scene')

  const progressBarTween = fromToSceneGenerator('.progress-bar', 1, { xPercent: -100 }, { xPercent: 0 });
  const progressBarOptions = sceneOptionsGenerator(0, mobilePanelsSceneHeight, '.mobile-panels-scene');

  //
  //           City Exit Scene
  // ==========================================
  const cityExitSceneHeight = getHeight('.city-exit-scene');

  const mobilePanelsExitTween = fromToSceneGenerator('.mobile-panels-container', 1, { autoAlpha: 1 }, { autoAlpha: 0 });
  const mobilePanelsExitOptions = sceneOptionsGenerator(0, cityExitSceneHeight, '.city-exit-scene');

  const cityExitTween = fromToSceneGenerator('.skyline-container', 1, { autoAlpha: 1 }, { autoAlpha: 0 });
  const cityExitOptions = sceneOptionsGenerator(0, cityExitSceneHeight, '.city-exit-scene');

  const overlayExitTween = fromToSceneGenerator('.mobile-phone-overlay', 1, { autoAlpha: 1 }, { autoAlpha: 0 })
  const overlayExitOptions = sceneOptionsGenerator(0, cityExitSceneHeight, '.city-exit-scene');

  const skylineTextExitTween = fromToSceneGenerator('.skyline-text-container', 1, { autoAlpha: 1 }, { autoAlpha: 0 })
  const skylineTextExitOptions = sceneOptionsGenerator(0, cityExitSceneHeight, '.city-exit-scene');

  //
  //           People Popup Scene
  // ==========================================
  const peoplePopupSceneHeight = getHeight('.people-popup-scene');

  const peopleTextIntroTween = fromToSceneGenerator('.people-text-container', 1, { autoAlpha: 0 }, { autoAlpha: 1 })
  const peopleTextIntroOptions = sceneOptionsGenerator(0, peoplePopupSceneHeight, '.people-popup-scene')

  const peopleNodes = sliceArray(document.querySelectorAll('.pge-people'))
  const peopleTweens = {
    from: { yPercent: 100 },
    to: { yPercent: 0 },
  }

  const peopleScenes = multiSceneCreate('.people-popup-scene', peopleNodes, '#pge-people', peopleTweens)

  //
  //           People Popup Scene
  // ==========================================
  const formIntroSceneHeight = getHeight('.form-intro-scene');

  const formIntroTween = fromToSceneGenerator('.form-scene-container', 1, { autoAlpha: 0 }, { autoAlpha: 1 });
  const formIntroOptions = sceneOptionsGenerator(0, formIntroSceneHeight, '.form-intro-scene')

  const supportTextExitTween = fromToSceneGenerator('.support-container', 1, { xPercent: 0, left: '3%' }, { xPercent: -50, left: '50%' });
  const supportTextExitOptions =  sceneOptionsGenerator(0, formIntroSceneHeight, '.form-intro-scene')

  //
  //           Scene Controller
  // ==========================================
  TweenMax.set('.cloud-container', { yPercent: -30 });
  TweenMax.set('#text-container-one', { autoAlpha: 0 })
  TweenMax.set('#taipei-night-clouds', { autoAlpha: 0 })
  TweenMax.set('.pge-moon', { autoAlpha: 0 })
  TweenMax.set('.mobile-phone-overlay', { autoAlpha: 0 })
  TweenMax.set('#pge-night-sky1', { autoAlpha: 0 });
  TweenMax.set('.skyline-text-container', { autoAlpha: 0 });
  TweenMax.set('.form-scene-container', { autoAlpha: 0 });

  pgeController.addScene([
    // Act 1
    sceneGenerator(chevronExitOptions, chevronExitTween),
    sceneGenerator(heroOptionsOne, heroTweenOne),
    sceneGenerator(cloudOptionsOne, cloudTweenOne),
    sceneGenerator(cloudLeftOptions, cloudLeftTween),
    sceneGenerator(cloudRightOptions, cloudRightTween),
    sceneGenerator(logoEnterOptions, logoEnterTween),
    sceneGenerator(logoExitOptions, logoExitTween),
    sceneGenerator(taiwanEnterOptions, taiwanEnterTween),
    sceneGenerator(supportTextEnterOptions, supportTextEnterTween),
    sceneGenerator(taiwanZoomOptions, taiwanZoomTween),
    sceneGenerator(cloudZoomOptions, cloudZoomTween),
    sceneGenerator(taiwanTextExitOptions, taiwanTextExitTween),
    sceneGenerator(oceanEnterOptions, oceanEnterTween),
    ...polluteScenes,
    sceneGenerator(oceanPolluteOptions, oceanPolluteTweens),
    killCloudsScene,
    // Act 2
    // Night Skyline
    sceneGenerator(smogEnterSceneOptions, smogEnterSceneTween),
    sceneGenerator(backgroundFadeOptions, backgroundFadeTween),
    sceneGenerator(nightSkyEnterOptions, nightSkyEnterTween),
    sceneGenerator(nightMoonEnterOptions, nightMoonEnterTween),
    sceneGenerator(skylineTextEnterOptions, skylineTextEnterTween),

    sceneGenerator(nightSkylineTwoOptions, nightSkylineTwoTween),
    sceneGenerator(nightSkylineThreeOptions, nightSkylineThreeTween),
    sceneGenerator(nightSkylineFourOptions, nightSkylineFourTween),
    sceneGenerator(nightSkylineFiveOptions, nightSkylineFiveTween),
    sceneGenerator(nightSkylineSixOptions, nightSkylineSixTween),
    sceneGenerator(nightSkylineSevenOptions, nightSkylineSevenTween),
    sceneGenerator(nightSkylineEightOptions, nightSkylineEightTween),
    sceneGenerator(moonExitOptions, moonExitTween),
    // Night to Day
    sceneGenerator(daySkylineEnterOptions, daySkylineEnterTween),
    sceneGenerator(nightSkylineExitOptions, nightSkylineExitTween),
    sceneGenerator(changeSkyOptions, changeSkyTween),
    sceneGenerator(nightCloudsExitOptions, nightCloudsExitTween),
    sceneGenerator(dayCloudsEnterOptions, dayCloudsEnterTween),
    //
    sceneGenerator(textOneEnterOptions, textOneEnterTween),
    sceneGenerator(sunRiseOptions, sunRiseTween),
    sceneGenerator(textOneExitOptions, textOneExitTween),
    ...cityPanelsScenes,
    sceneGenerator(handPhoneOptions, handPhoneTween),
    sceneGenerator(handPhoneOverlayOptions, handPhoneOverlayTween),
    ...mobilePowerBuildScenes,
    ...mobilePanelsScenes,
    sceneGenerator(progressBarOptions, progressBarTween),
    sceneGenerator(mobilePanelsExitOptions, mobilePanelsExitTween),
    sceneGenerator(cityExitOptions, cityExitTween),
    sceneGenerator(overlayExitOptions, overlayExitTween),
    sceneGenerator(skylineTextExitOptions, skylineTextExitTween),
    ...peopleScenes,
    sceneGenerator(peopleTextIntroOptions, peopleTextIntroTween),
    sceneGenerator(formIntroOptions, formIntroTween),
    sceneGenerator(supportTextExitOptions, supportTextExitTween),
  ])

  resizeHandler()
})

hotReload();

