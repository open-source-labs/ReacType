import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import Form from './Form.jsx';


const FormsContainer = () => {
  return (
    <div>
      <Link to="/">
        <button type="button">Go Back</button>
      </Link>
      <Form/>
    </div>
  );
};

export default FormsContainer;
