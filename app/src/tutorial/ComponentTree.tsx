import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';

// import ComponentPanel from '../components/left/ComponentPanel';
// import HTMLPanel from '../components/left/HTMLPanel';

// Left-hand portion of the app, where component options are displayed
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 350,
    height: 300,
    margin: 20,
    border: `1px solid ${Styling.darkBlue}`,
    backgroundColor: Styling.tutorialGray,
    color: 'white',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    color: Styling.darkBlue, 
    fontSize: 28,
    fontWeight: 500
  },
  pos: {
    marginBottom: 12,
    margin: 20
  },
  icons: {
    color: Styling.darkBlue,
    fontSize: 125
  },
  pageTitle: {
    fontSize: 100,
    color: Styling.darkBlue,
    boxShadow: '2px 2px',
    border: `1px solid ${Styling.darkBlue}`,
    padding: '20px',
    backgroundColor: 'white',
  },
  container: {
    display:'flex', 
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  wrapper: {
    display:'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '75%'
  },
  cardWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '33.333333%'
  },
  cardActions: {
    alignSelf:'center', 
    justifySelf:'center'
  }
});
const ComponentTree: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      ComponentTree
      <Link to={`/tutorial`}>
        <button>Tutorial</button>
      </Link>
    </div>
  );
};

export default withRouter(ComponentTree);

