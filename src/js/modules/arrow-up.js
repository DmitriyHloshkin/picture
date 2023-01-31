const arrowUp = () => {
  const arrowUp = document.querySelector('.arrow-up');

  // Плавный скрол
  document.querySelector('html').style.scrollBehavior = 'smooth';

  window.addEventListener('scroll', () => {
    const viewWindow = document.documentElement.clientHeight,
          allWindow = document.documentElement.scrollHeight,
          scrolling = document.documentElement.scrollTop;
    
    arrowUp.style.visibility = allWindow - scrolling <= viewWindow + 500 ? 'visible' : 'hidden';

  });

  arrowUp.addEventListener('click', e => {
    e.preventDefault();
    document.documentElement.scrollTop = 0;
  });
  
};

export default arrowUp;