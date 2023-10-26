// // With redux toolkit you can combine all the actions, action types, and reducers into one 'slice'
// import { createSlice } from '@reduxjs/toolkit';
// // Sets initial state to false
// const initialState = {
//   isDarkMode: false
// };

// // Creates new slice with the name darkMode, initial state, and reducer function which toggles dark mode state between true and false
// const darkModeSlice = createSlice({
//   name: 'darkMode',
//   initialState,
//   reducers: {
//     toggleDarkMode: (state) => {
//       state.isDarkMode = !state.isDarkMode;
//     }
//   }
// });

// // Exports the action creator function to be used with useDispatch
// export const { toggleDarkMode } = darkModeSlice.actions;
// // Exports so we can combine in rootReducer
// export default darkModeSlice.reducer;
