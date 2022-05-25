import React, { useContext } from 'react';
import ComponentPanel from '../right/ComponentPanel';
import ContextAssigner from '../right/ContextAssigner';
import ContextMenu from '../right/ContextMenu';
import ContextTree from '../right/ContextTree';
import HTMLPanel from '../left/HTMLPanel';
import { styleContext } from '../../containers/AppContainer';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';



const ContextManager= (props): JSX.Element => {
  // const {style} = useContext(styleContext);
  return (
    <React.Fragment>
    {/* <CssBaseline /> */}
    <Container style={{"backgroundColor": "white", "height" : "100%", "width": "100%"}} >
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={0}>
        <Box gridColumn="span 4" style={{"border": "1px solid black", "height": "100%"}}>
          <Box style={{"height" : "50em", "border": "1px solid black"}}>
            <ContextMenu />
          </Box>
          <Box style={{"height" : "50em", "border": "1px solid black"}}>
            <ContextAssigner/>
          </Box>
        </Box>
        <Box gridColumn="span 8"  style={{"border": "1px solid black"}}>
          <ContextTree/>
        </Box>
      </Box>
    </Container>
  </React.Fragment>

  );
};

export default ContextManager;