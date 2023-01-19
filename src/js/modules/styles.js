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

      removeClasses.forEach( hiddenClass => {
        parentBlocks.classList.remove(hiddenClass);
      });

    });

    btnShowStyles.remove();
  });
};

export default styles;