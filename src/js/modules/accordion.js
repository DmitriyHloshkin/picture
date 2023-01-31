const accordion = (questionsSelector) => {
  const accordionQuestions = document.querySelectorAll(questionsSelector);

  accordionQuestions.forEach(question => {
    question.addEventListener('click', function() {

      accordionQuestions.forEach(question => {
        if(question !== this) {
          question.classList.remove('selected-question');
          question.nextElementSibling.classList.remove('active-content');
          question.nextElementSibling.style.maxHeight = '0px';
        }
      });

      this.classList.toggle('selected-question');
      this.nextElementSibling.classList.toggle('active-content');
      
      if(this.classList.contains('selected-question')) {
        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 160 + 'px';      
      } else {
        this.nextElementSibling.style.maxHeight = '0px';
      }

    });
  });
  
};

export default accordion;