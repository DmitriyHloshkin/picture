const accordion = ({ questionsSelector, answerSelector }) => {
  const accordionQuestions = document.querySelectorAll(questionsSelector),
        accordionAnswer = document.querySelectorAll(answerSelector);

    hideAnswers();

  accordionQuestions.forEach( question => {
    question.addEventListener('click', () => {
      const answear = question.parentElement.nextElementSibling;
      hideAnswers();
      showAnswers(answear);

    });      
  });


  function hideAnswers() {
    accordionAnswer.forEach(answer => {
      answer.classList.add('animated');
      answer.classList.add('fadeInDown');
      answer.style.display = 'none';
      answer.style.overflow = 'hiden';
    });
  }

  function showAnswers(answear) {
    if (answear) answear.style.display = 'block';
    
  }

  
};

export default accordion;