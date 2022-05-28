import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { useDispatch } from 'react-redux';

import CreatorForm from './CreatorForm';
import * as actions from '../../../redux/actions/actions';

const ContextCreator = () => {
  const store = useStore();
  const [state, setState] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setState(store.getState().contextSlice);
    setIsReady(true);
  }, []);


  const dispatch = useDispatch();

  const handleClickSelectContext = contextInput => {
    // console.log(document.getElementById('autoCompleteContextField'));

    dispatch(actions.addContextActionCreator(contextInput));
    setState(store.getState().contextSlice);
  };

  const handleClickInputData = ({ name }, { inputKey, inputValue }) => {
    dispatch(
      actions.addContextValuesActionCreator({ name, inputKey, inputValue })
    );
    setState(store.getState().contextSlice);
  };

  return (
    <>
      {isReady && (
        <CreatorForm
          contextStore={state}
          handleClickSelectContext={handleClickSelectContext}
          handleClickInputData={handleClickInputData}
        />
      )}
    </>
  );
};

export default ContextCreator;
