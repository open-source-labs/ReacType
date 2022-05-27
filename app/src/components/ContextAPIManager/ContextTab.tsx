// import * as React from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import StateContext from '../../context/context';

// export default function ContextAssigner() {
//   const [age, setAge] = React.useState('');
//   const [componentList, dispatch] = React.useContext(StateContext);

//   console.log(componentList);
//   const handleChange = (event: SelectChangeEvent) => {
//     setAge(event.target.value as string);
//   };

//   return (

//     // <Box sx={{ minWidth:100 }}>
//     //   <FormControl fullWidth>
//     //     <InputLabel id="demo-simple-select-label">Select Component</InputLabel>
//     //     <Select
//     //       labelId="demo-simple-select-label"
//     //       id="demo-simple-select"
//     //       value={age}
//     //       label="Age"
//     //       onChange={handleChange}
//     //     >
//     //       {componentList.components.map((component) => {
//     //        return <MenuItem value={component.name}>{component.name}</MenuItem>
//     //       })}
//     //     </Select>
//     //   </FormControl>
//     // </Box>
//   );
// }

// import * as React from 'react';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import ContextAssigner from './ContextAssigner';
// import ContextCreator from './ContextCreator';

// export default function ColorToggleButton() {
//   const [alignment, setAlignment] = React.useState('web');

//   const handleChange = (
//     event: React.MouseEvent<HTMLElement>,
//     newAlignment: string
//   ) => {
//     setAlignment(newAlignment);
//   };

//   return (
//     <ToggleButtonGroup
//       color="primary"
//       value={alignment}
//       exclusive
//       onChange={handleChange}
//       fullWidth={true}
//     >
//       <ToggleButton value="web">Create/Edit</ToggleButton>

//       <ToggleButton value="android">Assign</ToggleButton>
//     </ToggleButtonGroup>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import ContextCreator from './CreatorComponent/ContextCreator';
import ContextAssigner from './AssignerComponents/ContextAssigner';
import ContextTree from './Display/ContextTree';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered={true}
            // indicatorColor={'warning'}
            // textColor={'secondary'}
          >
            <Tab label="Create/Edit" value="1" />
            <Tab label="Assign" value="2" />
            <Tab label="Display" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ContextCreator />
        </TabPanel>
        <TabPanel value="2">
          <ContextAssigner />
        </TabPanel>
        <TabPanel value="3">
          <ContextTree />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
