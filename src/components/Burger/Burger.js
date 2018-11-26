import React from 'react';

import {connect} from 'react-redux';

import './Burger.css'
import Ingredient from './Ingredient/Ingredient';

const Burger = (props) => {
  let ingredients = Object.keys(props.ingredients)
                      .map(igKey => {
                        return [...Array(props.ingredients[igKey])].map((_, i) => {
                          return <Ingredient key={igKey + i} type={igKey} />
                        });
                      }).flat();

  if(ingredients.length === 0) {
      ingredients = <p className='bg-light-blue pa2 mt2 mb2 ma5'>Please start adding ingredients</p>
  }

  return (

    <div className='burger'>
      <Ingredient type='bread-top' />
      {ingredients}
      <Ingredient type='bread-bottom' />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
  };
}

export default connect(mapStateToProps)(Burger);
