
import React, { useState, useContext, useEffect } from 'react';
import {
  DataGrid,
  GridEditRowsModel,
} from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import StateContext from '../../context/context';
import { makeStyles } from '@material-ui/core/styles';

import { StatePropsPanelProps } from '../../interfaces/Interfaces';

const getColumns = (props) => {
  const { deleteHandler } : StatePropsPanelProps = props;
  console.log('isThemeLight: ',props.isThemeLight)
  return [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      editable: false,
    },
    {
      field: 'key',
      headerName: 'Key',
      width: 90,
      editable: true,
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 90,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 90,
      editable: false,
    },
    {
      field: 'delete',
      headerName: 'X',
      width: 70,
      editable: false,
      renderCell: function renderCell(params:any) {
        const getIdRow = () => {
          const { api } = params;
          const fields = api.getAllColumns().map((c: any) => c.field).filter((c : any) => c !== '__check__' && !!c);
          return params.getValue(fields[0]);
        };
        return ( 
          <Button style={{width:`${3}px`}}
          onClick={() => {
            deleteHandler(getIdRow());
          }}>
            <ClearIcon style={{width:`${15}px`}}/>
          </Button>
        );
      },
    },
  ];
};

const TableStateProps = (props) => {
  const classes = useStyles();
  const [state] = useContext(StateContext);
  const [editRowsModel] = useState <GridEditRowsModel> ({});
  const [gridColumns, setGridColumns] = useState([]);
  

  useEffect(() => {
  console.log('isThemeLight: ',props.isThemeLight)
    setGridColumns(getColumns(props));
  }, [props.isThemeLight])
  // get currentComponent by using currently focused component's id
  const currentId = state.canvasFocus.componentId;
  const currentComponent = state.components[currentId - 1];
  
  const rows = currentComponent.stateProps.slice();

  const { selectHandler } : StatePropsPanelProps = props;
  
  // when component gets mounted, sets the gridColumn
  useEffect(() => {
    setGridColumns(getColumns(props));
  }, []);
  
  return (
    <div className={'state-prop-grid'}>
      <DataGrid
        rows={rows}
        columns={gridColumns}
        pageSize={5}
        editRowsModel={editRowsModel}
        onRowClick = {selectHandler}
        className={props.isThemeLight ? classes.themeLight : classes.themeDark}
      />
    </div>
  );
};


const useStyles = makeStyles({
  themeLight: {
    color: 'rgba(0,0,0,0.54)',
    '& .MuiTablePagination-root': {
      color: 'rbga(0,0,0,0.54)'
    },
  },
  themeDark: {
    color: 'white',
    '& .MuiTablePagination-root': {
      color: 'white'
    },
    '& .MuiIconButton-root': {
      color: 'white'
    },
    '& .MuiSvgIcon-root': {
      color: 'white'
    },
    '& .MuiDataGrid-window': {
      backgroundColor: 'rgba(0,0,0,0.54)'
    }
  }
});

export default TableStateProps;
