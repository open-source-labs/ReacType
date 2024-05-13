import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

/**
 * Styles the TableCell component using Material-UI's styling system. Custom styles are applied to table head and body cells:
 * - Head cells are styled with a black background and white text.
 * - Body cells have a font size of 14.
 *
 * @param {object} theme - The theme object provided by Material-UI's ThemeProvider.
 * @returns {object} A styled TableCell component with customized appearance.
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

/**
 * Styles the TableRow component to enhance table row appearance. Custom styles include:
 * - Every odd row is styled with a background color for hover state.
 * - Removes the border from the last child table cells and headers to enhance appearance.
 *
 * @param {object} theme - The theme object provided by Material-UI's ThemeProvider.
 * @returns {JSX.Element} A styled TableRow component with alternate row coloring and modified border visibility.
 */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

/**
 * A styled data table component that displays a list of items in a single column format.
 * This component uses Material-UI to create a visually distinct table with styled cells and rows.
 * It is specifically designed to display 'contexts consumed' but can be generalized for other single-column data.
 *
 * @param {Object} props - Component props.
 * @param {Array<string>} props.target - The data array containing strings to be displayed in the table.
 *
 * @returns {JSX.Element} A TableContainer component housing a Table, where each row displays an element from the `target` prop.
 */
export default function DataTable({ target }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '510px' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" style={{backgroundColor: '#131416'}}>Contexts Consumed</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {target.map((data, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {data}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}