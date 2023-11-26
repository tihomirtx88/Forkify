import icons from 'url:../../img/icons.svg';//Parse 2
import View from './View';
import previewView from './previewView.js';

class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query!Please try again.';
    _successMessage = ''

    _generateMarkuo(){
      return this._data
        .map(result => previewView.render(result, false))
        .join('');
  }

};

export default new ResultsView();


// preview__link--active

// <div class="preview__user-generated">
//                   <svg>
//                     <use href="${icons}#icon-user"></use>
//                   </svg>