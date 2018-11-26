import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';

import './Ingredient.css';


class Ingredient extends React.Component {
  getIngredient = (type) => {
    if(typeof this.props.availableIngredients !== 'object')
      return null;

    const availableIngredients = [...Object.keys(this.props.availableIngredients), 'bread-top', 'bread-bottom'];
    if(availableIngredients.includes(type)) {
      const className = _.camelCase(type);
      if(type === 'bread-top') {
        return (
          <div className={className}>
            <div className='seeds1'></div>
            <div className='seeds2'></div>
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

  render() {
    const ingredient = this.getIngredient(this.props.type);
    return ingredient;
  }
}

Ingredient.propTypes = {
  type: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    availableIngredients: state.burger.availableIngredients,
  };
}

export default connect(mapStateToProps)(Ingredient);
