import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from '../app/src/components/top/NavBar';
import navbarDropDown from '../app/src/components/top/navbarDropDown'
import * as projectFunctions from '../app/src/helperFunctions/projectGetSaveDel';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../app/src/redux/reducers/rootReducer';
import { initialState as appStateInitialState } from '../app/src/redux/reducers/slice/appStateSlice';

// Mocking the theme
const theme = createTheme({
  spacing: (value) => `${value}px`,
});

// Mocking the logo
jest.mock('../../public/icons/win/logo.png', () => 'dummy-image-url');

// Grabbing publish and unpublish functions
jest.mock('../app/src/helperFunctions/projectGetSaveDel', () => ({
  publishProject: jest.fn(),
  unpublishProject: jest.fn(),
}));

//mock the file saver library
jest.mock('file-saver', () => ({
  ...jest.requireActual('file-saver'),
  saveAs: jest.fn(),
}));

// const originalError = console.error;
// beforeAll(() => {
//   console.error = jest.fn();
// });

// afterAll(() => {
//   console.error = originalError;
// });

// Mocking the render
const renderNavBar = (store) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <NavBar />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

describe('NavBar Component', () => {
  it('handles publish correctly with saved project', async () => {
    const publishProjectMock = jest.spyOn(projectFunctions, 'publishProject');
    publishProjectMock.mockResolvedValueOnce({
      _id: 'mockedId',
      name: 'Mocked Project',
      published: true,
    });

    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        appState: {
          ...appStateInitialState,
          isLoggedIn: true,
          name: 'Mock Project Name',
        },
      },
    });

    console.log('Before rendering NavBar');

    const { getByText } = renderNavBar(store);

    console.log('After rendering NavBar');

    const publishButton = getByText('Publish');
    fireEvent.click(publishButton);
  });

  it('handles publish correctly with new project', async () => {
    const publishProjectMock = jest.spyOn(projectFunctions, 'publishProject');
    publishProjectMock.mockResolvedValueOnce({
      _id: 'mockedId',
      name: 'My Project', 
      published: true,
    });
  
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        appState: {
          ...appStateInitialState,
          isLoggedIn: true,
          name: '', 
        },
      },
    });
  
    console.log('Before rendering NavBar');
  
    const { getByText, queryByText, getByTestId, queryByTestId } = renderNavBar(store);
  
    console.log('After rendering NavBar');
  
    // Check if the "Publish" button is present
    const publishButton = queryByText('Publish');
  
    if (publishButton) {
      fireEvent.click(publishButton);
    } else {
      // If "Publish" button is not found, look for the "Unpublish" button
      const unpublishButton = getByText('Unpublish');
      fireEvent.click(unpublishButton);
    }
  
    // Check if the modal for a new project is displayed
    const projectNameInput = queryByTestId('project-name-input');
  
    if (projectNameInput) {
      // entering a project name in the modal
      fireEvent.change(projectNameInput, { target: { value: 'My Project' } });
    }
    });
  

  it('handles unpublish correctly', async () => {
    const unpublishProjectMock = jest.spyOn(projectFunctions, 'unpublishProject');
    unpublishProjectMock.mockResolvedValueOnce({
      _id: 'mockedId',
      name: 'Mocked Project',
      published: false,
    });

    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        appState: {
          ...appStateInitialState,
          isLoggedIn: true,
          name: 'Mock Project Name',
        },
      },
    });

    console.log('Before rendering NavBar');

    const { queryByText } = renderNavBar(store);

    console.log('After rendering NavBar');

    // Find the "Publish" or "Unpublish" button based on the project's publish state
    const publishButton = queryByText('Publish');
    const unpublishButton = queryByText('Unpublish');

    if (publishButton) {
      fireEvent.click(publishButton);
    } else if (unpublishButton) {
      fireEvent.click(unpublishButton);
    }
  });

  it('handles export correctly', async () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        appState: {
          ...appStateInitialState,
          isLoggedIn: true,
          name: 'Mock Project Name',
        },
      },
    });

    console.log('Before rendering NavBar');

    const { getByText } = renderNavBar(store);

    console.log('After rendering NavBar');

    // Find and click the export button
    const exportButton = getByText('< > Export');
    fireEvent.click(exportButton);


    await waitFor(() => {
      const exportModal = getByText('Click to download in zip file:');
      expect(exportModal).toBeInTheDocument();
    });


    const exportComponentsOption = getByText('Export components');
    fireEvent.click(exportComponentsOption);

  });



it('handles dropdown menu correctly', () => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      appState: {
        ...appStateInitialState,
        isLoggedIn: true,
        name: 'Mock Project Name',
      },
    },
  });

  const { getByTestId } = renderNavBar(store);
  const moreVertButton = getByTestId('more-vert-button');

 
  expect(moreVertButton).toBeInTheDocument();


  fireEvent.click(moreVertButton);


});

  
});
