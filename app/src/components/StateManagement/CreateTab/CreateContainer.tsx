/* eslint-disable max-len */
import React from 'react';
import Grid from '@mui/material/Grid';
import StatePropsPanel from './components/StatePropsPanel';

/**
 * `CreateContainer` is a React functional component that renders a container for managing the creation or configuration
 * of component properties and state within an application. It is primarily used as a layout container for the `StatePropsPanel`.
 *
 * @param {Object} props - Properties passed to the component.
 * @param {boolean} props.isThemeLight - Indicates if the application's theme is light. This is used to adjust the visual styling of the contents.
 * @param {Array} props.data - The data passed to the `StatePropsPanel`, typically representing the application's components or elements.
 * @returns {JSX.Element} A `Grid` container from Material-UI that includes a `StatePropsPanel` component, configured for managing and displaying component properties and state based on the passed `isThemeLight` and `data` props.
 *
 * This component uses Material-UI's `Grid` to create a flexible column layout that adjusts based on its content. It serves as a wrapper
 * for the `StatePropsPanel` to provide consistent spacing and alignment.
 *
 * Example Usage:
 * ```jsx
 * <CreateContainer
 *   isThemeLight={true}
 *   data={[{ id: 1, name: 'Component 1', props: [], state: [] }]}
 * />
 * ```
 */
const CreateContainer = ({ isThemeLight, data }) => {
  return (
    <Grid
      container
      display="flex"
      justifyContent="stretch"
      flexDirection="column"
    >
      <StatePropsPanel isThemeLight={isThemeLight} data={data} />
    </Grid>
  );
};

export default CreateContainer;
