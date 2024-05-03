import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type StyleState = {
  style: any; // Replace with your specific type
  isThemeLight: boolean;
};

const initialState: StyleState = {
  style: null,
  isThemeLight: true
};

const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    setStyle: (state, action: PayloadAction<any>) => {
      state.style = action.payload;
    },
    cooperativeStyle: (state, action: PayloadAction<Partial<StyleState>>) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { setStyle, cooperativeStyle } = styleSlice.actions;

export default styleSlice.reducer;
