import React from 'react';

import './CheckoutSummary.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Input/Button/Button';

const CheckoutSummary = (props) => {

	return (
		<div className='checkoutSummary'>
      <h1>We hope it tastes well</h1>
      <div className='w-100 center' style={{height: '300px'}}>
        <Burger />
      </div>
      <div className='w-100 center'>
        <Button className='btn btn-danger' attributes={{onClick: props.onCancelCheckout}}>Cancel</Button>
        <Button className='btn btn-success' attributes={{onClick: props.onContinueCheckout}}>Continue</Button>
      </div>
    </div>
	);
}

export default (CheckoutSummary);
