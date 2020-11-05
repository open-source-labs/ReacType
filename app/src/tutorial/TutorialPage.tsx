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
  title: {
    color: '#14151f',
    fontSize: 54
  },
  text: {
    color: '#2e2f3e',
    fontSize: 24,
    maxWidth: '1065px'
  },
  wrapper: {
    margin: '30px 30px 30px 30px',
    width: 'auto'
  },
  img: {
    borderRadius: '3px',
    // alignSelf: 'center'
    width: '100%'
  },
  imgWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // border: '1px solid black',
    width: 'auto'
  },
  notLink: {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  sidebar: {
    borderLeft: '2px solid lightgrey',
    width: '30%',
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: '1.5em'
  }
})

const tutorialPageStyle = {
  tutorial_page: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f2f0f0',
    width: '100%',
    height: '100%',
  },
  main_tutorial: {
    width: '70%'
  },

  list: {
    listStyle: 'none'
  },
  listItem: {
    margin: '1em'
  },
  tutHomeButton: {
    padding: '4px 16px',
    fontSize: '1.2em'
  }
};

const body = document.querySelector('body');
body.style.overflowY = 'auto';
console.log(body.style);
const TutorialPage: React.FC<RouteComponentProps> = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(props.match.params.learn);

  return (
    <div style={tutorialPageStyle.tutorial_page}>
      <div style={tutorialPageStyle.main_tutorial}>
        {page === 'Pages' && <Pages classes={classes} setPage={setPage} />}
        {page === 'Route_Links' && <RouteLinks classes={classes} setPage={setPage} />}
        {page === 'Code_Preview' && <CodePreview classes={classes} setPage={setPage} />}
        {page === 'Reusable_Components' && <ReusableComponents classes={classes} setPage={setPage} />}
        {page === 'Canvas' && <Canvas classes={classes} setPage={setPage} />}
        {page === 'Component_Tree' && <ComponentTree classes={classes} setPage={setPage} />}
        {page === 'HTML_Elements' && <HTMLElements classes={classes} setPage={setPage} />}
        {page === 'Styling' && <Styling classes={classes} setPage={setPage} />}
        {page === 'Customization' && <Customization classes={classes} setPage={setPage} />}
      </div>
      <div className={classes.sidebar}>
        <Link to={`/tutorial`}>
          <button style={tutorialPageStyle.tutHomeButton}>Tutorial Home</button>
        </Link>
        <ul style={tutorialPageStyle.list}>
          <li style={tutorialPageStyle.listItem} className={classes.notLink} onClick={() => setPage('Pages')}>Pages</li>
          <li style={tutorialPageStyle.listItem} className={classes.notLink} onClick={() => setPage('Route_Links')}>Route Links</li>
          <li style={tutorialPageStyle.listItem} className={classes.notLink} onClick={() => setPage('Code_Preview')}>Code Preview</li>
          <li style={tutorialPageStyle.listItem} className={classes.notLink} onClick={() => setPage('Reusable_Components')}>Reusable Components</li>
          <li style={tutorialPageStyle.listItem} className={classes.notLink} onClick={() => setPage('Canvas')}>Canvas</li>
          <li style={tutorialPageStyle.listItem} className={classes.notLink} onClick={() => setPage('Component_Tree')}>Component Tree</li>
          <li style={tutorialPageStyle.listItem} className={classes.notLink} onClick={() => setPage('HTML_Elements')}>HTML Elements</li>
          <li style={tutorialPageStyle.listItem} className={classes.notLink} onClick={() => setPage('Styling')}>Styling</li>
          <li style={tutorialPageStyle.listItem} className={classes.notLink} onClick={() => setPage('Customization')}>Customization</li>
        </ul>
      </div>
    </div>
  );
};

export default withRouter(TutorialPage);

