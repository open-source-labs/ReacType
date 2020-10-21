import React, { useState, useReducer } from 'react';
import HeaderIcon from '@material-ui/icons/TextFormat';
import initialState from '../../context/initialState';
import reducer from '../../reducers/componentReducer';

const AddElements = () : JSX.Element => {
  const [tag, setTag] = useState('');
  const [name, setName] = useState('');
  const [currentID, setCurrentID] = useState(12);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newElement = {
      id: currentID,
      tag,
      name,
      style: {},
      placeHolderShort: '',
      placeHolderLong: '',
      icon: HeaderIcon
    };
    // state.HTMLTypes.push(newElement);
    setCurrentID(currentID + 1);
    setTag('');
    setName('');
    console.log("SUBMIT BUTTON CLICKED: ", newElement);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Create New Element: </h4>
        <label>
          Tag:
          <input type="text" name="Tag" value={tag} onChange={handleTagChange} />
        </label>
        <label>
          Tag Name:
          <input type="text" name="Tag Name" value={name} onChange={handleNameChange} />
        </label>
        <input type="submit" value="Add Element" />
      </form>
    </div>
  );
}

export default AddElements;
