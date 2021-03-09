// import { supportsResultCaching } from '@apollo/client/cache/inmemory/entityStore';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from './gqlStrings';
import Project from './Project.tsx';




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
  );
}
