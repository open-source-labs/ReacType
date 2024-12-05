/* eslint-disable max-len */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/**
 * Styles the TableCell component using Material-UI's styling system. Custom styles are applied to table head and body cells:
 * - Head cells are styled with a black background and white text.
 * - Body cells have a font size of 14.
 *
 * @param {object} theme - The theme object provided by Material-UI's ThemeProvider.
 * @returns {JSX.Element} A styled TableCell component with customized appearance.
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
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
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

/**
 * Constructs a data object for table rows. This function simplifies the creation of data entries for the table.
 *
 * @param {string} name - The name field of the data entry.
 * @param {number} calories - Numeric data typically representing calorie count.
 * @param {number} fat - Numeric data typically representing fat content.
 * @param {number} carbs - Numeric data typically representing carbohydrate content.
 * @param {number} protein - Numeric data typically representing protein content.
 * @returns {object} An object representing a single row of data suitable for insertion into a table.
 */
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

/**
 * Displays a styled table with context and component data using Material-UI components.
 * This component uses custom styled table cells and rows to enhance visual presentation.
 * The data is statically defined in the component and includes fields for context names and corresponding component data.
 *
 * The table is intended to display any list of data that fits the structure of contexts and their associated components,
 * and it features alternating row colors and a custom style for headers and body cells to align with a theme.
 *
 * @returns {JSX.Element} A TableContainer component that houses a Table with two columns: Context and Component.
 * Each row displays the name of the context and a numeric value representing associated component data.
 */
export default function ContextTable(): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '50%' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Context</StyledTableCell>
            <StyledTableCell align="right">Component</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
