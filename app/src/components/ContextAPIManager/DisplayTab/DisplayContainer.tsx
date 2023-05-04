import React, { useEffect, useState } from 'react';
import { useStore, useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import Grid from '@mui/material/Grid';
import { RootState } from '../../../redux/store';

const DisplayContainer = () => {
  const allContext = useSelector((store: RootState) => store.contextSlice);
  // const { allContext } = store.getState().contextSlice;
  const [contextData, setContextData] = useState([]);

  //build data for Google charts, tree rendering
  useEffect(() => {
    console.log('this is context data', allContext);
    transformData(allContext);
  }, []);

  [
    {
      name: 'Test',
      values: [
        {
          key: 'sdafasdasdfsd',
          value: 'fasdfas'
        }
      ],
      components: ['Dfasdfa']
    }
  ];

  const transformData = (contexts) => {
    const formattedData = contexts.allContext
      .map((obj) => {
        return obj.components.map((component) => {
          return [`App ${obj.name} ${component}`];
        });
      })
      .flat();
    console.log(formattedData);
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
