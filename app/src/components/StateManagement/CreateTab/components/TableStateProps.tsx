/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { DataGrid, GridEditRowsModel } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { StatePropsPanelProps, ColumnTab } from '../../../../interfaces/Interfaces';
import { deleteState } from '../../../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../../../redux/store';
import { emitEvent } from '../../../../helperFunctions/socket';

/**
 * `TableStateProps` is a React component that displays a data grid for managing state properties within an application.
 * The component allows for the interactive addition, deletion, and modification of state properties directly within a table format.
 * The component adapts its style and functionality based on the current theme and the ability to delete state entries.
 *
 * @param {Object} props - Properties passed to the component.
 * @param {boolean} props.isThemeLight - Determines the theme of the data grid (light or dark).
 * @param {boolean} props.canDeleteState - Indicates whether the deletion of state entries is allowed.
 * @param {Function} props.selectHandler - Function called when a row is clicked, typically used to handle row selection.
 *
 * @returns {JSX.Element} A data grid component that displays and allows interaction with state properties of a component.
 */
const TableStateProps = (props): JSX.Element => {
  const state = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const dispatch = useDispatch();
  const classes = useStyles();
  const [editRowsModel] = useState<GridEditRowsModel>({});
  const [gridColumns, setGridColumns] = useState([]);
  const currentId = state.canvasFocus.componentId;
  const currentComponent = state.components[currentId - 1];

  // formatting for data grid columns
  const columnTabs: ColumnTab[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 30,
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
      headerName: 'Initial Value',
      width: 100,
      editable: true,
      valueGetter: (param) => {
        // to display the actual object or array instead of [object Object], leave undefined if it is setter function
        if (param.row.type === 'func') return;
        return JSON.stringify(param.row.value);
      },
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
      width: 30,
      editable: false,
      renderCell: function renderCell(params: any) {
        return (
          <Button
            style={{ width: `${3}px`, color: 'black' }}
            onClick={() => {
              handleDeleteState(params.id);
            }}
          >
            <ClearIcon style={{ width: `${15}px` }} />
          </Button>
        );
      },
    },
  ];

  const handleDeleteState = (selectedId) => {
    const currentId = state.canvasFocus.componentId;
    const currentComponent = state.components[currentId - 1];
    const filtered = currentComponent.stateProps.filter(
      (element) => element.id !== selectedId,
    );
    dispatch(
      deleteState({
        stateProps: filtered,
        rowId: selectedId,
        contextParam: contextParam,
      }),
    );

    if (roomCode) {
      emitEvent('deleteStateAction', roomCode, {
        stateProps: filtered,
        rowId: selectedId,
        contextParam: contextParam,
      });
    }
  };

  useEffect(() => {
    setGridColumns(columnTabs);
  }, [props.isThemeLight]);

  const { selectHandler }: StatePropsPanelProps = props;

  useEffect(() => {
    if (props.canDeleteState) {
      setGridColumns(columnTabs);
    } else {
      setGridColumns(columnTabs.slice(0, gridColumns.length - 1));
    }
  }, [state.canvasFocus.componentId]);

  // rows to show are either from current component or from a given provider
  const rows = [];
  currentComponent.stateProps?.forEach((prop) => {
    rows.push(prop);
  });

  return (
    <div className={'state-prop-grid'}>
      <DataGrid
        rows={rows}
        columns={gridColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        editRowsModel={editRowsModel}
        onRowClick={selectHandler}
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
      backgroundColor: 'LightGray',
    },
    '& button': {
      color: 'white',
    },
  },
  themeDark: {
    color: 'white',
    '& .MuiTablePagination-root': {
      color: 'white',
    },
    '& .MuiIconButton-root': {
      color: 'white',
    },
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
    '& .MuiDataGrid-window': {
      backgroundColor: 'rgba(0,0,0,0.54)',
    },
  },
});

export default TableStateProps;
