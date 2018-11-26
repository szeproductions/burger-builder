import React from 'react';

import './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
	return (
		<header className='toolbar'>
      <div className='mobileOnly h-100' onClick={props.toggleSideDrawer}><Logo /></div>
      <div className='desktopOnly h-100'><Logo /></div>
      <nav className='desktopOnly'>
        <NavigationItems />
      </nav>
    </header>
	);
}

export default Toolbar;
