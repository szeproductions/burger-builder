import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import {axiosOrder} from '../../axios';

import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.props.initializeState();
    // if(this.props.ingredients === null) {
    //   this.props.initializeState();
    // }
  }

  onPurchaseClick = () => {
    this.setState({purchasing: true});
  }

  onContinuePurchase = () => {
    this.props.history.push({
      pathname: '/checkout',
    });
  }

  onCancelPurchase = () => {
    this.setState({purchasing: false});
  }

  render() {
    console.log(this.props);
    if(this.props.ingredients !== null) {
      return (
        <Aux>
          <Modal closed={this.onCancelPurchase} show={this.state.purchasing}>
            {this.state.loading ? <Spinner showBackdrop /> : null}
            <OrderSummary continuePurchase={this.onContinuePurchase} cancelPurchase={this.onCancelPurchase} />
          </Modal>
          <Burger />
          <BuildControls purchaseClick={this.onPurchaseClick} />
        </Aux>
      );
    }
    else {
      return (
        this.props.error ? "The application can't be loaded" : <Spinner showBackdrop={false}/>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    error: state.burger.error
  };
}

const mapActionToProps = (dispatch) => {
  return {
    //initializeState: (availableIngredients) => action({type: actionTypes.INITIALIZE, ingredients: availableIngredients}),
    initializeState: () => dispatch(actions.initialize()),
  };
}

export default connect(mapStateToProps, mapActionToProps)(withErrorHandler(BurgerBuilder, axiosOrder));
