const styles = () => {
  const btnShowStyles = document.querySelector('.button-styles'),
        stylesBlock = document.querySelectorAll('.styles-block');

  btnShowStyles.addEventListener('click', e => {
    e.preventDefault();

    stylesBlock.forEach(elem => {
      const parentBlocks = elem.parentElement;
      const removeClasses = Array.from(parentBlocks.classList).filter(strClass => {
        return strClass.startsWith('hidden'); 
      });

      parentBlocks.classList.add('animated', 'fadeInUp', 'wow');


      removeClasses.forEach( hiddenClass => {
        parentBlocks.classList.remove(hiddenClass, 'style-2');
        parentBlocks.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
      });

    });

    btnShowStyles.remove();
  });
};

export default styles;