const colors: Array<string> = [
  '#e27d60',
  '#575757',
  '#e8a87c',
  '#c38d9e',
  '#41b3a3',
  '#d12fa2',
  '#f64c72',
  '#c99261',
  '#355586',
  '#5cdb95',
  '#7395ae',
  '#981d5c',
  '#556738',
  '#45a29e',
  '#d79922',
  '#0a2aa9',
  '#9f2b17',
  '#e98074',
  '#8860d0',
  '#5ab9ea',
  '#5860e9',
  '#84ceeb',
  '#61892f'
];

const getColor = (): string =>
  colors[Math.floor(Math.random() * colors.length)];

export default getColor;
