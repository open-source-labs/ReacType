
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    style: null,
    setStyle: null,
    isThemeLight: null,
  }

//allows us to set style for themes

  const styleSlice = createSlice({
    name: 'style',
    initialState,
    reducers: {
        setStyle: (state, action) => {
            state.style = action.payload;
        },
        cooperativeStyle: (state, action) => {
            return Object.assign({}, state, action.payload)
        },
    }
    });

    export const { setStyle, cooperativeStyle } = styleSlice.actions;

    export default styleSlice.reducer;