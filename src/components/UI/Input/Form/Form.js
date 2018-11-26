import React from 'react';

import Input from '../Input';

// import './Form.css';

const getElements = (formElements) => {
  const elements = Object.entries(formElements).map((entry) => {
    const name = entry[0];
    const options = entry[1];

    if(options.type === undefined) {
      const elm = getElements(options);
      return (
        <div key={name}>
          <h3>{name}</h3>
          <div>{elm}</div>
        </div>
      );
    }

    if(options.attributes === undefined) {
        options.attributes = {name: name};
    }else if(options.attributes.name === undefined) {
      options.attributes.name = name;
    }
    const el = <Input key={name} label={name} {...options} />
    return el;
  });

  return elements;
}

const Form = (props) => {
  const inputElements = getElements(props.elements);
	return (
		<form>
      {inputElements}
    </form>
	);
}

export default Form;
