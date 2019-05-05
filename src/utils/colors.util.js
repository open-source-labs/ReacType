const colors = [
  '#E27D60',
  '#E3AFBC',
  '#E8A87C',
  '#C38D9E',
  '#41B3A3',
  '#2F2FA2',
  '#F64C72',
  '#DAAD86',
  '#8EE4AF',
  '#5CDB95',
  '#7395AE',
  '#501B1D',
  '#190061',
  '#AFD275',
  '#45A29E',
  '#D79922',
  '#C5CBE3',
  '#FFCB9A',
  '#E98074',
  '#8860D0',
  '#5AB9EA',
  '#5860E9',
  '#84CEEB',
  '#F8E9A1',
  '#61892F',
];

const getColor = () => colors[Math.floor(Math.random() * colors.length)];

export default getColor;
