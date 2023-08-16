import MarketplaceCardContainer from '../components/marketplace/MarketplaceCardContainer';
import NavBar from '../components/top/NavBar';
import React from 'react';
import SearchBar from '../components/marketplace/Searchbar';

const MarketplaceContainer = () => {
  return (
    <div style={containerStyles}>
      <NavBar />
      <div style={contentStyles}>
        <h1 style={headingStyles}>Discover components built with ReacType</h1>
        <p style={subheadingStyles}>
          Browse, save, and customize the latest components built by the
          community
        </p>
        <SearchBar />
      </div>
      <MarketplaceCardContainer />
    </div>
  );
};

const containerStyles: React.CSSProperties = {
  backgroundColor: '#111',
  minHeight: '100vh',
  color: 'white'
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
