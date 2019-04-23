
import '../css/home.css';
import { hotReload } from './util.js'

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


hotReload();

