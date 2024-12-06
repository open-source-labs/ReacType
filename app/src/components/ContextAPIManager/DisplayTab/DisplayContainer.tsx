/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import Grid from '@mui/material/Grid';
import { RootState } from '../../../redux/store';

/**
 * A React component that displays a WordTree chart based on context data from a Redux store.
 * Utilizes the `react-google-charts` library to visualize relationships between components in the application,
 * fetching data from the `contextSlice.allContext` in the Redux store. The data should include objects with names and components arrays.
 *
 * @component
 * @example
 * ```jsx
 * <DisplayContainer />
 * ```
 *
 * @param {Object} props - The component does not accept any props.
 *
 * State:
 * - `contextData`: An array of arrays structured for the WordTree chart, with the initial element being ["Phrases"].
 *
 * Redux State Dependencies:
 * - `allContext`: Retrieved from `contextSlice.allContext`, expected to be an array of objects each containing a `name` and a `components` array.
 *
 * Effects:
 * - On mount, transforms the Redux store data into a format suitable for the WordTree chart by calling `transformData`.
 *
 * Methods:
 * - `transformData`: Transforms raw context data from the Redux store to be usable by the `Chart` component,
 *   mapping each context object to phrases connecting the application name with the context name and its components.
 *
 * @returns {JSX.Element} A React element containing a Grid layout. If data is available, displays a WordTree chart, otherwise shows a message indicating no data.
 */
const DisplayContainer = (): JSX.Element => {
  const allContext = useSelector(
    (store: RootState) => store.contextSlice.allContext,
  );
  const [contextData, setContextData] = useState([]);

  useEffect(() => {
    transformData();
  }, []);

  // formats context data for use in react google charts
  const transformData = () => {
    const formattedData = allContext
      .map((obj) => obj.components.map((component) => [`App ⎯⎯ ${obj.name} ⎯⎯ ${component}`]))
      .flat();
    setContextData([['Phrases'], ...formattedData]);
  };

  // format options for google chart
  const options = {
    wordtree: {
      format: 'implicit',
      word: 'App',
    },
    backgroundColor: '#1E2024',
  };

  return (
    <Grid container display="flex" justifyContent="center" alignItems="center">
      {contextData.length < 2 && <h2>No Contexts Consumed</h2>}
      <Grid item style={{marginLeft: '100px'}}>
        <Chart
          chartType="WordTree"
          width="100%"
          height="450px"
          data={contextData}
          options={options}
        />
      </Grid>
    </Grid>
  );
};
export default DisplayContainer;
