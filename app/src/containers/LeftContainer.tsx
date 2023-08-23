import React, { useState } from 'react';

import ContentArea from '../components/left/ContentArea';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../components/left/Sidebar';

function App() {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <ContentArea activeTab={activeTab} />
    </div>
  );
}

export default App;
