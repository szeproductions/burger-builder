import _ from 'lodash';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  availableIngredients: null,
  totalPrice: 4.0,
  purchasable: false,
  error: false,
}

const reducer = (state = initialState, action) => {
  const newState = {...state};

  switch (action.type) {
    case actionTypes.FETCH_INGREDIENTS:
      return initialize(newState, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      newState.error = true;
      return newState;
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(newState, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(newState, action);
    default:
      return newState;
  }
}

const initialize = (state, action) => {
  state.availableIngredients = action.ingredients;
  state.ingredients = _.mapValues(action.ingredients, () => 0);

  return state;
}

const addIngredient = (state, action) => {
  const updatedIngredients = {...state.ingredients};
  updatedIngredients[action.ingredient] += 1;

  const newPrice = state.totalPrice + state.availableIngredients[action.ingredient];

  state.totalPrice = newPrice;
  state.ingredients = updatedIngredients;
  state.purchasable = true;
  return state;
}

const removeIngredient = (state, action) => {
  const updatedIngredients = {...state.ingredients};
  const type = action.ingredient;

  if(updatedIngredients[type] > 0) {
    updatedIngredients[type] -= 1;
    const newPrice = state.totalPrice - state.availableIngredients[type];

    state.totalPrice = newPrice;
    state.ingredients = updatedIngredients;
    state.purchasable = _.sum(Object.values(updatedIngredients)) > 0;
  }

  return state;
}
export default reducer;
