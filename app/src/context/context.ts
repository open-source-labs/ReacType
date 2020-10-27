import React from 'react';
import { State } from '../interfaces/Interfaces';

export const StateContext = React.createContext<State | {}>([{}, () => {}]);
