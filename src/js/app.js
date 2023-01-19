import { checkWebp} from './modules/gulpScripts.js';
import modal from './modules/modal.js';
import sizes from './modules/sizes.js';
import sliders from './modules/sliders.js';
import styles from './modules/styles.js';
import accordion from './modules/accordion.js';
import forms from './modules/forms.js';
import WOW from 'wow.js';

window.addEventListener('DOMContentLoaded', () => {
  checkWebp();
  modal();
  sizes();
  styles();
  forms();

  new WOW().init();
  
  accordion({ 
    questionsSelector:'.accordion-heading span',
    answerSelector: '.accordion-block',
  });

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