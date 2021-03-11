import React, { useState, useContext } from 'react';
import {
  withStyles,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// ROUTING TO DASHBOARD
import { Link } from 'react-router-dom';
import { styleContext } from '../containers/AppContainer';
import StateContext from '../../context/context';
import logo from '../../../resources/icon.png';


// NavBar text and button styling
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  manageProject: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

// --------------------------Sorting Buttons------------------------------------//
const sortByRating = (props) => {
  // console.log('rating');
  // console.log("props", props);

  // should change state to true: then in the return for project container, a conditional rendering will occur

  // generate a sorted array of public projects based on likes
  // const sortedProjects = projects.sort((a, b) => ((a.likes > b.likes) ? 1 : -1));
};

const sortByDate = (props) => {
  console.log('date');
};

const sortByUser = (props) => {
  console.log('user');
};

const sortMethods = ['rating', 'date', 'user'];

export default function NavBar(props) {

  const classes = useStyles();
  const { style, setStyle } = useContext(styleContext);


  // toggle dropdown sorting menu
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  
  return (
    <div className={classes.root} style={style}>
      <AppBar position="static">
        <Toolbar>
          <Avatar src={logo}></Avatar>
          <Typography variant="h6" style={{ marginLeft: '1rem' }} className={classes.title}>
            ReacType
          </Typography>

          {/* ==================================Sort by Button================================================== */}
         
          <div style ={ { textDecoration: 'none' } }>
            <Button onClick={toggling}
            variant="contained"
            color="primary"
            style={{ minWidth: '137.69px' }}
            className="navbarButton"
            id="navbarButtonDash"
            >
              Sort documents
            </Button>

            {
              isOpen && (
                <div className="sortDoc">
                  {sortMethods.map((option, index) => (
                    <Button onClick={() => {
                      props.optionClicked(option);
                      toggling();
                    }}
                    variant="contained"
                    color="primary"
                    style={{ minWidth: '137.69px' }}
                    className="navbarButton"
                    key={index}
                    > {option}
                    </Button>
                  ))};
                </div>
              )
            }
          </div>

          {/* ====================================Home Button============================================== */}
          <div style ={ { textDecoration: 'none' } }>
            <Link to="/">
              <Button
                variant="contained"
                color="primary"
                style={{ minWidth: '137.69px' }}
                className="navbarButton"
                id="ratingButton"
                > Home
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
