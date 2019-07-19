
import '../css/home.css';
import { sliceArray } from './util.js';
import fullpage from 'fullpage.js';
import { TweenMax, TimelineMax } from "gsap/TweenMax";

const tweenClipPath = function(element, duration) {
  return TweenMax.to(element, duration, {
    clipPath: 'inset(0 0 0 0)',
    webkitClipPath: 'inset(0% 0% 0% 0%)',
  });
}

const tweenLargeRed = function(element, duration) {
  return TweenMax.fromTo(element, duration, {
    autoAlpha: 0,
    scale: 4,
  }, {
    autoAlpha: 1,
    scale: 1,
  })
}

const timelineMaster = {
  chapterTwo: {
    timeline: new TimelineMax({ paused: true }),
    elements: {
      textOne: document.querySelector('#text-one'),
      textTwo: document.querySelector('#text-two'),
    },
    init: function() {
      const {
        timeline,
        elements: {
          textOne,
          textTwo,
        }
      } = this;

      const textOneSteps = textOne.innerText.length
      const textTwoSteps = textOne.innerText.length

      timeline.add([
        TweenMax.fromTo('.cloud-left', 1.5, { yPercent: -50, xPercent: 0 }, { yPercent: -50, xPercent: -55, ease: Power2.easeInOut }),
        TweenMax.fromTo('.cloud-right', 1.5, { yPercent: -50, xPercent: 0 }, { yPercent: -50, xPercent: 55, ease: Power2.easeInOut })
      ])
        .to('#logo-one', 1.25, { autoAlpha: 1 })
        .to('#logo-one', 1.25, { autoAlpha: 0 })
        .to('#taiwan-one', 1.25, { autoAlpha: 1 }, '-=1.25')
        .fromTo('#tw-one', 1, { autoAlpha: 0, x: -50, y: -50 }, { autoAlpha: 1, x: 0, y: 0, ease: Back.easeOut })
        .fromTo('#tw-two', 1, { autoAlpha: 0, x: -50, y: -50 }, { autoAlpha: 1, x: 0, y: 0, ease: Back.easeOut }, '-=0.5')
        .fromTo('#taiwan-one', 2.5, { scale: .33 }, { scale: 1, ease: Back.easeOut })
        .add(tweenClipPath('#text-one', 1.25), '-=2.5')
        .add(tweenClipPath('#text-two', 1.25), '-=1')
    }
  },

  chapterThree: {
    timeline: new TimelineMax({ paused: true }),
    animalDieTweens: {
      from: { scale: 1, autoAlpha: 1 },
      to: { scale: 0, autoAlpha: 0 }
    },
    powerBuildTweens: {
      from: { scaleY: 0 },
      to: { scaleY: 1, transformOrigin: '50% 100%', },
    },
    elements: {
      polluteNodes: sliceArray(document.querySelectorAll('.pge-pollute')),
      powerOnNodes: sliceArray(document.querySelectorAll('.power-on')),
    },
    init: function() {
      const {
        timeline,
        elements: {
          polluteNodes,
          powerOnNodes,
        },
        animalDieTweens,
        powerBuildTweens,
      } = this;

      const POWER_ON_BASE_DURATION = 0.3;
      const powerOnDuration = powerOnNodes.length * POWER_ON_BASE_DURATION;

      const polluteTweens = polluteNodes.sort((a, b) => {
        return parseInt(a.getAttribute('data-order')) - parseInt(b.getAttribute('data-order'))
      }).map((node, index) => {
        const type = node.getAttribute('data-type')
        const nodeId = node.getAttribute('id')

        const variableTween = type === 'animal' ? animalDieTweens : powerBuildTweens

        return TweenMax.fromTo(`#${nodeId}`, .3, variableTween.from, variableTween.to);
      })

      const powerOnTweens = powerOnNodes.map((node, index) => {
        const nodeId = node.getAttribute('id');

        return TweenMax.fromTo(`#${nodeId}`, .3, { autoAlpha: 0}, { autoAlpha: 1 })
      })

      timeline.add(polluteTweens, 0, 'sequence')
        .add([
          tweenClipPath('#ocean-text-one', 1),
          tweenLargeRed('#ocean-red-one', 1),
          tweenClipPath('#ocean-text-two', 1),
        ], '-=3', 'sequence')
        .add(powerOnTweens, 'powerOnLabel', 'sequence')
        .add(TweenMax.fromTo('#act-three-view', powerOnDuration, { background: 'radial-gradient(#fff, #00B8CE)' }, { background: 'radial-gradient(#fff, #257A77)' }), 'powerOnLabel')
        .add([
          TweenMax.fromTo('.ocean-right', 1, { xPercent: 125 }, { xPercent: 0 }),
          TweenMax.fromTo('.ocean-left', 1, { xPercent: -125 }, { xPercent: 0 }),
        ])
        .add(tweenClipPath('#ocean-text-three', 1))
        .fromTo('#ocean-smog', 2, { yPercent: -50, xPercent: -50, scale: 0 }, { yPercent: -50, xPercent: -50, scale: 3 }, 'smogEnterLabel+=1')
        .add([
          TweenMax.to('#ocean-text-one', 1, { color: '#fff' }),
          TweenMax.to('#ocean-text-two', 1, { color: '#fff' }),
          TweenMax.to('#ocean-text-three', 1, { color: '#fff' }),
        ], 'smogEnterLabel+=1')
    }
  },

  chapterFour: {
    timeline: new TimelineMax({ paused: true }),
    elements: {
      daySkylineNodes: sliceArray(document.querySelectorAll('.pge-day-skyline')),
      cityPanelNodes: sliceArray(document.querySelectorAll('.pge-city-panels')),
    },
    init: function() {
      const {
        timeline,
        elements: {
          daySkylineNodes,
          cityPanelNodes,
        }
      } = this;
      const SKYLINE_BASE_DURATION = 0.25;
      const cityPanelDuration = SKYLINE_BASE_DURATION * cityPanelNodes.length
      const daySkylineLength = daySkylineNodes.length;

      const daySkylineTweens = daySkylineNodes.map((node, index) => {
        const nodeId = node.getAttribute('id');
        const duration = 1 + ((daySkylineLength - index) * SKYLINE_BASE_DURATION);

        return TweenMax.fromTo(`#${nodeId}`, duration, { yPercent: 100 }, { yPercent: 0, ease: Power3.easeOut })
      })

      const cityPanelTweens = cityPanelNodes.map((node, index) => {
        const nodeId = node.getAttribute('id');

        return TweenMax.fromTo(`#${nodeId}`, SKYLINE_BASE_DURATION, { autoAlpha: 0, y: -70 }, { autoAlpha: 1, y: 0 });
      })

      timeline.add(daySkylineTweens, 0)
        .add([
          tweenClipPath('#city-text-one', 1),
          tweenLargeRed('#city-red-one', 1),
          tweenClipPath('#city-text-two', 1),
          tweenLargeRed('#city-red-two', 1),
          tweenClipPath('#city-text-three', 1),
          tweenLargeRed('#city-red-three', 1),
        ], 'cityTextLabel', 'sequence')
        .add(cityPanelTweens, 'cityPanelLabel', 'sequence')
        .add([
          TweenMax.to('#taipei-night-skyline', cityPanelDuration, { autoAlpha: 0 }),
          TweenMax.to('#pge-day-sky3', cityPanelDuration, { autoAlpha: 0 }),
          TweenMax.to('#pge-day-sky7', cityPanelDuration, { autoAlpha: 0 }),
        ], 'cityPanelLabel')
        .to('.city-text', cityPanelDuration, { color: '#000d54' }, 'cityPanelLabel')
    },
  },

  chapterFive: {
    timeline: new TimelineMax({ paused: true }),
    elements: {
      mobileProgressNodes: sliceArray(document.querySelectorAll('.mobile-progress')),
    },
    mobilePanelTweens: {
      from: { autoAlpha: 0, y: -20 },
      to: { autoAlpha: 1, y: 0 },
    },
    mobilePowerTweens: {
      from: { scaleY: 1, transformOrigin: '50% 100%', },
      to: { scaleY: 0 },
    },
    init: function() {
      const {
        timeline,
        mobilePowerTweens,
        mobilePanelTweens,
        elements: {
          mobileProgressNodes,
        }
      } = this;

      const PROGRESS_BASE_DURATION = 0.4;
      const progressBarDuration = PROGRESS_BASE_DURATION * mobileProgressNodes.length;

      const mobileProgressTweens = mobileProgressNodes.sort((a, b) => {
        return parseInt(a.getAttribute('data-order')) - parseInt(b.getAttribute('data-order'))
      }).map((node, index) => {
        const type = node.getAttribute('data-type');
        const nodeId = node.getAttribute('id');

        const variableTween = type === 'power' ? mobilePowerTweens : mobilePanelTweens

        return TweenMax.fromTo(`#${nodeId}`, PROGRESS_BASE_DURATION, variableTween.from, variableTween.to);
      })

      timeline.add([
        TweenMax.fromTo('#hand-phone-skyline', 1.5, { filter: 'blur(0)' }, { filter: 'blur(5px)' }),
        TweenMax.fromTo('#phone-sky-elements', 1.5, { filter: 'blur(0)' }, { filter: 'blur(5px)' }),
        TweenMax.fromTo('.hand-phone-container', 1.5, { xPercent: 100 }, { xPercent: 0 }),
      ])
        .add([
          tweenClipPath('#phone-text-one', 1),
          tweenLargeRed('#phone-bold-one', 1),
          tweenClipPath('#phone-text-two', 1),
          tweenLargeRed('#phone-bold-two', 1),
          tweenClipPath('#phone-text-three', 1),
        ], 'phoneTextLabel', 'sequence')
        .add(TweenMax.fromTo('.progress-bar', progressBarDuration, { xPercent: -100 }, { xPercent: 0 }), 'progressLabel')
        .add(mobileProgressTweens, 'progressLabel', 'sequence')
        .fromTo('#progress-bar-text', .5, { scale: 0 }, { scale: 1, ease: Back.easeOut })
    },
  },

  chapterSix: {
    timeline: new TimelineMax({ paused: true }),
    elements: {
      peopleNodes: sliceArray(document.querySelectorAll('.pge-people')),
    },
    init: function() {
      const {
        timeline,
        elements: {
          peopleNodes,
        },
      } = this;

      const PEOPLE_BASE_DURATION = 0.4;

      const peopleTweens = peopleNodes.map((node, index) => {
        const nodeId = node.getAttribute('id');
        const duration = PEOPLE_BASE_DURATION * index

        return TweenMax.fromTo(`#${nodeId}`, PEOPLE_BASE_DURATION, { yPercent: 100 }, { yPercent: 0 });
      })

      timeline.add(peopleTweens, 0, 'sequence')
        .fromTo('#people-logo', 1.5, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1 })
        .add(tweenLargeRed('#people-text', 1.5))
    }
  }

}

const pgeFullpage = new fullpage('#fullpage', {
  anchors: ['chapterOne', 'chapterTwo', 'chapterThree', 'chapterFour', 'chapterFive', 'chapterSix', 'chapterSeven'],
  recordHistory: false,
  afterLoad: function(origin, destination, direction) {
    const { anchor: destinationAnchor } = destination;
    const originAnchor = origin && origin.anchor || null;

    timelineMaster[originAnchor] && timelineMaster[originAnchor].timeline.progress(0).pause();

    timelineMaster[destinationAnchor] && timelineMaster[destinationAnchor].timeline.resume()
  },
})

/**
 * Handle radio events
 */

sliceArray(document.querySelectorAll('.pge-radio')).forEach(radio => {
  radio.addEventListener('click', (e) => {
    const inputId = e.target.getAttribute('id')
    const allInputs = document.querySelectorAll('.radio-inputs');

    sliceArray(allInputs).forEach(node => {
      let newClassName = node.className;

      if (node.className.indexOf('hidden') > -1) {
        newClassName = newClassName.split(' ');
        newClassName.pop()
        newClassName = newClassName.join(' ');
      } else {
        newClassName = `${node.className} hidden`
      }

      node.className = newClassName
    })

  })
})

/**
 * Form button submit handler
 */
window.addEventListener('load', function(e) {

  $('#form-button').click(function() {
     const formNames = {
      name: '姓名',
      phone: '聯絡電話',
      email: '電子信箱',
      estate: '我有',
      city: '縣市',
      town: '鎮市區',
      lot: '地段',
      number: '地號'
    }
    const formData = $('#pge-form').serializeArray()
    const mailTarget = 'charleslee90@gmail.com';
    const mailSubject = `們臺地個 - ${formData[0].value}`;
    const mailBody = formData.reduce((acc, cur) => {
      return acc + `${formNames[cur.name]}: ${cur.value}\n`;
    }, '')

    $('#pge-form').attr('action', `mailto:${mailTarget}?subject=${mailSubject}&body=${mailBody}`);
    // $('#pge-form').submit();
  });
})

/**
 * Init all timelines
 */

Object.keys(timelineMaster).forEach((key, index) => {
  timelineMaster[key].init()
})
