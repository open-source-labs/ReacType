import React, { useState, useContext, useEffect } from 'react';
import {
  DataGrid,
  GridEditRowsModel,
} from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import StateContext from "../../../../context/context";
import { makeStyles } from '@material-ui/core/styles';
import { StatePropsPanelProps } from '../../../../interfaces/Interfaces';
import AddIcon from '@mui/icons-material/Add';

const TableParentProps = props => {
  // console.log('props from table state props', props)
  const [state, dispatch] = useContext(StateContext);
  const classes = useStyles();
  const [editRowsModel] = useState<GridEditRowsModel>({});
  const [gridColumns, setGridColumns] = useState([]);
  const [checked, setChecked] = useState(false);
  const parentProps = props.parentProps;
  const parentComponent = props.parentComponent;
  const columnTabs = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      editable: false
    },
    {
      field: 'key',
      headerName: 'Key',
      width: 90,
      editable: true
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 90,
      editable: true
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 90,
      editable: false
    },
    {
      field: 'delete',
      headerName: '+',
      width: 70,
      editable: false,
      renderCell: function renderCell(params: any) {
        return (
          <Button
            style={{ width: `${3}px`, color: 'black'}}
            onClick={() => {
                console.log('params inside button', params)
              addParentProps(params.row, params.id);
            }}
          >
            <AddIcon style={{ width: `${15}px` }} />
          </Button>
          
        );
      }
    }
  ];
  const addParentProps = (parentComponentProps, rowId) => {
    // get the current focused component
    // remove the state that the button is clicked
    // send a dispatch to rerender the table
    // const currentId = state.canvasFocus.componentId;
    // const currentComponent = state.components[currentId - 1];
    console.log("inside of addParentProps");
    console.log({rowId}); 
    console.log('params.row', {parentComponentProps}) //this isn't working-- returning undefined instead of correct component
    // console.log('parentProps', parentProps) //this isn't working-- returning undefined instead of correct component
    // const filtered = parentComponent?.stateProps?.filter(
    //   element => element.id === selectedId - 1
    // );
    // console.log({filtered});
    dispatch({
      type: 'ADD PARENTPROPS',
      payload: { passedInProps: parentComponentProps, rowId: rowId }
    });
  };



  useEffect(() => {
    setGridColumns(columnTabs);
  }, [props.isThemeLight]);

  const { selectHandler }: StatePropsPanelProps = props;
  // the delete button needs to be updated to remove
  // the states from the current focused component

  useEffect(() => {
    if (props.canDeleteState) {
      setGridColumns(columnTabs);
    } else {
      setGridColumns(columnTabs.slice(0, gridColumns.length - 1));
    }
    
  }, [state.canvasFocus.componentId]);
  // rows to show are either from current component or from a given provider
  // legacy pd convert parent props into a row array
  let rows = parentProps;
  // if (!props.providerId) {
  //   const currentId = state.canvasFocus.componentId;
  //   const currentComponent = state.components[currentId - 1];
  //   rows = currentComponent.stateProps.slice();
  // } else {
  //   const providerComponent = state.components[props.providerId - 1];
  //   // changed to get whole object
  //   if (props.displayObject){
  //     const displayObject = props.displayObject;
  //     // format for DataGrid
  //     let id=1;
  //     for (const key in displayObject) {
  //       // if key is a number make it a string with brackets aroung number
  //       const newKey = isNaN(key) ? key : '[' + key + ']';
  //       const type = Array.isArray(displayObject[key]) ? 'array' : typeof (displayObject[key]);
  //       rows.push({ id: id++, key: newKey, value: displayObject[key], type: type});
  //     }
  //   } else {
  //     rows = providerComponent.stateProps.slice();
  //   }
  // }


  return (
    <div className={'state-prop-grid'}>
         {(rows.length &&   
      <DataGrid
        rows={rows}
        columns={gridColumns}
        pageSize={5}
        editRowsModel={editRowsModel}
        onRowClick={addParentProps}
        className={props.isThemeLight ? classes.themeLight : classes.themeDark}
        checkboxSelection
      />
         )}
    </div>
  );
};

const useStyles = makeStyles({
  themeLight: {
    color: 'rgba(0,0,0,0.54)',
    '& .MuiTablePagination-root': {
      color: 'rbga(0,0,0,0.54)'
    }
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

export default TableParentProps;
