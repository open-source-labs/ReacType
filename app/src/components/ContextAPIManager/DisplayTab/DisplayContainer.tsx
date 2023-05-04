import React, { useEffect, useState } from 'react';
import { useStore, useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import Grid from '@mui/material/Grid';
import { RootState } from '../../../redux/store';

const DisplayContainer = () => {
  const allContext = useSelector((store: RootState) => store.contextSlice);
  const [contextData, setContextData] = useState([]);

  //build data for Google charts, tree rendering
  useEffect(() => {
    if (allContext.length) {
      const formattedData = allContext
        .map((el) => {
          return el.components.map((component) => {
            return [`App - ${el.name} - ${component}`];
          });
        })
        .flat();
      setContextData([['Phrases'], ...formattedData]);
    }
  }, []);

  const options = {
    wordtree: {
      format: 'implicit',
      word: 'App'
    }
  };
  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item>
        {contextData.length > 0 && (
          <Chart
            chartType="WordTree"
            width="100%"
            height="450px"
            data={contextData}
            options={options}
          />
        )}
      </Grid>
    </Grid>
  );
};
export default DisplayContainer;
