import React from 'react';
import { State } from '../interfaces/Interfaces';

export const stateContext = React.createContext<State | {}>([{}, () => {}]);
