import icons from 'url:../../img/icons.svg'; //Parse 2
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

// Publisher-Subscriber
  addHandlerClick(handler){
    // Event delegation
    this._parentElement.addEventListener('click', function(e){
       const btn = e.target.closest('.btn--inline');
       if(!btn) return;
       const goto = +btn.dataset.goto;
       
    //    Pass to controller
       handler(goto);
    });
  };

  _generateMarkuo() {
    const currentPage = this._data.page;
    // Example: 70 results / 10 pages
    const numPages = Math.ceil(
        this._data.results.length / this._data.resultPerPage
    );
    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
    }
    // Last page
    if (currentPage === numPages && numPages > 1) {
      return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            `;
    }
    // Other page
    if (currentPage < numPages) {
      return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
    }

    // Page 1 and there are not other pages
    return '';
  }
}

export default new PaginationView();
