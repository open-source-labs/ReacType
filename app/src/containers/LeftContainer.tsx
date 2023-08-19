import React, { useState } from 'react';

import ContentArea from '../components/left/ContentArea';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../components/left/Sidebar';

function App() {
  const [value, setValue] = useState<number | null>(5);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar value={value} setValue={setValue} />
      <ContentArea value={value} />
    </div>
  );
}

export default App;
