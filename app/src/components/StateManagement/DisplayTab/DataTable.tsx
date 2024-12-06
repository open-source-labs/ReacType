/* eslint-disable max-len */
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

/**
 * `StyledTableCell` is a styled version of the MUI `TableCell` component. It applies custom styling
 * to table cells to differentiate between header cells and body cells.
 *
 * - Header cells (`thead`) are styled with a black background and white text.
 * - Body cells (`tbody`) are styled with a default black text color and a font size of 14px.
 *
 * This component is typically used within `Table` components to ensure that the table adheres to
 * a consistent theming and layout that matches the rest of the application's design.
 *
 * @param {Object} theme - The theme object provided by Material-UI's `ThemeProvider`.
 * @returns {React.Component} A `TableCell` component with custom styles applied.
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.common.black,
    fontSize: 14,
  },
}));

/**
 * `StyledTableRow` is a styled version of the MUI `TableRow` component. It enhances the visual
 * presentation of table rows with the following styles:
 *
 * - Odd rows are given a slightly different background color to improve readability by alternating row colors.
 * - The last child (last row) of the table has no bottom border, creating a cleaner look at the end of the table.
 *
 * This component is typically used within the `TableBody` component of a `Table` to provide a consistent
 * and more readable styling for table rows.
 *
 * @param {Object} theme - The theme object provided by Material-UI's `ThemeProvider`.
 * @returns {React.Component} A `TableRow` component with custom styles applied.
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
 * `DataTable` is a React component that renders a detailed view of the properties and state
 * associated with a specific component selected by the user. It displays this information in
 * two separate sections within a table: one for the properties passed from the parent component,
 * and another for the state initialized within the current component itself.
 *
 * The component uses Material-UI's styled components for styling individual cells and rows,
 * and it conditionally renders sections based on whether the selected component is a root component.
 * It leverages Redux to access the global state to check if the current component is a root component.
 *
 * @param {Object} props - Properties passed to the component including:
 * @param {Array} props.currComponentState - Array of objects describing the state within the current component.
 * @param {Array} props.parentProps - Array of objects describing the properties passed from the parent.
 * @param {string} props.clickedComp - The name of the component that was clicked.
 * @param {Array} props.data - The full data array representing all components.
 * @returns {JSX.Element} A table rendered inside a scrollable container that lists properties and state details.
 *
 * The table is split into two sections if the selected component is not a root:
 * 1. "Props Passed in from Parent:" - Lists the keys, types, and initial values of properties passed from the parent.
 * 2. "State Initialized in Current Component:" - Lists the keys, types, and initial values of the state initialized in the component.
 *
 * This component enhances the user interface by providing clear and accessible information regarding
 * component configurations, aiding developers in understanding and managing the application structure.
 */
export default function DataTable(props): JSX.Element {
  const { currComponentState, parentProps, clickedComp, data } = props;
  const state = useSelector((store: RootState) => store.appState);

  // determine if the current component is a root component
  let isRoot = false;

  for (let i = 0; i < data.length; i++) {
    if (data[i].name === clickedComp) {
      if (state.rootComponents.includes(data[i].id)) isRoot = true;
    }
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '350px' }}>
      <Table sx={{ width: '510px' }} aria-label="customized table" stickyHeader>
        {/* we are checking if the clicked component is a root component-- if yes, it doesn't have any parents so don't need passed-in props table */}
        {!isRoot && (
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
                <StyledTableCell component="th" scope="row">
                  <b>Key</b>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <b>Type</b>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <b>Initial Value</b>
                </StyledTableCell>
              </StyledTableRow>
              {parentProps
                ? parentProps.map((data, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {data.key}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {data.type}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {data.value}
                      </StyledTableCell>
                    </StyledTableRow>
                ))
                : ''}
            </TableBody>
          </>
        )}

        {/* The below table will contain the state initialized within the clicked component */}
        <TableHead>
          <TableRow>
            <StyledTableCell
              align="center"
              colSpan={3}
              style={{ backgroundColor: '#131416' }}
            >
              State Initialized in Current Component:
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow style={{ backgroundColor: '#2D313A' }}>
            <StyledTableCell
              component="th"
              scope="row"
              style={{ color: 'white' }}
            >
              <b>Key</b>
            </StyledTableCell>
            <StyledTableCell align="right" style={{ color: 'white' }}>
              <b>Type</b>
            </StyledTableCell>
            <StyledTableCell align="right" style={{ color: 'white' }}>
              <b>Initial Value</b>
            </StyledTableCell>
          </StyledTableRow>
          {currComponentState
            ? currComponentState.map((data, index) => (
                <StyledTableRow
                  key={index}
                  style={{ backgroundColor: '#2D313A' }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ color: 'white' }}
                  >
                    {data.key}
                  </StyledTableCell>
                  <StyledTableCell align="right" style={{ color: 'white' }}>
                    {data.type}
                  </StyledTableCell>
                  <StyledTableCell align="right" style={{ color: 'white' }}>
                    {data.value}
                  </StyledTableCell>
                </StyledTableRow>
            ))
            : ''}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
