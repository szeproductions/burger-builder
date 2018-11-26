import React from 'react';

import './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
	return (
    <ul className='navigationItems'>
      <NavigationItem exact href='/'> Burger Builder </NavigationItem>
      <NavigationItem href='/orders'> Orders </NavigationItem>
      <NavigationItem href='/checkout'> Checkout </NavigationItem>
    </ul>
	);
}

export default NavigationItems;
