import MarketplaceCardContainer from '../components/marketplace/MarketplaceCardContainer';
import SearchBar from '../components/marketplace/Searchbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import serverconfig from '../serverConfig';

/**
 * `MarketplaceContainer` serves as the main container for the marketplace section of the application,
 * where users can discover, browse, and interact with community-built components. It fetches a list
 * of projects from a server endpoint and allows users to search through them using a `SearchBar` component.
 * The search results are displayed using the `MarketplaceCardContainer`.
 *
 * The component makes an HTTP GET request to fetch marketplace projects using Axios and manages the fetched
 * data with React state hooks. It also handles displaying a loading state while the data is being fetched
 * and provides feedback when no projects match the search criteria or while projects are still loading.
 *
 * @returns {JSX.Element} A styled container that includes a search bar and a dynamic display area for
 *                        marketplace projects or loading and no-results messages.
 *
 * The component uses CSS properties for styling and includes React state management to handle the data
 * fetched from the server and the results filtered by the search bar. The component's internal state
 * updates trigger re-renders to display the projects or relevant messages to the user.
 */
const MarketplaceContainer = () => {
  const [marketplaceProjects, setMarketplaceProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  useEffect(() => {
    async function marketplaceFetch() {
      try {
        const response = await axios.get(
          `${serverconfig.API_BASE_URL}/getMarketplaceProjects`,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        );
        setMarketplaceProjects(response.data);
        setDisplayProjects(response.data);
      } catch (error) {
        console.error('Error fetching MP data:', error);
      }
    }
    marketplaceFetch();
  }, []);

  const updateDisplayProjects = (searchResults) => {
    setDisplayProjects(searchResults); //have to pass this down as a prop so that the setting is done outside of Rendering otherwise callstack issues
  };

  return (
    <div style={containerStyles}>
      <div style={contentStyles}>
        <h1 style={headingStyles}>Discover components built with ReacType</h1>
        <p style={subheadingStyles}>
          Browse, save, and customize the latest components built by the
          community
        </p>
        <SearchBar
          marketplaceProjects={marketplaceProjects}
          updateDisplayProjects={updateDisplayProjects}
        />
      </div>
      {displayProjects.length ? (
        <MarketplaceCardContainer displayProjects={displayProjects} />
      ) : /*while marketplaceProjects is length 0 means it is not done fetching.  Add loading...*/
      marketplaceProjects.length ? (
        <h2 style={{ textAlign: 'center' }}>No Results Found!</h2>
      ) : (
        <h2 style={{ textAlign: 'center' }}>
          {' '}
          {/*added a circular progress bar*/}
          Loading... <CircularProgress thickness={5.0} />
        </h2>
      )}
    </div>
  );
};

const containerStyles: React.CSSProperties = {
  backgroundColor: '#111',
  minHeight: '100vh',
  width: '100vw',
  color: 'white',
  paddingBottom: '15vh',
  overflow: 'auto'
};

const contentStyles: React.CSSProperties = {
  textAlign: 'center',
  padding: '100px 0'
};

const headingStyles: React.CSSProperties = {
  fontSize: '2.5rem',
  color: '#AAA',
  fontWeight: 'normal',
  marginBottom: '20px'
};

const subheadingStyles: React.CSSProperties = {
  fontSize: '1.25rem',
  color: '#777'
};

export default MarketplaceContainer;
