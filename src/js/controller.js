import * as model from './model.js';
import recipeView from './views/recipeView.js'; 
import icons from '../img/icons.svg';
//import icons from "url:../img/icons.svg";
import 'core-js/stable';
import 'regenerator-runtime/runtime';


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

const init = function(){
  recipeView.addHandlerRender(controlRecipes); 
};
init(); 