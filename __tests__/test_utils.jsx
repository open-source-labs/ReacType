import { initialState } from '../app/src/redux/reducers/slice/appStateSlice';

export const state = JSON.parse(JSON.stringify(initialState));
state.components = [
  {
    id: 1,
    name: 'App',
    style: {},
    code: "import React, { useState, useEffect, useContext} from 'react';\n\n\n\nimport C1 from './C1'\nconst App = (props) => {\n\n\n      const [appState, setAppState] = useState<number | undefined>(1);\n\n  return(\n    <>\n<C1  id = \"1\" />\n    </>\n  );\n}\n\nexport default App\n",
    children: [
      {
        type: 'HTML Element',
        typeId: 1000,
        name: 'separator',
        childId: 1000,
        style: { border: 'none' },
        attributes: {},
        children: []
      },
      {
        type: 'Component',
        typeId: 2,
        name: 'C1',
        childId: 1,
        style: {},
        attributes: {},
        children: [],
        stateProps: [],
        passedInProps: []
      }
    ],
    isPage: true,
    past: [[]],
    future: [],
    stateProps: [],
    useStateCodes: [
      'const [appState, setAppState] = useState<number | undefined>(1)'
    ]
  },
  {
    id: 2,
    name: 'C1',
    nextChildId: 1,
    style: {},
    attributes: {},
    code: "import React, { useState, useEffect, useContext} from 'react';\n\n\n\n\nconst C1 = (props) => {\n\n\n\n  return(\n    <>\n\n    </>\n  );\n}\n\nexport default C1\n",
    children: [],
    isPage: false,
    past: [],
    future: [],
    stateProps: [],
    useStateCodes: [],
    passedInProps: []
  }
];
