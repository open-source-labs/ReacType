import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Chart } from 'react-google-charts';
import Grid from '@mui/material/Grid';

const DisplayContainer = () => {
  const store = useStore();
  const { allContext } = store.getState().contextSlice;
  const [contextData, setContextData] = useState([]);

  useEffect(() => {
    transformData(allContext);
  }, []);

  const transformData = contexts => {
    const formattedData = contexts
      .map(el => {
        return el.components.map(component => {
          return [`App ${el.name} ${component}`];
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
  console.log(contextData);
  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item>
      <Chart
        chartType="WordTree"
        width="100%"
        height="500px"
        data={contextData}
        options={options}
      />
      </Grid>
    </Grid>
  );
};
export default DisplayContainer;
