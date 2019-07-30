
import '../css/home.css';
import { sliceArray } from './util.js';
import fullpage from 'fullpage.js';
import { TweenMax, TimelineMax } from "gsap/TweenMax";

/**
 * Tween Full page Handlers
 */

const tweenClipPath = function(element, duration) {
  return TweenMax.to(element, duration, {
    clipPath: 'inset(0% 0% 0% 0%)',
    webkitClipPath: 'inset(0% 0% 0% 0%)',
    mozClipPath: 'inset(0% 0% 0% 0%)',
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
  chapterOne: {
    timeline: new TimelineMax({ paused: true }),
    elements: {},
    init: function() {
      const {
        timeline,
        elements: {},
      } = this;

      timeline.add([
        TweenMax.fromTo('.cloud-left', 2, { yPercent: -50, xPercent: 0 }, { yPercent: -50, xPercent: -50, ease: Power2.easeInOut }),
        TweenMax.fromTo('.cloud-right', 2, { yPercent: -50, xPercent: 0 }, { yPercent: -50, xPercent: 50, ease: Power2.easeInOut })
      ])
        .fromTo('#cloud-logo', 1.5, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1 })
        .add([
          tweenLargeRed('#cloud-text', 1.5),
          TweenMax.fromTo('.cloud-container', 1.5, { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 2 }),
          TweenMax.fromTo('#cloud-logo', 1.5, { scale: .7 }, { scale: 1 }),
        ])
        .fromTo('#chevron-one', 1, { autoAlpha: 0 }, { autoAlpha: 1 })
    }
  },
  chapterTwo: {
    timeline: new TimelineMax({ paused: true }),
    elements: {},
    init: function() {
      const {
        timeline,
        elements: {},
      } = this;

      timeline.fromTo('#taiwan-one', 5, { scale: .33 }, { scale: 1, ease: Back.easeOut }, 'taiwanZoomLabel')
        .fromTo('#tw-one', 1.5, { autoAlpha: 0, x: -50, y: -50 }, { autoAlpha: 1, x: 0, y: 0, ease: Back.easeOut }, 'taiwanZoomLabel')
        .fromTo('#tw-two', 1.5, { autoAlpha: 0, x: -50, y: -50 }, { autoAlpha: 1, x: 0, y: 0, ease: Back.easeOut }, 'taiwanZoomLabel+=1')
        .add(tweenClipPath('#text-one', 1.25), 'taiwanZoomLabel+=2.75')
        .add(tweenClipPath('#text-two', 1.25), 'taiwanZoomLabel+=4')
        .fromTo('#chevron-two', 1, { autoAlpha: 0 }, { autoAlpha: 1 })
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
    backgroundTweens: {
      from: {
        backgroundImage: 'radial-gradient(circle, #fff, #00B8CE)',
        webkitBackgroundImage: 'radial-gradient(circle, #fff, #00B8CE)',
        mozBackgroundImage: 'radial-gradient(circle, #fff, #00B8CE)',
      },
      to: {
        backgroundImage: 'radial-gradient(circle, #fff, #257A77)',
        webkitBackgroundImage: 'radial-gradient(circle, #fff, #257A77)',
        mozBackgroundImage: 'radial-gradient(circle, #fff, #257A77)',
      },
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
        backgroundTweens,
      } = this;

      const POWER_OFF_BASE_DURATION = 0.3;
      const POWER_ON_BASE_DURATION = 0.5;
      const powerOnDuration = powerOnNodes.length * POWER_ON_BASE_DURATION;

      const polluteTweens = polluteNodes.sort((a, b) => {
        return parseInt(a.getAttribute('data-order')) - parseInt(b.getAttribute('data-order'))
      }).map((node, index) => {
        const type = node.getAttribute('data-type')
        const nodeId = node.getAttribute('id')

        const variableTween = type === 'animal' ? animalDieTweens : powerBuildTweens

        return TweenMax.fromTo(`#${nodeId}`, POWER_OFF_BASE_DURATION, variableTween.from, variableTween.to);
      })

      const powerOnTweens = powerOnNodes.map((node, index) => {
        const nodeId = node.getAttribute('id');

        return TweenMax.fromTo(`#${nodeId}`, POWER_ON_BASE_DURATION, { autoAlpha: 0}, { autoAlpha: 1 })
      })

      timeline.add(polluteTweens, 0, 'sequence')
        .add([
          tweenClipPath('#ocean-text-one', 1),
          tweenLargeRed('#ocean-red-one', 1),
          tweenClipPath('#ocean-text-two', 1),
        ], '-=3', 'sequence')
        .add(TweenMax.fromTo('.whale-container', POWER_OFF_BASE_DURATION, animalDieTweens.from, animalDieTweens.to))
        .add(powerOnTweens, 'powerOnLabel', 'sequence')
        .add(TweenMax.fromTo('#act-three-view', powerOnDuration, backgroundTweens.from, backgroundTweens.to), 'powerOnLabel')
        .add([
          TweenMax.fromTo('.ocean-right', 1, { autoAlpha: 0 }, { autoAlpha: 1 }),
          TweenMax.fromTo('.ocean-left', 1, { autoAlpha: 0 }, { autoAlpha: 1 }),
        ])
        .add(tweenClipPath('#ocean-text-three', 1))
        .fromTo('#ocean-smog', 4, { yPercent: 100 }, { yPercent: 0, ease: Power2.easeOut }, 'smogEnterLabel+=1')
        .add([
          TweenMax.to('#ocean-text-one', 1, { color: '#fff' }),
          TweenMax.to('#ocean-text-two', 1, { color: '#fff' }),
          TweenMax.to('#ocean-text-three', 1, { color: '#fff' }),
        ], 'smogEnterLabel+=1')
        .fromTo('#chevron-three', 1, { autoAlpha: 0 }, { autoAlpha: 1 })
    }
  },

  chapterFour: {
    timeline: new TimelineMax({ paused: true }),
    elements: {
      daySkylineNodes: sliceArray(document.querySelectorAll('.pge-day-skyline')),
      cityPanelNodes: sliceArray(document.querySelectorAll('.pge-city-panels-animate')),
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
        .fromTo('#chevron-four', 1, { autoAlpha: 0 }, { autoAlpha: 1 })
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
        .add(TweenMax.fromTo('.progress-bar', progressBarDuration, { xPercent: -100 }, { xPercent: 0 }), 'phoneTextLabel')
        .add(mobileProgressTweens, 'phoneTextLabel', 'sequence')
        .fromTo('#progress-bar-text', .5, { scale: 0 }, { scale: 1, ease: Back.easeOut })
        .fromTo('#chevron-five', 1, { autoAlpha: 0 }, { autoAlpha: 1 })
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
        .fromTo('#chevron-six', 1, { autoAlpha: 0 }, { autoAlpha: 1 })
    }
  }

}

const pgeFullpage = new fullpage('#fullpage', {
  anchors: ['chapterOne', 'chapterTwo', 'chapterThree', 'chapterFour', 'chapterFive', 'chapterSix', 'chapterSeven'],
  recordHistory: false,
  navigation: true,
  navigationPosition: 'right',
  navigationTooltips: ['第一章', '第二章', '第三章', '第四章', '第五章', '第六章', '第七章', ],
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
  $('#form-button').click(function(e) {
    e.preventDefault();

    const formBase = {
      name: '姓名',
      phone: '聯絡電話',
      email: '電子信箱',
      city: '縣市',
      estate: '我有',
    }

    const formLand = {
      town: '鎮市區',
      lot: '地段',
      number: '地號',
    }

    const formStructure = {
      address: '門牌地址',
    }

    let hasError = true;
    // const captchaResponse = grecaptcha.getResponse();
    const checkedRadio = document.querySelector('.pge-radio:checked').getAttribute('id');

    const formNames = checkedRadio === 'land' ? {...formBase, ...formLand} : {...formBase, ...formStructure}
    const formData = $('#pge-form').serializeArray()

    const mailTarget = 'charleslee90@gmail.com';
    const mailSubject = `我要支持綠能 - ${formData[0].value}`;

    const mailBody = formData.reduce((acc, cur) => {
      if (checkedRadio === 'land' && cur.name === 'number') {
        hasError = !cur.value
      }
      if (checkedRadio === 'structure' && cur.name === 'address') {
        hasError = !cur.value
      }

      return formNames.hasOwnProperty(cur.name)
        ? acc + `${formNames[cur.name]}: ${cur.value}\n`
        : acc;
    }, '')

    // hasError = !!captchaResponse;

    if (!hasError) {
      $('#pge-form-submit').attr('href', `mailto:${mailTarget}?subject=${mailSubject}&body=${mailBody}`);
      $('#pge-form-submit')[0].click()
    } else {
      Swal.fire({
        type: 'error',
        title: '發生問題',
        text: '請務必填寫完整門牌地址或地號',
      })
    }
  });
})

/**
 * Init all timelines
 */
Object.keys(timelineMaster).forEach((key, index) => {
  timelineMaster[key].init()
})
