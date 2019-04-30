import React from 'react';
import ReactDataGrid from 'react-data-grid';


 ;
function DataGrid() {
  const columns = [
    { key: 'idd', name: 'ID' },
    { key: 'title', name: 'Title' },
    { key: 'count', name: 'Count' } ];
  
  const rows = [
      {idd: 0, title: 'row1', count: 20}, 
      {idd: 1, title: 'row1', count: 40},
      {idd: 2, title: 'row1', count: 60}
    ];

  console.log(`ract data grid: rows`)
  console.log(rows)
  console.log(`ract data grid: columns`)
  console.log(columns)
  
  function getRow(i){
    console.log(`i=${i} rows{i}= ${rows[i]}`)
    return rows[i]; 
  }

  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => rows[i]}
      rowsCount={2}
      minHeight={200} 
   
  />);
}

 export default DataGrid 
