import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen } from '@testing-library/react';

import MarketplaceCard from '../app/src/components/marketplace/MarketplaceCard';
import { Provider } from 'react-redux';
import React from 'react';
import axios from 'axios';
import store from '../app/src/redux/store';

// Mocking the axios module to avoid actual network calls
jest.mock('axios');

describe('MarketplaceCard', () => {
  const mockProject = {
    _id: 123,
    name: 'Sample Project',
    username: 'user123'
    // ... other properties as needed
  };

  it('displays project name and username', () => {
    render(
      <Provider store={store}>
        <MarketplaceCard proj={mockProject} />
      </Provider>
    );

    expect(screen.getByText('Sample Project')).toBeInTheDocument();
    expect(screen.getByText('user123')).toBeInTheDocument();
  });

  // You can also test handleClone and handleCloneOpen functionalities
  // e.g. using mock implementations for axios.get, dispatch, history.push, etc.
});

describe('MarketplaceContainer', () => {
  const mockProjects = [
    {
      _id: 1,
      name: 'Project 1',
      username: 'user1'
      // ... other properties
    },
    {
      _id: 2,
      name: 'Project 2',
      username: 'user2'
      // ... other properties
    }
  ];

  beforeEach(() => {
    // Set up mock axios call for every test
    axios.get.mockResolvedValue({ data: mockProjects });
  });

  it('fetches and displays projects', async () => {
    render(<MarketplaceCard proj={undefined} />);

    // Wait for the async axios call to complete and state to update
    const project1 = await screen.findByText('Project 1');
    const project2 = await screen.findByText('Project 2');

    expect(project1).toBeInTheDocument();
    expect(project2).toBeInTheDocument();
  });

  // Additional tests can include: testing search bar functionality,
  // loading states, and no results found message.
});
