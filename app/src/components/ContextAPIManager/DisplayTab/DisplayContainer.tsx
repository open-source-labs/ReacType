import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import Grid from '@mui/material/Grid';
import { RootState } from '../../../redux/store';

const DisplayContainer = () => {
  const allContext = useSelector(
    (store: RootState) => store.contextSlice.allContext
  );
  const [contextData, setContextData] = useState([]);

  useEffect(() => {
    transformData();
  }, []);

  //formats context data for use in react google charts
  const transformData = () => {
    const formattedData = allContext
      .map((obj) => {
        return obj.components.map((component) => {
          return [`App ${obj.name} ${component}`];
        });
      })
      .flat();
    setContextData([['Phrases'], ...formattedData]);
  };

  //format options for google chart
  const options = {
    wordtree: {
      format: 'implicit',
      word: 'App'
    }
  };

  return (
    <Grid container display="flex" justifyContent="center">
      {contextData.length < 2 && <h2>No Contexts consumed</h2>}
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
