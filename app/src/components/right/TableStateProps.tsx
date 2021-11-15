
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


const TableStateProps = (props) => {
  const [state, dispatch] = useContext(StateContext);
  const classes = useStyles();
  const [editRowsModel] = useState <GridEditRowsModel> ({});
  const [gridColumns, setGridColumns] = useState([]);
  const [rows, setRows] = useState([]); 
  

  useEffect(() => {
    setGridColumns(getColumns(props, state, dispatch));
  }, [props.isThemeLight])
  // get currentComponent by using currently focused component's id
  
  // rows to show are either from current component or from a given provider
 
  const { selectHandler } : StatePropsPanelProps = props;
  
  // when component gets mounted, sets the gridColumn
  useEffect(() => {
    setGridColumns(getColumns(props, state, dispatch));

    if (!props.providerId) {
      const currentId = state.canvasFocus.componentId;
      const currentComponent = state.components[currentId - 1];
      setRows(currentComponent.stateProps.slice());
    } else {
      const providerComponent = state.components[props.providerId - 1];
      setRows(providerComponent.stateProps.slice());
    }
  
  }, [props.providerId, state]);
  
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


const getColumns = (props, state, dispatch) => {
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
          // const fields = api.getAllColumns().map((c: any) => c.field).filter((c : any) => c !== '__check__' && !!c);
          return params.id;
          // return params.getValue(fields[0]);
        };
        return ( 
          <Button style={{width:`${3}px`}}
          onClick={() => {
            const deleteAttributeWithState = (id) => {
              let currentComponent; 
              if(!props.providerId) {
                const currentId = state.canvasFocus.componentId;
                currentComponent = state.components[currentId - 1];
                const filtered = currentComponent.stateProps.filter(element => element.id !== id);
                console.log('filtered:', filtered);     
                dispatch({
                  type: 'DELETE STATE', 
                  payload: {stateProps: filtered}
                });
              }
              else {
                currentComponent = state.components[props.providerId - 1]; 
                console.log("row-id: ", id); 
                console.log("provider-id: ", props.providerId)
                console.log("currentProviderComponent: ", currentComponent); 
                const filtered = currentComponent.stateProps.filter(element => element.id !== id);
                console.log('filtered:', filtered);     
                dispatch({
                  type: 'DELETE STATE', 
                  payload: {stateProps: filtered, providerId: props.providerId}
                });
              }
            }
        
            deleteAttributeWithState(getIdRow()); 
          }

          }>
            <ClearIcon style={{width:`${15}px`}}/>
          </Button>
        );
      },
    },
  ];
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
