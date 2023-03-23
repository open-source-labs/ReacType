import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Chart } from 'react-google-charts';
import Grid from '@mui/material/Grid';

const DisplayContainer = () => {
  const store = useStore();
  const { allContext } = store.getState().contextSlice;
  const [contextData, setContextData] = useState([]);

  //build data for Google charts, tree rendering
  useEffect(() => {
    transformData(allContext);
  }, []);

  const transformData = contexts => {
    const formattedData = contexts
      .map(el => {
        return el.components.map(component => {
          return [`App - ${el.name} - ${component}`];
        });
      })
      .flat();
    setContextData([['Phrases'], ...formattedData]);
  };

  const options = {
    wordtree: {
      format: 'implicit',
      word: 'App'
    }
  };
  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item>
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