import { describe, it, expect, vi, afterAll, beforeEach } from 'vitest';
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from '../app/src/components/top/NavBar';
import * as projectFunctions from '../app/src/helperFunctions/projectGetSaveDel';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../app/src/redux/reducers/rootReducer';
import { initialState as appStateInitialState } from '../app/src/redux/reducers/slice/appStateSlice';

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
vi.mock('../../public/icons/win/logo.png', () => 'dummy-image-url');

// Grabbing publish and unpublish functions
vi.mock('../app/src/helperFunctions/projectGetSaveDel', () => ({
  publishProject: vi.fn(),
  unpublishProject: vi.fn(),
}));

//mock the file saver library
vi.mock('file-saver', () => ({
  ...vi.importActual('file-saver'),
  saveAs: vi.fn(),
}));

afterAll(() => {
  vi.resetAllMocks();
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
  let store;

  beforeEach(() =>{
    store = configureStore({
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
  })

  it('handles publish correctly with saved project', async () => {
    const publishProjectMock = vi.spyOn(projectFunctions, 'publishProject');
    publishProjectMock.mockResolvedValueOnce({
      _id: 'mockedId',
      name: 'Mocked Project',
      published: true,
    });

    renderNavBar(store)

      const publishButton = screen.getByText('Publish');
      fireEvent.click(publishButton);

    await waitFor(() => {
      expect(publishProjectMock).toHaveBeenCalled();
    })

  });

  it('handles publish correctly with new project', async () => {
    const publishProjectMock = vi.spyOn(projectFunctions, 'publishProject');
    publishProjectMock.mockResolvedValueOnce({
      _id: 'mockedId',
      name: 'My Project', 
      published: true,
    });
  
    renderNavBar(store);

      // Check if the "Publish" button is present
      const publishButton = screen.getByText('Publish');

        fireEvent.click(publishButton);

      await waitFor(() =>{
        expect(publishProjectMock).toHaveBeenCalled();
      })
  });

  it('handles export correctly', async () => {

    renderNavBar(store);
    // Find and click the export button
    const exportButton = screen.getByText('Export');
    fireEvent.click(exportButton);

    // Check if the modal for export options is displayed
    await waitFor(() => {
      const exportModal = screen.getByText('Click to download in zip file:');
      expect(exportModal).toBeDefined();
    });

    // Simulate clicking the export components 
    const exportComponentsOption = screen.getByText('Export components');
    fireEvent.click(exportComponentsOption);

  });

  it('handles dropdown menu correctly', async () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        appState: {
          ...appStateInitialState,
        },
      },
    });

    renderNavBar(store);
      const dropdownMenu = screen.getAllByTestId('navDropDown')[0];
      expect(dropdownMenu.getAttribute('class')).toContain('hideNavDropDown');


      const moreVertButton = screen.getByTestId('more-vert-button');
      fireEvent.click(moreVertButton);


      expect(dropdownMenu.getAttribute('class')).toContain('navDropDown');


      const clearCanvasMenuItem = screen.getByText('Clear Canvas');
      fireEvent.click(clearCanvasMenuItem);
      expect(dropdownMenu.getAttribute('class')).toContain('navDropDown');


      const marketplaceMenuItem = screen.getByText('Marketplace');
      fireEvent.click(marketplaceMenuItem);
      expect(dropdownMenu.getAttribute('class')).toContain('navDropDown');

      fireEvent.click(moreVertButton);

      expect(dropdownMenu.getAttribute('class')).toContain('hideNavDropDown');
    });
  });

