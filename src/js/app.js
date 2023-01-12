import { checkWebp } from './modules/gulpScripts.js';
import modal from './modules/modal.js';
import sizes from './modules/sizes.js';

window.addEventListener('DOMContentLoaded', () => {
  checkWebp();
  modal();
  sizes();

});