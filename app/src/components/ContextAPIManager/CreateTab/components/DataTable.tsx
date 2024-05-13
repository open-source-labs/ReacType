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
 * Custom styled table cell component using Material-UI's styling system. Applies specific styles to table head and body cells.
 * - Head cells (`TableCell.head`) are styled with a black background and white text color.
 * - Body cells (`TableCell.body`) are set with a font size of 14px.
 *
 * @param {Object} props - Inherits all the props from the Material-UI TableCell component.
 * @returns {JSX.Element} A TableCell component with applied styles.
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: 'theme.palette.common.white'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

/**
 * Custom styled table row component using Material-UI's styling system. Applies conditional styles to table rows.
 * - Every odd row is given a hover background color from the theme.
 * - Removes the border from the last child table cells and table headers in a row to hide the last border.
 *
 * @param {Object} props - Inherits all the props from the Material-UI TableRow component.
 * @returns {JSX.Element} A TableRow component with applied styles.
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
 * Displays a styled data table using MUI components. This table is used to show key-value pairs for a given context.
 * It receives data as props and presents it in a scrollable and sticky-header table format.
 *
 * @param {{ target: Array<{ key: string; value: string }>, currentContext: string }} props
 * - `target`: An array of objects with 'key' and 'value' properties representing the data to be displayed.
 * - `currentContext`: The name of the context currently being displayed. If not provided, defaults to 'Context Name'.
 *
 * @returns {JSX.Element} A component that renders a table with two columns: one for keys and one for their corresponding values.
 *
 * @example
 * ```jsx
 * <DataTable
 *   target={[{ key: "Key1", value: "Value1" }, { key: "Key2", value: "Value2" }]}
 *   currentContext="Sample Context"
 * />
 * ```
 */
export default function DataTable({ target, currentContext }): JSX.Element {
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
              <StyledTableCell
                align="center"
                colSpan={3}
                style={{ backgroundColor: '#131416' }}
              >
                {currentContext ? currentContext : 'Context Name'}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {target.map((data, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  style={{ color: 'white', backgroundColor: '#2D313A' }}
                  component="th"
                  scope="row"
                  key={`${index}-key-${data.key}`}
                >
                  {data.key}
                </StyledTableCell>
                <StyledTableCell
                  style={{ color: 'white', backgroundColor: '#2D313A' }}
                  align="right"
                  key={`${index}-value-${data.value}`}
                >
                  {data.value}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
