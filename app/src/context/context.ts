import React from 'react';
import { State } from '../interfaces/Interfaces';
const StateContext = React.createContext<State | {}>([{}, () => {}]);
export default StateContext;
