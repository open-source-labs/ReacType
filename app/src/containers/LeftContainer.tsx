import ContentArea from '../components/left/ContentArea';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../components/left/Sidebar';

function App() {
  return (
    <Router>
      <Sidebar />
      <ContentArea />
    </Router>
  );
}

export default App;
