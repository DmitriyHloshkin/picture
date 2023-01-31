import modal from './modules/modal.js';
import sizes from './modules/sizes.js';
import sliders from './modules/sliders.js';
import styles from './modules/styles.js';
import accordion from './modules/accordion.js';
import forms from './modules/forms.js';
import portfolio from './modules/portfolio.js';
import burger from './modules/burger.js';
import arrowUp from './modules/arrow-up.js';
import drop from './modules/drop.js';

import WOW from 'wow.js';

window.addEventListener('DOMContentLoaded', () => {
  const stateForm = {};
  new WOW().init();

  modal();
  sizes();
  styles();
  forms(stateForm);
  portfolio();
  burger('.burger-menu', '.burger');
  arrowUp();
  drop();
  accordion('.accordion-heading');

  sliders({
    slidesSelector: '.main-slider-item',
    wrappSliderSelector: '.main-slider',
    timeAutoChange: 3000,
    dir: 'vertical',
  });
  sliders({
    slidesSelector: '.feedback-slider-item',
    wrappSliderSelector: '.feedback-slider',
    timeAutoChange: 3000,
    prev: '.main-prev-btn',
    next: '.main-next-btn',
    dir: 'horizontal',
  });
  
});