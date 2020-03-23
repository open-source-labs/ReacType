import { ApplicationStateInt } from './Interfaces';
import cloneDeep from './cloneDeep';

/*Helper function that copies the state to be added on to the history
  By clearing the history data out of each stored step of the timeline,
  you can avoid repetitive nesting that maxes out the memory allocated to electron
  (usually happens at around 7-10 steps without using this method)*/
export const createHistory = (state: ApplicationStateInt) => {
  const stateCopy = cloneDeep(state);
  const historyCopy = cloneDeep(state.history);
  historyCopy.push({ ...stateCopy, history: [] });
  const history = historyCopy;
  const historyIndex = state.historyIndex + 1;
  const future: [] = [];

  return {
    history,
    historyIndex,
    future,
  };
};
