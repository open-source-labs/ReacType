// const MaterialUI = window['@mui/material'];
// const ReactRouterDOM = window['react-router-dom'];
// const componentMap = {
//   Box: MaterialUI.Box,
//   Button: MaterialUI.Button,
//   Link: ReactRouterDOM.Link,
//   TextField: MaterialUI.TextField,
//   Card: MaterialUI.Card,
//   CardContent: MaterialUI.CardContent,
//   Typography: MaterialUI.Typography,
//   CardActions: MaterialUI.CardActions
// };

const sampleStringArr: string =
  '{"type":"Button","props":{"variant":"contained","color":"primary","children":"Click Me","key":0}}<button></button>{"type":"Button","props":{"variant":"contained","color":"primary","children":"Click Me","key":0}}';

const modifiedString1: string = sampleStringArr.replace(/}{/g, '},,{');
const modifiedString2: string = modifiedString1.replace(/}</g, '},,<');
const modifiedString3: string = modifiedString2.replace(/>{/g, '>,,{');
console.log(modifiedString3);

const jsonArray = modifiedString3.split(',,');

console.log(jsonArray);

jsonArray.forEach((part) =>
  console.log(`JSON stringified: ${JSON.stringify(part)}`)
); // Detailed view of each part
// const jsonStringArray = jsonArray.map(JSON.stringify);
// console.log(jsonStringArray);
