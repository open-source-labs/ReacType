import React, { useState, useCallback, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import createModal from '../../components/right/createModal';
import zipFiles from '../../helperFunctions/zipFiles';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IosShare, Publish } from '@mui/icons-material';
import { Button } from '@mui/material';

export default function NewExportButton(): React.JSX.Element {
  const [modal, setModal] = useState(null);
  const state = useSelector((store: RootState) => store.appState);

  const genOptions: string[] = ['Export components'];

  const closeModal = () => setModal('');

  const showGenerateAppModal = () => {
    const children = (
      <List className="export-preference">
        {genOptions.map((option: string, i: number) => (
          <ListItem
            id="export-modal"
            key={i}
            onClick={() => chooseGenOptions()}
            style={{
              border: '1px solid #3c59ba',
              marginBottom: '2%',
              marginTop: '5%',
              backgroundColor: '#4a4a4a'
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

  const exportKeyBind = useCallback((e: KeyboardEvent) => {
    if ((e.key === 'e' && e.metaKey) || (e.key === 'e' && e.ctrlKey)) {
      showGenerateAppModal();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', exportKeyBind);
    return () => {
      document.removeEventListener('keydown', exportKeyBind);
    };
  }, []);

  return (
    <div>
      <Button sx={{ color: 'white' }} onClick={showGenerateAppModal}>
        <IosShare style={{ color: '#86868b', marginRight: '-0.7rem' }} />
      </Button>
      {modal}
    </div>
  );
}
