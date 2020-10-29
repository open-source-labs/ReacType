import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

// import Grid from '@material-ui/core/Grid';

// import ComponentPanel from '../components/left/ComponentPanel';
// import HTMLPanel from '../components/left/HTMLPanel';

// Left-hand portion of the app, where component options are displayed

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 300,
    display: 'flex',
    margin: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 24,
  },
  pos: {
    marginBottom: 12,
    margin: 20
  },
});

const Tutorial: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const topics = ['Pages', 'Route Links', 'Code Preview', 'Reusable Components', 'Canvas', 'Component Tree', 'HTML Elements', 'Styling', 'Customization'];
  const routes = ['/pages', '/links', '/code-preview', '/reusable-components', '/canvas', '/component-tree', '/html-elements', '/styling', '/customization'];
  const cards = topics.map((topic, i) => {
    return (
    <div style={{display: 'flex', flexDirection: 'column', flexBasis: '33.333333%'}}>  
      <Card className={classes.root} variant="elevation" style={{display: 'flex', flexDirection: 'column'}}>
        <CardContent>
          <Typography className={classes.title}>
            {topic}
          </Typography>
        </CardContent>
        <CardActions>
        <Link to={routes[i]} style={{textDecoration: 'none'}}>
          <Button size="large">Learn More</Button>
        </Link>
        </CardActions>
      </Card>
    </div>
    )
  })
  return (
    // <div style={{display:'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      <Container maxWidth="xl" style={{display:'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <center><h1>Reactype Tutorial</h1></center>
        <div style={{display:'flex', justifyContent: 'center', flexWrap: 'wrap', width: '75%'}}>  
          {cards}
        </div>
        <Link to={`/`}>
          <button>Application</button>
        </Link>
      </Container>
    // </div>
  );
};

export default withRouter(Tutorial);

