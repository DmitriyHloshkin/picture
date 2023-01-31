const sliders = ({ slidesSelector, wrappSliderSelector, dir, prev, next, timeAutoChange = 3000 }) => {
  let slideIndex = 1;

  const slideItems = document.querySelectorAll(slidesSelector),
        wrapper = document.querySelector(wrappSliderSelector);

  let mainClassAnimation = dir === 'vertical' ? 'fadeInUp' : 'fadeInLeft',
      idSliderTimer;

  wrapper.style.overflow = 'hidden';
  
  wrapper.addEventListener('mouseenter', () => clearInterval(idSliderTimer) );
  wrapper.addEventListener('mouseleave', () => startTimerSlider() );

  function startTimerSlider() {
    idSliderTimer = setInterval(() => {
      showSlides(slideIndex += 1); 
    }, timeAutoChange); 
  }
        
  showSlides(1);
  startTimerSlider(); 

  try {
    const btnPrev = document.querySelector(prev),
          btnNext = document.querySelector(next);

    btnNext.addEventListener('click', () => changeSlide('next'));
    btnPrev.addEventListener('click', () => changeSlide('prev'));     

    let touchStart, touchEnd;

    wrapper.addEventListener('touchstart', e => {
      touchStart = e.touches[0].pageX;
      clearInterval(idSliderTimer); 
    });

    wrapper.addEventListener("touchend", function (e) {
      touchEnd = e.changedTouches[0].pageX;

      if (touchEnd - touchStart > 0) {
        changeSlide('next'); 
      } else if (touchEnd - touchStart < 0) {
        changeSlide('prev');
      }

      startTimerSlider();
      touchStart = touchEnd = null;
  });

    const changeSlide = (dir) => {
      let classAnimation; 

      if (dir === 'next') {
        classAnimation = 'fadeInLeft';
        slideIndex += 1;
      } else {
        classAnimation = 'fadeInRight';
        slideIndex -= 1;
      }

      showSlides(slideIndex, classAnimation); 
    };

  } catch (e) {}
  

  function showSlides(n, classAnimation = mainClassAnimation) {
    if (n > slideItems.length) slideIndex = 1;
    if (n < 1 ) slideIndex = slideItems.length;

    slideItems.forEach( slide => {
      slide.classList.add('animated');
      slide.classList.remove('fadeInRight');
      slide.style.display = 'none';
    });

    slideItems[slideIndex - 1].classList.add(classAnimation);
    slideItems[slideIndex - 1].style.display = 'block';
  }

};

export default sliders;