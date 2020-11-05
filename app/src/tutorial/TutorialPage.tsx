import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
  tutorial_page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  main_tutorial: {
    flexGrow: 2
  },
  sidebar: {
    flexGrow: 1
  }
})

const TutorialPage: React.FC<RouteComponentProps> = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(props.match.params.learn);

  return (
    <div className={classes.tutorial_page}>
      <div className={classes.main_tutorial}>
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
      <div className={classes.sidebar}>
        <Link to={`/tutorial`}>
          <button>Tutorial Home</button>
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

