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

const TableStateProps = props => {
  // console.log('props from table state props', props)
  const [state, dispatch] = useContext(StateContext);
  const classes = useStyles();
  const [editRowsModel] = useState<GridEditRowsModel>({});
  const [gridColumns, setGridColumns] = useState([]);
  const currentId = state.canvasFocus.componentId;
  const currentComponent = state.components[currentId - 1];
  const rows1 = props.rows1;
  const setRows1 = props.setRows1;
  console.log({currentComponent})

  console.log({rows1})
  const columnTabs = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
      editable: false
    },
    {
      field: 'key',
      headerName: 'Key',
      width: 50,
      editable: true
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 50,
      editable: true
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 50,
      editable: false
    },
    {
      field: 'delete',
      headerName: 'X',
      width: 50,
      editable: false,
      renderCell: function renderCell(params: any) {
        return (
          <Button
            style={{ width: `${3}px`, color: 'black'}}
            onClick={() => {
              deleteState(params.id);
            }}
          >
            <ClearIcon style={{ width: `${15}px` }} />
          </Button>
        );
      }
    }
  ];
  const deleteState = selectedId => {
    // get the current focused component
    // remove the state that the button is clicked
    // send a dispatch to rerender the table
    const currentId = state.canvasFocus.componentId;
    const currentComponent = state.components[currentId - 1];
    const filtered = currentComponent.stateProps.filter(
      element => element.id !== selectedId
    );
    dispatch({
      type: 'DELETE STATE',
      payload: { stateProps: filtered, rowId: selectedId }
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

  let rows = [];
    
  
    // const passedInProps = currentComponent.passedInProps?.slice();
    // console.log({passedInProps});

    // passedInProps?.forEach(propObj => {
    //   rows.push(propObj)
    // })

    console.log("rows before pushing stateProps", rows);

    currentComponent.stateProps?.forEach((prop) => rows.push(prop)); 

    console.log("rows after pushing stateProps", rows);

  // if (!props.providerId) {
   
    // if (rows.length < 1) {
      //currentComponent.stateProps?.forEach((prop) => rows.push(prop)) 
    // } else rows.concat(currentComponent.stateProps.slice());
  
    //[1,1.01,2,2.02]
    //[1,3,2,4]
    //add current props to the rows array
  //} 
  // else {

  //   /// LegacyPD: we want to delete this because state management tab shouldn't be using context 

  //   const providerComponent = state.components[props.providerId - 1];
  //   // changed to get whole object
  //   if (props.displayObject){
  //     const displayObject = props.displayObject;
  //     // format for DataGrid
  //     let id=1;
  //     const currentId = state.canvasFocus.componentId;
  //     const currentComponent = state.components[currentId - 1];
  //     for (const key in displayObject) {
  //       // if key is a number make it a string with brackets aroung number
  //       const newKey = isNaN(key) ? key : '[' + key + ']';
  //       const type = Array.isArray(displayObject[key]) ? 'array' : typeof (displayObject[key]);
  //       rows.push({ id: id++, key: newKey, value: displayObject[key], type: type});
  //     }
  //   } else {
  //     const currentId = state.canvasFocus.componentId;
  //     const currentComponent = state.components[currentId - 1];
  //     rows.concat(currentComponent.stateProps.slice());
  //   }
  // }


  return (
    <div className={'state-prop-grid'}>
      <DataGrid
        rows={rows}
        columns={gridColumns}
        pageSize={5}
        editRowsModel={editRowsModel}
        onRowClick={selectHandler}
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

export default TableStateProps;
