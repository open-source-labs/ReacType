
const colors: Array<String> = [
  '#E27D60',
  '#E3AFBC',
  '#E8A87C',
  '#C38D9E',
  '#41B3A3',
  '#D12FA2',
  '#F64C72',
  '#DAAD86',
  '#8EE4AF',
  '#5CDB95',
  '#7395AE', // light grey
  '#b90061',
  '#AFD275',
  '#45A29E',
  '#D79922',
  '#C5CBE3', // lightish grey
  '#FFCB9A',
  '#E98074',
  '#8860D0',
  '#5AB9EA',
  '#5860E9',
  '#84CEEB',
  '#61892F',
];

const getColor = ():String =>  colors[Math.floor(Math.random() * colors.length)];

export default getColor;
