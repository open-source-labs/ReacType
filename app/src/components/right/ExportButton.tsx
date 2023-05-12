import React, { useState, useCallback, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
//these 3 lines below are for the electron version
import GetAppIcon from '@mui/icons-material/GetApp';
import Button from '@mui/material/Button';
import exportProject from '../../utils/exportProject.util';
import createModal from './createModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import zipFiles from '../../helperFunctions/zipFiles';

export default function ExportButton() {
  const [modal, setModal] = useState(null);
  const state = useSelector((store: RootState) => store.appState);

  const genOptions: string[] = [
    'Export components'
  ];

  // Closes out the open modal
  const closeModal = () => setModal('');

  const showGenerateAppModal = () => {
    const children = (
      <List className="export-preference">
        {genOptions.map((option: string, i: number) => (
          <ListItem
            key={i}
            onClick={() => chooseGenOptions()}
            style={{
              border: '1px solid #3f51b5',
              marginBottom: '2%',
              marginTop: '5%'
            }}
          >
            <ListItemText primary={option} style={{ textAlign: 'center' }} />
          </ListItem>
        ))}
      </List>
    );

    const chooseGenOptions = () => {
      zipFiles(state);
      closeModal();
    };

    setModal(
      createModal({
        closeModal,
        children,
        message: 'Click to download in zip file:',
        primBtnLabel: null,
        primBtnAction: null,
        secBtnAction: null,
        secBtnLabel: null,
        open: true
      })
    );
  };

  const exportKeyBind = useCallback(e => {
    //Export Project
    (e.key === 'e' && e.metaKey) || (e.key === 'e' && e.ctrlKey)
      ? showGenerateAppModal()
      : '';
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', exportKeyBind);
    return () => {
      document.removeEventListener('keydown', exportKeyBind);
    };
  }, []);
  return (
    <div>
      <button onClick={showGenerateAppModal}>Export Project
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>
      </button>
      {modal}
    </div>
  );
}

// This code is commented out below for v16, it is export function for electron, which may be useful for future devs
//The below code is exclusive to ReacType's Electron App
//If you would like to deploy the app, please comment out the exportButton function above and uncomment the code below


// export default function ExportButton() {
//   const [modal, setModal] = useState(null);
//   const state = useSelector(store => store.appState)

//   const genOptions: string[] = [
//     'Export components',
//     'Export components with application files'
//   ];
//   let genOption = 0;

//   // Closes out the open modal
//   const closeModal = () => setModal('');

//   const showGenerateAppModal = () => {
//     const children = (
//       <List className="export-preference">
//         {genOptions.map((option: string, i: number) => (
//           <ListItem
//             key={i}
//             // button
//             onClick={() => chooseGenOptions(i)}
//             style={{
//               border: '1px solid #3f51b5',
//               marginBottom: '2%',
//               marginTop: '5%'
//             }}
//           >
//             <ListItemText primary={option} style={{ textAlign: 'center' }} />
//           </ListItem>
//         ))}
//         <ListItem>
//           <input type="checkbox" id="tests" name="tests"></input>
//           <label for="tests">Include Tests</label>
//         </ListItem>
//       </List>
//     );
//     let testchecked = 0;
//     // helper function called by showGenerateAppModal
//     // this function will prompt the user to choose an app directory once they've chosen their export option
//     const chooseGenOptions = (genOpt: number) => {
//       // set export option: 0 --> export only components, 1 --> export full project
//       genOption = genOpt;

//       //This is exclusive to the electron app
//       window.api.chooseAppDir();
//       testchecked = document.getElementById('tests').checked;
//       testerFunc();
//       closeModal();
//     };

//     // removes all listeners for the app_dir_selected event
//     // this is important because otherwise listeners will pile up and events will trigger multiple events
//     //This is exclusive to the electron app
//     window.api.removeAllAppDirChosenListeners();

//     // add listener for when an app directory is chosen
//     // when a directory is chosen, the callback will export the project to the chosen folder
//     // Note: this listener is imported from the main process via preload.js

//     // This is exclusive to the electron app
//     window.api.addAppDirChosenListener(path => {
//       exportProject(
//         path,
//         state.name
//           ? state.name
//           : 'New_ReacType_Project_' + Math.ceil(Math.random() * 99).toString(),
//         genOption,
//         testchecked,
//         state.projectType,
//         state.components,
//         state.rootComponents
//       );
//     });

//     setModal(
//       createModal({
//         closeModal,
//         children,
//         message: 'Choose export preference:',
//         primBtnLabel: null,
//         primBtnAction: null,
//         secBtnAction: null,
//         secBtnLabel: null,
//         open: true
//       })
//     );
//   };

//   const exportKeyBind = useCallback(e => {
//     //Export Project
//     (e.key === 'e' && e.metaKey) || (e.key === 'e' && e.ctrlKey)
//       ? showGenerateAppModal()
//       : '';
//   }, []);

//   useEffect(() => {
//     document.addEventListener('keydown', exportKeyBind);
//     return () => {
//       document.removeEventListener('keydown', exportKeyBind);
//     };
//   }, []);
//   return (
//     <div>
//       <button onClick={showGenerateAppModal}>Export Project
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
//           <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
//           <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
//         </svg>
//       </button>
//       {modal}
//     </div>
//   );
// }
