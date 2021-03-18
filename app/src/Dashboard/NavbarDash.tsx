import React, { useState, useContext } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { styleContext } from '../containers/AppContainer';
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

// sorting options
const sortMethods = ['rating', 'date', 'user'];

// TO DO: set types of props validation

export default function NavBar(props) {
  // TO DO: import setStyle
  const classes = useStyles();
  const { style, setStyle } = useContext(styleContext);


  // toggle to open and close dropdown sorting menu
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

          {/* ==========================================Sort by Button================================================== */}
         
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
