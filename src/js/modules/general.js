const calcWithScroll = () => {
  let div = document.createElement('div');

  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';

  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
  
};

const sendData = ({ form, url, stateForm, dataType = 'json', headersElem = {} }) => {
  let body, contentType;

  const formDate = new FormData(form);

  for(let key in stateForm) {
    formDate.append(key, stateForm[key]);
  }

  switch (dataType) {
    case 'json':
      body = JSON.stringify(Object.fromEntries(formDate));
      contentType = 'application/json; charset=UTF-8';
      break;

    case 'form-data': 
      body = formDate;
      contentType = 'multipart/form-data';
      break;

    default:
      body = JSON.stringify(Object.fromEntries(formDate));
      contentType = 'application/json; charset=UTF-8';
      break;
  }

  const headers = new Headers();
  headers.append('content-type',contentType);
  
  for (let headerName in headersElem) {
    headers.append(headerName, headersElem[headerName]);
  }
  
  const request = new Request(url, {
      headers: headers,
      method: 'POST',
      body,
  });

  return fetch(request);

};

const mask = ({ selectorInputMask, matrix = '+38 (___) ___ __ __' }) => {
  
  const inputs = document.querySelectorAll(selectorInputMask);

  inputs.forEach( input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });

  let setCursorPosition = (pos, elem) => {
    elem.focus();

    if (elem.setSelelectionRange) {
      elem.setSelelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let  range = elem.createTextRange();

      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
    
  };

  function createMask(event) {

    let i = 0,
        def = matrix.replace(/\D/g, ''),
        value = this.value.replace(/\D/g, '');

    if (def.length >= value.length) {
      value = def;
    }
    
    if (this.value && this.value[1] !== matrix[1]) {
      value = value.substring(1) + event.data;
    }

    this.value = matrix.replace(/./g, function(a) {
    return /[_\d]/.test(a) && i < value.length ? value.charAt(i++) : i >= value.length ? '' : a;
    });

    if (event.type === 'blur') {
      if ( this.value.length === 2) this.value = '';
    } else {
      setCursorPosition(this.value.length, this);
    }

  }

};


export { calcWithScroll, sendData, mask };