import React from 'react';

import './BuildControl.css';

const BuildControl = (props) => {
  return (
    <div className='buildControl'>
      <div className='label'>{props.label}</div>
      <button disabled={props.disabled} className='less' onClick={props.removed}>-</button>
      <button className='more' onClick={props.added}>+</button>
    </div>
  );
}

export default BuildControl;
