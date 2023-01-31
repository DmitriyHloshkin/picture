const drop = () => {
  const fileInputs = document.querySelectorAll('[name="upload"]');

  ['drop', 'dragenter', 'dragleave', 'dragover'].forEach( eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, preventDefaults, false);
    });
  });

  ['dragenter', 'dragover'].forEach( eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => highlight(input));
    });
  });

  ['dragleave', 'drop'].forEach( eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => unHighlight(input));
    });
  });

  fileInputs.forEach( input => {
    input.addEventListener('drop', e => {
      input.files = e.dataTransfer.files;
      console.log(e.dataTransfer);
      input.dispatchEvent(new Event('input'));
    });
  });

  function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function highlight(item) {
    item.closest('.file_upload').style.border = '5px solid yellow';
    item.closest('.file_upload').style.backgroundColor = 'rgba(0, 0, 0, .7)';
  }

  function unHighlight(item) {
    item.closest('.file_upload').style.border = 'none';
    item.closest('.file_upload').style.backgroundColor = '';
  }

};

export default drop;