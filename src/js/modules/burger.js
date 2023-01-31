const burger = (menuSelector, burgerSelector) => {
  const burger = document.querySelector(burgerSelector),
        menu = document.querySelector(menuSelector);
  
  menu.style.display = 'none';
  
  burger.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'none' && document.body.clientWidth < 992 ? 'block' : 'none';
  });

  window.addEventListener('resize', () => {
    if (document.body.clientWidth > 992) {
      menu.style.display = 'none';
    }
  });

};

export default burger;