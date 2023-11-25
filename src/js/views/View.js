import icons from 'url:../../img/icons.svg';//Parse 2

export default class View {
  _data;
  render(data) {
    // If case there are not any recipes
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkuo();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data){
    //Update just dom elements
    this._data = data;
    const newMarkup = this._generateMarkuo();
    
    // Convert DOM to new object in Meomory
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, index) =>{
      const curEl = currentElements[index];
      
      //Update changed TEXT
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
                                      // Take only text from element 
        curEl.textContent = newEl.textContent;
      }
      
      //Update changed atribbuted
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `
       <div class="spinner">
         <svg>
           <use href="${icons}#icon-loader"></use>
         </svg>
       </div> 
     `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `
     <div class="error">
         <div>
         <svg>
             <use href="${icons}#icon-alert-triangle"></use>
         </svg>
         </div>
         <p>${message}</p>
     </div>
     `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(successMessage = this._successMessage) {
    const markup = `
     <div class="message">
         <div>
         <svg>
             <use href="${icons}#icon-smile"></use>
         </svg>
         </div>
         <p>${message}</p>
     </div>
     `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
