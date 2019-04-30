import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


/****************************
 * cannot have a row header or a key in the data  called "key" 
 * ,ust have unique id 
 * ****************************** */

function dataTable(props) {
  const { classes , rowData, rowHeader , deletePropHandler } = props;
  
  // console.log(classes)
  console.log(`rowHeader`)
  console.log(rowHeader)
   console.log(`rowData`)
   console.log(rowData)

   const renderHeader = rowHeader.map( (col,idx) =>  {
    return <TableCell key={`head_+${idx}`}>{col}</TableCell>
   })

  function renderRowCells  (row) {
    if(!row) return; 
    // for some reason we must put each value in a div. 
    return (
      rowHeader.map( (header,idx) => 
        <TableCell key={'td_'+ idx}>
          <div>
            { typeof row[header] == 'string' ? row[header] : row[header].toString()  }
          </div>
          </TableCell>
        )
    )
 }
  
  const renderRows = 
  rowData.map((row) => 
        <TableRow key={`row-${row.id}`}>
        {renderRowCells(row)}    
         <TableCell>  
          <button onClick={ ()=>deletePropHandler(row.id) } >
          Delete
          </button> 
        </TableCell> 
        </TableRow> 
 )

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
           {renderHeader}
          </TableRow>
        </TableHead>
        <TableBody>
          {renderRows}
        </TableBody>
      </Table>
    </Paper>
  );
}

// dataTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(dataTable);