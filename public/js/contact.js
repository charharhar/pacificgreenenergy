
import '../css/contact.css';
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
 * Handle radio events
 */

sliceArray(document.querySelectorAll('.pge-radio')).forEach(radio => {
  radio.addEventListener('click', (e) => {
    const targetName = e.target.getAttribute('id');
    const inputId = e.target.getAttribute('id')
    const allInputs = sliceArray(document.querySelectorAll('.radio-inputs'));
    let baseClassName = 'form-group radio-inputs';

    sliceArray(allInputs).forEach(node => {
      const nodeName = node.getAttribute('data-name');
      let newClassName = baseClassName;

      if (nodeName !== targetName) {
        newClassName = `${baseClassName} hidden`;
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

    const mailTarget = 'sales@pacgenergy.com';
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
 * Event Handlers
 */
window.addEventListener('load', function(e) {
  $('.backtop-wrapper').click(function() {
    $('html, body').animate({
      scrollTop: $('body').offset().top
    }, 500);
  });
})

hotReload();
