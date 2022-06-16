import React from 'react';
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

export default function DataTable({ target, contextInput }) {
  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: '350px' }}>
        <Table
          sx={{ width: '510px' }}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Key</StyledTableCell> */}
              <StyledTableCell align="center" colSpan={3}>
                {contextInput ? contextInput.name : 'Context Name'}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {target.map((data, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {data.key}
                </StyledTableCell>
                <StyledTableCell align="right">{data.value}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <StyledTableCell align="center" colSpan={3}>
              {contextInput ? contextInput.name : 'Context Name'}
            </StyledTableCell>
          </TableFooter> */}
        </Table>
      </TableContainer>
    </>
  );
}
