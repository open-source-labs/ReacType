import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { State } from '../interfaces/Interfaces';

/**
 * Creates a zip file containing the project files for export.
 * @param {State} state - The current state of the project.
 */
const zipFiles = (state: State): void => {
  // initializes zip
  const zip = new JSZip();
  const reacTypeApp = zip.folder('ReacTypeApp');
  // creates component folder inside of zip folder
  const componentFolder = reacTypeApp.folder('componentfolder');
  // writes a file with default index.html code
  reacTypeApp.file(
    'index.html',
    '<!DOCTYPE html> <html>   <head>     <meta charset="UTF-8" />     <link rel="stylesheet" href="styles.css">     <title>ReacType App</title>   </head>   <body>     <div id="root"></div>   </body> </html>'
  );
  // writes each component as its own file in the component folder
  for (const i in state.components) {
    componentFolder.file(
      `${state.components[i].name}.jsx`,
      state.components[i].code
    );
  }
  // writes our css file
  reacTypeApp.file('style.css', state.stylesheet);
  // zips the file and saves to local machine
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    // see FileSaver.js
    saveAs(content, 'ReacTypeApp.zip');
  });
};

export default zipFiles;
