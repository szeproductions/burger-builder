import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './Ingredient.css';


const getIngredient = (type) => {
  const availableIngredients = ['bread-bottom', 'bread-top', 'meat', 'bacon', 'cheese', 'salad'];

  if(availableIngredients.includes(type)) {
    const className = _.camelCase(type);
    if(type === 'bread-top') {
      return (
        <div className={className}>
          <div className='Seeds1'></div>
          <div className='Seeds2'></div>
        </div>
      )
    }
    else {
      return <div className={className}></div>
    }
  }

  else {
    return null;
  }
}

class Ingredient extends React.Component {
  render() {
    const ingredient = getIngredient(this.props.type);
    return ingredient;
  }
}

Ingredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Ingredient;
