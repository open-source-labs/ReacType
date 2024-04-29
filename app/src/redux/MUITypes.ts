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
  },
  {
    id: 61,
    tag: 'autocomplete',
    name: 'Autocomplete',
    style: {},
    placeHolderShort: 'autocomplete',
    placeHolderLong: 'Material UI Autocomplete Component',
    icon: 'EditAttributes',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import TextField from '@mui/material/TextField'",
      "import Autocomplete from '@mui/material/Autocomplete'",
      '\nconst top100Films = [',
      "\t{ label: 'The Shawshank Redemption', year: 1994 },",
      "\t{ label: 'The Godfather', year: 1972 },",
      "\t{ label: 'The Godfather: Part II', year: 1974 },",
      "\t{ label: 'The Dark Knight', year: 2008 },",
      "\t{ label: '12 Angry Men', year: 1957 },",
      '];\n'
    ],
    defaultProps: [
      'disablePortal options={top100Films} sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Movie" />}'
    ],
    propOptions: [
      'options',
      'renderInput',
      'autoComplete',
      'autoHighlight',
      'autoSelect',
      'blurOnSelect',
      'ChipProps',
      'classes',
      'clearIcon',
      'clearOnBlur',
      'clearOnEscape',
      'clearText',
      'closeText',
      'componentsProps',
      'defaultValue',
      'disableClearable',
      'disableCloseOnSelect',
      'disabled',
      'disabledItemsFocusable',
      'disableListWrap',
      'disablePortal',
      'filterOptions',
      'filterSelectedOptions',
      'forcePopupIcon',
      'freeSolo',
      'fullWidth',
      'getLimitTagsText',
      'getOptionDisabled',
      'getOptionKey',
      'getOptionLabel',
      'groupBy',
      'handleHomeEndKeys',
      'id',
      'includeInputInList',
      'inputValue',
      'isOptionEqualToValue',
      'limitTags',
      'ListboxComponent',
      'ListboxProps',
      'loading',
      'loadingText',
      'multiple',
      'noOptionsText',
      'onChange',
      'onClose',
      'onHighlightChange',
      'onInputChange',
      'onOpen',
      'open',
      'openOnFocus',
      'openText',
      'PaperComponent',
      'PopperComponent',
      'popupIcon',
      'readOnly',
      'renderGroup',
      'renderOption',
      'renderTags',
      'selectOnFocus',
      'size',
      'slotProps',
      'sx',
      'value'
    ],
    jsx: [`<Autocomplete id="combo-box-demo" />`],
    componentData: {
      type: 'Autocomplete',
      props: {
        disablePortal: true,
        id: 'combo-box-demo',
        options: 'top100Films',
        sx: { width: 300 },
        renderInput: "params => <TextField {...params} label='Movie' />"
      },
      children: []
    },
    children: []
  },
  {
    id: 71,
    tag: 'btn group',
    name: 'ButtonGroup',
    style: {},
    placeHolderShort: 'btn group',
    placeHolderLong: 'Material UI ButtonGroup Component',
    icon: 'TableRows',
    framework: 'reactClassic',
    nestable: true,
    imports: [
      "import Button from '@mui/material/Button",
      "import ButtonGroup from '@mui/material/ButtonGroup'"
    ],
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
      'fullWidth',
      'orientation',
      'size',
      'sx',
      'variant'
    ],
    jsx: [
      `<ButtonGroup aria-label="Basic button group">`,
      `  <Button>One</Button>`,
      `  <Button>Two</Button>`,
      `  <Button>Three</Button>`,
      `</ButtonGroup>`
    ],
    componentData: {
      type: 'ButtonGroup',
      props: {
        variant: 'contained',
        'aria-label': 'Basic button group'
      },
      children: [
        { type: 'Button', children: 'One' },
        { type: 'Button', children: 'Two' },
        { type: 'Button', children: 'Three' }
      ]
    },
    children: []
  },
  {
    id: 81,
    tag: 'checkbox',
    name: 'Checkbox',
    style: {},
    placeHolderShort: 'checkbox',
    placeHolderLong: 'Material UI Checkbox Component',
    icon: 'CheckBoxOutlineBlank',
    framework: 'reactClassic',
    nestable: false,
    imports: ["import Checkbox from '@mui/material/Checkbox'"],
    defaultProps: ['defaultChecked'],
    propOptions: [
      'checked',
      'checkedIcon',
      'classes',
      'color',
      'defaultChecked',
      'disabled',
      'disableRipple',
      'icon',
      'id',
      'indeterminate',
      'indeterminateIcon',
      'inputProps',
      'inputRef',
      'onChange',
      'required',
      'size',
      'sx',
      'value'
    ],
    jsx: [
      `<div>`,
      `  <Checkbox {...{ inputProps: { 'aria-label': 'Checkbox demo' } }} />`,
      `</div>`
    ],
    componentData: {
      type: 'div',
      props: {},
      children: [
        {
          type: 'Checkbox',
          props: {
            inputProps: { 'aria-label': 'Checkbox demo' },
            defaultChecked: true
          }
        }
      ]
    },
    children: []
  },
  {
    id: 91,
    tag: 'fab',
    name: 'Fab',
    style: {},
    placeHolderShort: 'fab',
    placeHolderLong: 'Material UI Floating Action Button Component',
    icon: 'Add',
    framework: 'reactClassic',
    nestable: true,
    imports: [
      "import Box from '@mui/material/Box'",
      "import Fab from '@mui/material/Fab'",
      "import AddIcon from '@mui/icons-material/Add'"
    ],
    defaultProps: ['color="primary" variant="circular"'],
    propOptions: [
      'children',
      'classes',
      'color',
      'component',
      'disabled',
      'disableFocusRipple',
      'disableRipple',
      'href',
      'size',
      'sx',
      'variant'
    ],
    jsx: [
      `<Box sx={{ '& > :not(style)': { m: 1 } }}>`,
      `  <Fab aria-label="add">`,
      `    <AddIcon />`,
      `  </Fab>`,
      `</Box>`
    ],
    componentData: {
      type: 'Box',
      props: {
        sx: { '& > :not(style)': { m: 1 } }
      },
      children: [
        {
          type: 'Fab',
          props: {
            color: 'primary',
            'aria-label': 'add',
            sx: { fontSize: 24 }
          },
          children: '+'
        }
      ]
    },
    children: []
  },
  {
    id: 101,
    tag: 'radio group',
    name: 'RadioGroup',
    style: {},
    placeHolderShort: 'radio group',
    placeHolderLong: 'Material UI Radio Buttons Group Component',
    icon: 'RadioButtonChecked',
    framework: 'reactClassic',
    nestable: true,
    imports: [
      "import Radio from '@mui/material/Radio'",
      "import RadioGroup from '@mui/material/RadioGroup'",
      "import FormControlLabel from '@mui/material/FormControlLabel'",
      "import FormControl from '@mui/material/FormControl'",
      "import FormLabel from '@mui/material/FormLabel'"
    ],
    defaultProps: ['defaultValue="female" name="radio-buttons-group"'],
    propOptions: ['children', 'defaultValue', 'name', 'onChange', 'value'],
    jsx: [
      `<FormControl>`,
      `  <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>`,
      `  <RadioGroup aria-labelledby="demo-radio-buttons-group-label" >`,
      `    <FormControlLabel value="female" control={<Radio />} label="Female" />`,
      `    <FormControlLabel value="male" control={<Radio />} label="Male" />`,
      `    <FormControlLabel value="other" control={<Radio />} label="Other" />`,
      `  </RadioGroup>`,
      `</FormControl>`
    ],
    componentData: {
      type: 'FormControl',
      props: {},
      children: [
        {
          type: 'FormLabel',
          props: {
            id: 'demo-radio-buttons-group-label'
          },
          children: 'Gender'
        },
        {
          type: 'RadioGroup',
          props: {
            'aria-labelledby': 'demo-radio-buttons-group-label',
            defaultValue: 'female',
            name: 'radio-buttons-group'
          },
          children: [
            {
              type: 'FormControlLabel',
              props: {
                value: 'female',
                control: { type: 'Radio' },
                label: 'Female'
              }
            },
            {
              type: 'FormControlLabel',
              props: {
                value: 'male',
                control: { type: 'Radio' },
                label: 'Male'
              }
            },
            {
              type: 'FormControlLabel',
              props: {
                value: 'other',
                control: { type: 'Radio' },
                label: 'Other'
              }
            }
          ]
        }
      ]
    },
    children: []
  },
  {
    id: 111,
    tag: 'rating',
    name: 'Rating',
    style: {},
    placeHolderShort: 'rating',
    placeHolderLong: 'Material UI Rating Component',
    icon: 'StarBorder',
    framework: 'reactClassic',
    nestable: false,
    imports: [
      "import Box from '@mui/material/Box'",
      "import Rating from '@mui/material/Rating'",
      "import Typography from '@mui/material/Typography'",
      "import React from 'react'"
    ],
    defaultProps: ['value="2"'],
    propOptions: [
      'defaultValue',
      'disabled',
      'emptyIcon',
      'emptyLabelText',
      'getLabelText',
      'highlightSelectedOnly',
      'icon',
      'IconContainerComponent',
      'max',
      'name',
      'onChange',
      'onChangeActive',
      'precision',
      'readOnly',
      'size',
      'sx',
      'value'
    ],
    jsx: [
      `<Box sx={{ '& > legend': { mt: 2 } }}>`,
      `  <Typography component="legend">Controlled</Typography>`,
      `  <Rating name="simple-controlled" onChange={(event, newValue) => { setValue(newValue); }} />`,
      `</Box>`
    ],
    componentData: {
      type: 'Box',
      props: {
        sx: { '& > legend': { mt: 2 } }
      },
      children: [
        {
          type: 'Typography',
          props: {
            component: 'legend'
          },
          children: 'Controlled'
        },
        {
          type: 'Rating',
          props: {
            name: 'simple-controlled',
            value: 2,
            onChange: 'setValue(newValue)'
          }
        }
      ]
    },
    children: []
  }
];

export default MUITypes;
