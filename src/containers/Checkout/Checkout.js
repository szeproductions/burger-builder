import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCanceledHandler = () => {

  }

  checkoutContinueHandler = () => {
    this.props.history.push(this.props.match.path + '/contact-data');
  }

  render() {
    if(this.props.ingredients === null) {
      return <Redirect to='/' />
    }
  	return (
      <div>
        <CheckoutSummary
          onCancelCheckout={this.checkoutCanceledHandler}
          onContinueCheckout={this.checkoutContinueHandler}
        />
        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </div>
  	);
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout);
