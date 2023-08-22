import MarketplaceCardContainer from '../components/marketplace/MarketplaceCardContainer';
import SearchBar from '../components/marketplace/Searchbar';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const MarketplaceContainer = () => {

  const [marketplaceProjects, setMarketplaceProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  useEffect(() => {
    async function marketplaceFetch() {
      try {
        const response = await axios.get('/getMarketplaceProjects', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setMarketplaceProjects(response.data);
        setDisplayProjects(response.data);
    
      } catch (error) {
        console.error('Error fetching MP data:', error);
      }
    }
    marketplaceFetch();
    
  }, []);

  const updateDisplayProjects = (searchResults) => {

    setDisplayProjects(searchResults);//have to pass this down as a prop so that the setting is done outside of Rendering otherwise callstack issues

  };

  
  return (
    <div style={containerStyles}>
      <div style={contentStyles}>
        <h1 style={headingStyles}>Discover components built with ReacType</h1>
        <p style={subheadingStyles}>
            Browse, save, and customize the latest components built by the
            community
        </p>
        <SearchBar marketplaceProjects = {marketplaceProjects} updateDisplayProjects = {updateDisplayProjects}/>
      </div>
        {displayProjects.length ? <MarketplaceCardContainer displayProjects = {displayProjects} /> : 
          <h2 style={{textAlign: 'center'}}>
              No Results Found!
          </h2> 
        }
    </div>
  );
};

const containerStyles: React.CSSProperties = {
  backgroundColor: '#111',
  minHeight: '100vh',
  width: '100vw',
  color: 'white',
  paddingBottom: '15vh',
  overflow: 'auto',

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
