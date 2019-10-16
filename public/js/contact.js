
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

  function post(url, body, callback) {
    const req = new XMLHttpRequest();
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status < 400) {
        callback(null, JSON.parse(req.responseText));
      } else {
        callback(new Error("Request failed: " + req.statusText));
      }
    })

    req.send(JSON.stringify(body));
  }

  function success() {
    Swal.fire({
      type: 'success',
      title: '發信成功',
      text: '謝謝您支持綠能！我們會跟你',
    })
  }

  function error(err) {
    Swal.fire({
      type: 'error',
      title: '發生問題',
      text: '請直接發信到 sales@pacgenergy.com',
    })
  }

  $('#form-button').click(function(e) {
    e.preventDefault();

    const url = 'https://m5wrd3lwg1.execute-api.us-east-1.amazonaws.com/dev/';
    const captchaResponse = grecaptcha.getResponse();
    const checkedRadio = document.querySelector('.pge-radio:checked').getAttribute('id');
    const errorCatch = {
      formVals: false,
      captcha: false,
    }

    const formNames = checkedRadio === 'land' ? {...formBase, ...formLand} : {...formBase, ...formStructure}
    const formData = $('#pge-form').serializeArray()

    const mailBody = formData.reduce((acc, cur) => {
      if (checkedRadio === 'land' && cur.name === 'number') {
        errorCatch.formVals = !cur.value
      }
      if (checkedRadio === 'structure' && cur.name === 'address') {
        errorCatch.formVals = !cur.value
      }

      return formNames.hasOwnProperty(cur.name)
        ? acc + `${formNames[cur.name]}: ${cur.value}\n`
        : acc;
    }, '')

    errorCatch.captcha = !captchaResponse;

    const payload = formData.reduce((acc, cur) => {
      if (formNames.hasOwnProperty(cur.name)) {
        acc[cur.name] = cur.value
      }

      return acc;
    }, { captchaResponse, mailBody })

    if (!errorCatch.formVals && !errorCatch.captcha) {
      Swal.fire({
        title: '發信中...',
        onOpen: () => { Swal.showLoading() },
      })
      post(url, payload, (err, res) => {
        if (err) { return error(err) };
        success();
      })
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
