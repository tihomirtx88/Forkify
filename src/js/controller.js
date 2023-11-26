import * as model from './model.js'; 
import recipeView from '../js/views/recipeView.js';
import searchView from '../js/views/searchView.js';
import resultView from './views/resultsView.js';
import bookmarksView from './views/bookmarksVies.js';
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

    //Update to results view to mark selected search results
    resultView.update(model.getSearchResultsPage());

    // 1 Loading recipe
    await model.loadRecipe(id);
    const {recipe} = model.state;

    //  2 Render recipe
    recipeView.render(model.state.recipe);

    //3 Update bookmarks view
    bookmarksView.update(model.state.bookmarks);
  
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

// Here i will render later results and pass to view 
const controlPagination = function(gotoPage){
     // 1 Render new result
     resultView.render(model.getSearchResultsPage(gotoPage));
    
     //2 Render new pagination buttons
     paginationView.render(model.state.search);
};

const controlServings = function(newServings){
  //Update recipe servings (in state)
  model.updateServings(newServings);

  // Updateing recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function(){
  // Add/Remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.removeBookmarks(model.state.recipe.id);
 
  // Update bookmark
  recipeView.update(model.state.recipe);

  //Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
};


// Publisher-subcriber pattern
const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
