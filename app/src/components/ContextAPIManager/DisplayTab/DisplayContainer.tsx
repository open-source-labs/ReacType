import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import { Chart } from 'react-google-charts';

const DisplayContainer = () => {
  const store = useStore();

  useEffect(() => {
    console.log(store.getState().contextSlice);
  }, []);


  const data = [
    ['Phrases'],
    ['cats are better than dogs'],
    ['cats eat kibble'],
    ['cats are better than hamsters'],
    ['cats are awesome'],
    ['cats are people too'],
    ['cats eat mice'],
    ['cats meowing'],
    ['cats in the cradle'],
    ['cats eat mice'],
    ['cats in the cradle lyrics'],
    ['cats eat kibble'],
    ['cats for adoption'],
    ['cats are family'],
    ['cats eat mice'],
    ['cats are better than kittens'],
    ['cats are evil'],
    ['cats are weird'],
    ['cats eat mice'],
  ];
  const options = {
    wordtree: {
      format: 'implicit',
      word: 'cats',
    },
  };
  return (
    <Chart
    chartType='WordTree'
    width='100%'
    height='400px'
    data={data}
    options={options}
  />
  );
};
export default DisplayContainer;