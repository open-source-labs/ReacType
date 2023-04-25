import subject from '../app/src/redux/reducers/slice/contextReducer';

describe('Context Reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      allContext: []
    };
  });

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(subject(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('unrecognized action types', () => {
    it('should return the original state without any duplication', () => {
      expect(subject(state, { type: 'REMOVE_STATE' })).toBe(state);
    });
  });

  describe('context/addContext', () => {
    const action = {
      type: 'context/addContext',
      payload: {
        name: 'Theme Context'
      }
    };

    it('adds a context', () => {
      const { allContext } = subject(state, action);
      expect(allContext[0]).toEqual({
        name: 'Theme Context',
        values: [],
        components: []
      });
    });

    it('returns a state object not strictly equal to the original', () => {
      const newState = subject(state, action);
      expect(newState).not.toBe(state);
    });

    it('should immutably update the nested state object', () => {
      const { allContext } = subject(state, action);
      expect(allContext).not.toBe(state.allContext);
    });
  });

  //OLD ADD CONTEX TEST

  // describe('ADD_CONTEXT', () => {
  //   const action = {
  //     type: 'ADD_CONTEXT',
  //     payload: {
  //       name: 'Theme Context'
  //     }
  //   };

  //   it('adds a context', () => {
  //     const { allContext } = subject(state, action);
  //     expect(allContext[0]).toEqual({
  //       name: 'Theme Context',
  //       values: [],
  //       components: []
  //     });
  //   });

  //   it('returns a state object not strictly equal to the original', () => {
  //     const newState = subject(state, action);
  //     expect(newState).not.toBe(state);
  //   });

  //   it('should immutably update the nested state object', () => {
  //     const { allContext } = subject(state, action);
  //     expect(allContext).not.toBe(state.allContext);
  //   });
  // });

  describe('context/addContextValues', () => {
    beforeEach(() => {
      state = {
        allContext: [
          {
            name: 'Theme Context',
            values: [],
            components: []
          }
        ]
      };
    });

    const action = {
      type: 'context/addContextValues',
      payload: {
        name: 'Theme Context',
        inputKey: 'Theme Color',
        inputValue: 'Dark'
      }
    };

    it('adds a key-value pair to values array of the specified context', () => {
      const { allContext } = subject(state, action);
      expect(allContext[0].values.length).toEqual(1);
      expect(allContext[0].values[0].key).toEqual('Theme Color');
      expect(allContext[0].values[0].value).toEqual('Dark');
    });

    it('includes an allContext not strictly equal to the original', () => {
      const { allContext } = subject(state, action);

      expect(allContext).not.toBe(state.allContext);
    });
  });

  describe('context/deleteContext', () => {
    let action;
    beforeEach(() => {
      state = {
        allContext: [
          {
            name: 'Theme Context',
            values: [],
            components: []
          },
          {
            name: 'To be deleted',
            values: [],
            components: []
          }
        ]
      };

      action = {
        type: 'context/deleteContext',
        payload: {
          name: 'Theme Context'
        }
      };
    });

    it('removes specified context from the state', () => {
      const { allContext } = subject(state, action);

      expect(allContext.length).toEqual(1);
    });

    it('includes an allContext not strictly equal to the original', () => {
      const { allContext } = subject(state, action);

      expect(allContext).not.toBe(state.allContext);
    });
  });

  describe('context/addComponentToContext', () => {
    beforeEach(() => {
      state = {
        allContext: [
          {
            name: 'Theme Context',
            values: [],
            components: []
          }
        ]
      };
    });

    const action = {
      type: 'context/addComponentToContext',
      payload: {
        context: {
          name: 'Theme Context'
        },
        component: {
          name: 'Main Component'
        }
      }
    };

    it('adds a new component to the specified context', () => {
      const { allContext } = subject(state, action);

      expect(allContext[0].components.length).toEqual(1);
      expect(allContext[0].components[0]).toEqual('Main Component');
    });

    it('includes an allContext not strictly equal to the original', () => {
      const { allContext } = subject(state, action);

      expect(allContext).not.toBe(state.allContext);
    });
  });
});
