import React from 'react';
import './Button.css'
const Button = (props) => {
	return (
		<button
      {...props.attributes}
      className={props.className}
			>
        {props.children}
    </button>
	);
}

export default Button;
