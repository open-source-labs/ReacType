
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    style: null,
    setStyle: null,
    isThemeLight: null,
  }

  const styleSlice = createSlice({
    name: 'style',
    initialState,
    reducers: {
        setStyle: (state, action) => {
            state.style = action.payload;
        }
    }
    });

    export const { setStyle } = styleSlice.actions;

    export default styleSlice.reducer;