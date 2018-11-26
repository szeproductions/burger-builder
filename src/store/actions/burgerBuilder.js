import * as actionTypes from './actionTypes';
import {axiosOrder} from '../../axios';

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS,
    ingredients: ingredients,
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
}

export const initialize = () => {
  return dispatch => {
    axiosOrder.get('/ingredients.json').then(res => {
      dispatch(setIngredients(res.data));
    }).catch(error => {
      dispatch(fetchIngredientsFailed());
    });
  }
}

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: name,
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: name,
  }
}
