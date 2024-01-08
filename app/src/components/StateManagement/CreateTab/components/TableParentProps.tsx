import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridEditRowsModel } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import AddIcon from '@mui/icons-material/Add';
import { addPassedInProps } from '../../../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../../../redux/store';
import { emitEvent } from '../../../../helperFunctions/socket';

const TableParentProps = (props) => {
  const state = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const dispatch = useDispatch();
  const classes = useStyles();
  const currentId = state.canvasFocus.componentId;
  const currentComponent = state.components[currentId - 1];
  const [editRowsModel] = useState<GridEditRowsModel>({});
  const [gridColumns, setGridColumns] = useState([]);
  const parentProps = props.parentProps;
  const parentPassedInProps = props.parentPassedInProps;
  const parentComponent = props.parentComponent;
  const columnTabs = [
    {
      field: 'id',
      headerName: 'ID',
      width: 30,
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
      headerName: 'Initial Value',
      width: 100,
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
      width: 30,
      editable: false,
      renderCell: function renderCell(params: any) {
        return (
          <Button
            style={{ width: `${3}px`, color: 'white' }}
            onClick={() => {
              addProps(params.row, params.id - 1);
            }}
          >
            <AddIcon style={{ width: `${15}px` }} />
          </Button>
        );
      }
    }
  ];
  const addProps = (parentComponentProps, rowId) => {
    // get the current focused component
    // remove the state that the button is clicked
    // send a dispatch to rerender the table
    dispatch(
      addPassedInProps({
        passedInProps: parentComponentProps,
        rowId: rowId,
        parentComponent: parentComponent,
        contextParam: contextParam
      })
    );

    if (roomCode) {
      emitEvent('addPassedInPropsAction', roomCode, {
        passedInProps: parentComponentProps,
        rowId: rowId,
        parentComponent: parentComponent,
        contextParam: contextParam
      });
    }
  };

  useEffect(() => {
    setGridColumns(columnTabs);
  }, [props.isThemeLight]);

  // determine whether or not to include delete column in data grid
  useEffect(() => {
    if (props.canDeleteState) {
      setGridColumns(columnTabs);
    } else {
      setGridColumns(columnTabs.slice(0, gridColumns.length - 1));
    }
  }, [state.canvasFocus.componentId]);

  let rows;

  // check if current component is a root component-- if yes, it shouldn't have any parent props
  if (currentComponent.name === 'App' || currentComponent.name === 'index') {
    rows = [];
  } else {
    if (parentProps) {
      rows = parentProps;
      if (parentPassedInProps) {
        rows = [...rows, ...parentPassedInProps];
      }
    }
  }

  return (
    <div className={'state-prop-grid'}>
      <DataGrid
        rows={rows}
        columns={gridColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        editRowsModel={editRowsModel}
        className={props.isThemeLight ? classes.themeLight : classes.themeDark}
        disableColumnMenu={true}
      />
    </div>
  );
};

const useStyles = makeStyles({
  themeLight: {
    color: 'white',
    '& button:hover': {
      backgroundColor: 'LightGray'
    },
    '& button': {
      color: 'white'
    },
    '& .MuiTablePagination-root': {
      color: 'white'
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
