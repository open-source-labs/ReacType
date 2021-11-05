import {
  State,
  Action,
  Component,
  ChildElement,
  HTMLType
} from '../interfaces/Interfaces';
import React, { useState, useCallback, useContext, useEffect } from 'react';
import StateContext from '../context/context';


// const addRoute = (switchItem: ChildElement) => {
const addRoute = (id: number) => {
  const [state, dispatch] = useContext(StateContext);
  console.log('in addRoute');
  // dispatch ADD CHILD to Switch?
  dispatch({
    type: 'ADD CHILD',
    payload: {
      type: 'HTML Element',
      typeId: -1,
      childId: id
    }
  });
};

export default addRoute;
