import React from 'react';

import './SideDrawer.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
  const sdClass = props.open ? 'sideDrawer-open' : 'sideDrawer-close';
  const classes = ['sideDrawer', sdClass].join(' ');

	return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={classes}>
        <div className='logo'><Logo /></div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
	);
}

export default SideDrawer;
