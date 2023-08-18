import { autoUpdater } from "electron";

const globalDefaultStyle: Object = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  padding: '10px 20px 10px 20px',
  margin: '10px',
  borderRadius: '2px',
  border: '10px Solid grey',
  fontFamily: 'Helvetica Neue',
  maxWidth: 'fit-content',
  minWidth: '250px',
  backgroundColor: 'rgba(0, 0, 0, 0.2)', // experiment to see what is inherited
};

export default globalDefaultStyle;
