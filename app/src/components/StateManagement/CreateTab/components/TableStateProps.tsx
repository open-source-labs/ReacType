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
      headerName: 'X',
      width: 70,
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
  console.log('passedInProps after rows declaration', state.components[state.canvasFocus.componentId - 1].passedInProps?.slice()[0]);
  console.log('type of passedInProps', Array.isArray(state.components[state.canvasFocus.componentId - 1].passedInProps?.slice()));
  const passedInProps = state.components[state.canvasFocus.componentId - 1].passedInProps?.slice();
  passedInProps?.forEach(propObj => {
    rows.push(propObj)
  })
  console.log('rows after for loop', rows)
  // let passedInPropsArray = state.components[state.canvasFocus.componentId - 1].passedInProps?.slice();
  // console.log({passedInPropsArray})
  // if (passedInPropsArray[0]) rows.push(passedInPropsArray[0]);
  console.log('rows in line 98', rows);
  console.log('props.providerId',props.providerId);
  if (!props.providerId) {
    const currentId = state.canvasFocus.componentId;
    const currentComponent = state.components[currentId - 1];
    rows = currentComponent.stateProps.slice();
    //add parentProps to the rows array
    rows.concat(currentComponent.passedInProps?.slice());
  } else {
    const providerComponent = state.components[props.providerId - 1];
    // changed to get whole object
    if (props.displayObject){
      const displayObject = props.displayObject;
      // format for DataGrid
      let id=1;
      const currentId = state.canvasFocus.componentId;
      const currentComponent = state.components[currentId - 1];
      for (const key in displayObject) {
        // if key is a number make it a string with brackets aroung number
        const newKey = isNaN(key) ? key : '[' + key + ']';
        const type = Array.isArray(displayObject[key]) ? 'array' : typeof (displayObject[key]);
        rows.push({ id: id++, key: newKey, value: displayObject[key], type: type});
      }
    } else {
      const currentId = state.canvasFocus.componentId;
      const currentComponent = state.components[currentId - 1];
      rows = providerComponent.stateProps.slice();
      rows.concat(currentComponent.passedInProps?.slice());
      console.log({rows})
    }
  }


  return (
    <div className={'state-prop-grid'} style={{display: 'flex', gap: "20px"}}>
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
