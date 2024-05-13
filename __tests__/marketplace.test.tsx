// @vitest-enviroment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import MarketplaceCard from '../app/src/components/marketplace/MarketplaceCard';
import MarketplaceCardContainer from '../app/src/components/marketplace/MarketplaceCardContainer';
import { Provider } from 'react-redux';
import React from 'react';
import SearchBar from '../app/src/components/marketplace/Searchbar';
import axios from 'axios';
import store from '../app/src/redux/store';

// Mocking the axios module to avoid actual network calls
vi.mock('axios');
vi.mock(
  'resources/marketplace_images/marketplace_image.png',
  () => 'mock-image-url'
);

describe('MarketplaceCard Render Test', () => {
  const mockProject = {
    _id: 123,
    name: 'Sample Project',
    username: 'user123',
    forked: 'false',
    comments: [],
    createdAt: new Date(),
    likes: 0,
    project: {
      id: 'sample-project-id'
    },
    published: true,
    userId: 123456
  };

  it('displays project name and username', () => {
    const { unmount } = render(
      <Provider store={store}>
        <MarketplaceCard proj={mockProject} />
      </Provider>
    );

    expect(screen.getByText('Sample Project')).toBeDefined()
    expect(screen.getByText('user123')).toBeDefined()
  unmount()
  });
});

describe('MarketplaceContainer', () => {
  const mockProjects = [
    {
      _id: 1,
      name: 'Project 1',
      username: 'user1'
    },
    {
      _id: 2,
      name: 'Project 2',
      username: 'user2'
    }
  ];

  beforeEach(() => {
    // Set up mock axios call for every test
    axios.get = vi.fn().mockResolvedValue({ data: mockProjects });
  });

  it('renders multiple MarketplaceCards', () => {
    const { unmount } = render(
      <Provider store={store}>
        <MarketplaceCardContainer displayProjects={mockProjects} />
      </Provider>
    );

    expect(screen.getByText('Project 1')).toBeDefined()
    expect(screen.getByText('user1')).toBeDefined()
    expect(screen.getByText('Project 2')).toBeDefined()
    expect(screen.getByText('user2')).toBeDefined()
    unmount()
  });
});

const mockProjects = [
  {
    name: 'Sample Project',
    username: 'user123'
  },
  {
    name: 'Test Project',
    username: 'user_test'
  },
  {
    name: 'Hello Project',
    username: 'hello_user'
  }
];

describe('SearchBar Component', () => {
  it('updates the text field value on change', () => {
    const updateDisplayProjects = vi.fn();

    const { unmount } = render(
      <SearchBar
        marketplaceProjects={mockProjects}
        updateDisplayProjects={updateDisplayProjects}
      />
    );

    const textField = screen.getByLabelText('Search') as HTMLInputElement;
    fireEvent.change(textField, { target: { value: 'Sample' } });

    expect(textField.value).toBe('Sample');
    unmount()
  });

  it('filters projects by username', () => {
    const updateDisplayProjects = vi.fn();
    const { unmount } = render(
      <SearchBar
        marketplaceProjects={mockProjects}
        updateDisplayProjects={updateDisplayProjects}
      />
    );
    const testCase = vi.spyOn(updateDisplayProjects, 'withImplementation')
    const textField = screen.getByLabelText('Search');
    fireEvent.change(textField, { target: { value: 'test' } });

    // Using setImmediate to wait for useEffect to execute.
    setTimeout(() => {
      expect(updateDisplayProjects).toHaveBeenCalledWith(
        [ 
          { name: "Sample Project", username: "user123"},
          { name: 'Test Project', username: 'user_test'},
          { name: "Hello Project", username: "hello_user"}
        ]
      );
    });
    unmount()
  });
});
