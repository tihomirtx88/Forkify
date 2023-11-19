import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search:{
    query:'',
    results:[],
    page: 1,
    resultPerPage: RES_PER_PAGE
  }
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSearchResults = async function(query){
  try {
    // Store query in state
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    // &key=${KEY}
    
    // store data in state
    state.search.results = data.data.recipes.map(rec=> {
      return{
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      }
    });

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSearchResultsPage = function(page = state.search.page){
  // Keep with page we are
  state.search.page = page;

  const start = (page - 1) * state.search.resultPerPage;//0;
  // Previus page and multiply by how many result i want per page 1- 1 * 10 = 0
  const end = page * state.search.resultPerPage;//9; 1 * 10 = 10

  return state.search.results.slice(start, end);
};
