import React, { Component } from 'react';
import '../public/styles/style.css';
<<<<<<< HEAD
// import { MuiThemeProvider } from '@material-ui/core/styles';
=======
>>>>>>> 7b32d8f43c0f8513994ea79b750f9cffc98844a1
import AppContainer from '../containers/AppContainer';

export const App: React.SFC = () => (
  <div className="app">
    <div>
      <header style={{ height: '40px', width: '100%' }}>ReacType</header>
      <AppContainer />
    </div>
  </div>
);

export default App;

//  class App extends Component {
//     // render() {
//       return (
//         <div className="app">
//           <div>
//             <header style={{ height: '40px', width: '100%' }}>ReacType</header>
//             <AppContainer />
//           </div>
//         </div>
//       );
//     }
//   }
