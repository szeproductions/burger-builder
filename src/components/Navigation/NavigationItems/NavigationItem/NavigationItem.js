import React from 'react';
import {NavLink} from 'react-router-dom'
import './NavigationItem.css';

const NavigationItem = (props) => {
	return (
    <li className='navigationItem'>
			<NavLink exact={props.exact ? true : false} to={props.href}>{props.children}</NavLink>
      {/* <a href={props.href}
        className={props.active ? 'active' : null}>
        {props.children}
      </a> */}
    </li>
	);
}

export default NavigationItem;
