import { MUIType } from '../interfaces/Interfaces';
import { TroubleshootSharp } from '@mui/icons-material';

const MUITypes: MUIType[] = [
  {
    id: 21,
    tag: 'mui button',
    name: 'Button',
    style: {},
    placeHolderShort: 'mui button',
    placeHolderLong: 'Material UI Button Component',
    icon: 'EditAttributes',
    framework: 'reactClassic',
    nestable: true,
    imports: ["import Button from '@mui/material/Button'"],
    props: [
      'children',
      'classes',
      'color',
      'component',
      'disabled',
      'disableElevation',
      'disableFocusRipple',
      'disableRipple',
      'endIcon',
      'fullWidth',
      'href',
      'size',
      'startIcon',
      'sx',
      'variant'
    ]
  },
  // do not move this separator element out of index 1 in this array
  // in componentReducer.ts, separator is referenced as 'initialState.HTMLTypes[1]'
  {
    id: 1000,
    tag: 'separator',
    name: 'separator',
    style: { border: 'none' },
    placeHolderShort: '',
    placeHolderLong: '',
    icon: null,
    framework: '',
    nestable: true,
    imports: [],
    props: []
  },
  {
    id: 31,
    tag: 'textfield',
    name: 'TextField',
    style: {},
    placeHolderShort: 'textfield',
    placeHolderLong: 'Material UI TextField Component',
    icon: 'Input',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Box from '@mui/material/Box'",
      "import TextField from '@mui/material/TextField'"
    ],
    props: [
      'autoComplete',
      'autoFocus',
      'classes',
      'color',
      'defaultValue',
      'disabled',
      'error',
      'FormHelperTextProps',
      'fullWidth',
      'helperText',
      'id',
      'InputLabelProps',
      'inputProps',
      'InputProps',
      'inputRef',
      'label',
      'margin',
      'maxRows',
      'minRows',
      'multiline',
      'name',
      'onChange',
      'placeholder',
      'required',
      'rows',
      'select',
      'SelectProps',
      'size',
      'sx',
      'type',
      'value',
      'variant'
    ]
  },
  {
    id: 41,
    tag: 'card',
    name: 'Card',
    style: {},
    placeHolderShort: 'card',
    placeHolderLong: 'Material UI Card Component',
    icon: 'CardTravel',
    framework: 'reactClassic',
    nestable: true,
    imports: [
      "import Box from '@mui/material/Box'",
      "import Card from '@mui/material/Card'",
      "import CardActions from '@mui/material/CardActions'",
      "import CardContent from '@mui/material/CardContent'",
      "import Button from '@mui/material/Button'",
      "import Typography from '@mui/material/Typography'"
    ],
    props: ['children', 'classes', 'raised', 'sx']
  },
  {
    id: 51,
    tag: 'typography',
    name: 'Typography',
    style: {},
    placeHolderShort: 'typography',
    placeHolderLong: 'Material UI Typography Component',
    icon: 'TextFields',
    framework: 'reactClassic',
    nestable: true,
    imports: [
      "import Box from '@mui/material/Box'",
      "import Typography from '@mui/material/Typography'"
    ],
    props: [
      'align',
      'children',
      'classes',
      'component',
      'gutterBottom',
      'noWrap',
      'paragraph',
      'sx',
      'variant',
      'variantMapping'
    ]
  }
];

export default MUITypes;
