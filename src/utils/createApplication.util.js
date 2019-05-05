// import util from 'util';

// const execFile = util.promisify(require('child_process').execFile);

// Application generation options
// cosnt genOptions = [
//   'Export into existing project.', 'Export with starter repo', 'Export with create-react-app.'
// ];

import fs from 'fs';
import { format } from 'prettier';

function createIndexHtml(data, path) {
  // let dir = path;
  // if (!dir.match(/application|\*$/)) {
  //   if (fs.existsSync(`${dir}/src`)) {
  //     dir = `${dir}/src`;
  //   }
  //   dir = `${dir}/components`;
  //   if (!fs.existsSync(dir)) {
  //     fs.mkdirSync(dir);
  //   }
  // }
  // const fileName = 'index.html';
  // const data = `
  // <!DOCTYPE html>
  // <html lang="en">
  // <head>
  //   <meta charset="UTF-8">
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //   <meta http-equiv="X-UA-Compatible" content="ie=edge">
  //   <title>Document</title>
  // </head>
  // <body>
  //   <div id='root'></div>
  //   <script src='bundle.js'></script>
  // </body>
  // </html>
  // `;
  // fs.writeFile(
  //   fileName,
  //   format(data, {
  //     singleQuote: true,
  //     trailingComma: 'es5',
  //     bracketSpacing: true,
  //     jsxBracketSameLine: true,
  //     parser: 'babel',
  //   }),
  //   (err) => {
  //     if (err) {
  //       console.log('index.html error:', err.message);
  //     } else {
  //       console.log('index.html written successfully');
  //     }
  //   },
  // );
}

async function createApplicationUtil({ path, appName, genOption }) {
  if (genOption === 1) {
    await createIndexHtml();
  }
}
export default createApplicationUtil;

// async function createApplicationUtil({
//   path, appName, genOption
// }) {
//   if (genOption === 1) {
//     return [
//       await execFile('npm', ['init', '-y'], { cwd: path }),
//       await execFile('touch', 'index.tsx', { cwd: path }),
//       await execFile('touch', 'index.html', { cwd: path }),
//       await execFile('touch', 'webpack.config.js', { cwd: path }),
//       await execFile('touch', '.babelrc', { cwd: path }),
//     ];
//   }
// }

// import util from 'util';

// const execFile = util.promisify(require('child_process').execFile);

// Application generation options
// cosnt genOptions = [
//   'Export into existing project.', 'Export with starter repo', 'Export with create-react-app.'
// ];

// async function createApplicationUtil({
//   path, appName, genOption
// }) {
//   if (genOption === 2) {
//     return [
//       await execFile('npm', ['i', '-g', 'create-react-app'], { cwd: path }),
//       await execFile('create-react-app', [appName], { cwd: path }),
//     ];
//   }
// }

// export default createApplicationUtil;
