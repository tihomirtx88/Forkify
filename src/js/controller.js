import * as model from './model.js'; 
import recipeView from '../js/views/recipeView.js';
import searchView from '../js/views/searchView.js';
import resultView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

const { async } = require("regenerator-runtime");
import 'core-js/stable';
// Polifiling for everything
import 'regenerator-runtime/runtime';
// Polifiling asyn await  

// From Parcel
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function(){
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1 Loading recipe
    await model.loadRecipe(id);
    const {recipe} = model.state;

    //  2 Render recipe
    recipeView.render(model.state.recipe);
  
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function(){
  try {
    // Render pizza
    resultView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if(!query) return;
    
    // Load search result
    await model.loadSearchResults(query);
  
    // Render search results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage(3));
    
    //4 Render initial pagination buttons
    paginationView.render(model.state.search);
    
  } catch (err) {
    console.log(err);
  }
};

// Here i will render later results
const controlPagination = function(gotoPage){
     // 1 Render new result
     resultView.render(model.getSearchResultsPage(gotoPage));
    
     //2 Render new pagination buttons
     paginationView.render(model.state.search);
};


// Publisher-subcriber pattern
const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
