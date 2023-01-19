import { calcWithScroll } from './general.js';
import { resetForm } from './forms.js';

  const statePopups = {
    showPopupGift: true,
    showPopupConsultation: true,
  };

  const modal = () => {

    const initModal = ({ triggerSelector , modalSelector }) => {
      const allTriggers = document.querySelectorAll(triggerSelector),
            modalWindow = document.querySelector(modalSelector);

      allTriggers.forEach( btnTrigger => {
        btnTrigger.addEventListener('click', e => {
          e.preventDefault();
          changeModal(modalWindow, 'show');
        });
      });

      modalWindow.addEventListener('click', e => {
        const target = e.target;

        if (target && (target.matches(modalSelector) || target.classList.contains('popup-close')) ) { 
          changeModal(modalWindow, 'close');
        }
      });
  };

    const showModalByScroll = () => {
      window.addEventListener('scroll', () => {
        const sumHeight = window.pageYOffset + document.documentElement.clientHeight,
              modalGift = document.querySelector('.popup-gift'),
              scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        
        if (sumHeight >= scrollHeight && !modalGift.matches('.show') && statePopups.showPopupGift ) {
            document.querySelector('.fixed-gift').dispatchEvent(new Event('click'));
        }
        
      });
  };

  showModalByTime(document.querySelector('.popup-consultation'), 60000);
  showModalByScroll();

  initModal({
    triggerSelector: '.button-design',
    modalSelector: '.popup-design',
  });

  initModal({
    triggerSelector: '.button-consultation',
    modalSelector: '.popup-consultation',
  });

  initModal({
    triggerSelector: '.fixed-gift',
    modalSelector: '.popup-gift',
  });


};


const changeModal = (modal, action = 'close') => {
  const giftImage = document.querySelector('.fixed-gift'),
        currentRightPositionGift = window.getComputedStyle(giftImage, null).getPropertyValue('right');

  switch (action) {
    case 'show':
      modal.classList.remove('fadeOut');
      modal.classList.add('fadeIn', 'show');
      statePopups.showPopupGift = false;
      statePopups.showPopupConsultation = false;

      document.body.style.cssText = `overflow: hidden;
                                    margin-right: ${calcWithScroll()}px`;
      giftImage.style.right = `calc(${currentRightPositionGift} + ${calcWithScroll()}px)`;

      if (modal.matches('.popup-gift')) {
          const giftImg = document.querySelector('.fixed-gift');
                giftImg.classList.remove("infinite");
                giftImg.classList.add("fadeOut");

          const animationFadeOut = giftImg.getAnimations().find(animation => {
            if (animation.animationName === 'fadeOut') return true;
          });

          if (animationFadeOut) animationFadeOut.finished.then(res => giftImg.style.display = 'none');  
      }
      break;

    case 'close':
      
      modal.classList.remove('fadeIn');
      modal.classList.add('fadeOut');
      statePopups.timerPopupConsultation = true;

      const animationFadeOut = modal.getAnimations().find(animation => {
        if (animation.animationName === 'fadeOut') return true;
      });

      if (animationFadeOut) animationFadeOut.finished.then(res => {
        
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.cssText = `overflow: scroll;
                                        margin-right: 0`;

        giftImage.style.right = `calc(${currentRightPositionGift} - ${calcWithScroll()}px)`;
        resetForm(modal.querySelector('form'));
      });
      

      break;
  }

};

const  showModalByTime = (modal, time) => {
  setTimeout(() => {
    if (statePopups.showPopupConsultation) changeModal(modal,'show'); 
  }, time);
};

export default modal;

export { changeModal };