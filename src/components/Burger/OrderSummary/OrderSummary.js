import React from 'react';
import {connect} from 'react-redux';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Input/Button/Button';

const OrderSummary = (props) => {
  const ingredientSummary = Object.entries(props.ingredients).map(arr => {
    return arr[1] > 0 ? <li key={arr[0]}><span className='ttc'>{arr[0]}</span>: {arr[1]}</li> : null
  });

	return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Total Price: <strong>{props.totalPrice.toFixed(2)}$</strong></p>
      <p>Continue to Checkout?</p>
      <Button className='btn btn-danger' attributes={{onClick: props.cancelPurchase}}>Cancel</Button>
      <Button className='btn btn-success' attributes={{onClick: props.continuePurchase}}>Continue</Button>
    </Aux>
	);
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
  };
}

export default connect(mapStateToProps)(OrderSummary);
