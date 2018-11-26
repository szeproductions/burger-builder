import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  onCloseSideDrawer = () => {
    this.setState({showSideDrawer: false})
  }

  toggleSideDrawer = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar toggleSideDrawer={this.toggleSideDrawer} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.onCloseSideDrawer} />
        <main className="mt5">
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;
