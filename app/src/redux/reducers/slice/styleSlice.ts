import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type StyleState = {
  style: any; // Replace with your specific type
  isThemeLight: boolean;
};

const initialState: StyleState = {
  style: null,
  isThemeLight: true
};

/**
 * `styleSlice` manages the styling state of the application. It holds the current style settings
 * and theme mode (light or dark). This slice is part of the Redux state management and is used
 * to dynamically adjust the styles throughout the app based on user preferences or predefined conditions.
 *
 * @module styleSlice
 * @type {Slice}
 *
 * @typedef {Object} StyleState
 * @property {any} style - The current style settings. Replace `any` with more specific type definition as needed.
 * @property {boolean} isThemeLight - Indicates if the current theme is light. `true` for light theme, `false` for dark theme.
 *
 * State Example:
 * {
 *   style: null,  // This should be replaced with a specific type if available.
 *   isThemeLight: true
 * }
 *
 * @function setStyle - Action to set the style of the application. It should receive the new style settings.
 * @param {PayloadAction<any>} action - The action payload containing the new style settings.
 *
 * @function cooperativeStyle - A reducer that merges partial style state updates into the existing style state.
 * This allows for cooperative style updates where multiple properties might need to be updated simultaneously.
 * @param {PayloadAction<Partial<StyleState>>} action - The action payload containing the partial updates to be merged.
 *
 * @example
 * dispatch(setStyle(newStyleSettings));
 * dispatch(cooperativeStyle({ isThemeLight: false }));
 *
 * @returns {Reducer<StyleState>} The reducer for this slice of state, handling updates to styling and theme properties.
 */
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
