const portfolio = () => {
  const menu = document.querySelector('.portfolio-menu'),
    items = menu.querySelectorAll('li'),
    contentWrap = document.querySelector('.portfolio-wrapper'),
    contentBlocks = contentWrap.querySelectorAll('.portfolio-block');

  items.forEach(menuItem => menuItem.addEventListener('click', e => checkMenuItem(e.target)));

  checkMenuItem(items[0]);

  function checkMenuItem(item) {
    items.forEach(menuItem => menuItem.classList.remove('active'));
    item.classList.add('active');

    const filterClass = Array.from(item.classList).filter(itemClass => itemClass !== 'active' ? true : false);

    showContent(filterClass[0]);
  }

  function showContent(classContent) {
    const noBlocks = document.querySelector('.portfolio-no');

    contentBlocks.forEach(block => {
      block.classList.add('animated', 'fadeInLeft');
      block.style.display = 'none';
    });

    if (classContent === 'grandmother' || classContent === 'granddad') {
      noBlocks.style.display = 'block';
      return;
    } else {
      noBlocks.style.display = '';
    }

    const findingContent = Array.from(contentBlocks)
                                .filter(block => block.classList.contains(classContent) ? true : false);

    setTimeout(() => {
      findingContent.forEach(block => {
        block.style.display = 'block';
      });
    });

  }

};

export default portfolio;