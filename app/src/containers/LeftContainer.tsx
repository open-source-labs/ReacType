import React, { useState, useEffect } from 'react';

import ContentArea from '../components/left/ContentArea';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../components/left/Sidebar';

function App() {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility

  const toggleVisibility = (state: boolean) => {
    setIsVisible(state);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleVisibility={toggleVisibility}
      />
      <ContentArea activeTab={activeTab} isVisible={isVisible} />
    </div>
  );
}

export default App;
