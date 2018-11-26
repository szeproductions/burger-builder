import React from 'react';

import burgerLogo from '../../assets/img/132 burger-logo.png';

const Logo = (props) => {
	return (
		<div className='pa2 h-100'>
      <img className='h-100' src={burgerLogo} />
    </div>
	);
}

export default Logo;
