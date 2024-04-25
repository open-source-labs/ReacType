import React, { useState } from 'react';
import { Button, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import MUITypes from "../../redux/MUITypes";
import { MUIType } from '../../interfaces/Interfaces';
import { emitEvent } from '../../helperFunctions/socket';

const MUIProps = (props): JSX.Element => {
  const [selectedComponent, setSelectedComponent] = useState<MUIType | null>(null);

  const handleComponentSelect = (component: MUIType) => {
    setSelectedComponent(component);
  };

  const handleSend = () => {
    if (selectedComponent) {
      emitEvent("add-component", selectedComponent, {placeholder: "Placeholder"});
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {MUITypes.map((component) => (
          <Button
            key={component.id}
            onClick={() => handleComponentSelect(component)}
            sx={{ marginBottom: "0.5rem" }}
          >
            {component.name}
          </Button>
        ))}
      </div>
      <Button
        onClick={handleSend}
        variant="contained"
        endIcon={<Send />}
        sx={{ marginTop: "1rem" }}
      >
        Save
      </Button>
    </div>
  );
};

export default MUIProps;

