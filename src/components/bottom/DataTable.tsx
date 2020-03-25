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
    width: '650px',
    marginTop: theme.spacing(3),
    borderRadius: '8px',
    // boxShadow: '0px 0px 5px 2px #97ffb6'
    boxShadow: '0px 0px 5px 2px lightgray'
  },
  tableContainer: {
    borderRadius: '7px',
    border: 'none',
    backgroundColor: '#55585b'
  },
  table: {
    minWidth: 300,
    borderRadius: '7px',
    backgroundColor: '#55585b'
  },
  tableHeader: {
    fontWeight: '900',
    fontSize: '25px',
    color: '#01d46d',
    border: 'none',
    textShadow: '2px 2px 5px 5px #8dffce'
  },
  tableCell: {
    fontWeight: '500',
    fontSize: '17px',
    letterSpacing: '2px',
    color: 'lightgray',
    padding: '3px',
    borderRadius: '7px',
    border: 'none',
    '&:hover': {
      transform: 'scale(1.1)',
      color: '#fff'
    }
  },
  tableCellShaded: {
    fontWeight: '900',
    fontSize: '15px',
    color: '#91D1F9',
    borderRadius: '7px'
  },
  trashIcon: {
    backgroundColor: 'none',
    color: 'gray',
    '&:hover': {
      transform: 'scale(1.08)',
      backgroundColor: 'gray',
      color: '#b30000',
      border: 'none'
    }
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
    <TableCell
      className={classes.tableHeader}
      align={'center'}
      key={`head_+${idx}`}
    >
      {col}
    </TableCell>
  ));

  function renderRowCells(row: any) {
    if (!row) return;
    // for some reason we must put each value in a div.
    return rowHeader.map((header: string, idx: number) => (
      <TableCell align={'center'} key={`td_${idx}`}>
        <div className={classes.tableCell} align={'center'} padding={'none'}>
          {row[header]}
        </div>
      </TableCell>
    ));
  }
  // style={{height: 30}}
  const renderRows = rowData.map((row: any) => (
    <TableRow key={`row-${row.id}`}>
      {renderRowCells(row)}
      <TableCell
        style={{ height: '15px', width: '15px' }}
        align={'center'}
        padding={'none'}
      >
        <IconButton
          className={classes.trashIcon}
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
      <div className={classes.tableContainer}>
        <Table className={classes.table} selectable={'true'}>
          <TableHead>
            <TableRow>{renderHeader}</TableRow>
          </TableHead>
          <TableBody>{renderRows}</TableBody>
        </Table>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(dataTable);
