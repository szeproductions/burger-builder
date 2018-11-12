import React from 'react';

import Aux from '../../hoc/Aux';



const Layout = (props) => {
  return (
    <Aux>
      <div>
        ToolBar, SideDrawer, Backdrop
      </div>
      <main className="mt3">
        {props.children}
      </main>
    </Aux>
  );
}

export default Layout;