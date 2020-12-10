import * as model from './model.js';
import recipeView from './views/recipeView.js'; 
import searchView from './views/searchView.js'; 
import resultsView from './views/resultsView.js'; 

import icons from '../img/icons.svg';
//import icons from "url:../img/icons.svg";
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if(module.hot){
  module.hot.accept(); 
}

console.log(icons); 

//Get the first element in the document with class="recipe":
const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//[rv] = await expression;


const controlRecipes = async function (){
  try{
    const id = window.location.hash.slice(1);
    console.log(id); 

    if(!id) return; 
    recipeView.renderSpinner();  

    // 1) Loading recipe
    await model.loadRecipe(id); 
    //const {recipe} = model.state; 
    
    // 2) rendering recipe
    recipeView.render(model.state.recipe); 
    //const recipeview = new recipeView(model.state.recipe); 
  }catch(err){
    //console.log(err);
    recipeView.renderError('We could not find the recipe, please try another one.'); 
  }
};

const controlSearchResults = async function(){
  try{
    resultsView.renderSpinner(); 

   // 1) get search queries
    const query = searchView.getQuery(); 
    if(!query) return; 

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) render results
    console.log(model.state.search.results); 
    resultsView.render(model.state.search.results); 
  }catch (err){
    console.log(err);
  }
};

const init = function(){
  recipeView.addHandlerRender(controlRecipes); 
  searchView.addHandlerSearch(controlSearchResults); 
};
init(); 