const sizes = () => {
  const initSizesElements = ( elementSelector ) => {
    const sizesElements = document.querySelectorAll(elementSelector);

    sizesElements.forEach( blockSizes => {

      blockSizes.addEventListener('mousemove', e => changeImg(e, 'show'));
      blockSizes.addEventListener('mouseleave', e => changeImg(e, 'hide'));

    });

    const changeImg = (e, action) => {
      const img = e.currentTarget.querySelector('img'),
            currentPathImg = img.getAttribute('src'),
            regExp = /-[0-9]+-1\..+$/;

      let mainImgSrc, opacityOtherElement;

      switch (action) {
        case 'show':
          opacityOtherElement = 0;
          mainImgSrc = !regExp.test(currentPathImg) ? currentPathImg?.replace(/(-[0-9]+)(\..+$)/, '$1-1$2') : currentPathImg;
          break;

        case 'hide':
          opacityOtherElement = 1; 
          mainImgSrc = regExp.test(currentPathImg) ? currentPathImg?.replace(/(-[0-9]+)(\..+$)/, '$2') : currentPathImg;
          break;

        default:
          opacityOtherElement = 1;
          mainImgSrc = currentPathImg;
      }
      
      img.setAttribute('src', mainImgSrc);
      img.parentElement.querySelectorAll(':not(.sizes-hit):not(img)').forEach(elem => elem.style.opacity = opacityOtherElement);

    };

  };

  initSizesElements('.sizes-block');

};

export default sizes;