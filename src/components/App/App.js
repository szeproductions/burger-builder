import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';

import Layout from '../../containers/Layout/Layout';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../../containers/Checkout/Checkout';
import Orders from '../../containers/Orders/Orders';
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path='/' component={BurgerBuilder} />
              <Route path='/checkout' component={Checkout} />
              <Route path='/orders' component={Orders} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </Layout>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
