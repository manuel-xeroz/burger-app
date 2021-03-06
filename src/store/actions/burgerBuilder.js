 import * as actionTypes from "./actionsTypes";
 import axios from '../../axios-orders';

 export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
 }

 export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
 }

 export const fetchFailed = () => {
     return {
         type: actionTypes.FETCH_FAILED,
     }
 }

 const setIngredients = (ingredients) => {
     return {
         type: actionTypes.SET_INGREDIENTS,
         ingredients: ingredients
     }
 }

 export const initIngredients = () => {
     return dispatch => {
        axios.get( 'https://burger-builer-86909-default-rtdb.firebaseio.com/ingredients.json' )
            .then( response => {
                dispatch(setIngredients(response.data));
            } )
            .catch( error => {
                dispatch(fetchFailed());
            } );
     }
 }