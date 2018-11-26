import React, {Component} from 'react';

import {axiosOrder} from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';

// import './Orders.css';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axiosOrder.get('orders.json').then(res => {
      const orders = [];
      for(let key in res.data) {
          orders.push({...res.data[key], id: key});
      }

      this.setState({orders: orders, loading: false});
    }).catch(err => {
      this.setState({loading: false});
    });
  }

  render() {
    const orders = this.state.orders.map(order => {
      return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
    });
    return (
      <div>
        {this.state.loading ? <Spinner showBackdrop /> : null}
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axiosOrder);
