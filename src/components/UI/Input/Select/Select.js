import React from 'react';



// import './Select.css';

const Select = (props) => {
  const options = props.options.map(opt => {
    const optAttributes = {};

    optAttributes.value = opt.value ? opt.value : null;

    return (
      <option {...optAttributes} key={opt.name}>
        {opt.name}
      </option>
    );
  });

	return (
    <select className={props.className} {...props.attributes}>
      {options}
    </select>
	);
}

export default Select;
