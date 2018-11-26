import React from 'react';
import _ from 'lodash';
import './BuildControls.css';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => {
  const controls = Object.keys(props.ingredients).map(ingr => {
                    return(
                      <BuildControl
                        key={ingr}
                        label={_.capitalize(ingr)}
                        added={() => props.onAddIngredient(ingr)}
                        removed={() => props.onDeleteIngredient(ingr)}
                        disabled={props.ingredients[ingr] <= 0}
                      />
                    );
                  });
  return (
    <div className='buildControls'>
      <p>Price for your burger: {props.totalPrice.toFixed(2)}$</p>
      {controls}
      <button onClick={props.purchaseClick} disabled={!props.purchasable} className='orderButton'>ORDER NOW</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    purchasable: state.burger.purchasable,
  };
}

const mapActionToProps = (dispatch) => {
  return {
    // onAddIngredient: (ingredient) => action({type: actionTypes.ADD_INGREDIENT, ingredient: ingredient}),
    // onDeleteIngredient: (ingredient) => action({type: actionTypes.DEL_INGREDIENT, ingredient: ingredient})
    onAddIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
    onDeleteIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient))
  };
}

export default connect(mapStateToProps, mapActionToProps)(BuildControls);
