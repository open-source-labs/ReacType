/* eslint-disable max-len */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clear } from '@mui/icons-material';
import { DeleteButtons } from '../../interfaces/Interfaces';
import { deleteChild } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';

/**
 * `DeleteButton` is a React component that renders a button for deleting a specific HTML element or component within the application.
 * It uses Redux actions to manage the state and potentially emits events over sockets for collaborative environments.
 *
 * @param {Object} props - The component props.
 * @param {number} props.id - The unique identifier of the component or HTML element to be deleted.
 * @param {string} props.name - The name of the component or HTML element, used for identification in the UI or logs.
 * @param {Function} [props.onClickHandler] - An optional function to handle additional or preparatory actions on button click before the deletion occurs.
 *
 * @returns {JSX.Element} A button element that triggers the deletion of the specified component or HTML element when clicked.
 */
function DeleteButton({
  id,
  name,
  onClickHandler,
}: DeleteButtons): JSX.Element {
  const contextParam = useSelector((store: RootState) => store.contextSlice);

  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const dispatch = useDispatch();

  const deleteHTMLtype = (id: number) => {
    dispatch(deleteChild({ id: id, contextParam: contextParam }));
    if (roomCode) {
      emitEvent('deleteChildAction', roomCode, {
        id,
        contextParam,
      });
    }
  };

  return (
    <div style={{ padding: '1px', float: 'right' }}>
      <button
        className="delete-button-empty"
        id={'btn' + id}
        onClick={(event) => {
          event.stopPropagation();
          if (typeof onClickHandler === 'function') {
            onClickHandler(event);
          }
          deleteHTMLtype(id);
        }}
      >
        <Clear className="deleteIcon" />
      </button>
    </div>
  );
}

export default DeleteButton;
