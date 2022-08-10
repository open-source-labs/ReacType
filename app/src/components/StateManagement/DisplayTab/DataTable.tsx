import React, {useContext} from 'react';
import StateContext from "../../../context/context";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export default function DataTable(props) {
  // const [state, dispatch] = useContext(StateContext);
  // console.log('passedInProps from context', state.component.passedInProps)
  const { currComponentState, setCurrComponentState, parentProps, setParentProps, clickedComp } = props;
  console.log('props inside data table', props);
  console.log({currComponentState});
  console.log({parentProps});
  console.log({clickedComp});
  
  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: '350px' }}>
        <Table
          sx={{ width: '510px' }}
          aria-label="customized table"
          stickyHeader
        >
          
          {/* this table will contain passed down stateProps data from parent component */}
        {(clickedComp !== 'App' && 
        
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Key</StyledTableCell> */}
              <StyledTableCell align="center" colSpan={3}>
                {/* contextInput to be replaced by new state hook by other LegacyPD. Want to use component name and parent name instead */}
                 { 'Props Passed in from Parent:'}
              </StyledTableCell>
            </TableRow>
          </TableHead>
        )}
        {(clickedComp !== 'App' &&
          <TableBody>
            <StyledTableRow>
            <StyledTableCell component="th" scope="row" ><b>Key</b></StyledTableCell>
            <StyledTableCell align="right"><b>Type</b></StyledTableCell>
            <StyledTableCell align="right"><b>Initial Value</b></StyledTableCell>
            </StyledTableRow>
            {parentProps ? parentProps.map((data, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">{data.key}</StyledTableCell>
                <StyledTableCell align="right">{data.type}</StyledTableCell>
                <StyledTableCell align="right">{data.value}</StyledTableCell>
              </StyledTableRow>
            )): ''}
          </TableBody>
          
          )}
          
          {/* this will contain state prop data from selected component */}

          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Key</StyledTableCell> */}
              <StyledTableCell align="center" colSpan={3}>
                {/* contextInput to be replaced by new state hook by other LegacyPD. Want to use component name and parent name instead */}
                {'State Initialized in Current Component:'}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row" ><b>Key</b></StyledTableCell>
            <StyledTableCell align="right"><b>Type</b></StyledTableCell>
            <StyledTableCell align="right"><b>Initial Value</b></StyledTableCell>
            </StyledTableRow>
            {currComponentState ? currComponentState.map((data, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">{data.key}</StyledTableCell>
                <StyledTableCell align="right">{data.type}</StyledTableCell>
                <StyledTableCell align="right">{data.value}</StyledTableCell>
              </StyledTableRow>
            )): ''}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
