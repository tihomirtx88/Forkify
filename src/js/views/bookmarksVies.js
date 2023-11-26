import icons from 'url:../../img/icons.svg';//Parse 2
import View from './View';
import previewView from './previewView.js';

class BookmarksView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;).';
    _successMessage = '';
    
    //Publisher subscriber
    addHandlerRender(handler){
      window.addEventListener('load', handler);
    };

    _generateMarkuo(){
        return this._data
          .map(bookmark => previewView.render(bookmark, false))
          .join('');
    }
};

export default new BookmarksView();


// preview__link--active

// <div class="preview__user-generated">
//                   <svg>
//                     <use href="${icons}#icon-user"></use>
//                   </svg>