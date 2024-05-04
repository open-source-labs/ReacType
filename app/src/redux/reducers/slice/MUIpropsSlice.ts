import { createSlice } from '@reduxjs/toolkit';
import MUITypes from '../../MUITypes';

export const initialState = 
  {
    color: '',
    disabled: false,
    disableElevation: false,
    disableFocusRipple: false,
    disableRipple: false,
    fullWidth: false,
    href: '',
    size: '',
    variant: '',
};

const MUIpropsSlice = createSlice({
    name: 'MUIprops',
    initialState,
    reducers: {
      setColor: (state, action) => {
        state.color = action.payload;
      },
      setDisabled: (state, action) => {
        state.disabled = action.payload;
      },
      setDisableElevation: (state, action) => {
        state.disableElevation = action.payload;
      },
      setDisableFocusRipple: (state, action) => {
        state.disableFocusRipple = action.payload;
      },
      setdDisableRipple: (state, action) => {
        state.disableRipple = action.payload;
      },
      setFullWidth: (state, action) => {
        state.fullWidth = action.payload;
      },
      setHref: (state, action) => {
        state.href = action.payload;
      },
      setSize: (state, action) => {
        state.size = action.payload;
      },
      setVariant: (state, action) => {
        state.variant = action.payload;
      },
    }
  });

  export const {
    setColor,
    setDisabled,
    setDisableElevation,
    setDisableFocusRipple,
    setdDisableRipple,
    setFullWidth,
    setHref,
    setSize,
    setVariant,
  } = MUIpropsSlice.actions;

  export default MUIpropsSlice.reducer;