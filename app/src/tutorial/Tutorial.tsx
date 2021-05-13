import React, { useState, createContext, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import Styling from '../constants/Styling';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LinkIcon from '@material-ui/icons/Link';
import CodeIcon from '@material-ui/icons/Code';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import TvIcon from '@material-ui/icons/Tv';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CommentIcon from '@material-ui/icons/Comment';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import StyleIcon from '@material-ui/icons/Style';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import BrushIcon from '@material-ui/icons/Brush';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 350,
    height: 300,
    margin: 20,
    border: `1px solid gray`,
    backgroundColor: Styling.tutorialGray,
    color: 'white',
    borderRadius: '5%',
    boxShadow: '10px 10px 10px gray'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
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
    boxShadow: '10px 10px 10px #00001a',
    border: `1px solid ${Styling.darkBlue}`,
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'lightgray'
  },
  wrapper: {
    display: 'flex',
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
    alignSelf: 'center',
    justifySelf: 'center'
  }
});

const Tutorial: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();

  const topics = [
    'Pages',
    'Route Links',
    'Code Preview',
    'Reusable Components',
    'Canvas',
    'Component Tree',
    'HTML Elements',
    'Styling',
    'Customization',
    'Annotations',
    'States',
    'CSS Editor',
    'Keyboard Shortcuts',
  ];

  const icons = [
    <MenuBookIcon className={classes.icons} />,
    <LinkIcon className={classes.icons} />,
    <CodeIcon className={classes.icons} />,
    <AddToPhotosIcon className={classes.icons} />,
    <TvIcon className={classes.icons} />,
    <AccountTreeIcon className={classes.icons} />,
    <AddPhotoAlternateIcon className={classes.icons} />,
    <StyleIcon className={classes.icons} />,
    <ColorLensIcon className={classes.icons} />,
    <CommentIcon className={classes.icons} />,
    <SwapVertIcon className={classes.icons} />,
    <BrushIcon className={classes.icons} />,
    <KeyboardIcon className={classes.icons} />,
  ];

  const body = document.querySelector('body');
  body.style.overflowY = 'auto';
  body.style.backgroundColor = Styling.tutorialGray;

  const cards = topics.map((topic, i) => {
    return (
      <div key={`k${i}`} className={classes.cardWrapper}>
        <Link to={`/tutorialPage/${topic}`} style={{ textDecoration: 'none' }} >
          <Card className={classes.root} variant="elevation">
            <CardContent>
              <Typography className={classes.title}>{topic}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions} >
                {icons[i]}
            </CardActions>
          </Card>
        </Link>
      </div>
    );
  });

  return (
    <Container maxWidth="xl" className={classes.container}>
      <h1 className={classes.pageTitle}>ReacType Tutorial</h1>
      <div className={classes.wrapper}>{cards}</div>
    </Container>
  );
};

export default withRouter(Tutorial);
