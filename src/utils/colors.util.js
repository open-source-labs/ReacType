const colors = [
  '#F44336',
  '#3B2F89',
  '#E91E63',
  '#9C27B0',
  '#2196F3',
  '#009688',
  '#00BCD4',
  '#18FFFF',
  '#64FFDA',
  '#CDDC39',
  '#4CAF50',
  '#76FF03',
  '#C6FF00',
  '#89892F',
  '#DCAAA0',
  '#FFC0CB',
  '#FF9800',
  '#FF6D00',
  '#F50057',
  '#D500F9',
  '#FFFF00',
  '#D8BFD8',
  '#008B8B',
  '#7FFFD4',
  '#87CEEB',
  '#DAA520',
  '#C0C0C0',
];

const getColor = () => colors[Math.floor(Math.random() * colors.length)];

export default getColor;
