import React from 'react';

const BuildControl = (props) => {
  return (
    <div>
      <div>{props.label}</div>
      <button>less</button>
      <button>more</button>
    </div>
  );
}

export default BuildControl;
