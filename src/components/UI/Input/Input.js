import React from 'react';

import Select from './Select/Select';
import Button from './Button/Button';

import './Input.css';

const Input = (props) => {
  let classes = 'inputElement';
  if(props.attributes.className !== undefined) {
    classes += ' ' + props.attributes.className;
  }

  let inputElement = null;
  switch (props.type) {
    case 'textarea':
      inputElement = <textarea {...props.attributes} className={classes} />;
      break;
    case 'select':
      inputElement = <Select {...props} className={classes} />
      break;
    case 'button':
      inputElement = <Button {...props} className={classes}>{props.label}</Button>
      break;
    default:
      inputElement = <input {...props.attributes} className={classes} />;
      break;
  }

	return (
		<div className='custom-input-9876b'>
      {props.showLabel !== false ? <label className='label'>{props.label}</label> : null}
      {inputElement}
    </div>
	);
}

export default Input;
