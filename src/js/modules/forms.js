import { sendData, mask } from './general.js';

const forms = (stateForm) => {
  const uploads = document.querySelectorAll('[name="upload"]');

  uploads.forEach( inputUpload => {
    inputUpload.addEventListener('input', () => {
      if (inputUpload.files[0]) {

        const parent = inputUpload.parentElement.querySelector('div'),
              fileName = inputUpload.files[0].name,
              arrNameFile = fileName.split('.'),
              dots = arrNameFile[0].length >= 9 ? '...' : '.';

        if (parent) {
          parent.textContent =  arrNameFile[0].substring(0, 10) + dots + arrNameFile[1]; 
        }
      }
    });
  });

  mask({
    selectorInputMask: '[name="phone"]', 
    matrix : '+38 (___) ___ __ __',
  });
  
  const initForm= ({ formSelector, validInputClass, invalidInputClass}) => {
    const forms = document.querySelectorAll(formSelector);
    
    forms.forEach(form => {
      const name = form.querySelector('[name="name"]'),
            phone = form.querySelector('[name="phone"]'),
            email = form.querySelector('[name="email"]'),
            comment = form.querySelector('[name="message"]'),
            upload = form.querySelector('[name="upload"]'),
            sizes = form.querySelector('#size'),
            materials = form.querySelector('#material'),
            options = form.querySelector('#options'),
            promo = form.querySelector('.promocode');

      name?.addEventListener('input', e => {
        const inputName = e.target,
              {isValid, messageValidation} = inputNameValid(inputName);

        isValid ? showValidField(inputName) : showNoValidField(inputName, messageValidation);      
      });

      phone?.addEventListener('input', e => {
        const inputPhone = e.target,
              {isValid, messageValidation} = inputPhoneValid(inputPhone);

        isValid ? showValidField(inputPhone) : showNoValidField(inputPhone, messageValidation);
      });

      email?.addEventListener('input', e => {
        const inputEmail = e.target,
              {isValid, messageValidation} = inputEmailValid(inputEmail);

        isValid ? showValidField(inputEmail) : showNoValidField(inputEmail, messageValidation);
      });

      comment?.addEventListener('input', e => {
        const inputComment = e.target,
              {isValid, messageValidation} = inputCommentValid(inputComment);

        isValid ? showValidField(inputComment) : showNoValidField(inputComment, messageValidation);
      });

      sizes?.addEventListener('change', changeSelectFunction);

      materials?.addEventListener('change', changeSelectFunction);

      options?.addEventListener('change', caclFunc);
      
      promo?.addEventListener('input', caclFunc);

      form.addEventListener('submit', e => {
        e.preventDefault();
        if (!formValid(form)) return;
        showLoader(form);
        sendForm(form, stateForm);

      });

      function caclFunc() {
        const summBlock = document.querySelector('.calc-price'),
              promo = document.querySelector('.promocode');
              
        let sum = 0;

        if (!sizes.value || !materials.value) {
          summBlock.textContent = 'Укажите размер и материал';
          return;
        } 

        sum = Math.round((+sizes.value) * (+materials.value));

        if (options.value) {
          sum += +options.value;
        }

        if (promo.value.trim() === 'IWANTPOPART') {
          stateForm.isSale = true;
          sum = Math.round(sum * 0.7);
        }

        stateForm.sum = sum;
        summBlock.textContent = sum;
  
      }
  
      function changeSelectFunction() {
        let message;
        
        if (this.value !== '') {
          showValidField(this);
          caclFunc();
        } else {
          
          if (this.matches('#size')) {
            message = 'Укажите размер';
          }else if (this.matches('#material')) {
            message = 'Укажите материал';
          }
  
          showNoValidField(this, message);
        }
  
      }

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
      const ivalidElems = form.querySelectorAll('.valid-wrap.no-valid-input');
    
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
        const inputs = form.querySelectorAll('input'),
              selects = form.querySelectorAll('select');

        inputs.forEach(input => {

          if (input.matches('[name="name"]') ) {
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

        selects.forEach(select => {
          if (select.matches('#size') && select.value === '') {
            showNoValidField(select, 'Укажите размер');
          } else if (select.matches('#material') && select.value === '') {
            showNoValidField(select, 'Укажите материал');
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

  initForm({
    formSelector: '[data-form-type="calc"]',
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
    resultValidation.messageValidation = 'Имя не на латинице';
  }


  return resultValidation;
}

function inputPhoneValid(inputPhone) {
  const resultValidation = {
    isValid: true,
    messageValidation: '',
  };

  const phone = inputPhone.value.replace(/\D/g, '');

  if (phone === '') {
    resultValidation.isValid = false;
    resultValidation.messageValidation = 'Введите телефон';
  }

  if (phone.match(/\D/) ) {
    resultValidation.isValid = false;
    resultValidation.messageValidation = 'Не корректен телефон';
  }

  if (phone.replace(/\D/g, '').length !== 12 ) {
    resultValidation.isValid = false;
    resultValidation.messageValidation = 'Не хватает цыфр в номере';
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

  if (form.querySelector('.descr-file')) form.querySelector('.descr-file').textContent = 'Файл не выбран';
  
  form.style.display = 'block';
  form.classList.remove('animated', 'fadeOutUp');
  form.parentElement.querySelectorAll('.send-result').forEach(elem => elem.remove());
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
  loaderImg.style.cssText =`width: 100%;
                            margin-top: 15px;`;

  loader.classList.add('loader');

  loader.append(loaderImg);

  form.append(loader);
}

function closeLoader(form) {
  const btnSend = form.querySelector('.button-order');
  if (btnSend) btnSend.style.display = 'block';
  form.querySelector('.loader')?.remove();
}

const sendForm = async (form, stateForm) => {
  const optionSend = {
    form,
    dataType: 'json',
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'POST',
    stateForm,
  };
  
  try {
    const response = await sendData(optionSend);

    if(!response.ok) throw new Error('bad status');

    const result = await response.json();

    closeLoader(form);
    resultSendForm(form, 'success'); 

  } catch (error) {
    closeLoader(form); 
    resultSendForm(form, 'error');
    
  } finally {
    if (stateForm) {
      for (let key in stateForm) {
        delete stateForm[key];
      }
    }
  }
  
};

function resultSendForm(form, action) {
  let title = action === 'success' ? 'Заявка успешно принята!' : 'Что-то пошло не так',
      descr = action === 'error' ? 'Попробуйте оставить заявку позже еще раз' : 'Наш менеджер свяжется с вами в течении часа';

  const parentForm = form.parentElement,
        statusImg = document.createElement('img'),
        titleResult = document.createElement('h2'),
        descrResult = document.createElement('p');
  
  titleResult.classList.add('send-result');
  descrResult.classList.add('send-result');        
  descrResult.textContent = descr;
  titleResult.textContent = title;

  statusImg.classList.add('send-result'); 
  statusImg.style.cssText =`width: 70px;
                            margin-top: 10px;
                            height: 70px`;

  statusImg.setAttribute('src', action === 'success' ? './img/ok.png' : './img/validation-check/xmark.svg');


  if (form.matches('[data-form-type="calc"]') || form.matches('.consultation [data-form-type="consultation"]')) {
    titleResult.style.cssText = `margin-bottom: 0px;
                                margin-top: 0px;
                                margin-left: 35px;
                                font-size: 32px`;
    
    const btnSubmit = form.querySelector('.button-order');
    if (btnSubmit) btnSubmit.style.display = 'none';
    
    form.append(titleResult);
    
    setTimeout(() => {
      titleResult.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        titleResult.remove();
        form.querySelector('button').style.display = '';
        if( action === 'success' ) resetForm(form); 
        if (btnSubmit) btnSubmit.style.display = '';
      }, 400);
    }, 1000);

  } else {
    form.classList.add('animated', 'fadeOutUp');
    setTimeout(() => {
      form.style.display = 'none';
      parentForm.append(titleResult);
      parentForm.append(descrResult);
      parentForm.append(statusImg);
  
    },400);
  }

  
}

export { resetForm };
export default forms;