import React from 'react';
import _ from 'lodash';

import './Order.css';

const Order = (props) => {
  const ingredients = _.toPairs(props.ingredients).map(ingArr => {
      if(parseInt(ingArr[1]) > 0) {
        return <li key={ingArr[0]}>{ingArr[0]}({ingArr[1]})</li>
      }
      return null;
  });

	return (
    <div className='order'>
      <p>Ingredients: </p><ul>{ingredients}</ul>
      <p>Price: {props.price.toFixed(2)}$</p>
    </div>
	);
}

export default Order;
