import util from 'util';

const execFile = util.promisify(require('child_process').execFile);

// Application generation options
// cosnt genOptions = [
//   'Export into existing project.', 'Export with starter repo', 'Export with create-react-app.'
// ];

async function createApplicationUtil({
  path, appName, genOption, repoUrl,
}) {
  // if (genOption === 2) {
  //   return [
  //     await execFile('npm', ['i', '-g', 'create-react-app'], { cwd: path }),
  //     await execFile('create-react-app', [appName], { cwd: path }),
  //   ];
  // }
  // return repoUrl ? execFile('git', ['clone', repoUrl, appName], { cwd: path }) : null;

  if (genOption === 2) {
    return [
      await execFile('npm', ['init', '-y'], { cwd: path }),
      await execFile('touch', 'index.tsx', { cwd: path }),
      await execFile('touch', 'index.html', { cwd: path }),
      await execFile('touch', 'webpack.config.js', { cwd: path }),
      await execFile('touch', '.babelrc', { cwd: path }),


    ];
  }
}

export default createApplicationUtil;
