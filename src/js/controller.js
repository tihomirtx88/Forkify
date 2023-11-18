import * as model from './model.js'; 
import recipeView from '../js/views/recipeView.js';

const { async } = require("regenerator-runtime");
import 'core-js/stable';
// Polifiling for everything
import 'regenerator-runtime/runtime';
// Polifiling asyn await  

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    console.log(err);
  }
};

['hashchange', 'load'].forEach(ev=> window.addEventListener(ev, controlRecipes));
