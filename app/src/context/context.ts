import React from 'react';
import { State } from '../interfaces/interfacesNew';

export const stateContext = React.createContext<State | {}>([{}, () => {}]);
