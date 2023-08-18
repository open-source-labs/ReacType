import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ComponentsContainer from './ComponentsContainer';
import ElementsContainer from './ElementsContainer';
import React from 'react';
import RoomsContainer from './RoomsContainer';
import TreeContainer from './TreeContainer';

function ContentArea() {
  const { contextParam, style } = useSelector((store) => ({
    contextParam: store.contextSlice,
    style: store.styleSlice
  }));
  const dispatch = useDispatch();

  const location = useLocation<{ hideContent: boolean }>();

  // If the hideContent flag is true, don't render any content
  if (location.state?.hideContent) {
    return null;
  }
  if (
    ['/elements', '/reuseable', '/component-tree', '/rooms'].includes(
      location.pathname
    )
  ) {
    return (
      <div className="left-container">
        <div className="column left" style={style.style}>
          <Switch>
            <Route path="/elements" component={ElementsContainer} />
            <Route path="/reuseable" component={ComponentsContainer} />
            <Route path="/component-tree" component={TreeContainer} />
            <Route path="/rooms" component={RoomsContainer} />
          </Switch>
        </div>
      </div>
    );
  }

  return null;
}

export default ContentArea;
