import React, { useState, useContext } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import Pages from './Pages';
import Customization from './Customization';
import Canvas from './Canvas';
import Styling from './Styling';
import RouteLinks from './RouteLinks';
import ReusableComponents from './ReusableComponents';
import ComponentTree from './ComponentTree';
import HTMLElements from './HtmlElements';
import CodePreview from './CodePreview';

import { PageContext } from './Tutorial';

const TutorialPage: React.FC<RouteComponentProps> = () => {
  const { page, setPage } = useContext(PageContext);

  return (
    <div>
      <div className="main-tutorial">
        {page === 'Pages' && <Pages/>}
        {page === 'Route Links' && <RouteLinks/>}
        {page === 'Code Preview' && <CodePreview/>}
        {page === 'Reusable Components' && <ReusableComponents/>}
        {page === 'Canvas' && <Canvas/>}
        {page === 'Component Tree' && <ComponentTree/>}
        {page === 'HTML Elements' && <HTMLElements/>}
        {page === 'Styling' && <Styling/>}
        {page === 'Customization' && <Customization/>}
      </div>
      <div className="sidebar">
        <Link to={`/tutorial`}>
          <button>Tutorial Main</button>
        </Link>
        <ul>
          <li onClick={() => setPage('Pages')}>Pages</li>
          <li onClick={() => setPage('Route Links')}>Route Links</li>
          <li onClick={() => setPage('Code Preview')}>Code Preview</li>
          <li onClick={() => setPage('Reusable Components')}>Reusable Components</li>
          <li onClick={() => setPage('Canvas')}>Canvas</li>
          <li onClick={() => setPage('Component Tree')}>Component Tree</li>
          <li onClick={() => setPage('HTML Elements')}>HTML Elements</li>
          <li onClick={() => setPage('Styling')}>Styling</li>
          <li onClick={() => setPage('Customization')}>Customization</li>
        </ul>
      </div>
    </div>
  );
};

export default withRouter(TutorialPage);

