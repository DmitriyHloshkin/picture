const forms = () => {

  const initForm= ({ formSelector, validInputClass, invalidInputClass}) => {
    const forms = document.querySelectorAll(formSelector);
    
    forms.forEach(form => {
      const name = form.querySelector('[name="name"]'),
            phone = form.querySelector('[name="phone"]'),
            email = form.querySelector('[name="email"]'),
            comment = form.querySelector('[name="message"]');

      name?.addEventListener('input', e => {
        const inputName = e.target,
              resultValidation = inputNameValid(inputName);

        resultValidation.isValid ? showValidField(inputName) : showNoValidField(inputName, resultValidation.messageValidation);      
      });

      phone?.addEventListener('input', e => {
        const inputPhone = e.target,
              resultValidation = inputPhoneValid(inputPhone);

        resultValidation.isValid ? showValidField(inputPhone) : showNoValidField(inputPhone, resultValidation.messageValidation);
      });

      email?.addEventListener('input', e => {
        const inputEmail = e.target,
              resultValidation = inputEmailValid(inputEmail);

        resultValidation.isValid ? showValidField(inputEmail) : showNoValidField(inputEmail, resultValidation.messageValidation);
      });

      comment?.addEventListener('input', e => {
        const inputComment = e.target,
              resultValidation = inputCommentValid(inputComment);

        resultValidation.isValid ? showValidField(inputComment) : showNoValidField(inputComment, resultValidation.messageValidation);
      });

      form.addEventListener('submit', e => {
        e.preventDefault();

        if (!formValid(form)) return;
        showLoader(form);
        // setTimeout(() => closeLoader(form), 3000);
      });

    });

    function showValidField(field) {
      field.parentElement.classList.remove(invalidInputClass);
      field.parentElement.classList.add(validInputClass);
      removeInvalidMessage(field.parentElement); 
    }
    
    function showNoValidField(field, message = null) {
      field.parentElement.classList.remove(validInputClass);
      field.parentElement.classList.add(invalidInputClass);
      removeInvalidMessage(field.parentElement); 

      const messageElem = document.createElement('span');
      messageElem.classList.add('no-valid-message');
      messageElem.textContent = message;
      field.parentElement.append(messageElem);

    }

    function formValid(form) {
      checkAllInputs();
      const ivalidElems = form.querySelectorAll(`.valid-wrap.no-valid-input`);
    
      if (ivalidElems.length === 0) return true;
      
      ivalidElems.forEach( invalidElem => {
        showNoValidAnimation(invalidElem);
      });
    
      function showNoValidAnimation(elem) {    
        const keyFrames = [
          {transform: `translate3d(0, 0, 0)`},
          {transform: `translate3d(-5px, 0, 0)`},
          {transform: `translate3d(5px, 0, 0)`},
          {transform: `translate3d(-5px, 0, 0)`},
          {transform: `translate3d(5px, 0, 0)`},
          {transform: `translate3d(-5px, 0, 0)`},
          {transform: `translate3d(5px, 0, 0)`},
          {transform: `translate3d(-5px, 0, 0)`},
          {transform: `translate3d(5px, 0, 0)`},
          {transform: `translate3d(-5px, 0, 0)`},
          {transform: `translate3d(5px, 0, 0)`},
          {transform: `translate3d(0, 0, 0)`}
        ];
        elem.animate(keyFrames, 2000);
      }

      function checkAllInputs() {
        const inputs = form.querySelectorAll('input');

        inputs.forEach(input => {

          if ( input.matches('[name="name"]') ) {
            const resultValidation = inputNameValid(input);
            resultValidation.isValid ? showValidField(input) : showNoValidField(input, resultValidation.messageValidation);  

          } else if(input.matches('[name="phone"]') ) {
            const resultValidation = inputPhoneValid(input);
            resultValidation.isValid ? showValidField(input) : showNoValidField(input, resultValidation.messageValidation);

          } else if(input.matches('[name="email"]')) {
            const resultValidation = inputEmailValid(input);
            resultValidation.isValid ? showValidField(input) : showNoValidField(input, resultValidation.messageValidation);

          } else if (input.matches('[name="message"]')) {
            const resultValidation = inputCommentValid(input);
            resultValidation.isValid ? showValidField(input) : showNoValidField(input, resultValidation.messageValidation);
          }
            
        });
      }
    
    }

  };

  initForm({
    formSelector: '[data-form-type="callback"]',
    validInputClass: 'valid-input',
    invalidInputClass: 'no-valid-input',
  });

  initForm({
    formSelector: '[data-form-type="consultation"]',
    validInputClass: 'valid-input',
    invalidInputClass: 'no-valid-input',
  });

  initForm({
    formSelector: '[data-form-type="order"]',
    validInputClass: 'valid-input',
    invalidInputClass: 'no-valid-input',
  });

};

//! validation inputs
function inputNameValid(inputName) {
  const resultValidation = {
    isValid: true,
    messageValidation: '',
  };

  if (inputName.value === '' || /^\s+$/.test(inputName.value)) {
    resultValidation.isValid = false;
    resultValidation.messageValidation = 'Введите имя';
  }

  if (/^(\d|\s)+$/.test(inputName.value)) {
    resultValidation.isValid = false;
    resultValidation.messageValidation = 'Имя не корректно';
  }

  if (!/^(\d|\s|[А-яЁё])+$/.test(inputName.value)) {
    resultValidation.isValid = false;
    resultValidation.messageValidation = 'Имя не должно содержать латиницу';
  }


  return resultValidation;
}

function inputPhoneValid(inputPhone) {
  const resultValidation = {
    isValid: true,
    messageValidation: '',
  };

  if (inputPhone.value === '') {
    resultValidation.isValid = false;
    resultValidation.messageValidation = 'Введите телефон';
  }

  if (inputPhone.value.match(/\D/) ) {
    resultValidation.isValid = false;
    resultValidation.messageValidation = 'Не корректен телефон';
  }

  return resultValidation;

}

function inputEmailValid(inputEmail) {
  const resultValidation = {
    isValid: true,
    messageValidation: '',
  };

  if (inputEmail.value === '') {
    resultValidation.isValid = false;
    resultValidation.messageValidation = 'Введите почту';
  }

  if (!inputEmail.value.match(/^(\w|\d)+@(\w|\d){1,10}\.(\w|\d){1,8}$/)) {
    resultValidation.isValid = false;
    resultValidation.messageValidation = 'Почта не корректна';
  }

  return resultValidation;

}

function inputCommentValid(inputComment) {
  const resultValidation = {
    isValid: true,
    messageValidation: '',
  };

  if (!/^(\d|\s|[А-яЁё])+$/.test(inputComment.value)) {
    resultValidation.isValid = false;
    resultValidation.messageValidation = 'Комментарий не должно содержать латиницу';
  }

  return resultValidation;
}

//! form actions
function resetForm(form) {
  if (!form) return;

  form.reset();
  closeLoader(form);
  
  const blocksValid = form.querySelectorAll('.valid-wrap');

  blocksValid.forEach(blockValid => {
    blockValid.classList.remove('valid-input');
    blockValid.classList.remove('no-valid-input');
    removeInvalidMessage(blockValid); 
  });
}

function removeInvalidMessage(searchBlock) {
  searchBlock.querySelectorAll('.no-valid-message').forEach(message => message.remove());
}

function showLoader(form) {
  const btnSend = form.querySelector('.button-order');

  if (btnSend) btnSend.style.display = 'none';

  const loader = document.createElement('div'),
        loaderImg = document.createElement('img');

  loaderImg.classList.add('loader__img');
  loaderImg.setAttribute('src', './img/loader/ajax-loader.gif');
  loaderImg.style.cssText = `width: 100%;`;

  loader.classList.add('loader');
  loader.style.cssText = `height: 40px;
                          width: 40px;
                          margin: 0 auto`;

  loader.append(loaderImg);

  form.append(loader);
}

function closeLoader(form) {
  const btnSend = form.querySelector('.button-order');
  if (btnSend) btnSend.style.display = 'block';
  form.querySelector('.loader')?.remove();
}

export { resetForm };
export default forms;