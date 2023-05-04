import { saveAs } from 'file-saver';
const JSZip = require("jszip");

const zipFiles = (state) => {
  var zip = new JSZip();
  let reacTypeApp = zip.folder('ReacTypeApp');
  let componentFolder = reacTypeApp.folder('componentfolder');
  reacTypeApp.file('index.html', '<!DOCTYPE html> <html>   <head>     <meta charset="UTF-8" />     <link rel="stylesheet" href="styles.css">     <title>ReacType App</title>   </head>   <body>     <div id="root"></div>   </body> </html>');
  for (let i in state.components){
    componentFolder.file(`${state.components[i].name}.jsx`, state.components[i].code);
  }
  if(localStorage.getItem('css')){
    reacTypeApp.file('style.css', localStorage.getItem('css'));
  }
  zip.generateAsync({type:"blob"})
  .then(function(content) {
    // see FileSaver.js
    saveAs(content, "ReacTypeApp.zip");
  });
};

export default zipFiles;