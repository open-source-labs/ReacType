import { MUIType } from '../interfaces/Interfaces';
import { TroubleshootSharp } from '@mui/icons-material';
import React from 'react';

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
    defaultProps: ['variant="contained"'],
    propOptions: [
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
    ],
    jsx: [`<Button >Contained</Button>`],
    componentData: {
      type: 'Button',
      props: {
        variant: 'contained',
        color: 'primary',
        sx: { mt: 2, mb: 2 }
      },
      children: 'Click Me'
    },
    children: []
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
    propOptions: [],
    defaultProps: [],
    jsx: [],
    componentData: {},
    children: []
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
    defaultProps: ['variant="outlined"'],
    propOptions: [
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
    ],
    jsx: [
      `<Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' }}} noValidate autoComplete="off">`,
      `  <TextField id="outlined-basic" label="Outlined" />`,
      `</Box>`
    ],
    componentData: {
      type: 'TextField',
      props: {
        variant: 'outlined',
        label: 'Enter Text',
        helperText: 'Please enter your text here',
        fullWidth: false,
        sx: { mt: 2, mb: 2 }
      },
      children: []
    },
    children: []
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
    defaultProps: ['sx={{ minWidth: 275 }}'],
    propOptions: ['children', 'classes', 'raised', 'sx'],
    jsx: [
      `<Card >`,
      `  <CardContent>`,
      `    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>`,
      `      Word of the Day`,
      `    </Typography>`,
      `    <Typography variant="h5" component="div">`,
      `      benevolent`,
      `    </Typography>`,
      `    <Typography sx={{ mb: 1.5 }} color="text.secondary">`,
      `      adjective`,
      `    </Typography>`,
      `    <Typography variant="body2">`,
      `      well meaning and kindly.`,
      `      <br />`,
      `      {'"a benevolent smile"'}`,
      `    </Typography>`,
      `  </CardContent>`,
      `  <CardActions>`,
      `    <Button size="small">Learn More</Button>`,
      `  </CardActions>`,
      `</Card>`
    ],
    componentData: {
      type: 'Card',
      props: { sx: { mt: 2, mb: 2 } },
      children: [
        {
          type: 'CardContent',
          props: {},
          children: [
            {
              type: 'Typography',
              props: {
                sx: { fontSize: 14 },
                color: 'text.secondary',
                gutterBottom: true
              },
              children: 'Word of the Day'
            },
            {
              type: 'Typography',
              props: { variant: 'h5', component: 'div' },
              children: 'benevolent'
            },
            {
              type: 'Typography',
              props: { sx: { mb: 1.5 }, color: 'text.secondary' },
              children: 'adjective'
            },
            {
              type: 'Typography',
              props: { variant: 'body2' },
              children: [
                'well meaning and kindly.',
                'br',
                '"a benevolent smile"'
              ]
            }
          ]
        },
        {
          type: 'CardActions',
          props: {},
          children: [
            {
              type: 'Button',
              props: {
                size: 'small'
              },
              children: 'Learn More'
            }
          ]
        }
      ]
    },
    children: []
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
    defaultProps: ['variant="h3"'],
    propOptions: [
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
    ],
    jsx: [`<Typography gutterBottom> h3. Heading </Typography>`],
    componentData: {
      type: 'Typography',
      props: {
        variant: 'h3',
        gutterBottom: true,
        sx: { mt: 2, mb: 2 }
      },
      children: 'h3. Heading'
    },
    children: []
  }
];

export default MUITypes;
