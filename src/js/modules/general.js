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

function sendData({ form, url, formType, dataType = 'application/json; charset=UTF-8', method = 'POST', headersElem = {} }) {
  let body, contentType;

  switch (dataType) {
    case 'json':
      body = JSON.stringify(Object.fromEntries(new FormData(form)));
      contentType = 'application/json; charset=UTF-8';
      break;

    case 'form-data': 
      body = new FormData(form);
      contentType = 'multipart/form-data';
      break;

    default:
      body = JSON.stringify(Object.fromEntries(new FormData(form)));
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
      method: method,
      body: body,
  });

  return fetch(request);

}


export { calcWithScroll, sendData };