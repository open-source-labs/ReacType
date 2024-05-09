import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import Styling from '../constants/Styling';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LinkIcon from '@mui/icons-material/Link';
import CodeIcon from '@mui/icons-material/Code';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import TvIcon from '@mui/icons-material/Tv';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import StyleIcon from '@mui/icons-material/Style';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import BrushIcon from '@mui/icons-material/Brush';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

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

/**
 * Tutorial component displaying a list of topics with associated icons.
 * Each topic is rendered as a card, and clicking on a card navigates to a specific tutorial page.
 * Includes a close button to close the tutorial window.
 * @param {RouteComponentProps} props - RouteComponentProps object containing match, location, and history props
 * @returns {JSX.Element} - JSX element representing the Tutorial component
 */
const Tutorial: React.FC<RouteComponentProps> = (): JSX.Element => {
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
    'States',
    'CSS Editor',
    'Keyboard Shortcuts'
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
    <SwapVertIcon className={classes.icons} />,
    <BrushIcon className={classes.icons} />,
    <KeyboardIcon className={classes.icons} />
  ];
  const body = document.querySelector('body');
  body.style.overflowY = 'auto';
  body.style.backgroundColor = Styling.tutorialGray;
  const cards = topics.map((topic, i) => {
    return (
      <div key={`k${i}`} className={classes.cardWrapper}>
        <Link to={`/tutorialPage/${topic}`} style={{ textDecoration: 'none' }}>
          <Card className={classes.root} variant="elevation">
            <CardContent>
              <Typography className={classes.title}>{topic}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              {icons[i]}
            </CardActions>
          </Card>
        </Link>
      </div>
    );
  });
  return (
    <>
      <div>
        {/* <Link to='/' style={{textDecoration: 'none'}}> */}
        <Button
          variant="contained"
          color="primary"
          style={{ minWidth: '137.69px' }}
          className="navbarButton"
          id="ratingButton"
          onClick={window.close}
          endIcon={<CloseIcon />}
        >
          Close
        </Button>
        {/* </Link> */}
      </div>
      <Container maxWidth="xl" className={classes.container}>
        <h1 className={classes.pageTitle}>ReacType Tutorial</h1>
        <div className={classes.wrapper}>{cards}</div>
      </Container>
    </>
  );
};
export default withRouter(Tutorial);
