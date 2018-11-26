import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import './Spinner.css';

const Spinner = (props) => {
	return (
		<Aux>
    	<Backdrop show={props.showBackdrop}/>
			<div className='spinnerParent center h-100 w-100'>
				<div className="spinner">
				  <div className="double-bounce1"></div>
				  <div className="double-bounce2"></div>
				</div>
			</div>
		</Aux>
	);
}

export default Spinner;
