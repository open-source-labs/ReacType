import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function DataTable(props) {
  const {
    currComponentState, parentProps, clickedComp, data,
  } = props;
  const state = useSelector((store:RootState) => store.appState)

  // determine if the current component is a root component
  let isRoot = false;

  for (let i = 0; i < data.length; i++) {
    if (data[i].name === clickedComp) {
      if (state.rootComponents.includes(data[i].id)) isRoot = true;
    }
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '350px' }}>
      <Table
        sx={{ width: '510px' }}
        aria-label="customized table"
        stickyHeader
      >

        {/* we are checking if the clicked component is a root component-- if yes, it doesn't have any parents so don't need passed-in props table */}
        {(!isRoot
          && (
            <>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" colSpan={3}>
                    Props Passed in from Parent:
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row"><b>Key</b></StyledTableCell>
                  <StyledTableCell align="right"><b>Type</b></StyledTableCell>
                  <StyledTableCell align="right"><b>Initial Value</b></StyledTableCell>
                </StyledTableRow>
                {parentProps ? parentProps.map((data, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">{data.key}</StyledTableCell>
                    <StyledTableCell align="right">{data.type}</StyledTableCell>
                    <StyledTableCell align="right">{data.value}</StyledTableCell>
                  </StyledTableRow>
                )) : ''}
              </TableBody>
            </>
          )
        )}

        {/* The below table will contain the state initialized within the clicked component */}
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={3}>
              State Initialized in Current Component:
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row"><b>Key</b></StyledTableCell>
            <StyledTableCell align="right"><b>Type</b></StyledTableCell>
            <StyledTableCell align="right"><b>Initial Value</b></StyledTableCell>
          </StyledTableRow>
          {currComponentState ? currComponentState.map((data, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">{data.key}</StyledTableCell>
              <StyledTableCell align="right">{data.type}</StyledTableCell>
              <StyledTableCell align="right">{data.value}</StyledTableCell>
            </StyledTableRow>
          )) : ''}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
