import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

const styles = (theme: Theme) => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    marginRight: '100px'
    // overflowX: "auto"
  },
  table: {
    minWidth: 500,
    marginRight: '100px'
  },
  tableCell: {
    fontWeight: '900',
    fontSize: '1.2rem',
    color: '#91D1F9',
    border: '1px solid red'
  }
});

/** **************************
 * cannot have a row header or a key in the data  called "key"
 * must have unique id
 * ****************************** */

// Jesse: added interface for the props being passed into dataTable. Previously, props:any was unsed in params.
interface dataTableProps {
  classes: any; // materialUI requirement(?)
  rowData: {
    /* rowData is defined as propsRows in Props.tsx: array of objects {key, value, type, required, id}
      values for this object originate from the input fields within Component Props tab in the bottom section of the app
    */
    _Key: string;
    Value: string | number;
    Type: string;
    Required: boolean;
    id: number;
  }[];
  rowHeader: string[];
  deletePropHandler(propId: number): void;
}

function dataTable(props: dataTableProps) {
  const { classes, rowData, rowHeader, deletePropHandler } = props;

  const renderHeader = rowHeader.map((col: any, idx: number) => (
    <TableCell align={'center'} key={`head_+${idx}`}>
      {col}
    </TableCell>
  ));

  function renderRowCells(row: any) {
    if (!row) return;
    // for some reason we must put each value in a div.
    return rowHeader.map((header: string, idx: number) => (
      <TableCell align={'center'} key={`td_${idx}`}>
        {/* <div  align={'center'} padding = {'none'} >{typeof row[header] === 'string' ? row[header] : row[header].toString()}</div> */}
        {/* {row[header]} */}
        {typeof row[header] === 'string' ? row[header] : row[header].toString()}
      </TableCell>
    ));
  }
  // style={{height: 30}}
  const renderRows = rowData.map((row: any) => (
    <TableRow key={`row-${row.id}`}>
      {renderRowCells(row)}
      <TableCell align={'center'} padding={'none'}>
        <IconButton
          color='default'
          // fontSize='small' - commented/removed b/c not a valid attribute for IconButton component
          onClick={() => deletePropHandler(row.id)}
        >
          <DeleteIcon />
        </IconButton>
        {/* <Button style={{height: 20}} onClick={() => deletePropHandler(row.id)}>Delete</Button> */}
      </TableCell>
    </TableRow>
  ));

  return (
    <Paper className={classes.root}>
      <Table
        className={classes.table}
        // selectable={'true'} - commented/removed b/c not a valid attr for Table (no adverse effects noted)
      >
        <TableHead>
          <TableRow>{renderHeader}</TableRow>
        </TableHead>
        <TableBody>{renderRows}</TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(dataTable);
