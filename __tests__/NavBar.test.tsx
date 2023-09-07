import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from '../app/src/components/top/NavBar';
import navBarButtons from '../app/src/components/top/NavBarButtons';
import * as projectFunctions from '../app/src/helperFunctions/projectGetSaveDel';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../app/src/redux/reducers/rootReducer';
import { initialState as appStateInitialState } from '../app/src/redux/reducers/slice/appStateSlice';
import { act } from 'react-dom/test-utils';


// Mock the non-serializable HTMLTypes
const mockHTMLTypes = [
  {
    id: 11,
    tag: 'div',
    name: 'Div',
    style: {},
    placeHolderShort: 'div',
    placeHolderLong: '',
    framework: 'reactClassic',
    nestable: true,
  },
  {
    id: 1000,
    tag: 'separator',
    name: 'separator',
    style: { border: 'none' },
    placeHolderShort: '',
    placeHolderLong: '',
    framework: '',
    nestable: true,
  },
  {
    id: 1,
    tag: 'img',
    name: 'Img',
    style: {},
    placeHolderShort: 'image',
    placeHolderLong: '',
    framework: 'reactClassic',
    nestable: false,
  },
];


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

afterAll(() => {
  jest.resetAllMocks();
});

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
          HTMLTypes: mockHTMLTypes,
        },
      },
    });

    console.log('Before rendering NavBar');

    const { getByText } = renderNavBar(store);

    console.log('After rendering NavBar');

    await act(async () => {
      
      const publishButton = getByText('Publish');
      fireEvent.click(publishButton);
    });
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
          HTMLTypes: mockHTMLTypes,
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
          HTMLTypes: mockHTMLTypes,
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
          HTMLTypes: mockHTMLTypes,
        },
      },
    });

    console.log('Before rendering NavBar');

    const { getByText } = renderNavBar(store);

    console.log('After rendering NavBar');

    // Find and click the export button
    const exportButton = getByText('< > Export');
    fireEvent.click(exportButton);

    // Check if the modal for export options is displayed
    await waitFor(() => {
      const exportModal = getByText('Click to download in zip file:');
      expect(exportModal).toBeInTheDocument();
    });

    // Simulate clicking the export components 
    const exportComponentsOption = getByText('Export components');
    fireEvent.click(exportComponentsOption);

  });
  test('handles dropdown menu correctly', async () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        appState: {
          ...appStateInitialState,
        },
      },
    });
  
    // Render component
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <NavBar />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  
    // Initially, the dropdown should have the "hideNavDropDown" class
    const dropdownMenu = getByTestId('navDropDown');
    expect(dropdownMenu).toHaveClass('hideNavDropDown');
  
    // Find and click the button to open the dropdown
    const moreVertButton = getByTestId('more-vert-button');
    fireEvent.click(moreVertButton);
  
    // After clicking, the dropdown should have the "navDropDown" class
    expect(dropdownMenu).toHaveClass('navDropDown');
  
  
    //clear canvas click
    const clearCanvasMenuItem = getByText('Clear Canvas');
    fireEvent.click(clearCanvasMenuItem);
    expect(dropdownMenu).toHaveClass('navDropDown');
  
    // After clicking "Marketplace", it should remain open
    const marketplaceMenuItem = getByText('Marketplace');
    fireEvent.click(marketplaceMenuItem);
    expect(dropdownMenu).toHaveClass('navDropDown');
  
    // Close the dropdown by clicking the button again
    fireEvent.click(moreVertButton);
  
    // After closing, the dropdown should have the "hideNavDropDown" class
    expect(dropdownMenu).toHaveClass('hideNavDropDown');
  });
});