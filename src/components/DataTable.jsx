import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';


const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    // overflowX: 'auto',
  },
  table: {
    minWidth: 500,
    maxWidth: 500,
  },
});

/** **************************
 * cannot have a row header or a key in the data  called "key"
 * ,ust have unique id
 * ****************************** */

function dataTable(props) {
  const { classes, rowData, rowHeader, deletePropHandler } = props;

  const renderHeader = rowHeader.map((col, idx) => <TableCell key={`head_+${idx}`}>{col}</TableCell>);

  function renderRowCells(row) {
    if (!row) return;
    // for some reason we must put each value in a div.
    return rowHeader.map((header, idx) => (
      <TableCell  align={'center'} key={`td_${idx}`}>
        {/* <div  align={'center'} padding = {'none'} >{typeof row[header] === 'string' ? row[header] : row[header].toString()}</div> */}
      {/* {row[header]} */}
      {typeof row[header] === 'string' ? row[header] : row[header].toString()}
      </TableCell>
    ));
  }
//style={{height: 30}} 
  const renderRows = rowData.map(row => (
    <TableRow key={`row-${row.id}`}>
      {renderRowCells(row)}
      <TableCell align={'center'} padding = {'none'}  >
        <IconButton color="default" fontSize="small" onClick={() => deletePropHandler(row.id)} >
            <DeleteIcon/>
        </IconButton>
        {/* <Button style={{height: 20}} onClick={() => deletePropHandler(row.id)}>Delete</Button> */}
      </TableCell>
    </TableRow>
  ));

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}
         selectable = {"true"}
      >
        <TableHead>
          <TableRow >{renderHeader}</TableRow>
        </TableHead>
        <TableBody>{renderRows}</TableBody>
      </Table>
    </Paper>
  );
}

// dataTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(dataTable);
