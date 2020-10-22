import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { stateContext } from '../../context/context';
import HTMLItem from './HTMLItem';

const HTMLPanel = (): JSX.Element => {
  const [tag, setTag] = useState('');
  const [name, setName] = useState('');
  const [currentID, setCurrentID] = useState(12);
  const [state, dispatch] = useContext(stateContext);

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
      placeHolderShort: name,
      placeHolderLong: '',
      icon: null
    };
    dispatch({
      type: 'ADD ELEMENT',
      payload: newElement
    });
    setCurrentID(currentID + 1);
    setTag('');
    setName('');
    console.log("SUBMIT BUTTON CLICKED: ", newElement);
  }

  return (
    <div>
      <h4> HTML Elements</h4>
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
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {state.HTMLTypes.map(option => (
          <HTMLItem
            name={option.name}
            key={`html-${option.name}`}
            id={option.id}
            Icon={option.icon}
          />
        ))}
      </Grid>
    </div>
  );
};

export default HTMLPanel;
