import TreeChart from '../app/src/tree/TreeChart';
import React, { useReducer } from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import { StateContext } from '../app/src/context/context';
import { State, Action, Component, ChildElement } from '../app/src/interfaces/Interfaces';
import initialState from '../app/src/context/initialState';
import reducer from '../app/src/reducers/componentReducer';


function Test() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]} >
      <TreeChart />
    </StateContext.Provider>
  );
}

test('Test the tree functionality', function () {
  render(<Test/>);

  screen.getByRole('');
  
  {/*TEST 'ADD COMPONENT TO PAGE' */}
  
  {/* TEST 'ADD COMPONENT TO ANOTHER COMPONENT'
   xdescribe('ADD COMPONENT TO ANOTHER COMPONENT', () => {
     it('should add child component to top-level component', () => {

     })
   })

   TEST 'ADD A HTML ELEMENT TO A PAGE'
   xdescribe('ADD CHILD TO COMPONENT', () => {
     it('should add child component to top-level component', () => {

     })
   })

   TEST 'ADD A HTML ELEMENT TO A COMPONENT'
   xdescribe('', () => {
     it('', () => {

     })
   }) */}

})