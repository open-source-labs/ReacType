// import { supportsResultCaching } from '@apollo/client/cache/inmemory/entityStore';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

const sortByRating = () => {
  console.log("rating")
};

const sortByDate = () => {
  console.log("date")
};

const sortByUser = () => {
  console.log("user")
};

export default function SortMenu() {
  
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  return (
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
            <Button
              variant="contained"
              color="primary"
              style={{ minWidth: '137.69px' }}
              className="navbarButton"
              id="ratingButton"
              onClick={sortByRating}
            > rating </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ minWidth: '137.69px' }}
              className="navbarButton"
              id="dateButton"
              onClick={sortByDate}
            > date </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ minWidth: '137.69px' }}
              className="navbarButton"
              id="userButton"
              onClick={sortByUser}
            > user </Button>
          </div>
        )
      }
    </div>
  )
}
